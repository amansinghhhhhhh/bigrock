"use client";

import { useRef, useState } from "react";
import { demoAccounts, sections } from "@/lib/data";
import type { DemoAccount } from "@/lib/types";
import { asset } from "@/lib/helpers";
import { useApp } from "@/components/Providers";
import SectionHead from "./SectionHead";

function CopyIcon() {
  return (
    <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="6" y="6" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function DemoCard({ account }: { account: DemoAccount }) {
  const { showToast } = useApp();
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState<"id" | "password" | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyValue = async (text: string, kind: "id" | "password") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(null), 2000);
      showToast(
        kind === "id" ? sections.demo.toastIdCopied : sections.demo.toastPasswordCopied,
      );
    } catch (error) {
      console.log("Copy failed:", error);
      showToast(sections.demo.toastCopyFailed);
    }
  };

  return (
    <article
      className={`demo-card${flipped ? " is-flipped" : ""}`}
      onClick={(event) => {
        if (window.matchMedia("(hover:hover)").matches) return;
        if ((event.target as Element).closest("a, button, .value")) return;
        setFlipped((current) => !current);
      }}
    >
      <div className="demo-card__flip">
        <div className="demo-face demo-face--front">
          <div className="demo-img">
            <img
              src={asset(account.logo)}
              alt={`${account.name} logo`}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="demo-info">
            <h3>{account.name}</h3>
            <div className="demo-websites">
              {account.sites.map((entry, index) => (
                <span key={entry.href}>
                  {index > 0 ? <span className="demo-sep"> · </span> : null}
                  <a
                    className="demo-website"
                    href={entry.href}
                    target="_blank"
                    rel="noopener"
                    title={`Open ${entry.label} in a new tab`}
                  >
                    {entry.label}
                  </a>
                </span>
              ))}
            </div>
            <span className="flip-hint">{sections.demo.flipHint}</span>
          </div>
        </div>
        <div className="demo-face demo-face--back">
          <div className="demo-back-sites">
            {account.sites.map((entry) => (
              <a
                className="demo-back-site"
                href={entry.href}
                target="_blank"
                rel="noopener"
                title={`Open ${entry.label} in a new tab`}
                key={entry.href}
              >
                {entry.label}
              </a>
            ))}
          </div>
          <div className="demo-creds">
            <div className="demo-cred">
              <span className="label">{sections.demo.idLabel}</span>
              <span
                className="value"
                data-copy={account.id}
                aria-label="Click to copy"
                onClick={() => copyValue(account.id, "id")}
              >
                {account.id}
              </span>
              <button
                className={`copy-btn${copied === "id" ? " is-copied" : ""}`}
                data-copy={account.id}
                aria-label={sections.demo.copyIdLabel}
                title={sections.demo.copyIdLabel}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  copyValue(account.id, "id");
                }}
              >
                <CopyIcon />
              </button>
            </div>
            <div className="demo-cred">
              <span className="label">{sections.demo.passwordLabel}</span>
              <span
                className="value"
                data-copy={account.password}
                aria-label="Click to copy"
                onClick={() => copyValue(account.password, "password")}
              >
                {account.password}
              </span>
              <button
                className={`copy-btn${copied === "password" ? " is-copied" : ""}`}
                data-copy={account.password}
                aria-label={sections.demo.copyPasswordLabel}
                title={sections.demo.copyPasswordLabel}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  copyValue(account.password, "password");
                }}
              >
                <CopyIcon />
              </button>
            </div>
          </div>
          <p className="demo-back-hint">{sections.demo.copyHint}</p>
        </div>
      </div>
      <a className="btn btn-gold btn-block" href="#join" data-auth="signup">
        {sections.demo.cta}
      </a>
    </article>
  );
}

export default function DemoAccounts() {
  return (
    <section className="section" id="demo-accounts" aria-labelledby="demo-title">
      <SectionHead id="demo-title" title={sections.demo.title} />
      <div className="demo-grid">
        {demoAccounts.map((account) => (
          <DemoCard account={account} key={account.name} />
        ))}
      </div>
    </section>
  );
}
