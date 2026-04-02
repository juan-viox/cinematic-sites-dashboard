'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SOCIAL_PLATFORMS = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'x', label: 'X (Twitter)' },
  { id: 'youtube', label: 'YouTube' },
];

const CONTENT_TYPES = [
  'Video Content',
  'Photography',
  'Blog / Articles',
  'Infographics',
  'Email Marketing',
  'Paid Ads',
];

interface StepMarketingProps {
  data: {
    socialAccounts: Record<string, string>;
    currentEfforts: string;
    blotatoInterest: boolean;
    contentPreferences: string[];
  };
  onChange: (field: string, value: Record<string, string> | string | boolean | string[]) => void;
}

export default function StepMarketing({ data, onChange }: StepMarketingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.children, {
      y: 20, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', clearProps: 'all',
    });
  }, []);

  const socialAccounts = data.socialAccounts || {};

  const updateSocial = (platform: string, value: string) => {
    onChange('socialAccounts', { ...socialAccounts, [platform]: value });
  };

  const toggleContent = (type: string) => {
    const current = data.contentPreferences || [];
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    onChange('contentPreferences', updated);
  };

  return (
    <div ref={ref} className="space-y-6">
      <h2 className="text-2xl font-bold gradient-text">Marketing & Social Media</h2>
      <p className="text-muted text-sm">Tell us about your current digital presence and marketing goals.</p>

      {/* Social Media Accounts */}
      <div>
        <label className="block text-sm font-medium text-muted mb-3">Social Media Accounts</label>
        <div className="space-y-3">
          {SOCIAL_PLATFORMS.map((platform) => (
            <div key={platform.id} className="flex items-center gap-3">
              <span className="w-28 text-sm text-muted">{platform.label}</span>
              <input
                type="text"
                value={socialAccounts[platform.id] || ''}
                onChange={(e) => updateSocial(platform.id, e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors text-sm"
                placeholder={`@handle or URL`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Current Efforts */}
      <div>
        <label className="block text-sm font-medium text-muted mb-1">Current Marketing Efforts</label>
        <textarea
          value={data.currentEfforts || ''}
          onChange={(e) => onChange('currentEfforts', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors resize-none"
          placeholder="What marketing are you currently doing? Social media posts, ads, email newsletters..."
        />
      </div>

      {/* Content Preferences */}
      <div>
        <label className="block text-sm font-medium text-muted mb-3">Content Preferences</label>
        <div className="flex flex-wrap gap-3">
          {CONTENT_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => toggleContent(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                (data.contentPreferences || []).includes(type)
                  ? 'border-accent bg-accent text-white'
                  : 'border-border bg-surface-2 text-muted hover:border-accent/50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Blotato Interest */}
      <div className="p-5 rounded-xl border border-accent/30 bg-accent/5">
        <div className="flex items-start gap-4">
          <button
            onClick={() => onChange('blotatoInterest', !data.blotatoInterest)}
            className={`mt-0.5 w-12 h-7 rounded-full transition-all duration-300 flex items-center ${
              data.blotatoInterest ? 'bg-accent justify-end' : 'bg-surface-2 justify-start'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-white mx-1 shadow-md" />
          </button>
          <div>
            <h3 className="text-sm font-semibold text-text">Managed Social Media via Blotato</h3>
            <p className="text-xs text-muted mt-1">
              Let our digital marketing team manage your social media presence across all platforms using Blotato.com.
              Includes content creation, scheduling, and engagement management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
