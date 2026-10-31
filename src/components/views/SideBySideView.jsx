import React, { useState } from 'react';
import { CheckCircle, MoreVertical, AlertTriangle, Check, Smartphone, Monitor } from 'lucide-react';
import YouTubeThumbnail from '../YouTubeThumbnail';

export default function SideBySideView({
  variants,
  channel,
  previewTheme,
  showSafeZones,
  blurLevel,
  grayscale
}) {
  const [truncateMode, setTruncateMode] = useState('full'); // 'full' | 'mobile'

  const analyzeTitleHook = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes('stop') || lower.includes('mistake') || lower.includes('wrong') || lower.includes('avoid') || lower.includes("don't") || lower.includes('never')) {
      return { tag: 'Negative / Mistake Hook', note: 'High emotional urgency. Creators often see 15–25% higher CTR on caution-based framing.' };
    }
    if (lower.includes('best') || lower.includes('only') || lower.includes('top') || lower.includes('ultimate') || lower.includes('perfect')) {
      return { tag: 'Definitive Authority Hook', note: 'Satisfies search intent directly. Great for buyers seeking an unambiguous choice.' };
    }
    if (lower.includes('how to') || lower.includes('guide') || lower.includes('step') || lower.includes('tutorial')) {
      return { tag: 'Tutorial / Value Hook', note: 'Strong evergreen value and search durability.' };
    }
    if (lower.includes('?') || lower.includes('why') || lower.includes('what happens') || lower.includes('secret')) {
      return { tag: 'Curiosity Gap Hook', note: 'Invites viewer to click to resolve mystery.' };
    }
    if (/\d+/.test(title)) {
      return { tag: 'Numbered Listicle / Stat Hook', note: 'Numbers provide concrete expectation and boost click confidence.' };
    }
    return { tag: 'Descriptive Hook', note: 'Direct and clear. Consider adding a strong emotional trigger or stakes.' };
  };

  const getDisplayTitle = (title) => {
    if (truncateMode === 'mobile' && title.length > 52) {
      return title.slice(0, 50) + '...';
    }
    return title;
  };

  const bgTheme = previewTheme === 'dark' ? 'bg-[#0f0f0f] text-[#f1f1f1]' : 'bg-[#ffffff] text-[#0f0f0f]';
  const subTextTheme = previewTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600';
  const cardBorder = previewTheme === 'dark' ? 'border-neutral-800' : 'border-neutral-200';

  return (
    <div className="space-y-6">
      {/* View Options Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-900/50 p-3 rounded-xl border border-neutral-800">
        <div className="text-xs text-neutral-300 font-medium">
          Direct A/B Head-to-Head Comparison
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-neutral-400">Title Truncation:</span>
          <button
            onClick={() => setTruncateMode('full')}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-all ${
              truncateMode === 'full'
                ? 'bg-neutral-800 text-white border-neutral-700'
                : 'text-neutral-400 border-transparent hover:text-neutral-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Full (Desktop)</span>
          </button>
          <button
            onClick={() => setTruncateMode('mobile')}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-all ${
              truncateMode === 'mobile'
                ? 'bg-neutral-800 text-white border-neutral-700'
                : 'text-neutral-400 border-transparent hover:text-neutral-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Truncated (Mobile)</span>
          </button>
        </div>
      </div>

      {/* Side by Side Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-${Math.min(variants.length, 3)} gap-6`}>
        {variants.map((v, index) => {
          const hook = analyzeTitleHook(v.title);
          const accentColor = index === 0 ? 'text-red-400' : index === 1 ? 'text-emerald-400' : 'text-purple-400';

          return (
            <div
              key={v.id}
              className={`rounded-2xl border ${cardBorder} ${bgTheme} p-4 shadow-lg transition-all flex flex-col justify-between`}
            >
              <div>
                {/* Variant Header Label */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-black uppercase tracking-wider ${accentColor}`}>
                      {v.name}
                    </span>
                    {v.subtitle && (
                      <span className="text-[11px] opacity-60">({v.subtitle})</span>
                    )}
                  </div>
                  <span className="text-[11px] opacity-60 font-mono">
                    {v.title.length} characters
                  </span>
                </div>

                {/* YouTube Thumbnail Card */}
                <YouTubeThumbnail
                  src={v.thumbnail}
                  duration={channel.duration}
                  showSafeZones={showSafeZones}
                  blurLevel={blurLevel}
                  grayscale={grayscale}
                  rounded="rounded-xl"
                />

                {/* Video Info Row (Authentic YouTube styling) */}
                <div className="mt-3 flex gap-3 items-start">
                  <div className="relative shrink-0">
                    <img
                      src={channel.avatar}
                      alt={channel.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    {channel.verified && (
                      <CheckCircle className="w-3 h-3 text-neutral-400 fill-current absolute -bottom-0.5 -right-0.5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm leading-snug line-clamp-2">
                      {getDisplayTitle(v.title)}
                    </h3>
                    <div className={`text-xs mt-1 ${subTextTheme} flex items-center gap-1.5 flex-wrap`}>
                      <span className="font-medium hover:opacity-90">{channel.name}</span>
                      <span>•</span>
                      <span>{channel.views}</span>
                      <span>•</span>
                      <span>{channel.timeAgo}</span>
                    </div>
                  </div>

                  <button className="text-neutral-400 hover:text-neutral-200 p-1">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CTR & Readability Insights Box */}
              <div className="mt-5 pt-4 border-t border-neutral-800/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
                    CTR Diagnostic
                  </span>
                  <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-medium">
                    {hook.tag}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-900/40 p-2.5 rounded-lg border border-neutral-800/80">
                  {hook.note}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-neutral-900/60 p-2 rounded-lg border border-neutral-800 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-neutral-300">
                      {v.title.length <= 50 ? 'Optimal Length' : v.title.length <= 70 ? 'Acceptable Length' : 'Title Over 70 Chars'}
                    </span>
                  </div>
                  <div className="bg-neutral-900/60 p-2 rounded-lg border border-neutral-800 flex items-center gap-1.5">
                    {showSafeZones ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    )}
                    <span className="text-neutral-300">
                      {showSafeZones ? 'Check Safe Overlay' : 'Safe Zones Clean'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
