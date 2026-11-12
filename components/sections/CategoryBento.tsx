import { categories } from "@/lib/data";
import { asset } from "@/lib/helpers";

export default function CategoryBento() {
  return (
    <section className="section" id="casino" aria-label="Casino & Sportsbook">
      <div className="cat-grid cat-grid-icon">
        {categories.map((card) => (
          <a
            className={`cat-card ${card.size === "big" ? "cat-big" : "cat-small"}`}
            href={card.href}
            key={card.title}
          >
            <span className="cat-icon">
              <img
                src={asset(card.icon)}
                alt=""
                width={card.width}
                height={card.height}
                loading="lazy"
              />
            </span>
            <div className="cat-copy">
              <h3>{card.title}</h3>
              {card.text ? <p>{card.text}</p> : null}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
