'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormProgress from '@/components/IntakeForm/FormProgress';
import StepBusinessInfo from '@/components/IntakeForm/StepBusinessInfo';
import StepBrandIdentity from '@/components/IntakeForm/StepBrandIdentity';
import StepServices from '@/components/IntakeForm/StepServices';
import StepGoals from '@/components/IntakeForm/StepGoals';
import StepTechnical from '@/components/IntakeForm/StepTechnical';
import StepMarketing from '@/components/IntakeForm/StepMarketing';
import StepReview from '@/components/IntakeForm/StepReview';

const LAST_STEP = 6; // 7 steps total (0-indexed)

export default function IntakePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [business, setBusiness] = useState<Record<string, string>>({});
  const [brand, setBrand] = useState<{
    colorPreference: string;
    styleMood: string[];
    referenceUrls: string[];
    logoUrl?: string;
    brandColors?: string;
    typography?: string;
  }>({
    colorPreference: '',
    styleMood: [],
    referenceUrls: [],
    logoUrl: '',
    brandColors: '',
    typography: '',
  });
  const [services, setServices] = useState<{
    services: { name: string; description: string; price: string }[];
    specialties: string;
    targetAudience: string;
  }>({
    services: [{ name: '', description: '', price: '' }],
    specialties: '',
    targetAudience: '',
  });
  const [goals, setGoals] = useState<{
    goals: string[];
    knownCompetitors: string[];
    differentiator: string;
    budgetRange: string;
  }>({
    goals: [],
    knownCompetitors: [],
    differentiator: '',
    budgetRange: '',
  });
  const [technical, setTechnical] = useState<{
    customDomain: string;
    githubUsername: string;
    seoKeywords: string[];
    schemaType: string;
    voicePersona: string;
    voiceLanguages: string[];
    voicePhoneNumber: string;
    enableVoiceAgent: boolean;
    enableGithubDeploy: boolean;
  }>({
    customDomain: '',
    githubUsername: '',
    seoKeywords: [],
    schemaType: '',
    voicePersona: '',
    voiceLanguages: ['English'],
    voicePhoneNumber: '',
    enableVoiceAgent: true,
    enableGithubDeploy: true,
  });
  const [marketing, setMarketing] = useState<{
    socialAccounts: Record<string, string>;
    currentEfforts: string;
    blotatoInterest: boolean;
    contentPreferences: string[];
    newsletterProvider?: string;
    newsletterEmail?: string;
    enableNewsletter?: boolean;
  }>({
    socialAccounts: {},
    currentEfforts: '',
    blotatoInterest: false,
    contentPreferences: [],
    newsletterProvider: '',
    newsletterEmail: '',
    enableNewsletter: true,
  });

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const next = () => {
    if (currentStep < LAST_STEP) goToStep(currentStep + 1);
  };

  const prev = () => {
    if (currentStep > 0) goToStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setError(null);
    if (!business.name || !business.businessType) {
      setError('Business name and type are required.');
      goToStep(0);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business, brand, services, goals, technical, marketing }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create project');
        return;
      }
      if (data.slug) {
        router.push(`/projects/${data.slug}`);
      }
    } catch (err) {
      console.error('Submit failed:', err);
      setError('Network error — could not create project.');
    } finally {
      setSubmitting(false);
    }
  };

  const updateBusiness = (field: string, value: string) => {
    setBusiness((prev) => ({ ...prev, [field]: value }));
  };

  const updateBrand = (field: string, value: string | string[]) => {
    setBrand((prev) => ({ ...prev, [field]: value }));
  };

  const updateServices = (field: string, value: unknown) => {
    setServices((prev) => ({ ...prev, [field]: value }));
  };

  const updateGoals = (field: string, value: string | string[]) => {
    setGoals((prev) => ({ ...prev, [field]: value }));
  };

  const updateTechnical = (field: string, value: string | string[] | boolean) => {
    setTechnical((prev) => ({ ...prev, [field]: value }));
  };

  const updateMarketing = (field: string, value: unknown) => {
    setMarketing((prev) => ({ ...prev, [field]: value as Record<string, string> | string | boolean | string[] }));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <FormProgress currentStep={currentStep} onStepClick={goToStep} />

      <div className="min-h-[500px]">
        {currentStep === 0 && <StepBusinessInfo data={business} onChange={updateBusiness} />}
        {currentStep === 1 && <StepBrandIdentity data={brand} onChange={updateBrand} />}
        {currentStep === 2 && <StepServices data={services} onChange={updateServices} />}
        {currentStep === 3 && <StepGoals data={goals} onChange={updateGoals} />}
        {currentStep === 4 && <StepTechnical data={technical} onChange={updateTechnical} />}
        {currentStep === 5 && <StepMarketing data={marketing} onChange={updateMarketing} />}
        {currentStep === 6 && (
          <StepReview
            formData={{ business, brand, services, goals, technical, marketing }}
            onEditStep={goToStep}
          />
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm">
          {error}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <button
          onClick={prev}
          disabled={currentStep === 0}
          className="px-6 py-3 rounded-lg text-sm font-medium text-muted hover:text-text border border-border hover:border-accent/50 transition-all disabled:opacity-30 disabled:cursor-default"
        >
          Back
        </button>

        {currentStep < LAST_STEP ? (
          <button
            onClick={next}
            className="px-8 py-3 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent/80 transition-colors"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting || !business.name || !business.businessType}
            className="px-8 py-3 rounded-lg text-sm font-bold bg-success text-white hover:bg-success/80 transition-colors disabled:opacity-50 glow-border"
          >
            {submitting ? 'Creating Project...' : 'Start Market Analysis'}
          </button>
        )}
      </div>
    </div>
  );
}
