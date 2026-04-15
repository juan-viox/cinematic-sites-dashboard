'use client';


interface StepReviewProps {
  formData: {
    business: Record<string, string>;
    brand: { colorPreference: string; styleMood: string[]; referenceUrls: string[]; logoUrl?: string; brandColors?: string; typography?: string };
    services: { services: { name: string; description: string; price: string }[]; specialties: string; targetAudience: string };
    goals: { goals: string[]; knownCompetitors: string[]; differentiator: string; budgetRange: string };
    technical: {
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
    marketing: {
      socialAccounts: Record<string, string>;
      currentEfforts: string;
      blotatoInterest: boolean;
      contentPreferences: string[];
      newsletterProvider?: string;
      newsletterEmail?: string;
      enableNewsletter?: boolean;
    };
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

function Field({ label, value }: { label: string; value: string | undefined }) {
  if (!value) return null;
  return (
    <div className="mb-2">
      <span className="text-xs text-muted">{label}: </span>
      <span className="text-sm text-text">{value}</span>
    </div>
  );
}

export default function StepReview({ formData, onEditStep }: StepReviewProps) {
  const b = formData.business;
  const br = formData.brand;
  const s = formData.services;
  const g = formData.goals;
  const t = formData.technical;
  const m = formData.marketing;

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold gradient-text">Review & Submit</h2>
      <p className="text-muted text-sm">Review the intake data before starting the 11-phase pipeline.</p>

      <Section title="Business Info" step={0} onEdit={onEditStep}>
        <Field label="Name" value={b.name} />
        <Field label="Type" value={b.businessType} />
        <Field label="Tagline" value={b.tagline} />
        <Field label="Founder" value={b.founder} />
        <Field label="URL" value={b.sourceUrl} />
        <Field label="Instagram" value={b.instagramUrl} />
        <Field label="Phone" value={b.phone} />
        <Field label="Email" value={b.email} />
        <Field label="Address" value={b.address} />
        <Field label="Location" value={b.location} />
        <Field label="Region" value={b.region} />
        <Field label="Description" value={b.description} />
        <Field label="Years" value={b.yearsInBusiness} />
        <Field label="Team Size" value={b.teamSize} />
      </Section>

      <Section title="Brand Identity" step={1} onEdit={onEditStep}>
        <Field label="Logo URL" value={br.logoUrl} />
        <Field label="Brand Colors" value={br.brandColors} />
        <Field label="Typography" value={br.typography} />
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

      <Section title="Technical Setup" step={4} onEdit={onEditStep}>
        <Field label="Custom Domain" value={t.customDomain} />
        <Field label="GitHub Username" value={t.githubUsername} />
        <Field label="GitHub Auto-Deploy" value={t.enableGithubDeploy ? 'Yes' : 'No'} />
        <Field label="Schema Type" value={t.schemaType} />
        {(t.seoKeywords || []).length > 0 && (
          <div className="mb-2">
            <span className="text-xs text-muted">SEO Keywords: </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {t.seoKeywords.map((kw, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-bg border border-border text-xs text-text">{kw}</span>
              ))}
            </div>
          </div>
        )}
        <Field label="Voice Agent" value={t.enableVoiceAgent ? 'Enabled' : 'Disabled'} />
        <Field label="Voice Persona" value={t.voicePersona} />
        <Field label="Voice Languages" value={(t.voiceLanguages || []).join(', ')} />
        <Field label="Phone Area Code" value={t.voicePhoneNumber} />
      </Section>

      <Section title="Marketing & Social" step={5} onEdit={onEditStep}>
        {Object.entries(m.socialAccounts || {}).filter(([, v]) => v).map(([platform, handle]) => (
          <Field key={platform} label={platform} value={handle} />
        ))}
        <Field label="Current Efforts" value={m.currentEfforts} />
        <Field label="Content Preferences" value={(m.contentPreferences || []).join(', ')} />
        <Field label="Newsletter" value={m.enableNewsletter ? `Yes (${m.newsletterProvider || 'mailto'})` : 'No'} />
        <Field label="Blotato Managed Social" value={m.blotatoInterest ? 'Yes - Interested' : 'No'} />
      </Section>
    </div>
  );
}
