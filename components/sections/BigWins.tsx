"use client";

import { useEffect, useRef, useState } from "react";
import { games, sections } from "@/lib/data";
import RailButtons from "@/components/ui/RailButtons";
import SectionHead from "./SectionHead";
import { WinCard } from "./GameCards";

export default function BigWins() {
  const [filter, setFilter] = useState("all");
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    railRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [filter]);

  return (
    <section className="section" id="big-wins" aria-labelledby="wins-title">
      <SectionHead id="wins-title" title={sections.wins.title}>
        <div
          className="filter-tabs"
          role="group"
          aria-label={sections.wins.filtersLabel}
          data-filter-group="wins"
        >
          {sections.wins.filters.map((tab) => (
            <button
              className={`filter-tab${tab.value === filter ? " active" : ""}`}
              type="button"
              data-filter={tab.value}
              key={tab.value}
              onClick={() => setFilter(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <RailButtons
          railId="winsRail"
          prevLabel="Previous wins"
          nextLabel="Next wins"
        />
      </SectionHead>
      <div className="rail-wrap">
        <div className="rail rail-wins" id="winsRail" ref={railRef}>
          {games.wins.map((win, index) => (
            <WinCard
              win={win}
              hidden={filter !== "all" && win.cat !== filter}
              key={`${win.title}-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
