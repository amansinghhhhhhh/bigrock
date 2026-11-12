"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/components/Providers";
import Icon from "@/components/ui/Icon";

type ChatMessage = { type: "bot" | "user"; text: string };

const botReply = (message: string): string => {
  const lower = message.toLowerCase();
  if (lower.includes("withdraw") || lower.includes("payout")) {
    return "Verified accounts can request withdrawals from the cashier. Most requests are processed quickly; bank credit time depends on your provider.";
  }
  if (lower.includes("deposit") || lower.includes("upi") || lower.includes("pay")) {
    return "We support UPI, Paytm, PhonePe, Google Pay, cards and selected crypto. Deposits show in your INR wallet after confirmation.";
  }
  if (lower.includes("limit") || lower.includes("responsible") || lower.includes("break")) {
    return "Head to Account → Responsible Play to set deposit limits or take a time out. If you need a hand, a specialist can help.";
  }
  return "Thanks for reaching out. A Big Rock specialist will pick this up shortly. You can also browse the help centre linked in the footer.";
};

export default function SupportModal({ open }: { open: boolean }) {
  const { closeModals } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: "bot", text: "Hey, welcome to Big Rock. How can we help today?" },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 90);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    return () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    };
  }, []);

  const send = (value: string) => {
    const clean = value.trim();
    if (!clean) return;
    setMessages((current) => [...current, { type: "user", text: clean }]);
    setInput("");
    if (replyTimer.current) clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => {
      setMessages((current) => [...current, { type: "bot", text: botReply(clean) }]);
    }, 650);
  };

  return (
    <div
      className={`modal-backdrop${open ? " open" : ""}`}
      id="supportModal"
      role="dialog"
      aria-modal="true"
      aria-label="Big Rock support"
      aria-hidden={!open}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeModals();
      }}
    >
      <div className="modal support-modal">
        <button className="modal-close" type="button" onClick={closeModals} aria-label="Close support">
          <Icon name="close" />
        </button>
        <div className="support-head">
          <span className="support-avatar">
            <Icon name="headset" />
          </span>
          <div>
            <h3>Big Rock support</h3>
            <p>
              <span className="pulse" /> Online now · usually replies in under a minute
            </p>
          </div>
        </div>
        <div className="chat-window" id="chatWindow" aria-live="polite" ref={chatRef}>
          {messages.map((message, index) => (
            <div className={`chat-msg ${message.type}`} key={index}>
              {message.text}
              <small>{message.type === "user" ? "You" : "Support"} · just now</small>
            </div>
          ))}
        </div>
        <form
          className="chat-form"
          id="supportForm"
          onSubmit={(event) => {
            event.preventDefault();
            send(input);
          }}
        >
          <input
            id="chatInput"
            type="text"
            placeholder="Type a message…"
            autoComplete="off"
            aria-label="Message support"
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit" aria-label="Send message">
            <Icon name="send" />
          </button>
        </form>
        <div className="chat-quick">
          {[
            { label: "Withdrawals", prompt: "How do I withdraw?" },
            { label: "Deposits", prompt: "Which UPI methods can I use?" },
            { label: "Responsible play", prompt: "How do I set a deposit limit?" },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              data-chat-prompt={item.prompt}
              onClick={() => {
                send(item.prompt);
                inputRef.current?.focus();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="chat-help">This is a design preview. Support messages are simulated.</p>
      </div>
    </div>
  );
}
