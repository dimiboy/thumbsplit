import React, { useState } from 'react';
import { Search, SlidersHorizontal, CheckCircle, MoreVertical } from 'lucide-react';
import YouTubeThumbnail from '../YouTubeThumbnail';
import { MOCK_COMPETITORS } from '../../data/mockFeed';

export default function SearchResultsView({
  variants,
  channel,
  previewTheme,
  showSafeZones,
  blurLevel,
  grayscale
}) {
  const [searchQuery, setSearchQuery] = useState('best budget nvme ssd 2026');

  const bgClass = previewTheme === 'dark' ? 'bg-[#0f0f0f] text-[#f1f1f1]' : 'bg-[#ffffff] text-[#0f0f0f]';
  const subTextClass = previewTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600';
  const borderClass = previewTheme === 'dark' ? 'border-neutral-800' : 'border-neutral-200';
  const inputBgClass = previewTheme === 'dark' ? 'bg-[#121212] border-neutral-700 text-white' : 'bg-neutral-50 border-neutral-300 text-black';

  return (
    <div className={`rounded-2xl border ${borderClass} ${bgClass} p-6 shadow-2xl transition-colors`}>
      {/* Search Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-neutral-800/80 mb-6">
        <div className="flex items-center w-full max-w-lg">
          <div className={`flex items-center w-full px-3.5 py-2 rounded-full border ${inputBgClass}`}>
            <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search YouTube..."
              className="w-full bg-transparent text-sm focus:outline-none"
            />
          </div>
        </div>

        <button className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-neutral-700/80 bg-neutral-800/60 hover:bg-neutral-800 transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-300" />
          <span>Filters</span>
        </button>
      </div>

      {/* Search Results List */}
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        {/* Your Variants Ranked #1 and #2 */}
        {variants.map((v, idx) => (
          <div
            key={`search-${v.id}`}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 group cursor-pointer p-2 rounded-2xl hover:bg-neutral-800/20 transition-all border border-transparent hover:border-neutral-800"
          >
            {/* Thumbnail Left (360px on desktop) */}
            <div className="w-full sm:w-80 md:w-96 shrink-0">
              <div className="flex items-center justify-between mb-1.5 px-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  Rank #{idx + 1} • {v.name}
                </span>
                <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-1.5 py-0.2 rounded font-medium">
                  {v.title.length} chars
                </span>
              </div>
              <YouTubeThumbnail
                src={v.thumbnail}
                duration={channel.duration}
                showSafeZones={showSafeZones}
                blurLevel={blurLevel}
                grayscale={grayscale}
                rounded="rounded-2xl"
              />
            </div>

            {/* Video Details Right */}
            <div className="flex-1 min-w-0 flex flex-col justify-start">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-base md:text-lg leading-snug group-hover:text-red-500 transition-colors">
                  {v.title}
                </h3>
                <button className="text-neutral-400 opacity-0 group-hover:opacity-100 p-1">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className={`text-xs mt-1 ${subTextClass} flex items-center gap-1.5`}>
                <span>{channel.views}</span>
                <span>•</span>
                <span>{channel.timeAgo}</span>
              </div>

              {/* Channel Row */}
              <div className="flex items-center gap-2 mt-3">
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className={`text-xs font-medium ${subTextClass} hover:opacity-90`}>
                  {channel.name}
                </span>
                {channel.verified && <CheckCircle className="w-3 h-3 text-neutral-400 fill-current" />}
              </div>

              {/* Video Description Snippet */}
              <p className={`text-xs mt-3 ${subTextClass} line-clamp-2 leading-relaxed`}>
                {channel.description || 'Comprehensive review and benchmarks testing the best budget Gen4 NVMe SSDs available this year. Real sustained write speeds, DRAM cache, and temperature throttle testing.'}
              </p>

              {/* Badges */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[10px] font-semibold bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
                  4K
                </span>
                <span className="text-[10px] font-semibold bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
                  CC
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Competitor Ranked below */}
        {MOCK_COMPETITORS.slice(0, 2).map((comp, idx) => (
          <div
            key={`search-comp-${comp.id}`}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 group cursor-pointer p-2 rounded-2xl hover:bg-neutral-800/20 transition-all opacity-85 hover:opacity-100"
          >
            <div className="w-full sm:w-80 md:w-96 shrink-0">
              <div className="text-[10px] text-neutral-500 mb-1.5 px-0.5">
                Competitor Rank #{variants.length + idx + 1}
              </div>
              <YouTubeThumbnail
                src={comp.thumbnail}
                duration={comp.duration}
                showSafeZones={false}
                blurLevel={blurLevel}
                grayscale={grayscale}
                rounded="rounded-2xl"
              />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-start">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-base md:text-lg leading-snug">
                  {comp.title}
                </h3>
                <button className="text-neutral-400 opacity-0 group-hover:opacity-100 p-1">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className={`text-xs mt-1 ${subTextClass} flex items-center gap-1.5`}>
                <span>{comp.views}</span>
                <span>•</span>
                <span>{comp.timeAgo}</span>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <img
                  src={comp.avatar}
                  alt={comp.channel}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className={`text-xs font-medium ${subTextClass}`}>
                  {comp.channel}
                </span>
                {comp.verified && <CheckCircle className="w-3 h-3 text-neutral-400 fill-current" />}
              </div>

              <p className={`text-xs mt-3 ${subTextClass} line-clamp-2 leading-relaxed`}>
                Detailed hardware testing and breakdown comparison covering architecture, endurance benchmarks, and best value options.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
