import type { ContactKey } from "./types";
import { site } from "./data";

export const asset = (path?: string): string => {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return encodeURI(path.startsWith("/") ? path : `/${path}`);
};

export const resolveHref = (link: {
  href?: string;
  hrefKey?: ContactKey;
}): string => {
  if (link.href) return link.href;
  if (link.hrefKey) return site.contact[link.hrefKey];
  return "#";
};

export const whatsappLink = (base: string, message: string): string => {
  try {
    const url = new URL(base);
    url.searchParams.set("text", message);
    return url.toString();
  } catch {
    return base;
  }
};
