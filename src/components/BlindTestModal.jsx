import React, { useState, useEffect } from 'react';
import { X, Zap, Trophy, RotateCcw, Eye, Sparkles } from 'lucide-react';

export default function BlindTestModal({ isOpen, onClose, variants, channel }) {
  const [stage, setStage] = useState('intro'); // 'intro' | 'countdown' | 'test' | 'result'
  const [countdown, setCountdown] = useState(3);
  const [shuffled, setShuffled] = useState([]);
  const [winner, setWinner] = useState(null);
  const [clickTime, setClickTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [stats, setStats] = useState({ total: 0, wins: {} });

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setStage('intro');
      setWinner(null);
    }
  }, [isOpen]);

  // Countdown timer before flash
  useEffect(() => {
    let timer;
    if (stage === 'countdown') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else {
        // Start test!
        setStage('test');
        setStartTime(Date.now());
      }
    }
    return () => clearTimeout(timer);
  }, [stage, countdown]);

  if (!isOpen) return null;

  const startTest = () => {
    // Shuffle the first 2 variants
    const sample = variants.slice(0, 2);
    const isSwapped = Math.random() > 0.5;
    const items = isSwapped ? [sample[1], sample[0]] : [sample[0], sample[1]];

    setShuffled(items);
    setCountdown(3);
    setWinner(null);
    setStage('countdown');
  };

  const handlePick = (chosenVariant) => {
    if (stage !== 'test') return;
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    setClickTime(duration);
    setWinner(chosenVariant);
    setStage('result');

    setStats((prev) => ({
      total: prev.total + 1,
      wins: {
        ...prev.wins,
        [chosenVariant.id]: (prev.wins[chosenVariant.id] || 0) + 1
      }
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Subconscious Eye-Tracking Test
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white">
          3-Second Visual Snapping Test
        </h2>
        <p className="text-xs text-neutral-400 max-w-lg mt-1 mb-6">
          Real YouTube viewers glance at thumbnails for under 2 seconds. We'll blind-shuffle your variants. Click whichever grabs your focus first!
        </p>

        {/* STAGE 1: INTRO */}
        {stage === 'intro' && (
          <div className="flex flex-col items-center gap-6 py-6">
            <div className="flex items-center gap-4 text-sm text-neutral-300">
              <span className="px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 font-semibold text-red-400">
                {variants[0]?.name || 'Variant A'}
              </span>
              <span className="font-bold text-neutral-500">VS</span>
              <span className="px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 font-semibold text-emerald-400">
                {variants[1]?.name || 'Variant B'}
              </span>
            </div>

            <button
              onClick={startTest}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-red-600/20 transition-all hover:scale-105"
            >
              <Zap className="w-4 h-4" />
              <span>Begin 3-Second Test</span>
            </button>
          </div>
        )}

        {/* STAGE 2: COUNTDOWN */}
        {stage === 'countdown' && (
          <div className="py-16 flex flex-col items-center justify-center">
            <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400 animate-pulse">
              {countdown}
            </div>
            <p className="text-sm font-semibold text-neutral-300 mt-4">
              Get ready... Keep your eyes centered on the screen!
            </p>
          </div>
        )}

        {/* STAGE 3: TEST (CLICK ONE!) */}
        {stage === 'test' && (
          <div className="w-full py-4">
            <div className="text-xs font-semibold text-amber-400 mb-4 animate-bounce">
              ⚡ CLICK THE ONE THAT CAUGHT YOUR EYE FIRST! ⚡
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {shuffled.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handlePick(item)}
                  className="cursor-pointer group rounded-2xl overflow-hidden border-2 border-neutral-700 hover:border-red-500 transition-all hover:scale-[1.02] shadow-xl"
                >
                  <div className="aspect-video w-full bg-neutral-950 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt="Blind Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-neutral-800 text-neutral-300 text-xs font-semibold group-hover:text-white">
                    Click to choose (Option {idx + 1})
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STAGE 4: RESULT */}
        {stage === 'result' && winner && (
          <div className="w-full py-4 flex flex-col items-center">
            <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-3">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white">
              Your Subconscious Picked: <span className="text-emerald-400">{winner.name}</span>!
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Reaction time: <span className="font-mono text-neutral-200 font-bold">{clickTime}s</span>
            </p>

            <div className="w-full max-w-sm mt-4 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
              <div className="aspect-video rounded-lg overflow-hidden mb-2">
                <img src={winner.thumbnail} alt={winner.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-xs font-semibold text-neutral-200 line-clamp-2">{winner.title}</p>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={startTest}
                className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Test Again</span>
              </button>

              <button
                onClick={onClose}
                className="bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                Back to Studio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
