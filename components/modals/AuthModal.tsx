"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/data";
import { asset } from "@/lib/helpers";
import { useApp } from "@/components/Providers";
import Icon from "@/components/ui/Icon";

export default function AuthModal({ open }: { open: boolean }) {
  const { closeModals, showToast } = useApp();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      const target = panelRef.current?.querySelector<HTMLInputElement>(
        'input:not([type="hidden"]), select',
      );
      target?.focus({ preventScroll: true });
    }, 70);
    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <div
      className={`modal-backdrop${open ? " open" : ""}`}
      id="authModal"
      role="dialog"
      aria-modal="true"
      aria-label="Big Rock registration"
      aria-hidden={!open}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeModals();
      }}
    >
      <div className="modal modal-auth">
        <button className="modal-close" type="button" onClick={closeModals} aria-label="Close dialog">
          <Icon name="close" />
        </button>
        <div className="auth-grid">
          <aside className="auth-aside">
            <img
              className="auth-aside-art"
              src={asset("Form Image/01.png")}
              alt="Big Rock welcome offer"
              width={1092}
              height={1441}
            />
          </aside>
          <div className="auth-main" ref={panelRef}>
            <div className="auth-panel active" id="signupPanel">
              <h3>Join the rock.</h3>
              <p className="modal-sub">30 seconds to sign up. Your welcome pack is waiting.</p>
              <form
                id="signupForm"
                onSubmit={(event) => {
                  event.preventDefault();
                  closeModals();
                  showToast("Thanks! Your registration details have been received.");
                }}
              >
                <div className="field">
                  <label htmlFor="signupName">Name</label>
                  <input
                    id="signupName"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="signupId">Mobile number</label>
                  <input
                    id="signupId"
                    name="signupId"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="98765 43210"
                    required
                  />
                </div>
                <label className="checkline">
                  <input type="checkbox" required />
                  <span>
                    I&apos;m 18 or older and agree to the <a href="#faq">Terms</a>,{" "}
                    <a href="#faq">Privacy Policy</a> and responsible-play rules.
                  </span>
                </label>
                <button className="btn btn-gold btn-block" type="submit">
                  Create my account <Icon name="spark" />
                </button>
              </form>
              <div className="or-line">or get your ID on</div>
              <div className="social-row social-row--contact">
                <a
                  className="social-btn social-btn-wa"
                  href={site.contact.whatsapp}
                  data-contact="whatsapp"
                  target="_blank"
                  rel="noopener"
                >
                  <Icon name="whatsapp" />
                  WhatsApp Now
                </a>
                <a
                  className="social-btn social-btn-tg"
                  href={site.contact.telegram}
                  data-contact="telegram"
                  target="_blank"
                  rel="noopener"
                >
                  <Icon name="telegram" />
                  Join Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
