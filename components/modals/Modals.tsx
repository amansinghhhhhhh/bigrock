"use client";

import { useApp } from "@/components/Providers";
import AuthModal from "./AuthModal";
import SearchModal from "./SearchModal";
import SupportModal from "./SupportModal";

export default function Modals() {
  const { modal } = useApp();

  return (
    <>
      <AuthModal open={modal === "auth"} />
      <SearchModal open={modal === "search"} />
      <SupportModal open={modal === "support"} />
    </>
  );
}
