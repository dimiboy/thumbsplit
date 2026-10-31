import React from 'react';
import {
  Eye,
  ShieldAlert,
  Sun,
  Moon,
  Zap,
  RotateCcw,
  Sparkles,
  Columns2,
  Monitor,
  Smartphone,
  Sidebar,
  Search,
  Heart
} from 'lucide-react';
import YoutubeIcon from './YoutubeIcon';
import GithubIcon from './GithubIcon';

export default function Header({
  activeTab,
  setActiveTab,
  previewTheme,
  setPreviewTheme,
  showSafeZones,
  setShowSafeZones,
  blurLevel,
  setBlurLevel,
  grayscale,
  setGrayscale,
  onOpenBlindTest,
  onOpenSupport,
  onReset
}) {
  const tabs = [
    { id: 'side-by-side', label: 'Side-by-Side', icon: Columns2 },
    { id: 'desktop', label: 'Desktop Feed', icon: Monitor },
    { id: 'mobile', label: 'Mobile Feed', icon: Smartphone },
    { id: 'sidebar', label: 'Sidebar (Up Next)', icon: Sidebar },
    { id: 'search', label: 'Search Results', icon: Search },
  ];

  const cycleBlur = () => {
    if (blurLevel === 'none') setBlurLevel('low');
    else if (blurLevel === 'low') setBlurLevel('high');
    else setBlurLevel('none');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-neutral-800/80 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="bg-red-600 text-white p-1.5 rounded-lg shadow-md shadow-red-600/30 flex items-center justify-center">
              <YoutubeIcon className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight text-white">ThumbSplit</span>
                <span className="text-[10px] bg-red-500/20 text-red-400 font-semibold px-1.5 py-0.5 rounded border border-red-500/30">
                  by DimusTech
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 hidden sm:block">YouTube Title & Thumbnail Split-Previewer</p>
            </div>
          </div>

          {/* Quick Blind Test Trigger for Mobile */}
          <button
            onClick={onOpenBlindTest}
            className="md:hidden flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-sm"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Blind Test</span>
          </button>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800 overflow-x-auto max-w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Diagnostic Tools & Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end overflow-x-auto pb-1 md:pb-0">
          {/* Safe Zone Toggle */}
          <button
            onClick={() => setShowSafeZones(!showSafeZones)}
            title="Toggle Safe Zone (Timestamp & UI Collision warning)"
            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all ${
              showSafeZones
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-xs'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-neutral-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Safe Zone</span>
          </button>

          {/* Squint / Blur Test */}
          <button
            onClick={cycleBlur}
            title="Squint Test (Test visual hierarchy when blurred/small)"
            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all ${
              blurLevel !== 'none'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-xs'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-neutral-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Squint:</span>
            <span className="capitalize">{blurLevel}</span>
          </button>

          {/* Grayscale / B&W Contrast Test */}
          <button
            onClick={() => setGrayscale(!grayscale)}
            title="Grayscale Contrast Test (Evaluate luminance without color bias)"
            className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all ${
              grayscale
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-xs'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-neutral-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">B&W</span>
          </button>

          {/* YouTube Light/Dark Mode in Preview */}
          <button
            onClick={() => setPreviewTheme(previewTheme === 'dark' ? 'light' : 'dark')}
            title="Toggle YouTube Preview Dark / Light Mode"
            className="flex items-center justify-center p-2 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
          >
            {previewTheme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          {/* Blind Test (Desktop) */}
          <button
            onClick={onOpenBlindTest}
            className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm shadow-red-600/20"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Blind Test</span>
          </button>

          {/* Support / Tip */}
          <button
            onClick={onOpenSupport}
            title="Support ThumbSplit via PayPal or Crypto"
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-pink-500/30 bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 hover:text-pink-300 transition-all shadow-xs"
          >
            <Heart className="w-3.5 h-3.5 fill-pink-500" />
            <span className="hidden sm:inline">Tip / Support</span>
          </button>

          {/* GitHub Repository */}
          <a
            href="https://github.com/dimiboy/thumbsplit"
            target="_blank"
            rel="noopener noreferrer"
            title="Star & View Source on GitHub"
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all shadow-xs"
          >
            <GithubIcon className="w-3.5 h-3.5 fill-current" />
            <span className="hidden lg:inline">GitHub</span>
          </a>

          {/* Reset */}
          <button
            onClick={onReset}
            title="Reset to default sample data"
            className="p-2 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
