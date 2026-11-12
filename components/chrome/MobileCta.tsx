import { site } from "@/lib/data";
import Icon from "@/components/ui/Icon";

export default function MobileCta() {
  return (
    <div className="mobile-cta" aria-label="Quick contact">
      <a
        className="mobile-cta-btn mobile-cta-wa"
        href={site.contact.whatsapp}
        data-contact="whatsapp"
        target="_blank"
        rel="noopener"
      >
        <Icon name="whatsapp" />
        {site.header.whatsappLabel}
      </a>
      <a
        className="mobile-cta-btn mobile-cta-tg"
        href={site.contact.telegram}
        data-contact="telegram"
        target="_blank"
        rel="noopener"
      >
        <Icon name="telegram" />
        {site.floatCta.telegram}
      </a>
    </div>
  );
}
