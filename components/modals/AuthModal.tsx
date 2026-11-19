"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/data";
import { asset } from "@/lib/helpers";
import {
  RegistrationError,
  isValidIndianMobile,
  normalizeIndianMobile,
  submitRegistration,
} from "@/lib/registration";
import { useApp } from "@/components/Providers";
import Icon from "@/components/ui/Icon";

type FormErrors = Partial<Record<"name" | "mobile" | "consent" | "submit", string>>;

const nameInvalidPattern = new RegExp("[^\\p{L}\\p{M}\\s.'’-]", "gu");

function sanitizeName(value: string): string {
  return value.replace(nameInvalidPattern, "").replace(/\s{2,}/g, " ").slice(0, 80);
}

export default function AuthModal({ open }: { open: boolean }) {
  const { closeModals, showToast } = useApp();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      const target = panelRef.current?.querySelector<HTMLInputElement>(
        'input:not([type="hidden"]), select',
      );
      target?.focus({ preventScroll: true });
    }, 70);
    return () => window.clearTimeout(timer);
  }, [open]);

  const clearError = (field: "name" | "mobile" | "consent") => {
    setErrors((previous) => {
      if (!previous[field] && !previous.submit) return previous;
      return { ...previous, [field]: undefined, submit: undefined };
    });
  };

  const handleMobileChange = (value: string) => {
    const digits = value.replace(/\D/g, "");
    let local = digits;
    if (local.length === 12 && local.startsWith("91")) local = local.slice(2);
    else if (local.length === 11 && local.startsWith("0")) local = local.slice(1);
    setMobile(local.slice(0, 10));
    clearError("mobile");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = "Please enter your name.";
    if (!isValidIndianMobile(mobile)) {
      nextErrors.mobile = "Enter a valid 10-digit mobile number starting with 6–9.";
    }
    if (!consent) nextErrors.consent = "Please confirm you are 18+ and accept the terms.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSending(true);
    setErrors({});

    try {
      await submitRegistration({ name, mobile });
      setName("");
      setMobile("");
      setConsent(false);
      closeModals();
      showToast("Thanks! Your registration details have been received.");
    } catch (error) {
      const message =
        error instanceof RegistrationError && error.code === "not_configured"
          ? "Registration is temporarily unavailable. Please"
          : "We couldn't submit your registration. Please try again or";
      setErrors({ submit: message });
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className={`modal-backdrop${open ? " open" : ""}`}
      id="authModal"
      role="dialog"
      aria-modal="true"
      aria-label="Big Rock registration"
      aria-hidden={!open}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeModals();
      }}
    >
      <div className="modal modal-auth">
        <button className="modal-close" type="button" onClick={closeModals} aria-label="Close dialog">
          <Icon name="close" />
        </button>
        <div className="auth-grid">
          <aside className="auth-aside">
            <img
              className="auth-aside-art"
              src={asset("Form Image/01.png")}
              alt="Big Rock welcome offer"
              width={1092}
              height={1441}
            />
          </aside>
          <div className="auth-main" ref={panelRef}>
            <div className="auth-panel active" id="signupPanel">
              <h3>Join the rock.</h3>
              <p className="modal-sub">30 seconds to sign up. Your welcome pack is waiting.</p>
              <form id="signupForm" noValidate aria-busy={sending} onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="signupName">Name</label>
                  <input
                    id="signupName"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={name}
                    maxLength={80}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "signupNameError" : undefined}
                    onChange={(event) => {
                      setName(sanitizeName(event.target.value));
                      clearError("name");
                    }}
                    required
                  />
                  {errors.name ? (
                    <p className="field-error" id="signupNameError" role="alert">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div className="field">
                  <label htmlFor="signupId">Mobile number</label>
                  <div className={`phone-input${errors.mobile ? " invalid" : ""}`}>
                    <span className="phone-prefix" aria-hidden="true">
                      +91
                    </span>
                    <input
                      id="signupId"
                      name="signupId"
                      type="tel"
                      autoComplete="tel-national"
                      inputMode="numeric"
                      placeholder="98765 43210"
                      value={mobile}
                      pattern="[6-9][0-9]{9}"
                      aria-invalid={Boolean(errors.mobile)}
                      aria-describedby={errors.mobile ? "signupIdError" : undefined}
                      onChange={(event) => handleMobileChange(event.target.value)}
                      required
                    />
                  </div>
                  {errors.mobile ? (
                    <p className="field-error" id="signupIdError" role="alert">
                      {errors.mobile}
                    </p>
                  ) : null}
                </div>
                <label className={`checkline${errors.consent ? " has-error" : ""}`}>
                  <input
                    type="checkbox"
                    checked={consent}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? "signupConsentError" : undefined}
                    onChange={(event) => {
                      setConsent(event.target.checked);
                      clearError("consent");
                    }}
                    required
                  />
                  <span>
                    I&apos;m 18 or older and agree to the <a href="#faq">Terms</a>,{" "}
                    <a href="#faq">Privacy Policy</a> and responsible-play rules.
                  </span>
                </label>
                {errors.consent ? (
                  <p className="field-error" id="signupConsentError" role="alert">
                    {errors.consent}
                  </p>
                ) : null}
                {errors.submit ? (
                  <p className="form-error" role="alert">
                    {errors.submit}{" "}
                    <a href={site.contact.whatsapp} target="_blank" rel="noopener">
                      contact support on WhatsApp
                    </a>
                    .
                  </p>
                ) : null}
                <button className="btn btn-gold btn-block" type="submit" disabled={sending}>
                  {sending ? (
                    "Creating..."
                  ) : (
                    <>
                      Create my account <Icon name="spark" />
                    </>
                  )}
                </button>
              </form>
              <div className="or-line">or get your ID on</div>
              <div className="social-row social-row--contact">
                <a
                  className="social-btn social-btn-wa"
                  href={site.contact.whatsapp}
                  data-contact="whatsapp"
                  target="_blank"
                  rel="noopener"
                >
                  <Icon name="whatsapp" />
                  WhatsApp Now
                </a>
                <a
                  className="social-btn social-btn-tg"
                  href={site.contact.telegram}
                  data-contact="telegram"
                  target="_blank"
                  rel="noopener"
                >
                  <Icon name="telegram" />
                  Join Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
