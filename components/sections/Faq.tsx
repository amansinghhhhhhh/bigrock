import { faqs, sections } from "@/lib/data";
import SectionHead from "./SectionHead";

export default function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <SectionHead id="faq-title" title={sections.faq.title} />
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <details className="faq-item" open={index === 0} key={faq.question}>
            <summary>
              <span className="faq-num">{String(index + 1).padStart(2, "0")}</span>
              <span className="faq-q">{faq.question}</span>
            </summary>
            <div className="faq-answer">{faq.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
