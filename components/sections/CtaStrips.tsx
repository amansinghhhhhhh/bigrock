import { sections, site } from "@/lib/data";
import { asset } from "@/lib/helpers";
import Icon from "@/components/ui/Icon";

export function JoinStrip() {
  return (
    <section className="cta-strip" id="join" aria-labelledby="join-title">
      <img
        className="rock-cta"
        src={asset(site.brand.logo)}
        alt=""
        aria-hidden="true"
        width={1080}
        height={1156}
      />
      <div className="cta-copy">
        <h2 id="join-title">
          {sections.join.title}
          <span>{sections.join.highlight}</span>
        </h2>
        <p>{sections.join.text}</p>
      </div>
      <div className="cta-actions">
        <a
          className="btn btn-gold"
          href={site.contact.whatsapp}
          data-contact="whatsapp"
          target="_blank"
          rel="noopener"
        >
          <Icon name="whatsapp" />
          {sections.join.whatsapp}
        </a>
        <a
          className="btn btn-ghost"
          href={site.contact.telegram}
          data-contact="telegram"
          target="_blank"
          rel="noopener"
        >
          <Icon name="telegram" />
          {sections.join.telegram}
        </a>
      </div>
    </section>
  );
}

export function IdCta() {
  return (
    <section className="section id-cta" aria-labelledby="id-cta-title">
      <div className="id-cta-glow" aria-hidden="true" />
      <div className="id-cta-copy">
        <h2 id="id-cta-title">{sections.idCta.title}</h2>
        <p>{sections.idCta.text}</p>
      </div>
      <div className="id-cta-actions">
        <a
          className="btn btn-gold"
          href={site.contact.whatsapp}
          data-contact="whatsapp"
          target="_blank"
          rel="noopener"
        >
          <Icon name="whatsapp" />
          {sections.idCta.whatsapp}
        </a>
        <a
          className="btn btn-ghost"
          href={site.contact.telegram}
          data-contact="telegram"
          target="_blank"
          rel="noopener"
        >
          <Icon name="telegram" />
          {sections.idCta.telegram}
        </a>
      </div>
    </section>
  );
}
