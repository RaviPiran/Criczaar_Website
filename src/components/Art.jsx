import React, { useId } from 'react';

/* Rich, colorful SVG vector illustrations & stadium backgrounds: no external image dependencies. */

export function StadiumBackdrop({ className = '' }) {
  const id = useId();
  return (
    <svg className={className} viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-g1`} cx="20%" cy="20%" r="55%">
          <stop offset="0" stopColor="#06B6D4" stopOpacity=".28" />
          <stop offset="1" stopColor="#06B6D4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-g2`} cx="82%" cy="18%" r="52%">
          <stop offset="0" stopColor="#8B5CF6" stopOpacity=".3" />
          <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-g3`} cx="50%" cy="72%" r="50%">
          <stop offset="0" stopColor="#F5A623" stopOpacity=".22" />
          <stop offset="1" stopColor="#F5A623" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-arc`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0" stopColor="#06B6D4" stopOpacity="0" />
          <stop offset=".25" stopColor="#3B82F6" stopOpacity=".45" />
          <stop offset=".5" stopColor="#F5A623" stopOpacity=".65" />
          <stop offset=".75" stopColor="#8B5CF6" stopOpacity=".45" />
          <stop offset="1" stopColor="#F43F5E" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-seam`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#FFD166" stopOpacity=".35" />
          <stop offset=".5" stopColor="#67E8F9" stopOpacity=".25" />
          <stop offset="1" stopColor="#C4B5FD" stopOpacity=".35" />
        </linearGradient>
      </defs>

      {/* Atmospheric color washes */}
      <rect width="1440" height="900" fill={`url(#${id}-g1)`} />
      <rect width="1440" height="900" fill={`url(#${id}-g2)`} />
      <rect width="1440" height="900" fill={`url(#${id}-g3)`} />

      {/* Stadium roof & floodlight vector arcs */}
      <path d="M-80 260 Q720 -60 1520 260" stroke={`url(#${id}-arc)`} strokeWidth="2" />
      <path d="M-60 320 Q720 20 1500 320" stroke={`url(#${id}-arc)`} strokeWidth="1.2" strokeDasharray="6 10" opacity=".7" />
      <path d="M80 760 Q720 480 1360 760" stroke={`url(#${id}-seam)`} strokeWidth="1.5" opacity=".55" />

      {/* Left & right floodlight tower vectors */}
      <g opacity=".45">
        <path d="M120 40 L170 95 L155 110 L105 55 Z" fill="#67E8F9" fillOpacity=".2" stroke="#67E8F9" strokeOpacity=".5" strokeWidth="1.2" />
        <circle cx="122" cy="58" r="3" fill="#67E8F9" />
        <circle cx="136" cy="72" r="3" fill="#67E8F9" />
        <circle cx="150" cy="86" r="3" fill="#67E8F9" />
        <path d="M128 84 L128 290" stroke="#67E8F9" strokeOpacity=".22" strokeWidth="1.5" strokeDasharray="4 6" />
      </g>
      <g opacity=".45">
        <path d="M1320 40 L1270 95 L1285 110 L1335 55 Z" fill="#C4B5FD" fillOpacity=".2" stroke="#C4B5FD" strokeOpacity=".5" strokeWidth="1.2" />
        <circle cx="1318" cy="58" r="3" fill="#C4B5FD" />
        <circle cx="1304" cy="72" r="3" fill="#C4B5FD" />
        <circle cx="1290" cy="86" r="3" fill="#C4B5FD" />
        <path d="M1312 84 L1312 290" stroke="#C4B5FD" strokeOpacity=".22" strokeWidth="1.5" strokeDasharray="4 6" />
      </g>

      {/* Subtle geometric stadium rings */}
      <circle cx="720" cy="480" r="380" stroke="#fff" strokeOpacity=".04" strokeWidth="1" />
      <circle cx="720" cy="480" r="520" stroke="#F5A623" strokeOpacity=".06" strokeWidth="1" strokeDasharray="3 12" />
      <circle cx="720" cy="480" r="660" stroke="#06B6D4" strokeOpacity=".05" strokeWidth="1" />
    </svg>
  );
}

