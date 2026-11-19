const webhookUrl = process.env.NEXT_PUBLIC_REGISTRATION_WEBHOOK_URL?.trim();

function isAppsScriptWebhook(url: string): boolean {
  try {
    return new URL(url).hostname === "script.google.com";
  } catch {
    return false;
  }
}

const appsScriptWebhook = Boolean(webhookUrl && isAppsScriptWebhook(webhookUrl));
const appsScriptSheetName = "Big Rock Registrations";

export type RegistrationErrorCode = "not_configured" | "network" | "server" | "validation";

export class RegistrationError extends Error {
  code: RegistrationErrorCode;

  constructor(code: RegistrationErrorCode, message: string) {
    super(message);
    this.name = "RegistrationError";
    this.code = code;
  }
}

export interface RegistrationInput {
  name: string;
  mobile: string;
}

export function normalizeIndianMobile(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

export function isValidIndianMobile(value: string): boolean {
  return /^[6-9]\d{9}$/.test(normalizeIndianMobile(value));
}

export async function submitRegistration(input: RegistrationInput): Promise<void> {
  if (!webhookUrl) {
    throw new RegistrationError(
      "not_configured",
      "Registration webhook is not configured.",
    );
  }

  const mobile = normalizeIndianMobile(input.mobile);
  if (!isValidIndianMobile(mobile)) {
    throw new RegistrationError("validation", "Invalid mobile number.");
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);

  try {
    const submittedAt = new Date().toISOString();
    const page = window.location.href;
    const registration = {
      name: input.name.trim(),
      mobile: `+91${mobile}`,
      consent: true,
      source: "Big Rock registration popup",
      page,
      submittedAt,
    };

    const requestInit: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": appsScriptWebhook
          ? "application/x-www-form-urlencoded"
          : "text/plain;charset=utf-8",
      },
      body: appsScriptWebhook
        ? new URLSearchParams({
            e_gs_SheetName: appsScriptSheetName,
            name: registration.name,
            mobile: registration.mobile,
            consent: "true",
            source: registration.source,
            page,
            submittedAt,
          }).toString()
        : JSON.stringify(registration),
      redirect: "follow",
      cache: "no-store",
      signal: controller.signal,
    };

    if (appsScriptWebhook) {
      requestInit.mode = "no-cors";
    }

    const response = await fetch(webhookUrl, requestInit);

    if (appsScriptWebhook) {
      return;
    }

    const text = await response.text();
    const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
    if (!response.ok) {
      throw new RegistrationError("server", `Registration request failed (${response.status}).`);
    }

    if (contentType.includes("text/html") || /^\s*</.test(text)) {
      throw new RegistrationError("server", "Registration endpoint returned an HTML page.");
    }

    if (text) {
      try {
        const result = JSON.parse(text) as { ok?: boolean; success?: boolean; error?: string };
        if (result.ok === false || result.success === false) {
          throw new RegistrationError("server", result.error || "Registration was rejected.");
        }
      } catch (error) {
        if (error instanceof RegistrationError) throw error;
      }
    }
  } catch (error) {
    if (error instanceof RegistrationError) throw error;
    throw new RegistrationError("network", "Registration request could not be sent.");
  } finally {
    window.clearTimeout(timeout);
  }
}
