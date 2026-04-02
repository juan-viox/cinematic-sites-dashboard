'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const STYLE_MOODS = ['Modern', 'Classic', 'Bold', 'Minimal', 'Luxury', 'Playful'];
const COLOR_OPTIONS = [
  { label: 'Let AI Decide', value: 'ai' },
  { label: 'Dark & Moody', value: 'dark' },
  { label: 'Light & Clean', value: 'light' },
  { label: 'Warm & Earthy', value: 'warm' },
  { label: 'Cool & Professional', value: 'cool' },
  { label: 'Vibrant & Bold', value: 'vibrant' },
];

interface StepBrandIdentityProps {
  data: {
    colorPreference: string;
    styleMood: string[];
    referenceUrls: string[];
  };
  onChange: (field: string, value: string | string[]) => void;
}

export default function StepBrandIdentity({ data, onChange }: StepBrandIdentityProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.children, {
      y: 20, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', clearProps: 'all',
    });
  }, []);

  const toggleMood = (mood: string) => {
    const current = data.styleMood || [];
    const updated = current.includes(mood)
      ? current.filter((m) => m !== mood)
      : [...current, mood];
    onChange('styleMood', updated);
  };

  const addUrl = () => {
    if (!newUrl.trim()) return;
    const urls = data.referenceUrls || [];
    if (urls.length < 5) {
      onChange('referenceUrls', [...urls, newUrl.trim()]);
      setNewUrl('');
    }
  };

  const removeUrl = (index: number) => {
    const urls = [...(data.referenceUrls || [])];
    urls.splice(index, 1);
    onChange('referenceUrls', urls);
  };

  return (
    <div ref={ref} className="space-y-6">
      <h2 className="text-2xl font-bold gradient-text">Brand Identity</h2>
      <p className="text-muted text-sm">Help us understand the visual direction.</p>

      {/* Color Preference */}
      <div>
        <label className="block text-sm font-medium text-muted mb-3">Color Direction</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {COLOR_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange('colorPreference', opt.value)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                data.colorPreference === opt.value
                  ? 'border-accent bg-accent/20 text-accent-light'
                  : 'border-border bg-surface-2 text-muted hover:border-accent/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Style Mood */}
      <div>
        <label className="block text-sm font-medium text-muted mb-3">Style Mood (select all that apply)</label>
        <div className="flex flex-wrap gap-3">
          {STYLE_MOODS.map((mood) => (
            <button
              key={mood}
              onClick={() => toggleMood(mood)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                (data.styleMood || []).includes(mood)
                  ? 'border-accent bg-accent text-white'
                  : 'border-border bg-surface-2 text-muted hover:border-accent/50'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      {/* Reference URLs */}
      <div>
        <label className="block text-sm font-medium text-muted mb-3">
          Reference Websites (up to 5 sites you admire)
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addUrl())}
            className="flex-1 px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="https://example.com"
          />
          <button
            onClick={addUrl}
            disabled={(data.referenceUrls || []).length >= 5}
            className="px-4 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/80 transition-colors disabled:opacity-40"
          >
            Add
          </button>
        </div>
        {(data.referenceUrls || []).length > 0 && (
          <div className="space-y-2">
            {data.referenceUrls.map((url, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-2 rounded-lg bg-surface-2 border border-border"
              >
                <span className="text-sm text-text truncate">{url}</span>
                <button
                  onClick={() => removeUrl(i)}
                  className="text-muted hover:text-danger ml-2 text-lg"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
