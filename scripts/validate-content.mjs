import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = join(root, "content");
const publicDir = join(root, "public");

const errors = [];
const warnings = [];
const assetChecks = [];

const readJson = (file) => JSON.parse(readFileSync(join(contentDir, file), "utf8"));

const text = z.string().trim().min(1);
const optionalText = z.string().optional();
const optionalHref = z.string().optional();
const count = z.number().int().positive();
const imagePath = z.string().trim().min(1);
const href = z.string().trim().min(1);

const navLink = z
  .object({
    label: text,
    href: optionalHref,
    hrefKey: z.enum(["whatsapp", "whatsappSupport", "telegram"]).optional(),
    icon: optionalText,
    support: z.boolean().optional(),
    active: z.boolean().optional(),
    sub: z.array(z.lazy(() => navLink)).optional(),
  })
  .passthrough();

const siteSchema = z
  .object({
    brand: z
      .object({
        name: text,
        wordOne: text,
        wordTwo: text,
        tag: text,
        logo: imagePath,
        favicon: imagePath,
      })
      .passthrough(),
    contact: z
      .object({
        whatsapp: z.string().url(),
        whatsappSupport: z.string().url(),
        telegram: z.string().url(),
      })
      .passthrough(),
    meta: z
      .object({
        title: text,
        description: text,
        keywords: text,
        author: text,
        h1: text,
        ogTitle: text,
        ogDescription: text,
        ogImage: imagePath,
        twitterTitle: text,
        twitterDescription: text,
        themeColor: text,
        themeColorLight: text,
        organizationDescription: text,
        websiteLanguage: text,
      })
      .passthrough(),
    announcement: z
      .object({
        label: text,
        items: z
          .array(
            z.object({
              text: text,
              highlight: optionalText,
              suffix: optionalText,
            }),
          )
          .min(1),
      })
      .passthrough(),
    header: z
      .object({
        loginLabel: text,
        searchLabel: text,
        menuLabel: text,
        whatsappLabel: text,
        whatsappShort: text,
        nav: z.array(navLink).min(1),
      })
      .passthrough(),
    sidebar: z
      .object({
        home: navLink,
        groups: z
          .array(
            z.object({
              label: text,
              icon: text,
              items: z.array(navLink).min(1),
            }),
          )
          .min(1),
        links: z.array(navLink),
        support: navLink,
      })
      .passthrough(),
    footer: z
      .object({
        about: text,
        social: z.array(navLink),
        columns: z
          .array(
            z.object({
              title: text,
              id: optionalText,
              links: z.array(navLink).min(1),
            }),
          )
          .min(1),
        badges: z.array(
          z.object({
            src: imagePath,
            alt: text,
            width: count,
            height: count,
          }),
        ),
        legal: z.object({
          copyright: text,
          rights: text,
          age: text,
          links: z.array(navLink),
        }),
        disclaimer: text,
        backToTop: text,
      })
      .passthrough(),
  })
  .passthrough();

const bannerSchema = z.array(
  z.object({
    image: imagePath,
    alt: text,
    href,
    width: count,
    height: count,
    priority: z.boolean().optional(),
  }),
);

const promoFields = bannerSchema.element.omit({ priority: true });
const promoSchema = z.array(promoFields);

const categorySchema = z.array(
  z.object({
    title: text,
    text: optionalText,
    icon: imagePath,
    href,
    size: z.enum(["big", "small"]),
    width: count,
    height: count,
  }),
);

const gameItem = z.object({
  title: text,
  image: imagePath,
  tag: optionalText,
  meta: optionalText,
  alt: optionalText,
});

const winItem = z.object({
  title: text,
  image: imagePath,
  cat: text,
  tag: text,
  amount: optionalText,
  player: optionalText,
  time: optionalText,
});

const gamesSchema = z.object({
  topGames: z
    .array(z.object({ title: text, image: imagePath, alt: optionalText }))
    .min(1),
  originals: z.array(gameItem).min(1),
  hot: z.array(gameItem).min(1),
  slots: z.array(gameItem).min(1),
  live: z.array(gameItem).min(1),
  bingo: z.array(gameItem).min(1),
  wins: z.array(winItem).min(1),
});

const matchSchema = z.array(
  z.object({
    sport: z.enum(["Cricket", "Football", "Tennis"]),
    country: text,
    league: text,
    time: text,
    date: text,
    home: z.object({ name: text, flag: optionalText }),
    away: z.object({ name: text, flag: optionalText }),
    odds: z.object({
      home: text,
      draw: optionalText,
      away: text,
    }),
    more: optionalText,
  }),
);

const demoAccountSchema = z.array(
  z.object({
    name: text,
    logo: imagePath,
    sites: z
      .array(
        z.object({
          label: text,
          href: z.string().url(),
        }),
      )
      .min(1),
    id: text,
    password: text,
  }),
);

const paymentSchema = z.array(
  z.object({
    name: text,
    image: imagePath,
    modifier: text,
    width: count,
    height: count,
  }),
);