/* Subtle vector contour backdrop for inner sections */
export function PitchContourBg({ variant = 'cyan', className = '' }) {
  const id = useId();
  const palette = {
    cyan: ['#06B6D4', '#3B82F6'],
    gold: ['#F5A623', '#F43F5E'],
    violet: ['#8B5CF6', '#EC4899'],
    emerald: ['#10B981', '#06B6D4'],
  }[variant] || ['#06B6D4', '#3B82F6'];

  return (
    <svg className={className} viewBox="0 0 1200 600" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-l`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={palette[0]} stopOpacity=".48" />
          <stop offset="1" stopColor={palette[1]} stopOpacity=".12" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="82%" cy="24%" r="45%">
          <stop offset="0" stopColor={palette[0]} stopOpacity=".22" />
          <stop offset="1" stopColor={palette[0]} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="600" fill={`url(#${id}-glow)`} />
      <ellipse cx="960" cy="140" rx="340" ry="200" stroke={`url(#${id}-l)`} strokeWidth="1.8" />
      <ellipse cx="960" cy="140" rx="260" ry="150" stroke={`url(#${id}-l)`} strokeWidth="1.2" strokeDasharray="5 9" />
      <ellipse cx="200" cy="480" rx="300" ry="170" stroke={`url(#${id}-l)`} strokeWidth="1.5" />
      <path d="M0 340 C280 260 520 440 820 310 C1000 230 1120 270 1200 220" stroke={`url(#${id}-l)`} strokeWidth="1.6" />
      <circle cx="960" cy="140" r="6" fill={palette[0]} fillOpacity=".5" />
      <circle cx="200" cy="480" r="5" fill={palette[1]} fillOpacity=".45" />
    </svg>
  );
}

/* Colorful vector hub showing 4 connected auction screens (for About section) */
export function ConnectedScreensVector({ className = '' }) {
  const id = useId();
  return (
    <svg className={className} viewBox="0 0 460 220" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-hub`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#06B6D4" stopOpacity=".28" />
          <stop offset=".5" stopColor="#8B5CF6" stopOpacity=".24" />
          <stop offset="1" stopColor="#F5A623" stopOpacity=".28" />
        </linearGradient>
        <linearGradient id={`${id}-line1`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#06B6D4" />
          <stop offset="1" stopColor="#F5A623" />
        </linearGradient>
        <linearGradient id={`${id}-line2`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>

      {/* Outer glass frame */}
      <rect x="2" y="2" width="456" height="216" rx="22" fill={`url(#${id}-hub)`} stroke="rgba(255,255,255,.14)" strokeWidth="1.5" />

      {/* Connecting signal arcs */}
      <path d="M125 65 C180 65 180 110 230 110" stroke={`url(#${id}-line1)`} strokeWidth="2" strokeDasharray="4 4" />
      <path d="M125 155 C180 155 180 110 230 110" stroke={`url(#${id}-line2)`} strokeWidth="2" strokeDasharray="4 4" />
      <path d="M335 65 C280 65 280 110 230 110" stroke={`url(#${id}-line1)`} strokeWidth="2" strokeDasharray="4 4" />
      <path d="M335 155 C280 155 280 110 230 110" stroke={`url(#${id}-line2)`} strokeWidth="2" strokeDasharray="4 4" />

      {/* Center Live Core */}
      <circle cx="230" cy="110" r="34" fill="#0E1528" stroke="#F5A623" strokeWidth="2.5" />
      <circle cx="230" cy="110" r="44" stroke="#06B6D4" strokeOpacity=".35" strokeWidth="1.2" strokeDasharray="3 5" />
      <text x="230" y="106" textAnchor="middle" fill="#FFD166" fontSize="11" fontWeight="800" letterSpacing="1">LIVE</text>
      <text x="230" y="121" textAnchor="middle" fill="#9AA7C4" fontSize="8.5" fontWeight="700">SYNC</text>

      {/* 4 Screen Nodes */}
      <g>
        <rect x="24" y="38" width="102" height="52" rx="12" fill="#0E1528" fillOpacity=".92" stroke="#06B6D4" strokeOpacity=".65" strokeWidth="1.5" />
        <circle cx="42" cy="56" r="5" fill="#06B6D4" />
        <text x="54" y="60" fill="#fff" fontSize="10" fontWeight="700">Auctioneer</text>
        <rect x="36" y="70" width="74" height="6" rx="3" fill="#06B6D4" fillOpacity=".3" />
      </g>
      <g>
        <rect x="24" y="130" width="102" height="52" rx="12" fill="#0E1528" fillOpacity=".92" stroke="#8B5CF6" strokeOpacity=".65" strokeWidth="1.5" />
        <circle cx="42" cy="148" r="5" fill="#8B5CF6" />
        <text x="54" y="152" fill="#fff" fontSize="10" fontWeight="700">Team Bids</text>
        <rect x="36" y="162" width="74" height="6" rx="3" fill="#8B5CF6" fillOpacity=".3" />
      </g>
      <g>
        <rect x="334" y="38" width="102" height="52" rx="12" fill="#0E1528" fillOpacity=".92" stroke="#F5A623" strokeOpacity=".65" strokeWidth="1.5" />
        <circle cx="352" cy="56" r="5" fill="#F5A623" />
        <text x="364" y="60" fill="#fff" fontSize="10" fontWeight="700">Projector</text>
        <rect x="346" y="70" width="74" height="6" rx="3" fill="#F5A623" fillOpacity=".3" />
      </g>
      <g>
        <rect x="334" y="130" width="102" height="52" rx="12" fill="#0E1528" fillOpacity=".92" stroke="#10B981" strokeOpacity=".65" strokeWidth="1.5" />
        <circle cx="352" cy="148" r="5" fill="#10B981" />
        <text x="364" y="152" fill="#fff" fontSize="10" fontWeight="700">Spectator</text>
        <rect x="346" y="162" width="74" height="6" rx="3" fill="#10B981" fillOpacity=".3" />
      </g>
    </svg>
  );
}

export function CricketBall({ className = '', size = 96 }) {
  const id = useId();
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-b`} cx="32%" cy="28%" r="78%">
          <stop offset="0" stopColor="#FF6B8B" />
          <stop offset=".45" stopColor="#E11D48" />
          <stop offset=".85" stopColor="#881337" />
          <stop offset="1" stopColor="#4C0519" />
        </radialGradient>
        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD166" />
          <stop offset="1" stopColor="#F43F5E" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill={`url(#${id}-b)`} stroke={`url(#${id}-ring)`} strokeOpacity=".45" strokeWidth="1.5" />
      <path d="M14 30 C38 44 38 56 14 70" fill="none" stroke="#FFF1D0" strokeWidth="2.4" strokeDasharray="3.2 3.2" strokeLinecap="round" />
      <path d="M86 30 C62 44 62 56 86 70" fill="none" stroke="#FFF1D0" strokeWidth="2.4" strokeDasharray="3.2 3.2" strokeLinecap="round" />
      <path d="M21 23 C45 40 45 60 21 77" fill="none" stroke="#FFD166" strokeOpacity=".45" strokeWidth="1" />
      <ellipse cx="33" cy="25" rx="15" ry="8" fill="#fff" opacity=".24" transform="rotate(-30 33 25)" />
    </svg>
  );
}

export function Stumps({ className = '', size = 90 }) {
  const id = useId();
  return (
    <svg className={className} width={size} height={size * 1.25} viewBox="0 0 80 100" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-stump`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE29A" />
          <stop offset=".55" stopColor="#F5A623" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id={`${id}-bail`} x1="0" x2="1">
          <stop offset="0" stopColor="#67E8F9" />
          <stop offset="1" stopColor="#F5A623" />
        </linearGradient>
      </defs>
      {[16, 36, 56].map((x) => (
        <g key={x}>
          <rect x={x} y="14" width="8" height="84" rx="3" fill={`url(#${id}-stump)`} />
          <rect x={x + 1.5} y="16" width="2" height="80" rx="1" fill="#fff" opacity=".3" />
        </g>
      ))}
      <rect x="12" y="8" width="24" height="5.5" rx="2.75" fill={`url(#${id}-bail)`} />
      <rect x="44" y="8" width="24" height="5.5" rx="2.75" fill={`url(#${id}-bail)`} />
    </svg>
  );
}

