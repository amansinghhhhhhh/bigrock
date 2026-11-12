"use client";

import { useEffect, useRef } from "react";
import { promos } from "@/lib/data";
import { asset } from "@/lib/helpers";
import Icon from "@/components/ui/Icon";

export default function PromoSlider() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const track = slider.querySelector<HTMLElement>(".promo-track");
    const slides = Array.from(slider.querySelectorAll<HTMLElement>(".promo-slide"));
    if (!track || slides.length < 2) return;

    let index = 0;
    let timer = 0;
    const visible = () => (window.innerWidth <= 640 ? 1 : 2);
    const maxIndex = () => Math.max(0, slides.length - visible());

    const render = () => {
      index = Math.min(index, maxIndex());
      track.style.transform = `translateX(${-slides[index].offsetLeft}px)`;
    };

    const step = (direction: number) => {
      const max = maxIndex();
      index = direction > 0 ? (index >= max ? 0 : index + 1) : index <= 0 ? max : index - 1;
      render();
    };

    const start = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      window.clearInterval(timer);
      timer = window.setInterval(() => step(1), 4500);
    };

    const navs = Array.from(slider.querySelectorAll<HTMLElement>(".promo-nav"));
    const onNavClick = (event: Event) => {
      const button = event.currentTarget as HTMLElement;
      step(Number(button.dataset.promoDir));
      start();
    };

    const stop = () => window.clearInterval(timer);
    navs.forEach((nav) => nav.addEventListener("click", onNavClick));
    slider.addEventListener("pointerenter", stop);
    slider.addEventListener("pointerleave", start);
    window.addEventListener("resize", render);

    render();
    start();

    return () => {
      window.clearInterval(timer);
      navs.forEach((nav) => nav.removeEventListener("click", onNavClick));
      slider.removeEventListener("pointerenter", stop);
      slider.removeEventListener("pointerleave", start);
      window.removeEventListener("resize", render);
    };
  }, []);

  return (
    <section className="section" aria-label="Offers">
      <div className="promo-slider" aria-label="Offers" ref={sliderRef}>
        <div className="promo-viewport">
          <div className="promo-track">
            {promos.map((promo) => (
              <a className="promo-slide" href={promo.href} key={promo.image}>
                <img
                  src={asset(promo.image)}
                  alt={promo.alt}
                  width={promo.width}
                  height={promo.height}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </div>
        </div>
        <button
          className="promo-nav promo-nav-prev"
          type="button"
          data-promo-dir="-1"
          aria-label="Previous offers"
        >
          <Icon name="chev-left" />
        </button>
        <button
          className="promo-nav promo-nav-next"
          type="button"
          data-promo-dir="1"
          aria-label="Next offers"
        >
          <Icon name="chev-right" />
        </button>
      </div>
    </section>
  );
}
