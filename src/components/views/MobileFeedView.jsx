import React, { useState } from 'react';
import {
  Cast,
  Bell,
  Search,
  MoreVertical,
  CheckCircle,
  Home,
  Compass,
  PlusCircle,
  FolderMinus,
  User,
  Wifi,
  BatteryMedium
} from 'lucide-react';
import YouTubeThumbnail from '../YouTubeThumbnail';
import { MOCK_COMPETITORS } from '../../data/mockFeed';

export default function MobileFeedView({
  variants,
  channel,
  previewTheme,
  showSafeZones,
  blurLevel,
  grayscale
}) {
  const [activeVariantTab, setActiveVariantTab] = useState('all'); // 'all' | variant.id

  const bgClass = previewTheme === 'dark' ? 'bg-[#0f0f0f] text-[#f1f1f1]' : 'bg-[#ffffff] text-[#0f0f0f]';
  const subTextClass = previewTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600';
  const borderClass = previewTheme === 'dark' ? 'border-neutral-800' : 'border-neutral-200';

  return (
    <div className="flex flex-col items-center">
      {/* Controls Bar */}
      <div className="w-full max-w-sm mb-4 flex items-center justify-between text-xs bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-800">
        <span className="text-neutral-400 font-medium">Display in Phone:</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveVariantTab('all')}
            className={`px-2 py-1 rounded text-xs transition-colors ${
              activeVariantTab === 'all'
                ? 'bg-red-600 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            All Variants
          </button>
          {variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveVariantTab(v.id)}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                activeVariantTab === v.id
                  ? 'bg-red-600 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>
      </div>

      {/* Smartphone Device Frame Mockup */}
      <div className="relative w-full max-w-[380px] bg-neutral-950 p-3 rounded-[44px] shadow-2xl border-4 border-neutral-700/80 ring-1 ring-black">
        {/* Phone Speaker & Camera Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-neutral-900 rounded-full flex items-center justify-center gap-2 z-30">
          <div className="w-10 h-1 bg-neutral-800 rounded-full" />
          <div className="w-2.5 h-2.5 bg-neutral-800 rounded-full" />
        </div>

        {/* Screen Content */}
        <div className={`w-full rounded-[32px] overflow-hidden ${bgClass} flex flex-col h-[740px] select-none relative`}>
          {/* iOS / Android Status Bar */}
          <div className="pt-2 px-6 pb-1 flex items-center justify-between text-[11px] font-semibold opacity-80 z-20">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono">5G</span>
              <Wifi className="w-3 h-3" />
              <BatteryMedium className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* YouTube Mobile App Top Bar */}
          <div className={`px-4 py-2 border-b ${borderClass} flex items-center justify-between z-10`}>
            <div className="flex items-center gap-1 text-red-600 font-bold text-base tracking-tighter">
              <span>YouTube</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-400">
              <Cast className="w-4 h-4" />
              <Bell className="w-4 h-4" />
              <Search className="w-4 h-4" />
              <img
                src={channel.avatar}
                alt="Account"
                className="w-6 h-6 rounded-full object-cover"
              />
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className={`px-3 py-2 border-b ${borderClass} flex items-center gap-2 overflow-x-hidden text-[11px]`}>
            <span className="bg-neutral-800 text-neutral-100 font-semibold px-2.5 py-1 rounded-lg">All</span>
            <span className="bg-neutral-800/50 text-neutral-400 px-2.5 py-1 rounded-lg">DimusTech</span>
            <span className="bg-neutral-800/50 text-neutral-400 px-2.5 py-1 rounded-lg">SSDs</span>
            <span className="bg-neutral-800/50 text-neutral-400 px-2.5 py-1 rounded-lg">Hardware</span>
          </div>

          {/* Scrollable Mobile Feed Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-800/40 pb-14">
            {/* Show Selected Variants or All */}
            {variants
              .filter((v) => activeVariantTab === 'all' || activeVariantTab === v.id)
              .map((v) => (
                <div key={v.id} className="pb-4">
                  {/* Variant Tag Banner */}
                  <div className="px-3 pt-2 pb-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                      Testing {v.name}
                    </span>
                    <span className="text-[10px] text-neutral-500">{v.title.length} chars</span>
                  </div>

                  {/* 16:9 Thumbnail (full width on mobile) */}
                  <YouTubeThumbnail
                    src={v.thumbnail}
                    duration={channel.duration}
                    showSafeZones={showSafeZones}
                    blurLevel={blurLevel}
                    grayscale={grayscale}
                    rounded="rounded-none sm:rounded-none"
                  />

                  {/* Video Meta Info */}
                  <div className="px-3 pt-3 flex items-start gap-3">
                    <div className="relative shrink-0 mt-0.5">
                      <img
                        src={channel.avatar}
                        alt={channel.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      {channel.verified && (
                        <CheckCircle className="w-2.5 h-2.5 text-neutral-400 fill-current absolute -bottom-0.5 -right-0.5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold leading-tight line-clamp-2">
                        {v.title}
                      </h4>
                      <div className={`text-[11px] mt-1 ${subTextClass} flex items-center gap-1 flex-wrap`}>
                        <span>{channel.name}</span>
                        <span>•</span>
                        <span>{channel.views}</span>
                        <span>•</span>
                        <span>{channel.timeAgo}</span>
                      </div>
                    </div>

                    <button className="text-neutral-400 p-0.5 mt-0.5">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

            {/* Mock Competitor to show scrolling context */}
            <div className="pb-4">
              <div className="px-3 pt-2 pb-1 text-[10px] text-neutral-500">
                In-Feed Competitor
              </div>
              <YouTubeThumbnail
                src={MOCK_COMPETITORS[0].thumbnail}
                duration={MOCK_COMPETITORS[0].duration}
                showSafeZones={false}
                blurLevel={blurLevel}
                grayscale={grayscale}
                rounded="rounded-none"
              />
              <div className="px-3 pt-3 flex items-start gap-3">
                <img
                  src={MOCK_COMPETITORS[0].avatar}
                  alt={MOCK_COMPETITORS[0].channel}
                  className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold leading-tight line-clamp-2">
                    {MOCK_COMPETITORS[0].title}
                  </h4>
                  <div className={`text-[11px] mt-1 ${subTextClass} flex items-center gap-1`}>
                    <span>{MOCK_COMPETITORS[0].channel}</span>
                    <span>•</span>
                    <span>{MOCK_COMPETITORS[0].views}</span>
                    <span>•</span>
                    <span>{MOCK_COMPETITORS[0].timeAgo}</span>
                  </div>
                </div>
                <button className="text-neutral-400 p-0.5 mt-0.5">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* YouTube Mobile App Bottom Bar */}
          <div className={`absolute bottom-0 left-0 right-0 border-t ${borderClass} ${bgClass} py-2 px-6 flex items-center justify-between text-neutral-400 z-20`}>
            <div className="flex flex-col items-center gap-0.5 text-red-500">
              <Home className="w-4 h-4" />
              <span className="text-[9px] font-medium">Home</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <Compass className="w-4 h-4" />
              <span className="text-[9px] font-medium">Shorts</span>
            </div>
            <div className="flex flex-col items-center">
              <PlusCircle className="w-6 h-6 text-neutral-200" />
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <FolderMinus className="w-4 h-4" />
              <span className="text-[9px] font-medium">Subscriptions</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <User className="w-4 h-4" />
              <span className="text-[9px] font-medium">You</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
