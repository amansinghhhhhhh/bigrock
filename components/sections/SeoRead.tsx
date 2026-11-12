"use client";

import { useState } from "react";
import { sections, seo } from "@/lib/data";
import Icon from "@/components/ui/Icon";

export default function SeoRead() {
  const [open, setOpen] = useState(false);
  const label = open ? sections.seo.readLess : sections.seo.readMore;

  return (
    <section className="section seo-read" id="seo-guide" aria-labelledby="seo-read-title">
      <div className="seo-read-head">
        <h2 id="seo-read-title">{sections.seo.title}</h2>
        <p className="seo-read-lead">{seo.lead}</p>
      </div>
      <div className={`seo-read-body${open ? " is-open" : ""}`} id="seoReadBody">
        <div className="seo-read-inner">
          {seo.blocks.map((block, index) => {
            if (block.type === "p") return <p key={index}>{block.text}</p>;
            if (block.type === "h3") return <h3 key={index}>{block.text}</h3>;
            if (block.type === "h4") return <h4 key={index}>{block.text}</h4>;
            if (block.type === "ul") {
              return (
                <ul key={index}>
                  {block.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            if (block.type === "ol") {
              return (
                <ol key={index}>
                  {block.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              );
            }
            if (block.type === "why") {
              return (
                <ul className="seo-read-why" key={index}>
                  {block.points.map((item) => (
                    <li key={item.bold}>
                      <b>{item.bold}</b>
                      {item.text}
                    </li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </div>
      </div>
      <button
        className={`btn btn-ghost seo-read-toggle${open ? " is-open" : ""}`}
        type="button"
        id="seoReadToggle"
        aria-expanded={open}
        aria-controls="seoReadBody"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="seo-read-label">{label}</span>
        <Icon name="chev-right" className="ico seo-read-chev" />
      </button>
    </section>
  );
}
