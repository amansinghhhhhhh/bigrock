import type { ReactNode } from "react";

export default function SectionHead({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-head">
      <div className="section-head-copy">
        <h2 id={id}>{title}</h2>
      </div>
      {children ? <div className="section-tools">{children}</div> : null}
    </div>
  );
}
