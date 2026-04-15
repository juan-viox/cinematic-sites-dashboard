'use client';

const BUSINESS_TYPES = [
  'restaurant',
  'retail',
  'service',
  'creative',
  'saas',
  'health',
  'real-estate',
  'hospitality',
];

interface StepBusinessInfoProps {
  data: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export default function StepBusinessInfo({ data, onChange }: StepBusinessInfoProps) {
  return (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-2xl font-bold gradient-text">Business Information</h2>
      <p className="text-muted text-sm">Tell us about the business we&apos;re building for.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted mb-1">Business Name *</label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="Acme Restaurant"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">Business Type *</label>
          <select
            value={data.businessType || ''}
            onChange={(e) => onChange('businessType', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors"
          >
            <option value="">Select type...</option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">Current Website URL</label>
          <input
            type="url"
            value={data.sourceUrl || ''}
            onChange={(e) => onChange('sourceUrl', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">Instagram URL</label>
          <input
            type="url"
            value={data.instagramUrl || ''}
            onChange={(e) => onChange('instagramUrl', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="https://instagram.com/acmerestaurant"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">Founder / Owner Name</label>
          <input
            type="text"
            value={data.founder || ''}
            onChange={(e) => onChange('founder', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="Jane Smith"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">Tagline</label>
          <input
            type="text"
            value={data.tagline || ''}
            onChange={(e) => onChange('tagline', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="Authentic Italian since 1985"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">Phone</label>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => onChange('phone', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">Email</label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="hello@business.com"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-muted mb-1">Address</label>
          <input
            type="text"
            value={data.address || ''}
            onChange={(e) => onChange('address', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="123 Main St, New York, NY 10001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">Location / City</label>
          <input
            type="text"
            value={data.location || ''}
            onChange={(e) => onChange('location', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="New York, NY"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">Region / Service Area</label>
          <input
            type="text"
            value={data.region || ''}
            onChange={(e) => onChange('region', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="Manhattan, Brooklyn, Queens"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-muted mb-1">Business Description / Elevator Pitch</label>
          <textarea
            value={data.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors resize-none"
            placeholder="A family-owned Italian restaurant serving authentic Neapolitan cuisine since 1985..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">Years in Business</label>
          <input
            type="text"
            value={data.yearsInBusiness || ''}
            onChange={(e) => onChange('yearsInBusiness', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-1">Team Size</label>
          <input
            type="text"
            value={data.teamSize || ''}
            onChange={(e) => onChange('teamSize', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="10-20"
          />
        </div>
      </div>
    </div>
  );
}
