'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { computeAnalysisSummary } from '@/lib/analysis';
import AnalysisClient from './AnalysisClient';

interface ProjectData {
  client: { slug: string; name: string; businessType: string };
  competitive?: { competitors?: { name: string; url: string; standout: string; designScore?: number; heroStyle?: string; colorPalette?: string[]; navStyle?: string; sections?: string[]; interactiveElements?: string[]; ctaStrategy?: string; mobileNotes?: string }[] };
}

export default function AnalysisPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/analysis?slug=${slug}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Not found');
        setProject(await res.json());
      })
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="max-w-6xl mx-auto px-6 py-10 text-center"><div className="text-muted">Loading analysis...</div></div>;
  }

  const competitors = project?.competitive?.competitors || [];
  const summary = computeAnalysisSummary(competitors);
  const clientName = project?.client?.name || slug;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href={`/projects/${slug}`} className="text-sm text-muted hover:text-accent transition-colors mb-2 inline-block">
            &larr; {clientName}
          </Link>
          <h1 className="text-2xl font-bold text-text">Market Analysis</h1>
          <p className="text-muted text-sm mt-1">Top 20 competitive analysis for {clientName}</p>
        </div>
      </div>

      <AnalysisClient slug={slug} competitors={competitors} summary={summary} />
    </div>
  );
}
