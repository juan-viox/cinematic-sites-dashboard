'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface StepReviewProps {
  formData: {
    business: Record<string, string>;
    brand: { colorPreference: string; styleMood: string[]; referenceUrls: string[] };
    services: { services: { name: string; description: string; price: string }[]; specialties: string; targetAudience: string };
    goals: { goals: string[]; knownCompetitors: string[]; differentiator: string; budgetRange: string };
    marketing: { socialAccounts: Record<string, string>; currentEfforts: string; blotatoInterest: boolean; contentPreferences: string[] };
  };
  onEditStep: (step: number) => void;
}

function Section({
  title,
  step,
  onEdit,
  children,
}: {
  title: string;
  step: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 rounded-xl bg-surface-2 border border-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-accent uppercase tracking-wider">{title}</h3>
        <button
          onClick={() => onEdit(step)}
          className="text-xs text-accent-light hover:text-accent transition-colors"
        >
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="mb-2">
      <span className="text-xs text-muted">{label}: </span>
      <span className="text-sm text-text">{value}</span>
    </div>
  );
}

export default function StepReview({ formData, onEditStep }: StepReviewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.children, {
      y: 20, opacity: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out', clearProps: 'all',
    });
  }, []);

  const b = formData.business;
  const br = formData.brand;
  const s = formData.services;
  const g = formData.goals;
  const m = formData.marketing;

  return (
    <div ref={ref} className="space-y-4">
      <h2 className="text-2xl font-bold gradient-text">Review & Submit</h2>
      <p className="text-muted text-sm">Review the intake data before starting the analysis pipeline.</p>

      <Section title="Business Info" step={0} onEdit={onEditStep}>
        <Field label="Name" value={b.name} />
        <Field label="Type" value={b.businessType} />
        <Field label="URL" value={b.sourceUrl} />
        <Field label="Phone" value={b.phone} />
        <Field label="Email" value={b.email} />
        <Field label="Address" value={b.address} />
        <Field label="Description" value={b.description} />
        <Field label="Years" value={b.yearsInBusiness} />
        <Field label="Team Size" value={b.teamSize} />
      </Section>

      <Section title="Brand Identity" step={1} onEdit={onEditStep}>
        <Field label="Color Direction" value={br.colorPreference} />
        <Field label="Style Mood" value={(br.styleMood || []).join(', ')} />
        {(br.referenceUrls || []).length > 0 && (
          <div className="mb-2">
            <span className="text-xs text-muted">Reference Sites: </span>
            <div className="mt-1 space-y-1">
              {br.referenceUrls.map((url, i) => (
                <div key={i} className="text-sm text-accent-light truncate">{url}</div>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section title="Products & Services" step={2} onEdit={onEditStep}>
        {(s.services || []).filter((svc) => svc.name).map((svc, i) => (
          <div key={i} className="mb-2 pb-2 border-b border-border last:border-0">
            <span className="text-sm font-medium text-text">{svc.name}</span>
            {svc.description && <span className="text-sm text-muted"> - {svc.description}</span>}
            {svc.price && <span className="text-sm text-success ml-2">{svc.price}</span>}
          </div>
        ))}
        <Field label="Specialties" value={s.specialties} />
        <Field label="Target Audience" value={s.targetAudience} />
      </Section>

      <Section title="Goals & Competition" step={3} onEdit={onEditStep}>
        <Field label="Goals" value={(g.goals || []).join(', ')} />
        <Field label="Budget" value={g.budgetRange} />
        <Field label="Differentiator" value={g.differentiator} />
        {(g.knownCompetitors || []).length > 0 && (
          <div className="mb-2">
            <span className="text-xs text-muted">Known Competitors: </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {g.knownCompetitors.map((c, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-bg border border-border text-xs text-text">{c}</span>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section title="Marketing & Social" step={4} onEdit={onEditStep}>
        {Object.entries(m.socialAccounts || {}).filter(([, v]) => v).map(([platform, handle]) => (
          <Field key={platform} label={platform} value={handle} />
        ))}
        <Field label="Current Efforts" value={m.currentEfforts} />
        <Field label="Content Preferences" value={(m.contentPreferences || []).join(', ')} />
        <Field label="Blotato Managed Social" value={m.blotatoInterest ? 'Yes - Interested' : 'No'} />
      </Section>
    </div>
  );
}
