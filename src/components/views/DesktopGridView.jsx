import React, { useState } from 'react';
import {
  Search,
  Mic,
  Video,
  Bell,
  CheckCircle,
  MoreVertical,
  SlidersHorizontal
} from 'lucide-react';
import YoutubeIcon from '../YoutubeIcon';
import YouTubeThumbnail from '../YouTubeThumbnail';
import { MOCK_COMPETITORS } from '../../data/mockFeed';

export default function DesktopGridView({
  variants,
  channel,
  previewTheme,
  showSafeZones,
  blurLevel,
  grayscale
}) {
  const [activeChip, setActiveChip] = useState('All');
  const [slotVariantA, setSlotVariantA] = useState(0); // 0 = first position
  const [slotVariantB, setSlotVariantB] = useState(2); // 2 = third position

  const chips = ['All', 'DimusTech', 'NVMe SSDs', 'PC Hardware', 'Tech Reviews', 'Smart Home', 'Gadgets', 'DIY Benchmarks'];

  const bgClass = previewTheme === 'dark' ? 'bg-[#0f0f0f] text-[#f1f1f1]' : 'bg-[#ffffff] text-[#0f0f0f]';
  const headerClass = previewTheme === 'dark' ? 'border-neutral-800 bg-[#0f0f0f]' : 'border-neutral-200 bg-[#ffffff]';
  const subTextClass = previewTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600';
  const inputBgClass = previewTheme === 'dark' ? 'bg-[#121212] border-neutral-700 text-white' : 'bg-neutral-50 border-neutral-300 text-black';

  // Construct the feed items array:
  // Slot 0: Variant A (or user preference)
  // Slot 1: Competitor 0 (Dave2D)
  // Slot 2: Variant B (or user preference)
  // Slot 3: Competitor 1 (TechLinked)
  // Slot 4: Competitor 2 (Optimum)
  // Slot 5: Competitor 3 (Mrwhosetheboss)
  // Slot 6: Variant C (if exists, else Competitor 4)
  // Slot 7: Competitor 4 (Smart Home Solver)
  const feedItems = [
    { type: 'variant', data: variants[0] || null },
    { type: 'competitor', data: MOCK_COMPETITORS[0] },
    { type: 'variant', data: variants[1] || null },
    { type: 'competitor', data: MOCK_COMPETITORS[1] },
    { type: 'competitor', data: MOCK_COMPETITORS[2] },
    { type: 'competitor', data: MOCK_COMPETITORS[3] },
    { type: 'variant', data: variants[2] || null },
    { type: 'competitor', data: MOCK_COMPETITORS[4] },
  ].filter((item) => item.data !== null);

  return (
    <div className={`rounded-2xl border ${headerClass} ${bgClass} overflow-hidden shadow-2xl transition-colors`}>
      {/* Mock YouTube Desktop Header */}
      <div className={`px-4 py-2.5 border-b ${headerClass} flex items-center justify-between gap-4 select-none`}>
        {/* Left: YouTube Logo */}
        <div className="flex items-center gap-1.5">
          <div className="text-red-600">
            <YoutubeIcon className="w-6 h-6 fill-red-600" />
          </div>
          <span className="font-bold text-base tracking-tighter">YouTube</span>
          <span className="text-[10px] text-neutral-400 font-sans ml-1">IL</span>
        </div>

        {/* Center: Search Bar */}
        <div className="flex items-center max-w-xl w-full mx-auto">
          <div className="flex items-center w-full">
            <div className={`flex items-center w-full px-3 py-1.5 rounded-l-full border ${inputBgClass}`}>
              <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
              <input
                type="text"
                readOnly
                value="best budget nvme ssd 2026"
                className="w-full bg-transparent text-xs focus:outline-none cursor-default"
              />
            </div>
            <button className={`px-5 py-2 rounded-r-full border-y border-r ${headerClass} hover:opacity-80 transition-opacity`}>
              <Search className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </div>
          <div className={`ml-2 p-2 rounded-full border ${headerClass} hover:opacity-80`}>
            <Mic className="w-3.5 h-3.5 text-neutral-400" />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <div className="p-1.5 hover:opacity-80 cursor-pointer">
            <Video className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="p-1.5 hover:opacity-80 cursor-pointer">
            <Bell className="w-4 h-4 text-neutral-400" />
          </div>
          <img
            src={channel.avatar}
            alt="Profile"
            className="w-7 h-7 rounded-full object-cover ring-1 ring-neutral-700"
          />
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className={`px-4 py-2.5 border-b ${headerClass} flex items-center gap-2 overflow-x-auto`}>
        {chips.map((chip) => {
          const isSelected = activeChip === chip;
          return (
            <button
              key={chip}
              onClick={() => setActiveChip(chip)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-neutral-100 text-neutral-900 font-semibold shadow-xs'
                  : 'bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300'
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* Desktop Video Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
          {feedItems.map((item, index) => {
            if (item.type === 'variant') {
              const v = item.data;
              return (
                <div key={`feed-${v.id}-${index}`} className="flex flex-col group cursor-pointer">
                  {/* Highlight Ribbon for Creator Variant */}
                  <div className="flex items-center justify-between mb-1.5 px-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                      Your {v.name}
                    </span>
                    <span className="text-[10px] text-neutral-500">Position #{index + 1}</span>
                  </div>

                  {/* Thumbnail */}
                  <YouTubeThumbnail
                    src={v.thumbnail}
                    duration={channel.duration}
                    showSafeZones={showSafeZones}
                    blurLevel={blurLevel}
                    grayscale={grayscale}
                    rounded="rounded-xl"
                  />

                  {/* Video Meta Info */}
                  <div className="mt-3 flex gap-2.5 items-start">
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
                      <h4 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-red-500 transition-colors">
                        {v.title}
                      </h4>
                      <div className={`text-xs mt-1 ${subTextClass}`}>
                        <div className="flex items-center gap-1">
                          <span className="hover:opacity-90">{channel.name}</span>
                          {channel.verified && <CheckCircle className="w-3 h-3 text-neutral-400 fill-current inline" />}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span>{channel.views}</span>
                          <span>•</span>
                          <span>{channel.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    <button className="text-neutral-400 hover:text-neutral-200 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            } else {
              const comp = item.data;
              return (
                <div key={comp.id} className="flex flex-col group cursor-pointer opacity-90 hover:opacity-100 transition-opacity">
                  <div className="mb-1.5 text-[10px] text-neutral-500 px-0.5 flex justify-between">
                    <span>Competitor Feed Video</span>
                    <span>Position #{index + 1}</span>
                  </div>

                  {/* Thumbnail */}
                  <YouTubeThumbnail
                    src={comp.thumbnail}
                    duration={comp.duration}
                    showSafeZones={false}
                    blurLevel={blurLevel}
                    grayscale={grayscale}
                    rounded="rounded-xl"
                  />

                  {/* Video Meta Info */}
                  <div className="mt-3 flex gap-2.5 items-start">
                    <div className="relative shrink-0">
                      <img
                        src={comp.avatar}
                        alt={comp.channel}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      {comp.verified && (
                        <CheckCircle className="w-3 h-3 text-neutral-400 fill-current absolute -bottom-0.5 -right-0.5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm leading-snug line-clamp-2">
                        {comp.title}
                      </h4>
                      <div className={`text-xs mt-1 ${subTextClass}`}>
                        <div className="flex items-center gap-1">
                          <span>{comp.channel}</span>
                          {comp.verified && <CheckCircle className="w-3 h-3 text-neutral-400 fill-current inline" />}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span>{comp.views}</span>
                          <span>•</span>
                          <span>{comp.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    <button className="text-neutral-400 hover:text-neutral-200 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
