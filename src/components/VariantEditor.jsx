import React, { useRef, useEffect } from 'react';
import { Plus, Trash2, Upload, AlertCircle, Sparkles, Check, Clipboard } from 'lucide-react';
import YouTubeThumbnail from './YouTubeThumbnail';

export default function VariantEditor({
  variants,
  setVariants,
  channel,
  showSafeZones,
  blurLevel,
  grayscale
}) {
  const fileInputRefs = useRef({});

  // Global paste handler to paste images into the currently focused or first variant
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              // By default update Variant A or the first variant that needs an image
              setVariants((prev) => {
                const targetIdx = prev.findIndex((v) => !v.thumbnail) !== -1 ? prev.findIndex((v) => !v.thumbnail) : 0;
                return prev.map((v, i) => (i === targetIdx ? { ...v, thumbnail: event.target?.result } : v));
              });
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [setVariants]);

  const handleFileUpload = (id, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setVariants((prev) =>
        prev.map((v) => (v.id === id ? { ...v, thumbnail: event.target?.result } : v))
      );
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(id, file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const addVariant = () => {
    if (variants.length >= 4) return;
    const letters = ['A', 'B', 'C', 'D'];
    const nextLetter = letters[variants.length];
    const newVariant = {
      id: `var-${nextLetter.toLowerCase()}`,
      name: `Variant ${nextLetter}`,
      title: `New Title Concept for Variant ${nextLetter}`,
      subtitle: `Concept ${nextLetter}`,
      thumbnail: null
    };
    setVariants([...variants, newVariant]);
  };

  const removeVariant = (id) => {
    if (variants.length <= 1) return;
    setVariants(variants.filter((v) => v.id !== id));
  };

  const getCharCountStatus = (length) => {
    if (length <= 50) {
      return {
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        text: 'Optimal for mobile & desktop'
      };
    } else if (length <= 70) {
      return {
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        text: 'Good for desktop, may truncate on small phones'
      };
    } else {
      return {
        color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
        text: 'Over 70 chars: Will truncate with "..." in feeds'
      };
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
            <span>Thumbnail & Title Variants</span>
            <span className="text-xs font-normal text-neutral-400">({variants.length} of 4)</span>
          </h2>
          <p className="text-xs text-neutral-400">
            Drag & drop images, click to upload, or press <kbd className="px-1 py-0.5 bg-neutral-800 text-neutral-300 rounded text-[10px] font-mono">Ctrl+V</kbd> to paste from clipboard
          </p>
        </div>

        {variants.length < 4 && (
          <button
            onClick={addVariant}
            className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-red-500" />
            <span>Add Variant {String.fromCharCode(65 + variants.length)}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {variants.map((v, index) => {
          const charStatus = getCharCountStatus(v.title.length);
          const accentColor = index === 0 ? 'border-red-500/40 text-red-400' : index === 1 ? 'border-emerald-500/40 text-emerald-400' : 'border-purple-500/40 text-purple-400';

          return (
            <div
              key={v.id}
              className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-4 flex flex-col gap-3.5 shadow-sm relative group"
            >
              {/* Variant Top Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${accentColor} bg-neutral-950/60`}>
                    {v.name}
                  </span>
                  <input
                    type="text"
                    value={v.subtitle || ''}
                    placeholder="Angle note (e.g. Curiosity hook)"
                    onChange={(e) =>
                      setVariants((prev) =>
                        prev.map((item) => (item.id === v.id ? { ...item, subtitle: e.target.value } : item))
                      )
                    }
                    className="text-xs text-neutral-400 bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-red-500 focus:outline-none px-1"
                  />
                </div>

                {variants.length > 1 && (
                  <button
                    onClick={() => removeVariant(v.id)}
                    title="Remove this variant"
                    className="text-neutral-500 hover:text-rose-400 p-1 rounded-md hover:bg-neutral-800 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Title Input & Char Count */}
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <label className="text-neutral-400 font-medium">Video Title</label>
                  <div className="flex items-center gap-1.5">
                    <span className={`px-1.5 py-0.5 rounded border text-[10px] font-mono ${charStatus.color}`}>
                      {v.title.length} chars
                    </span>
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={v.title}
                  onChange={(e) =>
                    setVariants((prev) =>
                      prev.map((item) => (item.id === v.id ? { ...item, title: e.target.value } : item))
                    )
                  }
                  placeholder="Enter your YouTube video title..."
                  className="w-full bg-neutral-950/90 border border-neutral-800 rounded-xl p-2.5 text-sm font-medium text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none transition-all"
                />

                <div className="mt-1 flex items-center justify-between text-[10px] text-neutral-500">
                  <span className="truncate">{charStatus.text}</span>
                  <span className="text-neutral-400">{v.title.split(/\s+/).filter(Boolean).length} words</span>
                </div>
              </div>

              {/* Thumbnail Drop Zone & Live Preview */}
              <div>
                <label className="block text-[11px] font-medium text-neutral-400 mb-1.5">
                  Thumbnail Image (16:9 / 1280x720)
                </label>

                {v.thumbnail ? (
                  <div className="relative">
                    <YouTubeThumbnail
                      src={v.thumbnail}
                      duration={channel.duration}
                      showSafeZones={showSafeZones}
                      blurLevel={blurLevel}
                      grayscale={grayscale}
                    />

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <button
                        onClick={() => fileInputRefs.current[v.id]?.click()}
                        className="text-xs text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Change Image</span>
                      </button>

                      <button
                        onClick={() =>
                          setVariants((prev) =>
                            prev.map((item) => (item.id === v.id ? { ...item, thumbnail: null } : item))
                          )
                        }
                        className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDrop={(e) => handleDrop(v.id, e)}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRefs.current[v.id]?.click()}
                    className="border-2 border-dashed border-neutral-800 hover:border-red-500/60 rounded-xl aspect-video flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-neutral-800/20 transition-all text-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 mb-2">
                      <Upload className="w-5 h-5 text-neutral-300" />
                    </div>
                    <p className="text-xs font-semibold text-neutral-200">
                      Drop thumbnail image here
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      or click to browse • supports PNG, JPG, WebP
                    </p>
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                      <Clipboard className="w-3 h-3 text-red-400" />
                      <span>Tip: Press Ctrl+V to paste image</span>
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => (fileInputRefs.current[v.id] = el)}
                  onChange={(e) => handleFileUpload(v.id, e.target.files?.[0])}
                  className="hidden"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
