export type Theme = "dark" | "light";

export type ContactKey = "whatsapp" | "whatsappSupport" | "telegram";

export interface NavLink {
  label: string;
  href?: string;
  hrefKey?: ContactKey;
  icon?: string;
  support?: boolean;
  active?: boolean;
  sub?: NavLink[];
}

export interface SiteData {
  brand: {
    name: string;
    wordOne: string;
    wordTwo: string;
    tag: string;
    logo: string;
    favicon: string;
  };
  contact: Record<ContactKey, string>;
  meta: {
    title: string;
    description: string;
    keywords: string;
    author: string;
    h1: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    twitterTitle: string;
    twitterDescription: string;
    themeColor: string;
    themeColorLight: string;
    organizationDescription: string;
    websiteLanguage: string;
  };
  announcement: {
    label: string;
    items: { text: string; highlight?: string; suffix?: string }[];
  };
  header: {
    loginLabel: string;
    searchLabel: string;
    menuLabel: string;
    whatsappLabel: string;
    whatsappShort: string;
    nav: NavLink[];
  };
  sidebar: {
    bonus: {
      title: string;
      titleSmall: string;
      text: string;
      whatsappLabel: string;
      telegramLabel: string;
    };
    home: NavLink;
    groups: { label: string; icon: string; items: NavLink[] }[];
    links: NavLink[];
    support: NavLink;
    theme: { groupLabel: string; dark: string; light: string };
    railToggle: { collapse: string; expand: string };
  };
  footer: {
    about: string;
    socialLabel: string;
    social: NavLink[];
    columns: { title: string; id?: string; links: NavLink[] }[];
    paymentLabel: string;
    paymentLabels: string[];
    badgesLabel: string;
    badges: { src: string; alt: string; width: number; height: number }[];
    legal: {
      copyright: string;
      rights: string;
      age: string;
      links: NavLink[];
    };
    disclaimer: string;
    backToTop: string;
  };
  floatCta: { whatsapp: string; telegram: string; backToTop: string };
}

export interface Banner {
  image: string;
  alt: string;
  href: string;
  width: number;
  height: number;
  priority?: boolean;
}

export type Promo = Banner;

export interface Category {
  title: string;
  text?: string;
  icon: string;
  href: string;
  size: "big" | "small";
  width: number;
  height: number;
}

export interface TopGame {
  title: string;
  image: string;
  alt?: string;
}

export interface Game {
  title: string;
  image: string;
  tag?: string;
  meta?: string;
  alt?: string;
}

export interface WinGame {
  title: string;
  image: string;
  cat: string;
  tag: string;
  amount?: string;
  player?: string;
  time?: string;
}

export interface GamesData {
  topGames: TopGame[];
  originals: Game[];
  hot: Game[];
  slots: Game[];
  live: Game[];
  bingo: Game[];
  wins: WinGame[];
}

export interface MatchTeam {
  name: string;
  flag?: string;
}

export interface Match {
  sport: "Cricket" | "Football" | "Tennis";
  country: string;
  league: string;
  time: string;
  date: string;
  home: MatchTeam;
  away: MatchTeam;
  odds: { home: string; draw?: string; away: string };
  more?: string;
}

export interface DemoAccount {
  name: string;
  logo: string;
  sites: { label: string; href: string }[];
  id: string;
  password: string;
}

export interface Payment {
  name: string;
  image: string;
  modifier: string;
  width: number;
  height: number;
}

export interface Sections {
  odds: {
    title: string;
    tabsLabel: string;
    tabs: { label: string; icon: string; value: string }[];
    backLabel: string;
    layLabel: string;
  };
  topGames: { title: string };
  steps: { title: string; cta: string };
  demo: {
    title: string;
    flipHint: string;
    copyHint: string;
    idLabel: string;
    passwordLabel: string;
    copyIdLabel: string;
    copyPasswordLabel: string;
    cta: string;
    toastIdCopied: string;
    toastPasswordCopied: string;
    toastCopyFailed: string;
  };
  originals: { title: string; more: { label: string; sub: string } };
  hot: { title: string; more: { label: string; sub: string } };
  payments: { title: string; whatsapp: string; cta: string };
  wins: {
    title: string;
    filtersLabel: string;
    filters: { label: string; value: string }[];
  };
  join: {
    title: string;
    highlight: string;
    text: string;
    whatsapp: string;
    telegram: string;
  };
  slots: { title: string; more: { label: string; sub: string } };
  liveCasino: { title: string; more: { label: string; sub: string } };
  idCta: { title: string; text: string; whatsapp: string; telegram: string };
  bingo: { title: string };
  faq: { title: string };
  seo: { title: string; readMore: string; readLess: string };
}

export interface Step {
  icon: string;
  title: string;
  text: string;
}

export interface TrustItem {
  icon: string;
  title: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export type SeoBlock =
  | { type: "p" | "h3" | "h4"; text: string }
  | { type: "ul" | "ol"; bullets: string[] }
  | { type: "why"; points: { bold: string; text: string }[] };

export interface SeoDoc {
  lead: string;
  blocks: SeoBlock[];
}
