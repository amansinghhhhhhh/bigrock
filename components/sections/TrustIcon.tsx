export default function TrustIcon({ name }: { name: string }) {
  switch (name) {
    case "fast":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <defs>
            <linearGradient id="tbi-fast-note" x1="11" y1="8" x2="54" y2="35" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="1" stopColor="#FBBF24" />
            </linearGradient>
            <linearGradient id="tbi-fast-wallet" x1="7" y1="27" x2="51" y2="54" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="1" stopColor="#C2410C" />
            </linearGradient>
            <linearGradient id="tbi-fast-badge" x1="40" y1="38" x2="58" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB923C" />
              <stop offset="1" stopColor="#EA580C" />
            </linearGradient>
          </defs>
          <g transform="rotate(-11 27 18)">
            <rect x="11" y="8" width="33" height="21" rx="3.5" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
            <rect x="15" y="12" width="25" height="13" rx="2" fill="none" stroke="#D97706" strokeWidth="1.2" strokeDasharray="2.4 2.4" opacity=".65" />
          </g>
          <g transform="rotate(7 40 21)">
            <rect x="25" y="11" width="31" height="21" rx="3.5" fill="url(#tbi-fast-note)" stroke="#B45309" strokeWidth="2" />
            <text x="40.5" y="26" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="11" fontWeight="800" fill="#92400E">₹</text>
          </g>
          <path d="M4 15h6M2.5 21h7.5M7 9h3.5" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" opacity=".55" />
          <path d="M53 8l1.2 3.2 3.3 1.2-3.3 1.2L53 16.8l-1.2-3.2-3.3-1.2 3.3-1.2L53 8z" fill="#FCD34D" />
          <rect x="7" y="27" width="44" height="27" rx="7" fill="url(#tbi-fast-wallet)" stroke="#92400E" strokeWidth="2" />
          <path d="M7 34.5c0-4.1 3.4-7.5 7.5-7.5h29c4.1 0 7.5 3.4 7.5 7.5v1.7H7v-1.7z" fill="#FBBF24" opacity=".45" />
          <rect x="36" y="35" width="17" height="10" rx="5" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.8" />
          <circle cx="49" cy="47" r="9" fill="url(#tbi-fast-badge)" stroke="#FFF7ED" strokeWidth="2" />
          <path d="M50.7 41.5l-5.2 7.1h3.2l-1.1 5 5.2-7.1h-3.2l1.1-5z" fill="#fff" />
        </svg>
      );
    case "secure":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <defs>
            <linearGradient id="tbi-secure-body" x1="13" y1="27" x2="51" y2="57" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6EE7B7" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="tbi-secure-shackle" x1="21" y1="11" x2="43" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A7F3D0" />
              <stop offset="1" stopColor="#10B981" />
            </linearGradient>
          </defs>
          <path d="M21.5 29v-6.2c0-6.4 4.7-11.3 10.5-11.3s10.5 4.9 10.5 11.3V29" fill="none" stroke="#064E3B" strokeWidth="8" strokeLinecap="round" />
          <path d="M21.5 29v-6.2c0-6.4 4.7-11.3 10.5-11.3s10.5 4.9 10.5 11.3V29" fill="none" stroke="url(#tbi-secure-shackle)" strokeWidth="5" strokeLinecap="round" />
          <rect x="13" y="27" width="38" height="30" rx="8" fill="url(#tbi-secure-body)" stroke="#065F46" strokeWidth="2" />
          <path d="M17.5 31.5h29c1.4 0 2.5 1.1 2.5 2.5v3.2H15V34c0-1.4 1.1-2.5 2.5-2.5z" fill="#ECFDF5" opacity=".18" />
          <circle cx="32" cy="40.5" r="4" fill="#ECFDF5" />
          <path d="M29.5 43h5l1.5 7.5h-8L29.5 43z" fill="#ECFDF5" />
          <path d="M52 8l1 2.8 2.8 1-2.8 1L52 15.6l-1-2.8-2.8-1 2.8-1L52 8z" fill="#A7F3D0" />
        </svg>
      );
    case "play":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <defs>
            <linearGradient id="tbi-play-back" x1="13" y1="15" x2="41" y2="43" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DDD6FE" />
              <stop offset="1" stopColor="#A78BFA" />
            </linearGradient>
            <linearGradient id="tbi-play-front" x1="28" y1="26" x2="56" y2="54" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C4B5FD" />
              <stop offset=".45" stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#6D28D9" />
            </linearGradient>
          </defs>
          <g transform="rotate(-17 27 29)">
            <rect x="13" y="15" width="28" height="28" rx="6" fill="url(#tbi-play-back)" stroke="#6D28D9" strokeWidth="2" />
            <circle cx="21" cy="23" r="2.2" fill="#5B21B6" />
            <circle cx="33" cy="23" r="2.2" fill="#5B21B6" />
            <circle cx="27" cy="29" r="2.2" fill="#5B21B6" />
            <circle cx="21" cy="35" r="2.2" fill="#5B21B6" />
            <circle cx="33" cy="35" r="2.2" fill="#5B21B6" />
          </g>
          <g transform="rotate(12 42 40)">
            <rect x="28" y="26" width="28" height="28" rx="6" fill="url(#tbi-play-front)" stroke="#4C1D95" strokeWidth="2" />
            <rect x="31.5" y="29.5" width="21" height="21" rx="3.5" fill="none" stroke="#EDE9FE" strokeWidth="1" opacity=".25" />
            <circle cx="35" cy="34" r="2.4" fill="#F5F3FF" />
            <circle cx="49" cy="34" r="2.4" fill="#F5F3FF" />
            <circle cx="42" cy="40" r="2.4" fill="#F5F3FF" />
            <circle cx="35" cy="46" r="2.4" fill="#F5F3FF" />
            <circle cx="49" cy="46" r="2.4" fill="#F5F3FF" />
          </g>
          <path d="M55 10l1.4 3.6 3.6 1.4-3.6 1.4L55 20l-1.4-3.6L50 15l3.6-1.4L55 10z" fill="#FCD34D" />
        </svg>
      );
    case "support":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <defs>
            <linearGradient id="tbi-support-cup" x1="9" y1="31" x2="21" y2="49" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60A5FA" />
              <stop offset="1" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="tbi-support-cup-r" x1="43" y1="31" x2="55" y2="49" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60A5FA" />
              <stop offset="1" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
          <path d="M14 34v-3.5C14 19.4 22.1 11 32 11s18 8.4 18 19.5V34" fill="none" stroke="#1E3A8A" strokeWidth="6.5" strokeLinecap="round" opacity=".55" />
          <path d="M14 34v-3.5C14 19.4 22.1 11 32 11s18 8.4 18 19.5V34" fill="none" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" />
          <rect x="9" y="31" width="11" height="18" rx="5.5" fill="url(#tbi-support-cup)" stroke="#1E40AF" strokeWidth="2" />
          <rect x="44" y="31" width="11" height="18" rx="5.5" fill="url(#tbi-support-cup-r)" stroke="#1E40AF" strokeWidth="2" />
          <rect x="12" y="34" width="4" height="12" rx="2" fill="#BFDBFE" opacity=".8" />
          <rect x="48" y="34" width="4" height="12" rx="2" fill="#BFDBFE" opacity=".8" />
          <path d="M49 47c0 6-5.4 10-12 10h-2.5" fill="none" stroke="#60A5FA" strokeWidth="3.4" strokeLinecap="round" />
          <rect x="27" y="53" width="9" height="5" rx="2.5" fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.6" />
          <path d="M54 8l1.2 3.2 3.2 1.2-3.2 1.2L54 16.8l-1.2-3.2-3.2-1.2 3.2-1.2L54 8z" fill="#BFDBFE" />
        </svg>
      );
    case "mobile":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <defs>
            <linearGradient id="tbi-mobile-body" x1="18" y1="5" x2="46" y2="55" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB7185" />
              <stop offset="1" stopColor="#BE123C" />
            </linearGradient>
            <linearGradient id="tbi-mobile-screen" x1="22" y1="9" x2="42" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF1F2" />
              <stop offset="1" stopColor="#FFE4E6" />
            </linearGradient>
          </defs>
          <ellipse cx="32" cy="33" rx="27" ry="11" transform="rotate(-28 32 33)" fill="none" stroke="#FDA4AF" strokeWidth="1.8" opacity=".65" />
          <rect x="18" y="5" width="28" height="50" rx="7.5" fill="url(#tbi-mobile-body)" stroke="#881337" strokeWidth="2" />
          <rect x="22" y="9" width="20" height="39" rx="3" fill="url(#tbi-mobile-screen)" />
          <rect x="28" y="7" width="8" height="2.2" rx="1.1" fill="#881337" opacity=".55" />
          <circle cx="32" cy="28.5" r="7.5" fill="#E11D48" />
          <path d="M29.6 24.8l6.8 3.7-6.8 3.7v-7.4z" fill="#fff" />
          <path d="M27 44h10" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" opacity=".5" />
          <path d="M53 10l1.2 3.2 3.2 1.2-3.2 1.2L53 18.8l-1.2-3.2-3.2-1.2 3.2-1.2L53 10z" fill="#FBCFE8" />
        </svg>
      );
    case "responsible":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <defs>
            <linearGradient id="tbi-responsible-shield" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5EEAD4" />
              <stop offset=".55" stopColor="#14B8A6" />
              <stop offset="1" stopColor="#0F766E" />
            </linearGradient>
          </defs>
          <path d="M32 5.5l20.5 7.3v14.5c0 13.2-8.5 23.5-20.5 29-12-5.5-20.5-15.8-20.5-29V12.8L32 5.5z" fill="url(#tbi-responsible-shield)" stroke="#115E59" strokeWidth="2" />
          <path d="M32 10.5l16 5.7v11.3c0 10.4-6.7 18.9-16 23.6-9.3-4.7-16-13.2-16-23.6V16.2l16-5.7z" fill="none" stroke="#CCFBF1" strokeWidth="1.2" opacity=".4" />
          <path d="M32 42.5s-9.2-5.4-9.2-12.1c0-3 2.4-5.2 5.1-5.2 1.9 0 3.4 1.2 4.1 2.6.7-1.4 2.2-2.6 4.1-2.6 2.7 0 5.1 2.2 5.1 5.2 0 6.7-9.2 12.1-9.2 12.1z" fill="#ECFDF5" />
          <path d="M53 8l1.2 3.2 3.2 1.2-3.2 1.2L53 16.8l-1.2-3.2-3.2-1.2 3.2-1.2L53 8z" fill="#99F6E4" />
        </svg>
      );
    default:
      return null;
  }
}
