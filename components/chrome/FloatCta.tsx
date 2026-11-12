"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";
import Icon from "@/components/ui/Icon";

export default function FloatCta() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const sync = () => setShowTop(window.scrollY > 420);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  return (
    <div className="float-cta" aria-label="Quick contact">
      <button
        className={`float-top${showTop ? " is-on" : ""}`}
        type="button"
        data-back-to-top
        aria-label={site.floatCta.backToTop}
        title={site.floatCta.backToTop}
        onClick={() => {
          const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
        }}
      >
        <Icon name="arrow-right" />
      </button>
      <a
        className="float-pill float-pill-wa"
        href={site.contact.whatsapp}
        data-contact="whatsapp"
        target="_blank"
        rel="noopener"
      >
        <span className="float-pill-ico">
          <Icon name="whatsapp" />
        </span>
        <span className="float-pill-label">{site.floatCta.whatsapp}</span>
      </a>
    </div>
  );
}
