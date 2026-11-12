"use client";

import { useApp } from "@/components/Providers";

export default function SideScrim() {
  const { sidebarOpen, closeSidebar } = useApp();
  return (
    <div
      className={`side-scrim${sidebarOpen ? " open" : ""}`}
      id="sideScrim"
      onClick={closeSidebar}
    />
  );
}
