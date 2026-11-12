import { sections, steps } from "@/lib/data";
import Icon from "@/components/ui/Icon";
import SectionHead from "./SectionHead";

export default function Steps() {
  return (
    <section className="section" aria-labelledby="steps-title">
      <SectionHead id="steps-title" title={sections.steps.title} />
      <div className="steps">
        {steps.map((step) => (
          <div className="step" key={step.title}>
            <div className="step-img">
              <Icon name={step.icon} />
            </div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
      <div className="steps-cta">
        <a className="btn btn-gold" href="#join" data-auth="signup">
          {sections.steps.cta} <Icon name="arrow-right" />
        </a>
      </div>
    </section>
  );
}
