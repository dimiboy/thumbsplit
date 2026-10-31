import React, { useState } from 'react';
import { X, Heart, Coffee, Copy, Check, ExternalLink } from 'lucide-react';

export default function SupportModal({ isOpen, onClose }) {
  const [copiedBtc, setCopiedBtc] = useState(false);
  const btcAddress = "1344MBr6fkTYAzo64yQxjXNQDHC84THP3z";

  if (!isOpen) return null;

  const handleCopyBtc = () => {
    navigator.clipboard.writeText(btcAddress);
    setCopiedBtc(true);
    setTimeout(() => setCopiedBtc(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-500 border border-pink-500/20">
            <Heart className="w-5 h-5 fill-pink-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Support ThumbSplit</h3>
            <p className="text-xs text-neutral-400">100% free, private & open-source</p>
          </div>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed mb-6">
          ThumbSplit is built by <strong className="text-white">DimusTech</strong> to help fellow YouTube creators craft higher CTR thumbnails with zero data tracking. If you find this tool helpful, a tip helps keep it maintained and ad-free!
        </p>

        {/* Payment Methods */}
        <div className="space-y-4">
          {/* PayPal */}
          <div className="bg-neutral-950 border border-neutral-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-neutral-200">PayPal / Tip</span>
              </div>
              <span className="text-[11px] text-neutral-500">paypal.me/dimiboy</span>
            </div>
            <a
              href="https://paypal.me/dimiboy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#0070BA] hover:bg-[#005ea6] text-white text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm"
            >
              <span>Tip via PayPal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Bitcoin */}
          <div className="bg-neutral-950 border border-neutral-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-500 font-bold text-[10px] flex items-center justify-center">₿</span>
                <span className="text-sm font-semibold text-neutral-200">Bitcoin (BTC)</span>
              </div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Native Network</span>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 flex items-center justify-between gap-2">
              <code className="text-[11px] text-neutral-300 font-mono select-all truncate">
                {btcAddress}
              </code>
              <button
                onClick={handleCopyBtc}
                title="Copy Bitcoin Address"
                className="p-1.5 rounded-md hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors shrink-0"
              >
                {copiedBtc ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            {copiedBtc && (
              <p className="text-[10px] text-emerald-400 mt-1.5 flex items-center gap-1">
                <Check className="w-3 h-3" /> Address copied to clipboard!
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-neutral-800 text-center">
          <p className="text-[11px] text-neutral-500">
            Thank you for supporting independent creator tools! ❤️
          </p>
        </div>
      </div>
    </div>
  );
}
