import { site } from "@/lib/data";
import { asset, resolveHref } from "@/lib/helpers";
import Icon from "@/components/ui/Icon";
import BackToTopButton from "@/components/ui/BackToTopButton";

export default function Footer() {
  const footer = site.footer;

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="brand" href="#top" aria-label={`${site.brand.name} home`}>
              <img
                className="brand-logo"
                src={asset(site.brand.logo)}
                alt=""
                width={1080}
                height={1156}
              />
              <span className="brand-type">
                <strong>
                  {site.brand.wordOne} <em>{site.brand.wordTwo}</em>
                </strong>
                <small>{site.brand.tag}</small>
              </span>
            </a>
            <p>{footer.about}</p>
            <div className="footer-social" aria-label={footer.socialLabel}>
              {footer.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={item.label}
                >
                  <Icon name={item.icon ?? "globe"} />
                </a>
              ))}
            </div>
          </div>
          {footer.columns.map((column) => (
            <div className="footer-col" id={column.id} key={column.title}>
              <h4>{column.title}</h4>
              {column.links.map((link) => {
                const href = resolveHref(link);
                const external = href.startsWith("http");
                return (
                  <a
                    key={link.label}
                    href={href}
                    {...(link.support ? { "data-support": true } : {})}
                    {...(link.hrefKey
                      ? { "data-contact": link.hrefKey === "telegram" ? "telegram" : "whatsapp" }
                      : {})}
                    {...(external ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          ))}
        </div>

        <div className="footer-payments" aria-label={footer.paymentLabel}>
          {footer.paymentLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-badges" aria-label={footer.badgesLabel}>
            {footer.badges.map((badge) => (
              <img
                key={badge.src}
                src={asset(badge.src)}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                loading="lazy"
              />
            ))}
          </div>
          <div className="footer-legal">
            <strong>{footer.legal.copyright}</strong>
            <span>{footer.legal.rights}</span>
            <span>{footer.legal.age}</span>
            {footer.legal.links.map((link) => (
              <a key={link.label} href={resolveHref(link)}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <p className="footer-disclaimer">{footer.disclaimer}</p>

        <div className="footer-top-row">
          <BackToTopButton className="back-to-top" label={footer.backToTop} />
        </div>
      </div>
    </footer>
  );
}
