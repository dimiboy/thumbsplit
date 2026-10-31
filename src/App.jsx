import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChannelSettings from './components/ChannelSettings';
import VariantEditor from './components/VariantEditor';
import SideBySideView from './components/views/SideBySideView';
import DesktopGridView from './components/views/DesktopGridView';
import MobileFeedView from './components/views/MobileFeedView';
import SidebarView from './components/views/SidebarView';
import SearchResultsView from './components/views/SearchResultsView';
import BlindTestModal from './components/BlindTestModal';
import FooterBanner from './components/FooterBanner';
import { DEFAULT_CHANNEL, INITIAL_VARIANTS } from './data/mockFeed';

export default function App() {
  // Persistent state via LocalStorage
  const [variants, setVariants] = useState(() => {
    try {
      const saved = localStorage.getItem('dimustech_yt_variants');
      return saved ? JSON.parse(saved) : INITIAL_VARIANTS;
    } catch {
      return INITIAL_VARIANTS;
    }
  });

  const [channel, setChannel] = useState(() => {
    try {
      const saved = localStorage.getItem('dimustech_yt_channel');
      return saved ? JSON.parse(saved) : DEFAULT_CHANNEL;
    } catch {
      return DEFAULT_CHANNEL;
    }
  });

  // Display toggles
  const [activeTab, setActiveTab] = useState('side-by-side');
  const [previewTheme, setPreviewTheme] = useState('dark');
  const [showSafeZones, setShowSafeZones] = useState(false);
  const [blurLevel, setBlurLevel] = useState('none');
  const [grayscale, setGrayscale] = useState(false);
  const [isBlindTestOpen, setIsBlindTestOpen] = useState(false);

  // Auto-sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dimustech_yt_variants', JSON.stringify(variants));
    } catch (err) {
      // LocalStorage might be full if user pastes huge raw base64 images
      console.warn('LocalStorage save failed:', err);
    }
  }, [variants]);

  useEffect(() => {
    try {
      localStorage.setItem('dimustech_yt_channel', JSON.stringify(channel));
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }
  }, [channel]);

  const handleReset = () => {
    if (window.confirm('Reset all variants and metadata to sample defaults?')) {
      setVariants(INITIAL_VARIANTS);
      setChannel(DEFAULT_CHANNEL);
      setShowSafeZones(false);
      setBlurLevel('none');
      setGrayscale(false);
      localStorage.removeItem('dimustech_yt_variants');
      localStorage.removeItem('dimustech_yt_channel');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        previewTheme={previewTheme}
        setPreviewTheme={setPreviewTheme}
        showSafeZones={showSafeZones}
        setShowSafeZones={setShowSafeZones}
        blurLevel={blurLevel}
        setBlurLevel={setBlurLevel}
        grayscale={grayscale}
        setGrayscale={setGrayscale}
        onOpenBlindTest={() => setIsBlindTestOpen(true)}
        onReset={handleReset}
      />

      {/* Main Studio Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* Channel Settings Collapse */}
        <ChannelSettings channel={channel} setChannel={setChannel} />

        {/* Variant Editor Inputs & Thumbnails */}
        <VariantEditor
          variants={variants}
          setVariants={setVariants}
          channel={channel}
          showSafeZones={showSafeZones}
          blurLevel={blurLevel}
          grayscale={grayscale}
        />

        {/* View Layout Renderer */}
        <div className="mt-8">
          {activeTab === 'side-by-side' && (
            <SideBySideView
              variants={variants}
              channel={channel}
              previewTheme={previewTheme}
              showSafeZones={showSafeZones}
              blurLevel={blurLevel}
              grayscale={grayscale}
            />
          )}

          {activeTab === 'desktop' && (
            <DesktopGridView
              variants={variants}
              channel={channel}
              previewTheme={previewTheme}
              showSafeZones={showSafeZones}
              blurLevel={blurLevel}
              grayscale={grayscale}
            />
          )}

          {activeTab === 'mobile' && (
            <MobileFeedView
              variants={variants}
              channel={channel}
              previewTheme={previewTheme}
              showSafeZones={showSafeZones}
              blurLevel={blurLevel}
              grayscale={grayscale}
            />
          )}

          {activeTab === 'sidebar' && (
            <SidebarView
              variants={variants}
              channel={channel}
              previewTheme={previewTheme}
              showSafeZones={showSafeZones}
              blurLevel={blurLevel}
              grayscale={grayscale}
            />
          )}

          {activeTab === 'search' && (
            <SearchResultsView
              variants={variants}
              channel={channel}
              previewTheme={previewTheme}
              showSafeZones={showSafeZones}
              blurLevel={blurLevel}
              grayscale={grayscale}
            />
          )}
        </div>
      </main>

      {/* Footer & Share Bar */}
      <FooterBanner variants={variants} channel={channel} />

      {/* Blind Eye-Snapping 3-Second Test Modal */}
      <BlindTestModal
        isOpen={isBlindTestOpen}
        onClose={() => setIsBlindTestOpen(false)}
        variants={variants}
        channel={channel}
      />
    </div>
  );
}
