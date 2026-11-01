import React, { useEffect, useRef } from 'react';

/**
 * AdBanner - Non-intrusive AdSense Display Banner
 * @param {string} slotId - Google AdSense data-ad-slot
 * @param {string} format - Ad format ('auto', 'horizontal', 'rectangle')
 */
export default function AdBanner({ slotId = '6234153621', format = 'auto', className = '' }) {
  const adRef = useRef(null);
  const adPushed = useRef(false);

  useEffect(() => {
    // Only attempt to load if AdSense script is present and not pushed yet
    if (adPushed.current) return;

    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adPushed.current = true;
      }
    } catch (err) {
      // Ignore adsbygoogle duplicate push errors or adblocker blocks
      console.debug('AdSense push notice:', err);
    }
  }, [slotId]);

  return (
    <div className={`w-full my-8 ${className}`}>
      <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-3 sm:p-4 text-center overflow-hidden">
        <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium mb-2 select-none">
          Advertisement
        </div>
        
        <div ref={adRef} className="min-h-[90px] sm:min-h-[100px] flex items-center justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: '90px' }}
            data-ad-client="ca-pub-0969681426923712"
            data-ad-slot={slotId}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}
