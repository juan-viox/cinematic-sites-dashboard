'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const STEPS = [
  'Business Info',
  'Brand Identity',
  'Services',
  'Goals',
  'Marketing',
  'Review',
];

interface FormProgressProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function FormProgress({ currentStep, onStepClick }: FormProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    const pct = ((currentStep) / (STEPS.length - 1)) * 100;
    gsap.to(barRef.current, {
      width: `${pct}%`,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [currentStep]);

  return (
    <div className="mb-10">
      {/* Progress bar */}
      <div className="relative h-1 bg-surface-2 rounded-full mb-6 overflow-hidden">
        <div ref={barRef} className="absolute top-0 left-0 h-full bg-accent rounded-full" style={{ width: 0 }} />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between">
        {STEPS.map((label, i) => (
          <button
            key={label}
            onClick={() => i <= currentStep && onStepClick(i)}
            className={`flex flex-col items-center gap-2 transition-all duration-300 ${
              i <= currentStep ? 'cursor-pointer' : 'cursor-default opacity-40'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i < currentStep
                  ? 'bg-success text-white'
                  : i === currentStep
                  ? 'bg-accent text-white glow-border'
                  : 'bg-surface-2 text-muted'
              }`}
            >
              {i < currentStep ? '\u2713' : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${
              i === currentStep ? 'text-accent-light' : 'text-muted'
            }`}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
