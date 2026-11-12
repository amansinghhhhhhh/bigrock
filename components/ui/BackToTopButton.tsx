"use client";

import Icon from "@/components/ui/Icon";

export default function BackToTopButton({
  className,
  label,
  withLabel = true,
}: {
  className: string;
  label: string;
  withLabel?: boolean;
}) {
  return (
    <button
      className={className}
      type="button"
      data-back-to-top
      aria-label={label}
      title={label}
      onClick={() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }}
    >
      <Icon name="arrow-right" />
      {withLabel ? label : null}
    </button>
  );
}
