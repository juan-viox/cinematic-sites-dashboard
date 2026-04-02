import Link from 'next/link';
import { getProject } from '@/lib/projects';
import { computeAnalysisSummary } from '@/lib/analysis';
import { notFound } from 'next/navigation';
import AnalysisClient from './AnalysisClient';

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const competitors = project.competitive?.competitors || [];
  const summary = computeAnalysisSummary(competitors);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href={`/projects/${slug}`}
            className="text-sm text-muted hover:text-accent transition-colors mb-2 inline-block"
          >
            &larr; {project.client.name}
          </Link>
          <h1 className="text-2xl font-bold text-text">Market Analysis</h1>
          <p className="text-muted text-sm mt-1">
            Top 20 competitive analysis for {project.client.name}
          </p>
        </div>
      </div>

      <AnalysisClient
        slug={slug}
        competitors={competitors}
        summary={summary}
      />
    </div>
  );
}
