// Default Channel Data
export const DEFAULT_CHANNEL = {
  name: "DimusTech",
  avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
  verified: true,
  duration: "14:28",
  views: "128K views",
  timeAgo: "3 days ago",
  description: "Detailed benchmark testing 5 popular budget Gen4 NVMe SSDs in 2026. Real thermal throttle tests, sustained write drops, and DRAM cache analysis before you buy."
};

// High quality sample thumbnails generated with SVG data URIs so they load instantly 100% offline
const makeSvgThumb = (bgStart, bgEnd, badgeText, titleLine1, titleLine2, accentColor = "#FF0000") => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgStart}" />
        <stop offset="100%" stop-color="${bgEnd}" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.8"/>
      </filter>
    </defs>
    <rect width="1280" height="720" fill="url(#g)" />
    <!-- Tech circuit background grid lines -->
    <path d="M0 180 H1280 M0 360 H1280 M0 540 H1280 M320 0 V720 M640 0 V720 M960 0 V720" stroke="#ffffff" stroke-opacity="0.05" stroke-width="2"/>
    <circle cx="1050" cy="360" r="280" fill="${accentColor}" fill-opacity="0.25" filter="blur(60px)"/>
    
    <!-- Accent Badge -->
    <rect x="80" y="90" width="280" height="64" rx="14" fill="${accentColor}" />
    <text x="220" y="134" font-family="-apple-system, Roboto, sans-serif" font-weight="900" font-size="34" fill="#ffffff" text-anchor="middle" letter-spacing="2">${badgeText}</text>
    
    <!-- Bold High Contrast Titles -->
    <text x="80" y="270" font-family="-apple-system, Roboto, sans-serif" font-weight="900" font-size="82" fill="#ffffff" filter="url(#shadow)">${titleLine1}</text>
    <text x="80" y="380" font-family="-apple-system, Roboto, sans-serif" font-weight="900" font-size="88" fill="#FACC15" filter="url(#shadow)">${titleLine2}</text>
    
    <!-- Device / Illustration mockup on right side -->
    <g transform="translate(780, 160)" filter="url(#shadow)">
      <rect x="0" y="0" width="380" height="400" rx="32" fill="#18181b" stroke="${accentColor}" stroke-width="4"/>
      <rect x="30" y="30" width="320" height="240" rx="16" fill="#09090b"/>
      <circle cx="190" cy="150" r="60" fill="${accentColor}" fill-opacity="0.3"/>
      <polygon points="175,120 215,150 175,180" fill="${accentColor}"/>
      <text x="190" y="330" font-family="-apple-system, Roboto, sans-serif" font-weight="800" font-size="28" fill="#ffffff" text-anchor="middle">SPEED TEST: 7450 MB/s</text>
    </g>
    
    <!-- Warning exclamation mark badge -->
    <circle cx="740" cy="170" r="50" fill="#EF4444" filter="url(#shadow)"/>
    <text x="740" y="188" font-family="-apple-system, Roboto, sans-serif" font-weight="900" font-size="54" fill="#ffffff" text-anchor="middle">!</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const INITIAL_VARIANTS = [
  {
    id: "var-a",
    name: "Variant A",
    title: "I Tested 5 Budget NVMe SSDs - Stop Buying The Wrong One!",
    subtitle: "Focus on warning / mistake hook",
    thumbnail: makeSvgThumb("#0f172a", "#1e1b4b", "AVOID THIS!", "STOP BUYING", "WRONG SSDs!", "#EF4444")
  },
  {
    id: "var-b",
    name: "Variant B",
    title: "The ONLY Budget SSD You Should Actually Buy in 2026",
    subtitle: "Focus on definitive solution hook",
    thumbnail: makeSvgThumb("#064e3b", "#022c22", "TOP PICK 2026", "THE BEST SSD", "UNDER $60!", "#10B981")
  }
];

// Realistic competitor videos for the YouTube Home Feed Grid & Sidebar
export const MOCK_COMPETITORS = [
  {
    id: "comp-1",
    title: "M4 Max MacBook Pro: 1 Month Later Review!",
    channel: "Dave2D",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    verified: true,
    views: "892K views",
    timeAgo: "1 day ago",
    duration: "11:04",
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "comp-2",
    title: "Why Everyone is Switching to Local AI Models (Setup Guide)",
    channel: "TechLinked",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    verified: true,
    views: "410K views",
    timeAgo: "4 days ago",
    duration: "16:42",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "comp-3",
    title: "Building the Ultimate Silent Desk PC in 2026",
    channel: "Optimum",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    verified: true,
    views: "1.2M views",
    timeAgo: "2 weeks ago",
    duration: "18:19",
    thumbnail: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "comp-4",
    title: "Xiaomi 15 Ultra vs Samsung S25 Ultra: Blind Camera Test",
    channel: "Mrwhosetheboss",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    verified: true,
    views: "2.8M views",
    timeAgo: "5 days ago",
    duration: "21:30",
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "comp-5",
    title: "How I Automated My Entire Smart Home for Under $100",
    channel: "Smart Home Solver",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    verified: true,
    views: "640K views",
    timeAgo: "1 week ago",
    duration: "13:55",
    thumbnail: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80"
  }
];
