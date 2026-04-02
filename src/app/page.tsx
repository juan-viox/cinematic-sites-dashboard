import Link from 'next/link';
import { getProjects } from '@/lib/projects';
import ProjectList from './ProjectList';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Cinematic Sites Platform</h1>
          <p className="text-muted text-sm">
            Build premium websites with AI-powered market analysis, cinematic animations, and digital marketing.
          </p>
        </div>
        <Link
          href="/intake"
          className="px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/80 transition-colors glow-border"
        >
          + New Client
        </Link>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Projects', value: projects.length },
          { label: 'In Progress', value: projects.filter((p) => !['deployed', 'init'].includes(p.status.phase)).length },
          { label: 'Deployed', value: projects.filter((p) => p.status.phase === 'deployed').length },
          { label: 'Business Types', value: new Set(projects.map((p) => p.client.businessType)).size },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl bg-surface border border-border text-center">
            <div className="text-2xl font-bold text-accent-light">{stat.value}</div>
            <div className="text-xs text-muted mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Project Grid */}
      {projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <div className="text-center py-20 rounded-xl border-2 border-dashed border-border">
          <div className="text-4xl mb-4">&#127916;</div>
          <h2 className="text-xl font-semibold text-text mb-2">No projects yet</h2>
          <p className="text-muted text-sm mb-6">
            Start by creating a new client intake to begin the cinematic sites pipeline.
          </p>
          <Link
            href="/intake"
            className="inline-block px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/80 transition-colors"
          >
            Create First Project
          </Link>
        </div>
      )}
    </div>
  );
}
