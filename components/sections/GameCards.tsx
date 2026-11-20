import type { Game, TopGame, WinGame } from "@/lib/types";
import { site } from "@/lib/data";
import { asset } from "@/lib/helpers";
import Icon from "@/components/ui/Icon";

export function GameCard({ game }: { game: Game }) {
  return (
    <a
      className="game-card reveal"
      href={site.contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      data-contact="whatsapp"
      data-title={game.title}
    >
      <div className="game-art">
        <img
          src={asset(game.image)}
          alt={`${game.title} artwork`}
          width={960}
          height={1280}
          loading="lazy"
          decoding="async"
        />
        <span className="game-tag">{game.tag || "Play"}</span>
        <span className="game-play" aria-hidden="true">
          <span>
            <Icon name="play" fill />
          </span>
        </span>
      </div>
    </a>
  );
}

export function TopGameCard({ game, clone = false }: { game: TopGame; clone?: boolean }) {
  return (
    <a
      className={`game-card game-card--top${clone ? "" : " reveal"}`}
      href={site.contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      data-contact="whatsapp"
      data-title={game.title}
      aria-hidden={clone || undefined}
      tabIndex={clone ? -1 : undefined}
    >
      <div className="game-art">
        <img
          src={asset(game.image)}
          alt={game.alt ?? game.title}
          width={440}
          height={310}
          loading="lazy"
          decoding="async"
        />
        <span className="game-play" aria-hidden="true">
          <span>
            <Icon name="play" fill />
          </span>
        </span>
      </div>
    </a>
  );
}

export function MoreCard({ label, sub }: { label: string; sub: string }) {
  return (
    <a
      className="game-card game-card--more reveal"
      href={site.contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      data-contact="whatsapp"
    >
      <div className="game-art">
        <span className="more-inner">
          <span className="more-plus">
            <Icon name="plus" />
          </span>
          <b>{label}</b>
          <small>{sub}</small>
        </span>
      </div>
    </a>
  );
}

export function WinCard({ win, hidden = false }: { win: WinGame; hidden?: boolean }) {
  return (
    <a
      className={`win-card reveal${hidden ? " is-hidden" : ""}`}
      href={site.contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      data-contact="whatsapp"
      data-cat={win.cat}
      data-title={win.title}
    >
      <div className="win-art">
        <img
          src={asset(win.image)}
          alt={`${win.title} artwork`}
          width={960}
          height={1280}
          loading="lazy"
          decoding="async"
        />
        <span className="win-top">
          <span className="win-badge">
            <i />
            {win.tag}
          </span>
        </span>
      </div>
    </a>
  );
}