export function Bat({ className = '', size = 120 }) {
  const id = useId();
  return (
    <svg className={className} width={size * 0.36} height={size} viewBox="0 0 36 100" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-blade`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF0C2" />
          <stop offset=".5" stopColor="#E9B96E" />
          <stop offset="1" stopColor="#9A6826" />
        </linearGradient>
        <linearGradient id={`${id}-grip`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect x="14" y="0" width="8" height="30" rx="4" fill={`url(#${id}-grip)`} />
      <rect x="14" y="7" width="8" height="3" fill="#67E8F9" />
      <rect x="14" y="14" width="8" height="3" fill="#FFD166" />
      <rect x="14" y="21" width="8" height="3" fill="#F43F5E" />
      <path d="M8 30 H28 L32 92 Q18 100 4 92 Z" fill={`url(#${id}-blade)`} />
      <path d="M18 34 V92" stroke="#784E1B" strokeWidth="1.2" opacity=".55" />
      <path d="M11 52 L25 46 L25 56 L11 62 Z" fill="#06B6D4" opacity=".28" />
    </svg>
  );
}

export function AuctionGavelVector({ className = '', size = 84 }) {
  const id = useId();
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-head`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD166" />
          <stop offset=".5" stopColor="#F5A623" />
          <stop offset="1" stopColor="#C97F0A" />
        </linearGradient>
        <linearGradient id={`${id}-handle`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#67E8F9" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <g transform="rotate(-35 48 48)">
        <rect x="26" y="18" width="44" height="22" rx="6" fill={`url(#${id}-head)`} />
        <rect x="22" y="15" width="7" height="28" rx="3.5" fill="#FFE9B3" />
        <rect x="67" y="15" width="7" height="28" rx="3.5" fill="#FFE9B3" />
        <rect x="44" y="40" width="8" height="44" rx="4" fill={`url(#${id}-handle)`} />
      </g>
      <rect x="18" y="78" width="44" height="8" rx="4" fill="#8B5CF6" fillOpacity=".75" stroke="#C4B5FD" strokeOpacity=".6" strokeWidth="1.2" />
    </svg>
  );
}

export function TrophyVector({ className = '', size = 72 }) {
  const id = useId();
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-cup`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE29A" />
          <stop offset=".5" stopColor="#F5A623" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
      </defs>
      <path d="M24 16 H56 V32 C56 44 48 50 40 50 C32 50 24 44 24 32 Z" fill={`url(#${id}-cup)`} />
      <path d="M24 20 H14 C14 31 19 36 25 36" stroke="#FFD166" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M56 20 H66 C66 31 61 36 55 36" stroke="#FFD166" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="36" y="50" width="8" height="12" rx="2" fill="#F5A623" />
      <rect x="26" y="62" width="28" height="7" rx="3.5" fill="#06B6D4" />
      <circle cx="40" cy="30" r="5" fill="#fff" fillOpacity=".35" />
    </svg>
  );
}

/* Top-down ground: boundary, inner circle, pitch and creases */
export function Ground({ className = '' }) {
  const id = useId();
  return (
    <svg className={className} viewBox="0 0 1200 800" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-turf`} cx="50%" cy="50%" r="55%">
          <stop offset="0" stopColor="#10B981" stopOpacity=".24" />
          <stop offset=".45" stopColor="#06B6D4" stopOpacity=".14" />
          <stop offset="1" stopColor="#070B16" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-ring`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0" stopColor="#06B6D4" stopOpacity=".4" />
          <stop offset=".5" stopColor="#F5A623" stopOpacity=".5" />
          <stop offset="1" stopColor="#8B5CF6" stopOpacity=".4" />
        </linearGradient>
      </defs>
      <ellipse cx="600" cy="400" rx="560" ry="360" fill={`url(#${id}-turf)`} />
      <ellipse cx="600" cy="400" rx="560" ry="360" stroke={`url(#${id}-ring)`} strokeWidth="2.5" strokeDasharray="3 10" strokeLinecap="round" />
      <ellipse cx="600" cy="400" rx="330" ry="210" stroke="#67E8F9" strokeOpacity=".22" strokeWidth="2" />
      <rect x="560" y="250" width="80" height="300" rx="6" fill="#F5A623" fillOpacity=".14" stroke="#FFD166" strokeOpacity=".5" strokeWidth="2" />
      <path d="M552 292 H648 M552 508 H648" stroke="#fff" strokeOpacity=".45" strokeWidth="2" />
      <circle cx="600" cy="270" r="5" fill="#FFD166" />
      <circle cx="600" cy="530" r="5" fill="#FFD166" />
    </svg>
  );
}

/* Generic player figure: shoulders + head, tinted with the team / gold colour */
export function PlayerFigure({ color = '#F5A623', className = '' }) {
  const id = useId();
  return (
    <svg className={className} viewBox="0 0 200 220" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-j`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} /><stop offset="1" stopColor="#0E1830" />
        </linearGradient>
        <radialGradient id={`${id}-g`} cx="50%" cy="38%" r="60%">
          <stop offset="0" stopColor={color} stopOpacity=".45" /><stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill={`url(#${id}-g)`} />
      <path d="M20 220 C24 160 56 146 100 146 C144 146 176 160 180 220 Z" fill={`url(#${id}-j)`} />
      <path d="M78 146 L100 172 L122 146" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="3" strokeLinejoin="round" />
      <rect x="88" y="120" width="24" height="30" rx="10" fill="#D8A57A" />
      <ellipse cx="100" cy="92" rx="34" ry="38" fill="#E7B88E" />
      <path d="M66 86 C66 52 134 52 134 86 C122 72 78 72 66 86 Z" fill="#14203F" />
      <path d="M62 84 Q100 62 138 84" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

/* Brand glyphs (lucide v1 no longer ships brand icons) */
export function SocialIcon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true };
  switch (name) {
    case 'Facebook':
      return <svg {...common}><path d="M13.5 21v-8h2.7l.5-3.2h-3.2V7.9c0-.9.4-1.7 1.8-1.7h1.5V3.4S15.5 3.2 14.3 3.2c-2.6 0-4.1 1.5-4.1 4.2v2.4H7.5V13h2.7v8h3.3Z" /></svg>;
    case 'Instagram':
      return <svg {...common}><path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21.9 8c-.1-1.4-.4-2.6-1.4-3.5-1-1-2.2-1.3-3.5-1.4-1.4-.1-5.6-.1-7 0-1.4.1-2.6.4-3.5 1.4-1 1-1.3 2.2-1.4 3.5-.1 1.4-.1 5.6 0 7 .1 1.4.4 2.6 1.4 3.5 1 1 2.2 1.3 3.5 1.4 1.4.1 5.6.1 7 0 1.4-.1 2.6-.4 3.5-1.4 1-1 1.3-2.2 1.4-3.5.1-1.4.1-5.6 0-7Zm-1.8 8.5a2.9 2.9 0 0 1-1.6 1.6c-1.1.4-3.7.3-6.5.3s-5.4.1-6.5-.3a2.9 2.9 0 0 1-1.6-1.6c-.4-1.1-.3-3.7-.3-6.5s-.1-5.4.3-6.5a2.9 2.9 0 0 1 1.6-1.6c1.1-.4 3.7-.3 6.5-.3s5.4-.1 6.5.3a2.9 2.9 0 0 1 1.6 1.6c.4 1.1.3 3.7.3 6.5s.1 5.4-.3 6.5Z" /></svg>;
    case 'YouTube':
      return <svg {...common}><path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" /></svg>;
    case 'WhatsApp':
      return <svg {...common}><path d="M12 2.5a9.4 9.4 0 0 0-8 14.3L2.7 21.4l4.7-1.2A9.4 9.4 0 1 0 12 2.5Zm0 17.1c-1.4 0-2.8-.4-4-1.1l-.3-.2-2.8.7.7-2.7-.2-.3A7.6 7.6 0 1 1 12 19.6Zm4.2-5.7c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.2 6.2 0 0 1-3.1-2.7c-.2-.4.2-.4.7-1.2.1-.1 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.3-.9.9-.9 2.200s.9 2.500 1.100 2.700c.1.200 1.800 2.800 4.400 3.900 1.600.7 2.300.7 3.100.6.500-.1 1.400-.6 1.600-1.100.2-.5.2-1 .1-1.100-.1-.1-.2-.1-.4-.2Z" /></svg>;
    default:
      return null;
  }
}
