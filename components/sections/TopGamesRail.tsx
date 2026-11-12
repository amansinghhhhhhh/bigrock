"use client";

import { useEffect, useRef } from "react";
import { games, sections } from "@/lib/data";
import RailButtons from "@/components/ui/RailButtons";
import SectionHead from "./SectionHead";
import { TopGameCard } from "./GameCards";

export default function TopGamesRail() {
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const baseCount = games.topGames.length;
    const cards = Array.from(rail.children).slice(0, baseCount) as HTMLElement[];
    let paused = false;
    let setWidth = 0;
    let frame = 0;

    const measure = () => {
      const first = cards[0];
      const last = cards[cards.length - 1];
      if (!first || !last) return 0;
      return last.getBoundingClientRect().right - first.getBoundingClientRect().left;
    };

    const onResize = () => {
      setWidth = measure();
    };

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };

    setWidth = measure();
    window.addEventListener("resize", onResize);
    rail.addEventListener("pointerenter", onEnter);
    rail.addEventListener("pointerleave", onLeave);
    rail.addEventListener("focusin", onEnter);
    rail.addEventListener("focusout", onLeave);

    const tick = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      if (!paused && max > 0) {
        if (setWidth <= 0) setWidth = measure();
        let next = rail.scrollLeft + 0.5;
        if (setWidth > 0 && next >= setWidth) next -= setWidth;
        if (next > max) next = Math.max(0, next - setWidth);
        rail.scrollLeft = next;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      rail.removeEventListener("pointerenter", onEnter);
      rail.removeEventListener("pointerleave", onLeave);
      rail.removeEventListener("focusin", onEnter);
      rail.removeEventListener("focusout", onLeave);
    };
  }, []);

  return (
    <section className="section" id="top-games" aria-labelledby="top-games-title">
      <SectionHead id="top-games-title" title={sections.topGames.title}>
        <RailButtons
          railId="topGamesRail"
          prevLabel="Previous top games"
          nextLabel="Next top games"
        />
      </SectionHead>
      <div className="rail-wrap">
        <div className="rail" id="topGamesRail" data-step="card" ref={railRef}>
          {games.topGames.map((game, index) => (
            <TopGameCard game={game} key={`${game.title}-${index}`} />
          ))}
          {games.topGames.map((game, index) => (
            <TopGameCard game={game} clone key={`clone-${game.title}-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
