import type { Metadata, Viewport } from "next";
import { faqs, site } from "@/lib/data";
import { asset } from "@/lib/helpers";
import Providers from "@/components/Providers";
import Sprite from "@/components/ui/Sprite";
import Announcement from "@/components/chrome/Announcement";
import Header from "@/components/chrome/Header";
import Sidebar from "@/components/chrome/Sidebar";
import SideScrim from "@/components/chrome/SideScrim";
import Footer from "@/components/chrome/Footer";
import FloatCta from "@/components/chrome/FloatCta";
import MobileCta from "@/components/chrome/MobileCta";
import Modals from "@/components/modals/Modals";
import Toast from "@/components/Toast";
import GlobalEffects from "@/components/GlobalEffects";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: site.meta.title,
  description: site.meta.description,
  keywords: site.meta.keywords,
  authors: [{ name: site.meta.author }],
  robots: { index: true, follow: true, "max-image-preview": "large" },
  icons: {
    icon: asset(site.brand.favicon),
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.brand.name,
    title: site.meta.ogTitle,
    description: site.meta.ogDescription,
    images: [{ url: asset(site.meta.ogImage) }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.twitterTitle,
    description: site.meta.twitterDescription,
    images: [asset(site.meta.ogImage)],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: site.meta.themeColor,
};

const themeScript = `
(function(){
  document.documentElement.classList.add('js');
  try {
    var savedTheme = localStorage.getItem('br-theme');
    var theme = savedTheme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '${site.meta.themeColorLight}' : '${site.meta.themeColor}');
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.brand.name,
      description: site.meta.organizationDescription,
      logo: asset(site.brand.logo),
    },
    {
      "@type": "WebSite",
      name: site.brand.name,
      inLanguage: site.meta.websiteLanguage,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Sprite />
          <Announcement />
          <Header />
          <div className="page-shell">
            <Sidebar />
            <SideScrim />
            <main id="main">{children}</main>
            <Footer />
          </div>
          <FloatCta />
          <MobileCta />
          <Modals />
          <Toast />
          <GlobalEffects />
        </Providers>
      </body>
    </html>
  );
}
