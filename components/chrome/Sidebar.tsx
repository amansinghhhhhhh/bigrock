"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/components/Providers";
import Icon from "@/components/ui/Icon";
import { site } from "@/lib/data";
import { asset, resolveHref } from "@/lib/helpers";

export default function Sidebar() {
  const { sidebarOpen, closeSidebar, theme, setTheme } = useApp();
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const sidebarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateActive = () => {
      const links = Array.from(
        sidebarRef.current?.querySelectorAll<HTMLAnchorElement>('.side-link[href^="#"]') ?? [],
      );
      const sections = links
        .map((link) => ({
          href: link.getAttribute("href") ?? "",
          target: document.querySelector<HTMLElement>(link.getAttribute("href") ?? ""),
        }))
        .filter((item) => item.target && item.target.id !== "top")
        .sort(
          (a, b) =>
            (a.target as HTMLElement).getBoundingClientRect().top +
            window.scrollY -
            ((b.target as HTMLElement).getBoundingClientRect().top + window.scrollY),
        );

      const marker = window.scrollY + 160;
      let current = "top";
      sections.forEach(({ target }) => {
        const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = (target as HTMLElement).id;
      });
      setActiveSection(current);
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };

    updateActive();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return;
    const activeLink = sidebarRef.current?.querySelector<HTMLAnchorElement>(".side-link.active");
    const group = activeLink?.closest(".side-group");
    if (!group) return;
    const groups = Array.from(sidebarRef.current?.querySelectorAll(".side-group") ?? []);
    setOpenGroup(groups.indexOf(group as Element));
  }, [sidebarOpen, activeSection]);

  const setSideCollapsed = (next: boolean) => {
    setCollapsed(next);
    document.body.classList.toggle("side-collapsed", next);
    window.setTimeout(() => window.dispatchEvent(new Event("resize")), 280);
  };

  const isActive = (href?: string): boolean => {
    if (!href) return false;
    if (activeSection === "top") return href === "#top";
    return href === `#${activeSection}`;
  };

  const isActiveInGroup = (items: { href?: string }[]): boolean =>
    items.some((item) => isActive(item.href));

  let activeClaimed = false;
  const linkActive = (href?: string): boolean => {
    if (!isActive(href)) return false;
    if (activeClaimed) return false;
    activeClaimed = true;
    return true;
  };

  return (
    <aside
      className={`sidebar${sidebarOpen ? " open" : ""}`}
      id="sidebar"
      aria-label="Site navigation"
      ref={sidebarRef}
    >
      <div className="side-mobile-head">
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
        <div className="side-head-actions">
          <button
            className="icon-btn theme-toggle"
            data-theme-toggle
            type="button"
            aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
            aria-pressed={theme === "light"}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Icon name="moon" className="ico theme-moon" />
            <Icon name="sun" className="ico theme-sun" />
          </button>
          <button className="icon-btn side-close" id="sideClose" aria-label="Close menu" onClick={closeSidebar}>
            <Icon name="close" />
          </button>
        </div>
      </div>

      <div className="side-bonus" id="promotions">
        <button
          className="side-rail-toggle"
          id="sideRailToggle"
          type="button"
          aria-label={collapsed ? site.sidebar.railToggle.expand : site.sidebar.railToggle.collapse}
          aria-expanded={!collapsed}
          title={collapsed ? site.sidebar.railToggle.expand : site.sidebar.railToggle.collapse}
          onClick={() => setSideCollapsed(!collapsed)}
        >
          <Icon name="menu" className="ico icon-menu" />
          <Icon name="close" className="ico icon-close" />
        </button>
        <img
          className="side-rock"
          src={asset(site.brand.logo)}
          alt=""
          aria-hidden="true"
          width={1080}
          height={1156}
        />
        <h3>
          {site.sidebar.bonus.title} <small>{site.sidebar.bonus.titleSmall}</small>
        </h3>
        <p>{site.sidebar.bonus.text}</p>
        <div className="side-cta-row">
          <a
            className="btn btn-gold btn-block"
            href={site.contact.whatsapp}
            data-contact="whatsapp"
            target="_blank"
            rel="noopener"
          >
            {site.sidebar.bonus.whatsappLabel}
          </a>
          <a
            className="btn btn-ghost btn-block"
            href={site.contact.telegram}
            data-contact="telegram"
            target="_blank"
            rel="noopener"
          >
            <Icon name="telegram" />
            {site.sidebar.bonus.telegramLabel}
          </a>
        </div>
      </div>

      <nav className="side-nav side-nav--home" aria-label="Quick links">
        <a
          className={`side-link${linkActive(site.sidebar.home.href) ? " active" : ""}`}
          href={site.sidebar.home.href}
          title={site.sidebar.home.label}
          onClick={() => {
            if (window.innerWidth <= 1100) closeSidebar();
          }}
        >
          <Icon name={site.sidebar.home.icon ?? "home"} />
          <span>{site.sidebar.home.label}</span>
        </a>
      </nav>

      <nav className="side-nav side-nav--groups" aria-label="Play">
        {site.sidebar.groups.map((group, groupIndex) => (
          <div
            key={group.label}
            className={`side-group${openGroup === groupIndex ? " is-open" : ""}`}
          >
            <button
              className={`side-group-toggle${isActiveInGroup(group.items) ? " has-active" : ""}`}
              id={`sideGroupToggle-${groupIndex}`}
              type="button"
              aria-expanded={openGroup === groupIndex}
              aria-controls={`sideGroupMenu-${groupIndex}`}
              title={`${group.label} menu`}
              onClick={() => {
                const next = openGroup === groupIndex ? null : groupIndex;
                setOpenGroup(next);
              }}
            >
              <Icon name={group.icon} />
              <span>{group.label}</span>
              <Icon name="chev-right" className="ico group-caret" />
            </button>
            <div
              className="side-subnav"
              id={`sideGroupMenu-${groupIndex}`}
              hidden={openGroup !== groupIndex}
            >
              {group.items.map((item) => (
                <a
                  key={item.label}
                  className={`side-link side-sub-link${linkActive(item.href) ? " active" : ""}`}
                  href={resolveHref(item)}
                  title={item.label}
                  onClick={() => {
                    if (window.innerWidth <= 1100) closeSidebar();
                  }}
                >
                  <Icon name={item.icon ?? "play"} />
                  <span>{item.label}</span>
                  <Icon name="chev-right" className="ico side-sub-arrow" />
                </a>
              ))}
            </div>
          </div>
        ))}
        {site.sidebar.links.map((link) => (
          <div className="side-group" key={link.label}>
            <a
              className={`side-link${linkActive(link.href) ? " active" : ""}`}
              href={resolveHref(link)}
              title={link.label}
              onClick={() => {
                if (window.innerWidth <= 1100) closeSidebar();
              }}
            >
              <Icon name={link.icon ?? "trophy"} />
              <span>{link.label}</span>
            </a>
          </div>
        ))}
      </nav>

      <nav className="side-nav side-nav--support" aria-label="Support">
        <a
          className="side-link side-support-link"
          href={resolveHref(site.sidebar.support)}
          data-contact="whatsapp"
          target="_blank"
          rel="noopener"
          title={site.sidebar.support.label}
        >
          <Icon name={site.sidebar.support.icon ?? "whatsapp"} />
          <span>{site.sidebar.support.label}</span>
        </a>
      </nav>

      <div className="side-seg" role="group" aria-label={site.sidebar.theme.groupLabel}>
        <button
          type="button"
          aria-pressed={theme === "dark"}
          onClick={() => setTheme("dark")}
        >
          {site.sidebar.theme.dark}
        </button>
        <button
          type="button"
          aria-pressed={theme === "light"}
          onClick={() => setTheme("light")}
        >
          {site.sidebar.theme.light}
        </button>
      </div>
    </aside>
  );
}
