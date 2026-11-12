"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { searchPool } from "@/lib/data";
import { asset } from "@/lib/helpers";
import { useApp } from "@/components/Providers";
import Icon from "@/components/ui/Icon";

export default function SearchModal({ open }: { open: boolean }) {
  const { closeModals, openAuth, showToast } = useApp();
  const [term, setTerm] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setTerm("");
    const timer = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 80);
    return () => window.clearTimeout(timer);
  }, [open]);

  const matches = useMemo(() => {
    const query = term.trim().toLowerCase();
    return searchPool
      .filter((game) => !query || game.title.toLowerCase().includes(query))
      .slice(0, query ? 8 : 6);
  }, [term]);

  const chooseGame = (title: string) => {
    closeModals();
    openAuth("signup");
    window.setTimeout(
      () => showToast(`${title} is ready on the floor. Create an account to play.`),
      120,
    );
  };

  return (
    <div
      className={`modal-backdrop${open ? " open" : ""}`}
      id="searchModal"
      role="dialog"
      aria-modal="true"
      aria-label="Search Big Rock games"
      aria-hidden={!open}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeModals();
      }}
    >
      <div className="modal search-modal">
        <button className="modal-close" type="button" onClick={closeModals} aria-label="Close search">
          <Icon name="close" />
        </button>
        <h3 style={{ marginTop: 8 }}>Find your next game. Search the floor.</h3>
        <p className="modal-sub">Search slots, live tables and Big Rock Originals.</p>
        <div className="search-bar">
          <Icon name="search" />
          <input
            id="searchInput"
            type="search"
            placeholder="Try “Crash”, “roulette” or “Fortune”"
            autoComplete="off"
            ref={inputRef}
            value={term}
            onChange={(event) => setTerm(event.target.value)}
          />
        </div>
        <div className="search-results" id="searchResults">
          {matches.length === 0 ? (
            <div className="search-empty">
              No games found. Try “Crash”, “roulette” or “Fortune”.
            </div>
          ) : (
            matches.map((game) => (
              <a
                key={`${game.title}-${game.image}`}
                className="search-result"
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  chooseGame(game.title);
                }}
              >
                <img
                  src={asset(game.image)}
                  alt=""
                  width={70}
                  height={88}
                  loading="lazy"
                  decoding="async"
                />
                <span>
                  <b>{game.title}</b>
                  <small>
                    {game.tag || ("meta" in game ? game.meta : "") || "Big Rock game"}
                  </small>
                </span>
                <span className="res-arrow">
                  <Icon name="arrow-right" />
                </span>
              </a>
            ))
          )}
        </div>
        <p className="search-hint">Showing games across the Big Rock floor.</p>
      </div>
    </div>
  );
}
