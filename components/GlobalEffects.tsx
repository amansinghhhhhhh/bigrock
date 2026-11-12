"use client";

import { useEffect } from "react";

export default function GlobalEffects() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");

    const syncHeader = () => {
      header?.classList.toggle("scrolled", window.scrollY > 8);
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });

    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let observer: IntersectionObserver | null = null;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("in");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
      );

      reveals.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
        if (inView) element.classList.add("in");
        else observer?.observe(element);
      });
    } else {
      reveals.forEach((element) => element.classList.add("in"));
    }

    const failSafe = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.in)")
        .forEach((element) => element.classList.add("in"));
    }, 2600);

    const footer = document.querySelector(".site-footer");
    let footerObserver: IntersectionObserver | null = null;
    if (footer && "IntersectionObserver" in window) {
      footerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            document.body.classList.toggle("footer-in-view", entry.isIntersecting);
          });
        },
        { rootMargin: "0px 0px 100px 0px", threshold: 0.01 },
      );
      footerObserver.observe(footer);
    }

    return () => {
      window.removeEventListener("scroll", syncHeader);
      observer?.disconnect();
      footerObserver?.disconnect();
      window.clearTimeout(failSafe);
      document.body.classList.remove("footer-in-view");
    };
  }, []);

  return null;
}
