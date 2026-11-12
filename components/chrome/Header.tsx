"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/components/Providers";
import Icon from "@/components/ui/Icon";
import { asset } from "@/lib/helpers";
import { site } from "@/lib/data";

export default function Header() {
  const { theme, toggleTheme, toggleSidebar, openSearch, openAuth, sidebarOpen } = useApp();
  const [openSub, setOpenSub] = useState<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(event.target as Node)) setOpenSub(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenSub(null);
    };
    const onResize = () => {
      if (window.innerWidth <= 1100) setOpenSub(null);
    };
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header className="site-header" id="top">
      <div className="header-inner">
        <button
          className="icon-btn menu-toggle"
          id="menuToggle"
          aria-label={site.header.menuLabel}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          onClick={toggleSidebar}
        >
          <Icon name="menu" />
        </button>
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
        <nav className="main-nav" aria-label="Main navigation" ref={navRef}>
          <ul className="nav-menu">
            {site.header.nav.map((item, index) => {
              const hasSub = Boolean(item.sub?.length);
              return (
                <li
                  key={`${item.label}-${index}`}
                  className={[
                    "nav-menu__item",
                    item.active ? "is-active" : "",
                    hasSub ? "has-sub" : "",
                    hasSub && openSub === index ? "open" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <a
                    className={item.active ? "active" : undefined}
                    href={item.href}
                    aria-current={item.active ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                  {hasSub ? (
                    <>
                      <button
                        className="nav-menu__toggle"
                        type="button"
                        aria-expanded={openSub === index}
                        aria-label={`Open ${item.label} submenu`}
                        aria-controls={`mainSub-${index}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpenSub(openSub === index ? null : index);
                        }}
                      >
                        <Icon name="chev-right" className="ico nav-caret" />
                      </button>
                      <ul className="nav-submenu" id={`mainSub-${index}`}>
                        {item.sub?.map((sub) => (
                          <li key={sub.label}>
                            <a href={sub.href} onClick={() => setOpenSub(null)}>
                              {sub.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="header-actions">
          <button
            className="icon-btn search-btn"
            id="searchOpen"
            aria-label={site.header.searchLabel}
            onClick={openSearch}
          >
            <Icon name="search" />
          </button>
          <button
            className="icon-btn theme-toggle"
            data-theme-toggle
            type="button"
            aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
            aria-pressed={theme === "light"}
            onClick={toggleTheme}
          >
            <Icon name="moon" className="ico theme-moon" />
            <Icon name="sun" className="ico theme-sun" />
          </button>
          <button className="btn btn-ghost login" data-auth="login" onClick={() => openAuth("login")}>
            {site.header.loginLabel}
          </button>
          <a
            className="btn btn-gold header-wa"
            href={site.contact.whatsapp}
            data-contact="whatsapp"
            target="_blank"
            rel="noopener"
          >
            <Icon name="whatsapp" />
            <span className="wa-full">{site.header.whatsappLabel}</span>
            <span className="wa-short">{site.header.whatsappShort}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
