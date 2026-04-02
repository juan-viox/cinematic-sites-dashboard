'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ServiceItem {
  name: string;
  description: string;
  price: string;
}

interface StepServicesProps {
  data: {
    services: ServiceItem[];
    specialties: string;
    targetAudience: string;
  };
  onChange: (field: string, value: ServiceItem[] | string) => void;
}

export default function StepServices({ data, onChange }: StepServicesProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.children, {
      y: 20, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', clearProps: 'all',
    });
  }, []);

  const services = data.services || [{ name: '', description: '', price: '' }];

  const updateService = (index: number, field: string, value: string) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    onChange('services', updated);
  };

  const addService = () => {
    onChange('services', [...services, { name: '', description: '', price: '' }]);
  };

  const removeService = (index: number) => {
    if (services.length <= 1) return;
    const updated = services.filter((_, i) => i !== index);
    onChange('services', updated);
  };

  return (
    <div ref={ref} className="space-y-6">
      <h2 className="text-2xl font-bold gradient-text">Products & Services</h2>
      <p className="text-muted text-sm">List the key offerings to feature on the site.</p>

      {/* Dynamic service list */}
      <div className="space-y-4">
        {services.map((svc, i) => (
          <div key={i} className="p-4 rounded-lg bg-surface-2 border border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">
                Service {i + 1}
              </span>
              {services.length > 1 && (
                <button
                  onClick={() => removeService(i)}
                  className="text-muted hover:text-danger text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={svc.name}
                onChange={(e) => updateService(i, 'name', e.target.value)}
                className="px-3 py-2 rounded-lg bg-bg border border-border text-text focus:border-accent focus:outline-none text-sm"
                placeholder="Service name"
              />
              <input
                type="text"
                value={svc.description}
                onChange={(e) => updateService(i, 'description', e.target.value)}
                className="px-3 py-2 rounded-lg bg-bg border border-border text-text focus:border-accent focus:outline-none text-sm"
                placeholder="Brief description"
              />
              <input
                type="text"
                value={svc.price}
                onChange={(e) => updateService(i, 'price', e.target.value)}
                className="px-3 py-2 rounded-lg bg-bg border border-border text-text focus:border-accent focus:outline-none text-sm"
                placeholder="Price (optional)"
              />
            </div>
          </div>
        ))}
        <button
          onClick={addService}
          className="w-full py-3 rounded-lg border-2 border-dashed border-border text-muted hover:border-accent hover:text-accent transition-colors text-sm font-medium"
        >
          + Add Another Service
        </button>
      </div>

      {/* Specialties */}
      <div>
        <label className="block text-sm font-medium text-muted mb-1">
          Unique Selling Points / Specialties
        </label>
        <textarea
          value={data.specialties || ''}
          onChange={(e) => onChange('specialties', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors resize-none"
          placeholder="What makes this business stand out? Awards, years of experience, unique approach..."
        />
      </div>

      {/* Target Audience */}
      <div>
        <label className="block text-sm font-medium text-muted mb-1">Target Audience</label>
        <textarea
          value={data.targetAudience || ''}
          onChange={(e) => onChange('targetAudience', e.target.value)}
          rows={2}
          className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors resize-none"
          placeholder="Young professionals, families, local community, enterprise clients..."
        />
      </div>
    </div>
  );
}
