"use client";

import { useApp } from "@/components/Providers";
import Icon from "@/components/ui/Icon";

export default function Toast() {
  const { toastMessage, toastVisible } = useApp();

  return (
    <div className={`toast${toastVisible ? " show" : ""}`} id="toast" role="status" aria-live="polite">
      <Icon name="check" />
      <span id="toastText">{toastMessage}</span>
    </div>
  );
}
