'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ProjectCardProps {
  slug: string;
  name: string;
  businessType: string;
  phase: string;
  sourceUrl?: string;
  index: number;
}

const PHASE_COLORS: Record<string, string> = {
  init: 'bg-muted',
  intake: 'bg-accent',
  analysis: 'bg-warning',
  brand: 'bg-accent-light',
  hero: 'bg-danger',
  build: 'bg-success',
  deployed: 'bg-success',
};

export default function ProjectCard({ slug, name, businessType, phase, sourceUrl, index }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: index * 0.08, ease: 'power2.out' }
    );
  }, [index]);

  return (
    <Link
      ref={ref}
      href={`/projects/${slug}`}
      className="group block p-6 rounded-xl bg-surface border border-border hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
          {name.charAt(0).toUpperCase()}
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium text-white ${PHASE_COLORS[phase] || 'bg-muted'}`}>
          {phase}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-text group-hover:text-accent-light transition-colors mb-1">
        {name}
      </h3>

      <p className="text-sm text-muted capitalize mb-3">
        {businessType?.replace('-', ' ')}
      </p>

      {sourceUrl && (
        <p className="text-xs text-muted truncate">{sourceUrl}</p>
      )}

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted">View Dashboard</span>
        <span className="text-accent text-sm group-hover:translate-x-1 transition-transform">&rarr;</span>
      </div>
    </Link>
  );
}
