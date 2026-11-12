"use client";

import Icon from "@/components/ui/Icon";

export default function RailButtons({
  railId,
  prevLabel,
  nextLabel,
}: {
  railId: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const scrollRail = (direction: number) => {
    const rail = document.getElementById(railId);
    if (!rail) return;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    const first = rail.firstElementChild as HTMLElement | null;
    const step =
      rail.dataset.step === "card" && first
        ? first.getBoundingClientRect().width + gap
        : Math.max(260, rail.clientWidth * 0.82);
    rail.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div className="rail-btns">
      <button
        className="rail-btn"
        type="button"
        data-rail={railId}
        data-dir="-1"
        aria-label={prevLabel}
        onClick={() => scrollRail(-1)}
      >
        <Icon name="chev-left" />
      </button>
      <button
        className="rail-btn"
        type="button"
        data-rail={railId}
        data-dir="1"
        aria-label={nextLabel}
        onClick={() => scrollRail(1)}
      >
        <Icon name="chev-right" />
      </button>
    </div>
  );
}
