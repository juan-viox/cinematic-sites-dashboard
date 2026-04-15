'use client';

import { useState } from 'react';

const VOICE_LANGUAGES = ['English', 'Spanish', 'French', 'Portuguese', 'Italian', 'German', 'Mandarin'];
const VOICE_PERSONAS = [
  'Warm & Friendly',
  'Professional & Polished',
  'Playful & Energetic',
  'Luxurious & Refined',
  'Trustworthy & Calm',
];

interface StepTechnicalProps {
  data: {
    customDomain: string;
    githubUsername: string;
    seoKeywords: string[];
    schemaType: string;
    voicePersona: string;
    voiceLanguages: string[];
    voicePhoneNumber: string;
    enableVoiceAgent: boolean;
    enableGithubDeploy: boolean;
  };
  onChange: (field: string, value: string | string[] | boolean) => void;
}

export default function StepTechnical({ data, onChange }: StepTechnicalProps) {
  const [newKeyword, setNewKeyword] = useState('');

  const toggleLanguage = (lang: string) => {
    const current = data.voiceLanguages || [];
    const updated = current.includes(lang)
      ? current.filter((l) => l !== lang)
      : [...current, lang];
    onChange('voiceLanguages', updated);
  };

  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    const list = data.seoKeywords || [];
    if (list.length < 15) {
      onChange('seoKeywords', [...list, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (index: number) => {
    const list = [...(data.seoKeywords || [])];
    list.splice(index, 1);
    onChange('seoKeywords', list);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold gradient-text">Technical Setup</h2>
      <p className="text-muted text-sm">Deployment, SEO, and AI voice agent configuration.</p>

      {/* Deployment Section */}
      <div className="p-5 rounded-xl bg-surface-2 border border-border space-y-4">
        <h3 className="text-sm font-bold text-accent uppercase tracking-wider">Deployment & Domain</h3>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">Custom Domain (optional)</label>
          <input
            type="text"
            value={data.customDomain || ''}
            onChange={(e) => onChange('customDomain', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="www.yourbusiness.com"
          />
          <p className="text-xs text-muted mt-1">Leave blank to use Vercel&apos;s default subdomain.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">GitHub Username (optional)</label>
          <input
            type="text"
            value={data.githubUsername || ''}
            onChange={(e) => onChange('githubUsername', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="juan-viox"
          />
          <p className="text-xs text-muted mt-1">For GitHub auto-deploy. A repo will be created under this user.</p>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.enableGithubDeploy || false}
            onChange={(e) => onChange('enableGithubDeploy', e.target.checked)}
            className="w-4 h-4 accent-accent"
          />
          <span className="text-sm text-text">Enable GitHub auto-deploy (push to main triggers Vercel deploy)</span>
        </label>
      </div>

      {/* SEO Section */}
      <div className="p-5 rounded-xl bg-surface-2 border border-border space-y-4">
        <h3 className="text-sm font-bold text-accent uppercase tracking-wider">SEO & Schema</h3>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">Target SEO Keywords (up to 15)</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
              className="flex-1 px-4 py-2.5 rounded-lg bg-bg border border-border text-text focus:border-accent focus:outline-none transition-colors text-sm"
              placeholder="italian restaurant brooklyn"
            />
            <button
              onClick={addKeyword}
              className="px-4 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/80 transition-colors"
            >
              Add
            </button>
          </div>
          {(data.seoKeywords || []).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.seoKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-bg border border-border text-xs"
                >
                  {kw}
                  <button onClick={() => removeKeyword(i)} className="text-muted hover:text-danger ml-1">
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">Schema.org Type</label>
          <select
            value={data.schemaType || ''}
            onChange={(e) => onChange('schemaType', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-text focus:border-accent focus:outline-none transition-colors"
          >
            <option value="">Auto-select based on business type</option>
            <option value="Restaurant">Restaurant</option>
            <option value="LocalBusiness">LocalBusiness</option>
            <option value="Store">Store</option>
            <option value="ProfessionalService">ProfessionalService</option>
            <option value="MedicalBusiness">MedicalBusiness</option>
            <option value="RealEstateAgent">RealEstateAgent</option>
            <option value="LodgingBusiness">LodgingBusiness</option>
            <option value="Organization">Organization</option>
          </select>
        </div>
      </div>

      {/* Voice Agent Section */}
      <div className="p-5 rounded-xl bg-surface-2 border border-border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider">AI Voice Agent</h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.enableVoiceAgent !== false}
              onChange={(e) => onChange('enableVoiceAgent', e.target.checked)}
              className="w-4 h-4 accent-accent"
            />
            <span className="text-xs text-text">Enable</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-3">Persona Style</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {VOICE_PERSONAS.map((p) => (
              <button
                key={p}
                onClick={() => onChange('voicePersona', p)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  data.voicePersona === p
                    ? 'border-accent bg-accent/20 text-accent-light'
                    : 'border-border bg-bg text-muted hover:border-accent/50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-3">Languages (select all that apply)</label>
          <div className="flex flex-wrap gap-2">
            {VOICE_LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => toggleLanguage(lang)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                  (data.voiceLanguages || []).includes(lang)
                    ? 'border-accent bg-accent text-white'
                    : 'border-border bg-bg text-muted hover:border-accent/50'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">Preferred Phone Number Area Code (optional)</label>
          <input
            type="text"
            value={data.voicePhoneNumber || ''}
            onChange={(e) => onChange('voicePhoneNumber', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="646 or 551 (we'll provision a Twilio number)"
          />
        </div>
      </div>
    </div>
  );
}
