import React from 'react';
import { ThumbsUp, Share2, Bookmark, CheckCircle, MoreVertical, Play } from 'lucide-react';
import YouTubeThumbnail from '../YouTubeThumbnail';
import { MOCK_COMPETITORS } from '../../data/mockFeed';

export default function SidebarView({
  variants,
  channel,
  previewTheme,
  showSafeZones,
  blurLevel,
  grayscale
}) {
  const bgClass = previewTheme === 'dark' ? 'bg-[#0f0f0f] text-[#f1f1f1]' : 'bg-[#ffffff] text-[#0f0f0f]';
  const subTextClass = previewTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600';
  const borderClass = previewTheme === 'dark' ? 'border-neutral-800' : 'border-neutral-200';

  return (
    <div className={`rounded-2xl border ${borderClass} ${bgClass} p-5 shadow-2xl transition-colors`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Video Player Section (Left 7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Simulated Active Video Player */}
          <div className="relative aspect-video w-full bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-lg group">
            <img
              src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&auto=format&fit=crop&q=80"
              alt="Active Video"
              className="w-full h-full object-cover"
            />
            {/* Player Overlay Controls */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
            </div>
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-700">
              <div className="h-full bg-red-600 w-2/5" />
            </div>
          </div>

          {/* Video Title & Actions */}
          <div>
            <h1 className="text-lg font-bold leading-snug">
              NVMe SSD Speed Myth: Gen4 vs Gen5 Real World Test
            </h1>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
              <div className="flex items-center gap-3">
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1 font-semibold text-sm">
                    <span>{channel.name}</span>
                    {channel.verified && <CheckCircle className="w-3.5 h-3.5 text-neutral-400 fill-current" />}
                  </div>
                  <span className={`text-xs ${subTextClass}`}>145K subscribers</span>
                </div>
                <button className="ml-2 bg-neutral-100 text-neutral-950 font-semibold text-xs px-3.5 py-1.5 rounded-full hover:bg-neutral-200 transition-colors">
                  Subscribe
                </button>
              </div>

              {/* Engagement Buttons */}
              <div className="flex items-center gap-2 text-xs font-medium">
                <div className="flex items-center bg-neutral-800/80 rounded-full overflow-hidden border border-neutral-700/60">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-neutral-700 transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>8.4K</span>
                  </button>
                  <div className="w-[1px] h-4 bg-neutral-700" />
                  <button className="px-2.5 py-1.5 hover:bg-neutral-700 transition-colors">
                    Dislike
                  </button>
                </div>
                <button className="flex items-center gap-1.5 bg-neutral-800/80 hover:bg-neutral-700 px-3 py-1.5 rounded-full border border-neutral-700/60 transition-colors">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
                <button className="flex items-center gap-1.5 bg-neutral-800/80 hover:bg-neutral-700 px-3 py-1.5 rounded-full border border-neutral-700/60 transition-colors">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested / Up Next Sidebar (Right 5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800/60">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Suggested / Up Next Queue
            </h2>
            <span className="text-[11px] text-red-500 font-semibold">Testing Sidebar Legibility</span>
          </div>

          <div className="flex flex-col gap-3">
            {/* Display Your Variants inside Sidebar */}
            {variants.map((v, idx) => (
              <div
                key={`side-${v.id}`}
                className="flex gap-2.5 group cursor-pointer p-1.5 rounded-xl hover:bg-neutral-800/30 transition-colors border border-transparent hover:border-neutral-800"
              >
                {/* 168x94 Thumbnail (Compact) */}
                <div className="w-40 sm:w-44 shrink-0">
                  <div className="mb-0.5 flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-red-500">
                      Your {v.name}
                    </span>
                  </div>
                  <YouTubeThumbnail
                    src={v.thumbnail}
                    duration={channel.duration}
                    showSafeZones={showSafeZones}
                    blurLevel={blurLevel}
                    grayscale={grayscale}
                    rounded="rounded-lg"
                  />
                </div>

                {/* Video Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-start pt-3">
                  <h4 className="font-semibold text-xs leading-snug line-clamp-2 group-hover:text-red-500 transition-colors">
                    {v.title}
                  </h4>
                  <div className={`text-[11px] mt-1 ${subTextClass}`}>
                    <div className="flex items-center gap-1">
                      <span className="hover:opacity-90">{channel.name}</span>
                      {channel.verified && <CheckCircle className="w-2.5 h-2.5 text-neutral-400 fill-current inline" />}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span>{channel.views}</span>
                      <span>•</span>
                      <span>{channel.timeAgo}</span>
                    </div>
                  </div>
                </div>

                <button className="text-neutral-400 opacity-0 group-hover:opacity-100 p-1 self-start">
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Competitor Suggested Videos */}
            {MOCK_COMPETITORS.slice(0, 3).map((comp) => (
              <div
                key={`side-comp-${comp.id}`}
                className="flex gap-2.5 group cursor-pointer p-1.5 rounded-xl hover:bg-neutral-800/30 transition-colors opacity-85 hover:opacity-100"
              >
                <div className="w-40 sm:w-44 shrink-0">
                  <YouTubeThumbnail
                    src={comp.thumbnail}
                    duration={comp.duration}
                    showSafeZones={false}
                    blurLevel={blurLevel}
                    grayscale={grayscale}
                    rounded="rounded-lg"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-start pt-1">
                  <h4 className="font-semibold text-xs leading-snug line-clamp-2">
                    {comp.title}
                  </h4>
                  <div className={`text-[11px] mt-1 ${subTextClass}`}>
                    <div className="flex items-center gap-1">
                      <span>{comp.channel}</span>
                      {comp.verified && <CheckCircle className="w-2.5 h-2.5 text-neutral-400 fill-current inline" />}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span>{comp.views}</span>
                      <span>•</span>
                      <span>{comp.timeAgo}</span>
                    </div>
                  </div>
                </div>

                <button className="text-neutral-400 opacity-0 group-hover:opacity-100 p-1 self-start">
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
