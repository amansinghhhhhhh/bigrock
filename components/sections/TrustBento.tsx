import { trust } from "@/lib/data";
import TrustIcon from "./TrustIcon";

export default function TrustBento() {
  return (
    <section className="section trust-section" id="why" aria-label="Why Big Rock Exchange">
      <div className="trust-bento">
        {trust.map((item) => (
          <article className={`trust-card trust-card--${item.icon}`} key={item.icon}>
            <span className="trust-icon">
              <TrustIcon name={item.icon} />
            </span>
            <div className="trust-copy">
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