const sectionsSchema = z
  .object({
    odds: z.object({
      title: text,
      tabsLabel: text,
      tabs: z
        .array(z.object({ label: text, icon: text, value: text }))
        .min(1),
      backLabel: text,
      layLabel: text,
    }),
    topGames: z.object({ title: text }),
    steps: z.object({ title: text, cta: text }),
    demo: z.object({
      title: text,
      flipHint: text,
      copyHint: text,
      idLabel: text,
      passwordLabel: text,
      copyIdLabel: text,
      copyPasswordLabel: text,
      cta: text,
      toastIdCopied: text,
      toastPasswordCopied: text,
      toastCopyFailed: text,
    }),
    originals: z.object({
      title: text,
      more: z.object({ label: text, sub: text }),
    }),
    hot: z.object({
      title: text,
      more: z.object({ label: text, sub: text }),
    }),
    payments: z.object({ title: text, whatsapp: text, cta: text }),
    wins: z.object({
      title: text,
      filtersLabel: text,
      filters: z
        .array(z.object({ label: text, value: text }))
        .min(1),
    }),
    join: z.object({
      title: text,
      highlight: text,
      text: text,
      whatsapp: text,
      telegram: text,
    }),
    slots: z.object({
      title: text,
      more: z.object({ label: text, sub: text }),
    }),
    liveCasino: z.object({
      title: text,
      more: z.object({ label: text, sub: text }),
    }),
    idCta: z.object({
      title: text,
      text: text,
      whatsapp: text,
      telegram: text,
    }),
    bingo: z.object({ title: text }),
    faq: z.object({ title: text }),
    seo: z.object({ title: text, readMore: text, readLess: text }),
  })
  .passthrough();

const stepsSchema = z
  .array(z.object({ icon: text, title: text, text: text }))
  .min(1);

const trustSchema = z
  .array(
    z.object({
      icon: z.enum(["fast", "secure", "play", "support", "mobile", "responsible"]),
      title: text,
    }),
  )
  .min(1);

const faqSchema = z
  .array(z.object({ question: text, answer: text }))
  .min(1);

const seoBlockSchema = z.union([
  z.object({ type: z.enum(["p", "h3", "h4"]), text: text }),
  z.object({ type: z.enum(["ul", "ol"]), bullets: z.array(text).min(1) }),
  z.object({
    type: z.literal("why"),
    points: z
      .array(z.object({ bold: text, text: text }))
      .min(1),
  }),
]);

const seoSchema = z.object({
  lead: text,
  blocks: z.array(seoBlockSchema).min(1),
});

const files = [
  ["site.json", siteSchema],
  ["banners.json", bannerSchema],
  ["promos.json", promoSchema],
  ["categories.json", categorySchema],
  ["games.json", gamesSchema],
  ["matches.json", matchSchema],
  ["demo-accounts.json", demoAccountSchema],
  ["payments.json", paymentSchema],
  ["sections.json", sectionsSchema],
  ["steps.json", stepsSchema],
  ["trust.json", trustSchema],
  ["faqs.json", faqSchema],
  ["seo.json", seoSchema],
];

const parsed = {};

for (const [file, schema] of files) {
  let data;
  try {
    data = readJson(file);
    if (data && !Array.isArray(data) && Array.isArray(data.items)) {
      data = data.items;
    }
  } catch (error) {
    errors.push(`${file}: could not read/parse JSON — ${error.message}`);
    continue;
  }

  const result = schema.safeParse(data);
  if (!result.success) {
    for (const issue of result.error.issues) {
      const path = issue.path.length ? issue.path.join(".") : "(root)";
      errors.push(`${file}: ${path} — ${issue.message}`);
    }
    continue;
  }
  parsed[file] = result.data;
}

const checkAsset = (label, path) => {
  if (!path || /^(https?:)?\/\//.test(path) || path.startsWith("data:")) return;
  assetChecks.push({ label, path });
};

const site = parsed["site.json"];
if (site) {
  checkAsset("brand logo", site.brand.logo);
  checkAsset("favicon", site.brand.favicon);
  checkAsset("Open Graph image", site.meta.ogImage);
  site.footer.badges.forEach((badge, index) =>
    checkAsset(`footer badge ${index + 1}`, badge.src),
  );
}

parsed["banners.json"]?.forEach((item, index) =>
  checkAsset(`banner ${index + 1}`, item.image),
);
parsed["promos.json"]?.forEach((item, index) =>
  checkAsset(`promo ${index + 1}`, item.image),
);
parsed["categories.json"]?.forEach((item, index) =>
  checkAsset(`category ${index + 1}`, item.icon),
);
parsed["demo-accounts.json"]?.forEach((item, index) =>
  checkAsset(`demo account ${index + 1}`, item.logo),
);
parsed["payments.json"]?.forEach((item, index) =>
  checkAsset(`payment ${index + 1}`, item.image),
);

const games = parsed["games.json"];
if (games) {
  games.topGames.forEach((item, index) =>
    checkAsset(`top game ${index + 1}`, item.image),
  );
  ["originals", "hot", "slots", "live", "bingo", "wins"].forEach((key) => {
    games[key].forEach((item, index) =>
      checkAsset(`${key} game ${index + 1}`, item.image),
    );
  });
}

for (const asset of assetChecks) {
  const filePath = join(publicDir, decodeURIComponent(asset.path.replace(/^\//, "")));
  if (!existsSync(filePath)) {
    errors.push(`Missing asset for ${asset.label}: public/${asset.path}`);
  }
}

if (site) {
  Object.entries(site.contact).forEach(([key, value]) => {
    if (value.includes("XXXXXXXXXX")) {
      warnings.push(
        `contact.${key} still contains the placeholder "91XXXXXXXXXX" — update it in content/site.json before launch.`,
      );
    }
  });
}

for (const warning of warnings) console.warn(`⚠ ${warning}`);

if (errors.length) {
  console.error(`\nContent validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`  ✖ ${error}`);
  process.exit(1);
}

console.log(
  `✓ Content valid — ${files.length} JSON files, ${assetChecks.length} image references checked.`,
);
if (warnings.length) {
  console.log(`⚠ ${warnings.length} warning(s) — see above.`);
}
