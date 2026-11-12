"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { site } from "@/lib/data";
import type { Theme } from "@/lib/types";

type ModalName = "auth" | "search" | "support" | null;
type AuthMode = "login" | "signup";

interface AppContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  sidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  modal: ModalName;
  authMode: AuthMode;
  openAuth: (mode?: AuthMode) => void;
  openSearch: () => void;
  openSupport: () => void;
  closeModals: () => void;
  showToast: (message: string) => void;
  toastMessage: string;
  toastVisible: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside Providers");
  return context;
}

export default function Providers({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState<ModalName>(null);
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const applyTheme = useCallback((next: Theme, persist = true) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute(
        "content",
        next === "light" ? site.meta.themeColorLight : site.meta.themeColor,
      );
    }
    if (persist) {
      try {
        localStorage.setItem("br-theme", next);
      } catch {
        /* storage may be blocked */
      }
    }
  }, []);

  useEffect(() => {
    const saved = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    applyTheme(saved, false);
  }, [applyTheme]);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  const openAuth = useCallback((mode: AuthMode = "signup") => {
    setAuthMode(mode);
    setSidebarOpen(false);
    setModal("auth");
  }, []);

  const openSearch = useCallback(() => {
    setSidebarOpen(false);
    setModal("search");
  }, []);

  const openSupport = useCallback(() => {
    setSidebarOpen(false);
    setModal("support");
  }, []);

  const closeModals = useCallback(() => setModal(null), []);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "light" ? "dark" : "light");
  }, [applyTheme, theme]);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;

      const authTrigger = target.closest("[data-auth]");
      if (authTrigger) {
        event.preventDefault();
        openAuth(authTrigger.getAttribute("data-auth") === "login" ? "login" : "signup");
        return;
      }

      const supportTrigger = target.closest("[data-support]");
      if (supportTrigger) {
        event.preventDefault();
        openSupport();
        return;
      }

      const toastTrigger = target.closest("[data-toast]");
      if (toastTrigger) {
        event.preventDefault();
        showToast(toastTrigger.getAttribute("data-toast") || "Coming soon.");
      }
    };

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, [openAuth, openSupport, showToast]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (modal) setModal(null);
        else setSidebarOpen(false);
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [modal, openSearch]);

  useEffect(() => {
    const locked = modal !== null || sidebarOpen;
    document.body.classList.toggle("no-scroll", locked);
  }, [modal, sidebarOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1100) setSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      theme,
      setTheme: (next) => applyTheme(next === "light" ? "light" : "dark"),
      toggleTheme,
      sidebarOpen,
      openSidebar: () => setSidebarOpen(true),
      closeSidebar,
      toggleSidebar: () => setSidebarOpen((open) => !open),
      modal,
      authMode,
      openAuth,
      openSearch,
      openSupport,
      closeModals,
      showToast,
      toastMessage,
      toastVisible,
    }),
    [
      theme,
      applyTheme,
      toggleTheme,
      sidebarOpen,
      closeSidebar,
      modal,
      authMode,
      openAuth,
      openSearch,
      openSupport,
      closeModals,
      showToast,
      toastMessage,
      toastVisible,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
