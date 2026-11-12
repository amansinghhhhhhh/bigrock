const spriteMarkup = `
    <defs>
    <linearGradient id="rockGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff0b3"/>
      <stop offset=".38" stop-color="#ffc247"/>
      <stop offset=".78" stop-color="#f1a01a"/>
      <stop offset="1" stop-color="#c97806"/>
    </linearGradient>
    <linearGradient id="rockLight" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff8d8"/>
      <stop offset="1" stop-color="#ffcd58"/>
    </linearGradient>
  </defs>
  <symbol id="brand-rock" viewBox="0 0 48 48">
    <path d="M23.7 2.6 38.8 9.2l6.4 14.5-6 16.5L23.4 46 8.2 39.3 2.4 24.4 8.9 8.5Z" fill="url(#rockGold)"/>
    <path d="m23.7 2.6 15.1 6.6-7.3 13.7-8.2-4.5-9.4 7.2L8.9 8.5Z" fill="url(#rockLight)" opacity=".48"/>
    <path d="m8.2 39.3 15.2 6.7 6.1-16.6-11.5-6.5Z" fill="#a55205" opacity=".67"/>
    <path d="m31.5 22.9 13.7.8-6 16.5-10.2-5.7Z" fill="#743501" opacity=".65"/>
    <path d="M17.9 22.9h13.6l3 23.1-11.1-1-10.8-6.3Z" fill="#ffd764" opacity=".76"/>
    <path d="m15.4 17.1 16.1-5.8-.8 13-12.8-1.6Z" fill="#ffe28a" opacity=".54"/>
    <path d="m6.3 14.9 5.8 14.5 5.8-12.3-4.1-8.6Z" fill="#fff6cf" opacity=".2"/>
  </symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.8"/><path d="m20 20-4.2-4.2"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></symbol>
  <symbol id="i-arrow-up-right" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></symbol>
  <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M4 12h16m-6-6 6 6-6 6"/></symbol>
  <symbol id="i-chev-left" viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></symbol>
  <symbol id="i-chev-right" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></symbol>
  <symbol id="i-play" viewBox="0 0 24 24"><path d="M8 5.5v13L19 12Z"/></symbol>
  <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 4v16M4 12h16"/></symbol>
  <symbol id="i-send" viewBox="0 0 24 24"><path d="m21 3-7.6 18-3.3-7.1L3 10.6Z"/><path d="M10.1 13.9 21 3"/></symbol>
  <symbol id="i-whatsapp" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.05-.52-.099-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488"/></symbol>
  <symbol id="i-telegram" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></symbol>
  <symbol id="i-home" viewBox="0 0 24 24"><path d="m3 10.4 9-7.4 9 7.4v9.1a1.5 1.5 0 0 1-1.5 1.5h-4.7v-6.8H9.2V21H4.5A1.5 1.5 0 0 1 3 19.5Z"/></symbol>
  <symbol id="i-dice" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="3.5"/><circle cx="8.5" cy="8.5" r=".9" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r=".9" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r=".9" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r=".9" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r=".9" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-live" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="3"/><path d="m8 3 4 3 4-3M8 12h.01M16 12h.01"/><path d="M8.5 16h7"/></symbol>
  <symbol id="i-ball" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.7"/><path d="M5.5 6.5c2.5 1.3 4.2 3.8 4.6 6.8M18.5 6.5c-2.5 1.3-4.2 3.8-4.6 6.8M6.2 17.8c1.1-2.8 3.2-4.8 5.8-5.8 2.6 1 4.7 3 5.8 5.8"/></symbol>
  <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.7"/><path d="M3.4 9h17.2M3.4 15h17.2M12 3.3c2.4 2.4 3.7 5.5 3.7 8.7s-1.3 6.3-3.7 8.7c-2.4-2.4-3.7-5.5-3.7-8.7S9.6 5.7 12 3.3Z"/></symbol>
  <symbol id="i-trophy" viewBox="0 0 24 24"><path d="M8 4h8v5a4 4 0 0 1-8 0Z"/><path d="M8 5H4v2a4 4 0 0 0 4 4M16 5h4v2a4 4 0 0 1-4 4M12 13v5M8 21h8M9 18h6"/></symbol>
  <symbol id="i-rocket" viewBox="0 0 24 24"><path d="M14.5 4.5c3.5-1.5 5.5-.5 5-5-1 .5-4 1.5-7.5 4.5l-2 3-4 1-2.5 3 4 1 1 4 3-2.5 1-4Z"/><path d="m8.5 15.5-3 3M7 13l-3-1M11 17l1 3"/></symbol>
  <symbol id="i-slot" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M8 14h.01M12 14h.01M16 14h.01"/></symbol>
  <symbol id="i-ticket" viewBox="0 0 24 24"><path d="M3 8.5A2.5 2.5 0 0 0 5.5 6h13A2.5 2.5 0 0 0 21 8.5v1a2.5 2.5 0 0 0 0 5v1a2.5 2.5 0 0 0-2.5 2.5h-13A2.5 2.5 0 0 0 3 15.5v-1a2.5 2.5 0 0 0 0-5Z"/><path d="M14 7v10" stroke-dasharray="2 3"/></symbol>
  <symbol id="i-bingo" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/><circle cx="6" cy="6" r="1.1" fill="currentColor" stroke="none"/><circle cx="18" cy="18" r="1.1" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-star" viewBox="0 0 24 24"><path d="m12 3 2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.6 6.7 19.5l1.1-6-4.4-4.2 6-.8Z"/></symbol>
  <symbol id="i-spark" viewBox="0 0 24 24"><path d="m12 2 2.1 7.9L22 12l-7.9 2.1L12 22l-2.1-7.9L2 12l7.9-2.1Z"/></symbol>
  <symbol id="i-bolt" viewBox="0 0 24 24"><path d="M13 2 4.5 13H11l-1 9L19.5 11H13Z"/></symbol>
  <symbol id="i-gamepad" viewBox="0 0 24 24"><path d="M7.2 8h9.6a4.5 4.5 0 0 1 4.4 5.4l-.8 3.9a3 3 0 0 1-5.2 1.5L13.9 17h-3.8l-1.3 1.8a3 3 0 0 1-5.2-1.5l-.8-3.9A4.5 4.5 0 0 1 7.2 8Z"/><path d="M7.6 11v4M5.6 13h4M15.7 12h.01M18.1 14h.01"/></symbol>
  <symbol id="i-flame" viewBox="0 0 24 24"><path d="M12 3c2 3 5 4.9 5 9a5 5 0 0 1-10 0c0-2 1-3.5 2.3-5 .2 1.5 1 2.4 2 2.8C11.8 7.6 11.7 5.2 12 3Z"/></symbol>
  <symbol id="i-cards" viewBox="0 0 24 24"><rect x="8" y="4" width="11" height="15" rx="2.5"/><rect x="5" y="6" width="11" height="15" rx="2.5"/></symbol>
  <symbol id="i-lock" viewBox="0 0 24 24"><rect x="4.5" y="10" width="15" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14.5v2.5"/></symbol>
  <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 2.5 20 6v5.2c0 5-3.2 8.4-8 10.3-4.8-1.9-8-5.3-8-10.3V6Z"/><path d="m8.7 12 2.2 2.2 4.5-4.5"/></symbol>
  <symbol id="i-headset" viewBox="0 0 24 24"><path d="M4 13v-2a8 8 0 0 1 16 0v2"/><rect x="2.8" y="12" width="4" height="7" rx="2"/><rect x="17.2" y="12" width="4" height="7" rx="2"/><path d="M20 18.5c0 1.7-1.8 3-4 3h-1.5"/></symbol>
  <symbol id="i-wallet" viewBox="0 0 24 24"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H18a2 2 0 0 1 2 2v2H6.5A2.5 2.5 0 0 0 4 10.5Z"/><rect x="4" y="7" width="16" height="13" rx="3"/><path d="M16 13h.01"/></symbol>
  <symbol id="i-deposit" viewBox="0 0 24 24"><path d="M12 3.6v8.6m0 0 3.3-3.3M12 12.2 8.7 8.9"/><path d="M4.6 13.9v3.2A3.4 3.4 0 0 0 8 20.5h8a3.4 3.4 0 0 0 3.4-3.4v-3.2"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10 5h4M11 18.5h2"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12.5 4.3 4.3L19 7"/></symbol>
  <symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4M18.7 18.7l-1.4-1.4M6.7 6.7 5.3 5.3"/></symbol>
  <symbol id="i-moon" viewBox="0 0 24 24"><path d="M20.3 15.3A8.6 8.6 0 0 1 8.7 3.7a8.8 8.8 0 1 0 11.6 11.6Z"/></symbol>
  <symbol id="i-chat" viewBox="0 0 24 24"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.2 7.6L3 20.5l1.4-5.1a8.5 8.5 0 1 1 16.1-3.9Z"/><path d="M8 10.5h8M8 14h5"/></symbol>
  <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4 3.6-6 8-6s7.2 2 8 6"/></symbol>
  <symbol id="i-facebook" viewBox="0 0 24 24"><path d="M14 21v-8h2.8l.4-3H14V8.1c0-.9.3-1.5 1.6-1.5H17V4a20 20 0 0 0-2.4-.1c-2.4 0-4.1 1.5-4.1 4.2V10H8v3h2.5v8Z"/></symbol>
  <symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-x" viewBox="0 0 24 24"><path d="M4 4h4.3l4.2 5.6L17.6 4H20l-6.5 7.4L20.5 20h-4.3l-4.7-6.3L5.8 20H3.5l7-8.1Z"/></symbol>
  <symbol id="i-youtube" viewBox="0 0 24 24"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9 5 3-5 3Z"/></symbol>
`;

export default function Sprite() {
  return (
    <svg
      className="svg-sprite"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: spriteMarkup }}
    />
  );
}
