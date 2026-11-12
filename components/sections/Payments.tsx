import { payments, sections, site } from "@/lib/data";
import { asset } from "@/lib/helpers";
import Icon from "@/components/ui/Icon";

export default function Payments() {
  return (
    <section className="section" id="payments" aria-labelledby="payments-title">
      <div className="cashier">
        <div className="cashier-copy">
          <h2 id="payments-title">{sections.payments.title}</h2>
        </div>
        <div className="cashier-cta">
          <a
            className="btn btn-gold"
            href={site.contact.whatsapp}
            data-contact="whatsapp"
            target="_blank"
            rel="noopener"
          >
            <Icon name="whatsapp" />
            {sections.payments.whatsapp}
          </a>
          <a className="btn btn-ghost" href="#join" data-auth="signup">
            {sections.payments.cta}
          </a>
        </div>
        <div className="pay-grid">
          {payments.map((payment) => (
            <div className={`pay-tile pay-tile--${payment.modifier}`} key={payment.name}>
              <img
                src={asset(payment.image)}
                alt={payment.name}
                width={payment.width}
                height={payment.height}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
