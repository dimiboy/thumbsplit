import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function PrivacyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#181818] border border-neutral-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Privacy Policy & Terms</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-neutral-300 leading-relaxed">
          <section>
            <h4 className="text-sm font-semibold text-white mb-1">1. Client-Side Only Data Architecture</h4>
            <p>
              ThumbSplit is designed with a strict privacy-first architecture. All image uploads, title inputs,
              and preview renders are processed 100% locally in your web browser. No thumbnail images, titles,
              or user content are ever uploaded to, transmitted across, or stored on our servers.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-white mb-1">2. Local Storage</h4>
            <p>
              Your channel name, handle, avatar selection, and workspace preferences may be saved locally in
              your browser's <code className="bg-neutral-800 px-1 py-0.5 rounded text-neutral-200">localStorage</code> for
              your convenience between sessions. This data never leaves your device.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-white mb-1">3. Third-Party Services & Advertising</h4>
            <p>
              We may partner with third-party advertising networks such as Google AdSense to display non-intrusive ads.
              Google and its partners use cookies to serve ads based on prior visits to this website or other sites.
              You may opt out of personalized advertising by visiting Google's Ads Settings or <a href="https://www.aboutads.info" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">aboutads.info</a>.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-white mb-1">4. Affiliate Disclosure</h4>
            <p>
              ThumbSplit may contain affiliate links to creator gear and tools. If you click and make a purchase,
              we may earn an affiliate commission at no extra cost to you.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-white mb-1">5. Contact</h4>
            <p>
              For questions or feedback regarding ThumbSplit, contact us via DimusTech on YouTube or DimusTech.net.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-800 flex justify-end bg-neutral-900/50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
