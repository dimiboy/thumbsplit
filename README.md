# ThumbSplit — YouTube Title & Thumbnail Split-Previewer
### By DimusTech Studio

[![Live Website](https://img.shields.io/badge/Live_App-thumbsplit.dimustech.net-red?style=for-the-badge&logo=youtube)](https://thumbsplit.dimustech.net)
[![GitHub stars](https://img.shields.io/github/stars/dimiboy/thumbsplit?style=for-the-badge)](https://github.com/dimiboy/thumbsplit/stargazers)

🌐 **Live Web Application:** [https://thumbsplit.dimustech.net](https://thumbsplit.dimustech.net)

**ThumbSplit** is a lightweight, zero-cloud-cost, 100% client-side web application for YouTube creators to A/B test and preview their video titles and thumbnails across realistic YouTube environments before publishing.

---

## ✨ Features

- **Multi-Variant A/B/C Testing:**
  - Compare up to 4 title & thumbnail variants simultaneously.
  - Real-time character count with mobile/desktop truncation warnings (optimal < 50 chars, acceptable 50–70 chars, danger > 70 chars).
  - Drag-and-drop, file browsing, or direct clipboard paste (`Ctrl+V`) for image uploads.

- **Authentic YouTube Preview Modes:**
  1. **Side-by-Side (A/B):** Direct comparison with CTR hook analysis (Negative/Mistake, Authority, Tutorial, Curiosity, Listicle).
  2. **Desktop Home Feed Grid:** Real YouTube homepage grid simulating competitor tech videos (Dave2D, Optimum, etc.) to evaluate if your thumbnail pops.
  3. **Mobile App Feed:** Smartphone mockup with realistic notch, status bar, and 2-line title mobile truncation.
  4. **Sidebar ("Up Next"):** Suggested video layout next to a playing video to test small (168x94px) thumbnail legibility.
  5. **Search Results Feed:** Horizontal desktop search card layout with keyword snippets and rank comparison.

- **Creator Power Tools:**
  - **Safe Zone Overlay:** Highlights YouTube timestamp duration badge hazard zone (bottom-right) and Watch Later / Queue buttons hazard (top-right).
  - **The Squint / Blur Test:** 3-stage blur filter (None, Low, High) to test visual composition and focal point hierarchy.
  - **Grayscale / B&W Filter:** Tests luminance and tonal contrast without color distraction.
  - **3-Second Blind Visual Snapping Test:** Shuffles variants and challenges you to click the one your eyes snap to in under 3 seconds to eliminate confirmation bias.
  - **Theme Toggle:** Switch between YouTube Dark Mode (`#0f0f0f`) and Light Mode (`#ffffff`).

- **Privacy & Performance:**
  - 100% client-side. Zero server uploads.
  - Zero cloud costs ($0 bill).
  - Built with Vite + React + Tailwind CSS.
  - Auto-persists work in LocalStorage.

---

## ☕ Support & Donations

ThumbSplit is completely free, privacy-focused, and open source. If it helped you save time or get higher CTR on your videos, consider supporting development:

- **PayPal:** [paypal.me/dimiboy](https://paypal.me/dimiboy)
- **Bitcoin (BTC):** `1344MBr6fkTYAzo64yQxjXNQDHC84THP3z` (Native BTC)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run locally in development
npm run dev

# Build for production
npm run build
```

The production output is built to `dist/`, ready to drop directly into **Cloudflare Pages** on a free subdomain like `preview.dimustech.net` or `thumb.dimustech.net`.
