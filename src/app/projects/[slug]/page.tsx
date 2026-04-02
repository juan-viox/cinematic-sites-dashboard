import Link from 'next/link';
import { getProject } from '@/lib/projects';
import { notFound } from 'next/navigation';

const PIPELINE_PHASES = [
  { id: 'intake', label: 'Client Intake', icon: '1' },
  { id: 'analysis', label: 'Market Analysis', icon: '2' },
  { id: 'brand', label: 'Brand Identity', icon: '3' },
  { id: 'hero', label: 'Hero Concepts', icon: '4' },
  { id: 'scenes', label: 'Scene Generation', icon: '5' },
  { id: 'build', label: 'Site Build', icon: '6' },
  { id: 'deploy', label: 'Deploy', icon: '7' },
  { id: 'voice', label: 'Voice Agent', icon: '8' },
];

export default async function ProjectDashboard({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const currentPhaseIdx = PIPELINE_PHASES.findIndex(
    (p) => p.id === project.status.phase
  );
  const completedPhases = project.status.completedPhases || [];
  const competitorCount = project.competitive?.competitors?.length || 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/" className="text-sm text-muted hover:text-accent transition-colors mb-2 inline-block">
            &larr; All Projects
          </Link>
          <h1 className="text-3xl font-bold text-text">{project.client.name}</h1>
          <p className="text-muted text-sm mt-1 capitalize">
            {project.client.businessType?.replace('-', ' ')} &middot; {project.status.phase}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/projects/${slug}/analysis`}
            className="px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/80 transition-colors"
          >
            Market Analysis
          </Link>
          <Link
            href={`/projects/${slug}/marketing`}
            className="px-5 py-2.5 rounded-lg bg-surface-2 border border-border text-text text-sm font-medium hover:border-accent/50 transition-colors"
          >
            Marketing
          </Link>
        </div>
      </div>

      {/* Pipeline Progress */}
      <div className="p-6 rounded-xl bg-surface border border-border mb-8">
        <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">Pipeline Progress</h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {PIPELINE_PHASES.map((phase, i) => {
            const isCompleted = completedPhases.includes(phase.id);
            const isCurrent = i === currentPhaseIdx;
            return (
              <div key={phase.id} className="flex items-center">
                <div className="flex flex-col items-center min-w-[80px]">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                      isCompleted
                        ? 'bg-success text-white'
                        : isCurrent
                        ? 'bg-accent text-white glow-border'
                        : 'bg-surface-2 text-muted'
                    }`}
                  >
                    {isCompleted ? '\u2713' : phase.icon}
                  </div>
                  <span className={`text-xs ${isCurrent ? 'text-accent-light font-medium' : 'text-muted'}`}>
                    {phase.label}
                  </span>
                </div>
                {i < PIPELINE_PHASES.length - 1 && (
                  <div className={`w-8 h-0.5 mt-[-16px] ${isCompleted ? 'bg-success' : 'bg-border'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Client Info */}
        <div className="p-5 rounded-xl bg-surface border border-border">
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Client Info</h3>
          <div className="space-y-2 text-sm">
            {project.client.sourceUrl && (
              <div><span className="text-muted">URL: </span><span className="text-accent-light">{project.client.sourceUrl}</span></div>
            )}
            {project.client.phone && (
              <div><span className="text-muted">Phone: </span><span className="text-text">{project.client.phone}</span></div>
            )}
            {project.client.email && (
              <div><span className="text-muted">Email: </span><span className="text-text">{project.client.email}</span></div>
            )}
            {project.client.address && (
              <div><span className="text-muted">Address: </span><span className="text-text">{project.client.address}</span></div>
            )}
          </div>
        </div>

        {/* Analysis Stats */}
        <div className="p-5 rounded-xl bg-surface border border-border">
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Analysis</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Competitors Analyzed</span>
              <span className="text-lg font-bold text-accent-light">{competitorCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Goals Set</span>
              <span className="text-lg font-bold text-accent-light">{project.goals?.goals?.length || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Services Listed</span>
              <span className="text-lg font-bold text-accent-light">{project.services?.length || 0}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-5 rounded-xl bg-surface border border-border">
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button
              onClick={() => {}}
              className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-border text-sm text-text hover:border-accent/50 transition-colors text-left"
            >
              Run Competitive Analysis
            </button>
            <button className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-border text-sm text-text hover:border-accent/50 transition-colors text-left">
              Generate PPT Deck
            </button>
            <button className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-border text-sm text-text hover:border-accent/50 transition-colors text-left">
              Build Cinematic Site
            </button>
          </div>
        </div>
      </div>

      {/* Brand Preferences */}
      {project.brandPreferences && (
        <div className="p-5 rounded-xl bg-surface border border-border">
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Brand Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {project.brandPreferences.colorPreference && (
              <span className="px-3 py-1 rounded-full bg-surface-2 border border-border text-xs text-text">
                Color: {project.brandPreferences.colorPreference}
              </span>
            )}
            {(project.brandPreferences.styleMood || []).map((mood) => (
              <span key={mood} className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-xs text-accent-light">
                {mood}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
