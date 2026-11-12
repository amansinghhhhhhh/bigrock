import bannersJson from "@/content/banners.json";
import categoriesJson from "@/content/categories.json";
import demoAccountsJson from "@/content/demo-accounts.json";
import faqsJson from "@/content/faqs.json";
import gamesJson from "@/content/games.json";
import matchesJson from "@/content/matches.json";
import paymentsJson from "@/content/payments.json";
import promosJson from "@/content/promos.json";
import sectionsJson from "@/content/sections.json";
import seoJson from "@/content/seo.json";
import siteJson from "@/content/site.json";
import stepsJson from "@/content/steps.json";
import trustJson from "@/content/trust.json";
import type {
  Banner,
  Category,
  DemoAccount,
  Faq,
  GamesData,
  Match,
  Payment,
  Promo,
  Sections,
  SeoDoc,
  SiteData,
  Step,
  TrustItem,
} from "./types";

export const site = siteJson as SiteData;
export const banners = bannersJson.items as Banner[];
export const promos = promosJson.items as Promo[];
export const categories = categoriesJson.items as Category[];
export const games = gamesJson as GamesData;
export const matches = matchesJson.items as Match[];
export const demoAccounts = demoAccountsJson.items as DemoAccount[];
export const payments = paymentsJson.items as Payment[];
export const sections = sectionsJson as Sections;
export const steps = stepsJson.items as Step[];
export const trust = trustJson.items as TrustItem[];
export const faqs = faqsJson.items as Faq[];
export const seo = seoJson as SeoDoc;

const uniqueByTitle = <T extends { title: string }>(items: T[]): T[] => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const searchPool = uniqueByTitle([
  ...games.wins,
  ...games.originals,
  ...games.hot,
  ...games.live,
  ...games.slots,
  ...games.bingo,
]);
