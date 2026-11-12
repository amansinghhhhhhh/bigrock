import { Fragment } from "react";
import { site } from "@/lib/data";

function AnnouncementGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <span className="announce-group" aria-hidden={hidden || undefined}>
      {site.announcement.items.map((item, index) => (
        <Fragment key={index}>
          <span>
            {item.text}
            {item.highlight ? <b>{item.highlight}</b> : null}
            {item.suffix}
          </span>
          <span className="announce-sep" aria-hidden="true">
            ·
          </span>
        </Fragment>
      ))}
    </span>
  );
}

export default function Announcement() {
  return (
    <div className="announce">
      <div className="announce-inner">
        <div className="announce-center announce-ticker" aria-label={site.announcement.label}>
          <div className="announce-marquee">
            <div className="announce-track">
              <AnnouncementGroup />
              <AnnouncementGroup hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
