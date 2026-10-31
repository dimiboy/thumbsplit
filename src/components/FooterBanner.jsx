import React, { useState } from 'react';
import { ShieldCheck, Heart, Copy, Check, ExternalLink } from 'lucide-react';
import YoutubeIcon from './YoutubeIcon';

export default function FooterBanner({ variants, channel }) {
  const [copied, setCopied] = useState(false);

  const copySummary = () => {
    const text = `🎯 YouTube A/B Split Test Plan (${channel.name})\n\n` +
      variants.map((v, idx) => `• ${v.name} (${v.title.length} chars):\n  Title: "${v.title}"\n  Angle: ${v.subtitle || 'N/A'}`).join('\n\n') +
      `\n\nTested via ThumbSplit by DimusTech`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="mt-14 pt-8 pb-12 border-t border-neutral-800/80 max-w-7xl mx-auto px-4">
      {/* Share / Export Bar */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-red-600/10 text-red-500 border border-red-500/20">
            <YoutubeIcon className="w-5 h-5 fill-red-500" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-neutral-200">Share or Save Your Test Comparison</h4>
            <p className="text-xs text-neutral-400">Copy titles, character lengths, and angles to send to your video editor or community</p>
          </div>
        </div>

        <button
          onClick={copySummary}
          className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-semibold px-4 py-2.5 rounded-xl border border-neutral-700 transition-all hover:scale-105 active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-neutral-300" />
              <span>Copy A/B Test Summary</span>
            </>
          )}
        </button>
      </div>

      {/* Non-intrusive AdSense / Affiliate Banner Slot Placeholder */}
      <div className="w-full bg-neutral-900/40 border border-dashed border-neutral-800 rounded-2xl p-4 text-center my-6">
        <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
          Sponsor / Community Notice
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-neutral-300">
          <span>Subscribe to <strong className="text-white">DimusTech</strong> on YouTube for real-world tech reviews, smart home automation & PC guides.</span>
          <a
            href="https://youtube.com/c/dimustech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-semibold hover:underline"
          >
            <span>Visit Channel</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Trust & Local First Badges */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>100% Private & Client-Side. Your images and titles never leave your browser.</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span>Crafted for creators by</span>
          <a
            href="https://youtube.com/c/dimustech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white font-medium hover:underline"
          >
            DimusTech
          </a>
        </div>
      </div>
    </footer>
  );
}
