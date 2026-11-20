"use client";

import { useEffect, useRef, useState } from "react";
import { matches, sections } from "@/lib/data";
import type { Match } from "@/lib/types";
import { asset } from "@/lib/helpers";
import SectionHead from "./SectionHead";

const round2 = (value: number) => Math.round(value * 100) / 100;
const fmt2 = (value: number) => value.toFixed(2);
const jitter = (price: string | number) => {
  const base = parseFloat(String(price));
  if (!Number.isFinite(base)) return 1.5;
  return Math.min(99, Math.max(1.01, round2(base + (Math.random() - 0.5) * 0.2)));
};

function Flag({ code }: { code: string }) {
  return (
    <img
      className="odds-flag"
      src={asset(`flags/${code}.png`)}
      alt=""
      width={40}
      height={30}
      loading="lazy"
      decoding="async"
      onError={(event) => {
        const image = event.currentTarget;
        image.onerror = null;
        image.src = `https://flagcdn.com/w40/${code}.png`;
      }}
    />
  );
}

function Pair({ label, price }: { label: string; price?: string }) {
  if (price == null) {
    return (
      <div className="odds-pair">
        <div className="odds-cell odds-cell--empty">–</div>
        <div className="odds-cell odds-cell--empty">–</div>
      </div>
    );
  }

  return (
    <div className="odds-pair" data-base={price}>
      <button
        type="button"
        className="odds-cell odds-back"
        data-auth="signup"
        aria-label={`Back ${label}`}
      >
        {fmt2(parseFloat(price))}
      </button>
      <button
        type="button"
        className="odds-cell odds-lay"
        data-auth="signup"
        aria-label={`Lay ${label}`}
      >
        {fmt2(parseFloat(price) + 0.06)}
      </button>
    </div>
  );
}

function OddsCard({ match }: { match: Match }) {
  const homeFlag = match.home.flag ?? "";
  const awayFlag = match.away.flag ?? "";
  const teamFlags = Boolean(homeFlag && awayFlag && homeFlag !== awayFlag);

  return (
    <article className="odds-card">
      <div className="odds-card-head">
        <span className="odds-sport">{match.sport}</span>
        <span className="odds-kick">{match.league}</span>
      </div>
      <div className="odds-teams">
        <div className="odds-team">
          {teamFlags ? <Flag code={homeFlag} /> : null}
          <b title={match.home.name}>{match.home.name}</b>
        </div>
        <span className="odds-vs">VS</span>
        <div className="odds-team odds-team--away">
          <b title={match.away.name}>{match.away.name}</b>
          {teamFlags ? <Flag code={awayFlag} /> : null}
        </div>
      </div>
      <div className="odds-board">
        <div className="odds-head">
          <span>1</span>
          <span>X</span>
          <span>2</span>
        </div>
        <div className="odds-row odds-row--prices">
          <Pair label={match.home.name} price={match.odds.home} />
          <Pair label="draw" price={match.odds.draw} />
          <Pair label={match.away.name} price={match.odds.away} />
        </div>
      </div>
      <div className="odds-legend">
        <i className="odds-sw odds-sw--back" />
        {sections.odds.backLabel}
        <i className="odds-sw odds-sw--lay" />
        {sections.odds.layLabel}
      </div>
    </article>
  );
}

export default function InplayOdds() {
  const [activeSport, setActiveSport] = useState("Cricket");
  const gridRef = useRef<HTMLDivElement | null>(null);

  const visibleMatches = matches.filter((match) => match.sport === activeSport).slice(0, 3);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const refresh = () => {
      const grid = gridRef.current;
      if (!grid) return;
      grid.querySelectorAll<HTMLElement>(".odds-pair[data-base]").forEach((pair) => {
        const base = parseFloat(pair.dataset.base ?? "");
        if (!Number.isFinite(base)) return;
        const back = jitter(base);
        const lay = Math.min(99, round2(back + 0.02 + Math.random() * 0.08));
        const buttons = pair.querySelectorAll<HTMLButtonElement>("button.odds-cell");
        if (buttons[0]) buttons[0].textContent = fmt2(back);
        if (buttons[1]) buttons[1].textContent = fmt2(lay);
      });
    };

    const schedule = () => {
      timer = setTimeout(() => {
        if (cancelled) return;
        refresh();
        schedule();
      }, 5000 + Math.random() * 5000);
    };

    schedule();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [activeSport]);

  return (
    <section className="section" id="odds" aria-labelledby="odds-title">
      <SectionHead id="odds-title" title={sections.odds.title}>
        <div className="odds-tabs" role="tablist" aria-label={sections.odds.tabsLabel}>
          {sections.odds.tabs.map((tab) => {
            const active = tab.value === activeSport;
            return (
              <button
                key={tab.value}
                className={`odds-tab${active ? " is-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={active}
                data-odds-tab={tab.value}
                onClick={() => setActiveSport(tab.value)}
              >
                <i aria-hidden="true">{tab.icon}</i>
                {tab.label}
              </button>
            );
          })}
        </div>
      </SectionHead>
      <div className="odds-grid" id="oddsGrid" ref={gridRef}>
        {visibleMatches.map((match, index) => (
          <OddsCard match={match} key={`${match.league}-${match.home.name}-${index}`} />
        ))}
      </div>
    </section>
  );
}
