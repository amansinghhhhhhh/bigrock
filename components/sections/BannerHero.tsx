"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { banners, site } from "@/lib/data";
import { asset } from "@/lib/helpers";
import Icon from "@/components/ui/Icon";

export default function BannerHero() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduceMotion = useRef(false);
  const touchStart = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const stop = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const step = useCallback((direction: number) => {
    setIndex((current) => {
      const total = banners.length;
      return ((current + direction) % total + total) % total;
    });
  }, []);

  const start = useCallback(() => {
    stop();
    if (reduceMotion.current || banners.length < 2) return;
    timer.current = setInterval(() => step(1), 5500);
  }, [step, stop]);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    start();
    return stop;
  }, [start, stop]);

  return (
    <section className="banner" aria-label="Big Rock Exchange offers">
      <h1 className="vh">{site.meta.h1}</h1>
      <div
        className="banner-viewport"
        ref={viewportRef}
        onMouseEnter={stop}
        onMouseLeave={() => {
          if (!viewportRef.current?.contains(document.activeElement)) start();
        }}
        onFocus={stop}
        onBlur={(event) => {
          if (!viewportRef.current?.contains(event.relatedTarget as Node)) start();
        }}
        onTouchStart={(event) => {
          touchStart.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const delta = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
          touchStart.current = null;
          if (Math.abs(delta) < 40) return;
          step(delta < 0 ? 1 : -1);
          start();
        }}
      >
        <div className="banner-track" id="bannerTrack">
          {banners.map((slide, slideIndex) => {
            const active = slideIndex === index;
            return (
              <a
                className={`banner-slide${active ? " is-on" : ""}`}
                href={slide.href}
                aria-label={slide.alt}
                aria-hidden={!active}
                tabIndex={active ? 0 : -1}
                key={`${slide.image}-${slideIndex}`}
              >
                <img
                  src={asset(slide.image)}
                  alt={slide.alt}
                  width={slide.width}
                  height={slide.height}
                  fetchPriority={slide.priority ? "high" : undefined}
                  loading={slide.priority ? undefined : "lazy"}
                />
              </a>
            );
          })}
        </div>
        <button
          type="button"
          className="banner-nav banner-nav-prev"
          id="bannerPrev"
          aria-label="Previous banner"
          onClick={() => {
            step(-1);
            start();
          }}
        >
          <Icon name="chev-left" />
        </button>
        <button
          type="button"
          className="banner-nav banner-nav-next"
          id="bannerNext"
          aria-label="Next banner"
          onClick={() => {
            step(1);
            start();
          }}
        >
          <Icon name="chev-right" />
        </button>
        <div className="banner-dots" id="bannerDots" role="group" aria-label="Choose banner">
          {banners.map((slide, dotIndex) => {
            const active = dotIndex === index;
            return (
              <button
                key={`dot-${slide.image}-${dotIndex}`}
                type="button"
                className={`banner-dot${active ? " is-on" : ""}`}
                aria-label={`Show banner ${dotIndex + 1}`}
                aria-current={active ? "true" : "false"}
                onClick={() => {
                  setIndex(dotIndex);
                  start();
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
