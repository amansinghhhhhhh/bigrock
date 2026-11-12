import type { Game } from "@/lib/types";
import RailButtons from "@/components/ui/RailButtons";
import SectionHead from "./SectionHead";
import { GameCard, MoreCard } from "./GameCards";

interface GameRailProps {
  sectionId: string;
  railId: string;
  title: string;
  titleId?: string;
  games: Game[];
  variant?: "game" | "bingo";
  more?: { label: string; sub: string };
  prevLabel: string;
  nextLabel: string;
}

export default function GameRail({
  sectionId,
  railId,
  title,
  titleId,
  games,
  variant = "game",
  more,
  prevLabel,
  nextLabel,
}: GameRailProps) {
  const headingId = titleId ?? `${sectionId}-title`;

  return (
    <section className="section" id={sectionId} aria-labelledby={headingId}>
      <SectionHead id={headingId} title={title}>
        <RailButtons railId={railId} prevLabel={prevLabel} nextLabel={nextLabel} />
      </SectionHead>
      <div className="rail-wrap">
        <div className="rail" id={railId}>
          {games.map((game, index) =>
            variant === "bingo" ? (
              <GameCard game={{ ...game, tag: "Bingo" }} key={`${game.title}-${index}`} />
            ) : (
              <GameCard game={game} key={`${game.title}-${index}`} />
            ),
          )}
          {more ? <MoreCard label={more.label} sub={more.sub} /> : null}
        </div>
      </div>
    </section>
  );
}
