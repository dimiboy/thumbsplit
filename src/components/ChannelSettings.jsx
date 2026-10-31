import React, { useState } from 'react';
import { SlidersHorizontal, CheckCircle, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';

export default function ChannelSettings({ channel, setChannel }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setChannel((prev) => ({ ...prev, avatar: event.target?.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl mb-6 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-neutral-800/40 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={channel.avatar}
              alt={channel.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-neutral-700"
            />
            {channel.verified && (
              <span className="absolute -bottom-1 -right-1 bg-neutral-900 rounded-full">
                <CheckCircle className="w-3.5 h-3.5 text-neutral-400 fill-current" />
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-neutral-200">{channel.name}</span>
              <span className="text-xs text-neutral-400">• {channel.duration}</span>
              <span className="text-xs text-neutral-400">• {channel.views}</span>
            </div>
            <p className="text-[11px] text-neutral-400">Click to customize Channel Name, Avatar, Duration & Stats</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-neutral-400 text-xs">
          <SlidersHorizontal className="w-4 h-4" />
          <span>{isOpen ? 'Close Settings' : 'Video Metadata'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 border-t border-neutral-800/80 bg-neutral-950/40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Channel Name */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
              Channel Name
            </label>
            <input
              type="text"
              value={channel.name}
              onChange={(e) => setChannel((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-100 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Video Duration */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
              Duration Badge
            </label>
            <input
              type="text"
              value={channel.duration}
              onChange={(e) => setChannel((prev) => ({ ...prev, duration: e.target.value }))}
              placeholder="14:28"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-100 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Views Count */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
              Simulated Views
            </label>
            <input
              type="text"
              value={channel.views}
              onChange={(e) => setChannel((prev) => ({ ...prev, views: e.target.value }))}
              placeholder="128K views"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-100 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Time Ago */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
              Published Ago
            </label>
            <input
              type="text"
              value={channel.timeAgo}
              onChange={(e) => setChannel((prev) => ({ ...prev, timeAgo: e.target.value }))}
              placeholder="3 days ago"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-100 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Avatar & Verified */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                Avatar Photo
              </label>
              <label className="cursor-pointer flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-300">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
              </label>
            </div>

            <div className="pt-5">
              <label className="flex items-center gap-1.5 cursor-pointer text-xs text-neutral-300">
                <input
                  type="checkbox"
                  checked={channel.verified}
                  onChange={(e) => setChannel((prev) => ({ ...prev, verified: e.target.checked }))}
                  className="rounded bg-neutral-900 border-neutral-700 text-red-600 focus:ring-0"
                />
                <span>Verified</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
