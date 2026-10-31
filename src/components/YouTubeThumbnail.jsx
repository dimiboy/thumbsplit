import React from 'react';
import { Clock, ListPlus, AlertTriangle } from 'lucide-react';

export default function YouTubeThumbnail({
  src,
  duration = "14:28",
  showSafeZones = false,
  blurLevel = "none", // "none" | "low" | "high"
  grayscale = false,
  className = "",
  onClick = null,
  rounded = "rounded-xl"
}) {
  const getFilterStyle = () => {
    const filters = [];
    if (blurLevel === "low") filters.push("blur(2.5px)");
    if (blurLevel === "high") filters.push("blur(6px)");
    if (grayscale) filters.push("grayscale(100%)");
    return filters.length > 0 ? filters.join(" ") : undefined;
  };

  return (
    <div
      onClick={onClick}
      className={`relative group aspect-video w-full overflow-hidden bg-neutral-900 ${rounded} select-none ${className}`}
    >
      {/* Thumbnail Image */}
      {src ? (
        <img
          src={src}
          alt="YouTube Thumbnail"
          className="w-full h-full object-cover transition-all duration-200"
          style={{ filter: getFilterStyle() }}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 bg-neutral-900 border border-neutral-800">
          <span className="text-sm font-medium">No Thumbnail</span>
        </div>
      )}

      {/* Standard YouTube Hover Overlay Controls (Top Right) */}
      <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-black/80 hover:bg-black p-1.5 rounded text-white shadow-md backdrop-blur-xs flex items-center justify-center">
          <Clock className="w-4 h-4" />
        </div>
        <div className="bg-black/80 hover:bg-black p-1.5 rounded text-white shadow-md backdrop-blur-xs flex items-center justify-center">
          <ListPlus className="w-4 h-4" />
        </div>
      </div>

      {/* YouTube Timestamp Badge (Bottom Right) */}
      <div className="absolute bottom-2 right-2 bg-black/85 text-white font-medium text-[11px] px-1.5 py-0.5 rounded tracking-wide shadow-md">
        {duration}
      </div>

      {/* Safe Zone Overlay */}
      {showSafeZones && (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-2">
          {/* Top Right Queue / Watch Later Hazard */}
          <div className="flex justify-end">
            <div className="bg-red-500/30 border border-red-500/80 rounded px-2 py-1 text-[10px] text-red-200 font-bold backdrop-blur-xs flex items-center gap-1 shadow-sm">
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span>UI Buttons Hazard</span>
            </div>
          </div>

          {/* Bottom Area Hazards */}
          <div className="flex items-end justify-between">
            {/* Watch Progress Bar Hazard */}
            <div className="bg-amber-500/30 border border-amber-500/80 rounded px-1.5 py-0.5 text-[9px] text-amber-200 font-medium">
              Progress Bar Zone
            </div>

            {/* Timestamp Danger Zone */}
            <div className="bg-red-600/50 border-2 border-red-500 rounded p-1.5 text-center shadow-lg">
              <div className="text-[10px] font-black text-white uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-red-300 animate-pulse" />
                <span>Timestamp Block</span>
              </div>
              <div className="text-[9px] text-red-100 font-mono">Keep text & faces away!</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
