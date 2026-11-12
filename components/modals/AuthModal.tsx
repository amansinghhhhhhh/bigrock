"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/data";
import { asset } from "@/lib/helpers";
import { useApp } from "@/components/Providers";
import Icon from "@/components/ui/Icon";

export default function AuthModal({ open }: { open: boolean }) {
  const { authMode, closeModals, showToast } = useApp();
  const [tab, setTab] = useState<"login" | "signup">(authMode);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) setTab(authMode);
  }, [open, authMode]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      const target = panelRef.current?.querySelector<HTMLInputElement>(
        'input:not([type="hidden"]), select',
      );
      target?.focus({ preventScroll: true });
    }, 70);
    return () => window.clearTimeout(timer);
  }, [open, tab]);

  return (
    <div
      className={`modal-backdrop${open ? " open" : ""}`}
      id="authModal"
      role="dialog"
      aria-modal="true"
      aria-label="Big Rock account"
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
            <div className="auth-tabs" role="tablist" aria-label="Account access">
              <button
                className={`auth-tab${tab === "login" ? " active" : ""}`}
                type="button"
                role="tab"
                aria-selected={tab === "login"}
                data-auth-tab="login"
                onClick={() => setTab("login")}
              >
                Log in
              </button>
              <button
                className={`auth-tab${tab === "signup" ? " active" : ""}`}
                type="button"
                role="tab"
                aria-selected={tab === "signup"}
                data-auth-tab="signup"
                onClick={() => setTab("signup")}
              >
                Create account
              </button>
            </div>

            <div className={`auth-panel${tab === "login" ? " active" : ""}`} id="loginPanel" role="tabpanel">
              <h3>Welcome back.</h3>
              <form
                id="loginForm"
                onSubmit={(event) => {
                  event.preventDefault();
                  closeModals();
                  showToast("Welcome back to Big Rock. You are logged in.");
                }}
              >
                <div className="field">
                  <label htmlFor="loginId">Mobile number</label>
                  <input
                    id="loginId"
                    name="loginId"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="98765 43210"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="loginPass">
                    Password{" "}
                    <a
                      href="#"
                      data-toast="Password reset instructions will appear here."
                      onClick={(event) => event.preventDefault()}
                    >
                      Forgot?
                    </a>
                  </label>
                  <input
                    id="loginPass"
                    name="loginPass"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Your password"
                    required
                  />
                </div>
                <button className="btn btn-gold btn-block" type="submit">
                  Log in to Big Rock <Icon name="arrow-right" />
                </button>
              </form>
              <div className="or-line">or get instant help on</div>
              <div className="social-row social-row--contact">
                <a
                  className="social-btn social-btn-wa"
                  href={site.contact.whatsappSupport}
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

            <div className={`auth-panel${tab === "signup" ? " active" : ""}`} id="signupPanel" role="tabpanel">
              <h3>Join the rock.</h3>
              <p className="modal-sub">30 seconds to sign up. Your welcome pack is waiting.</p>
              <form
                id="signupForm"
                onSubmit={(event) => {
                  event.preventDefault();
                  closeModals();
                  showToast("Account created. Check your inbox or SMS to verify and play.");
                }}
              >
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
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="signupPass">Password</label>
                    <input
                      id="signupPass"
                      name="signupPass"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Min. 8 characters"
                      minLength={8}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="signupCurrency">Currency</label>
                    <select id="signupCurrency" name="signupCurrency" defaultValue="INR ₹">
                      <option>INR ₹</option>
                      <option>USD $</option>
                      <option>USDT</option>
                    </select>
                  </div>
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
              <p className="swap-line">
                Already have an account?{" "}
                <button
                  type="button"
                  data-auth-tab="login"
                  onClick={() => setTab("login")}
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
