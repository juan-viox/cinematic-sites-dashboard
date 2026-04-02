'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SUPPORTED_PLATFORMS } from '@/lib/blotato';

interface ProjectData {
  client: { slug: string; name: string };
  marketing?: { socialAccounts?: Record<string, string>; blotatoInterest?: boolean };
}

export default function MarketingPage() {
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
    return <div className="max-w-5xl mx-auto px-6 py-10 text-center"><div className="text-muted">Loading...</div></div>;
  }

  const socialAccounts = project?.marketing?.socialAccounts || {};
  const connectedPlatforms = Object.entries(socialAccounts).filter(([, v]) => v);
  const clientName = project?.client?.name || slug;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link href={`/projects/${slug}`} className="text-sm text-muted hover:text-accent transition-colors mb-2 inline-block">
          &larr; {clientName}
        </Link>
        <h1 className="text-2xl font-bold text-text">Digital Marketing</h1>
        <p className="text-muted text-sm mt-1">Social media management and content marketing via Blotato</p>
      </div>

      {/* Blotato Status */}
      <div className="p-6 rounded-xl bg-surface border border-accent/30 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-text">Blotato Integration</h2>
            <p className="text-sm text-muted mt-1">Manage all social media platforms from one dashboard via blotato.com</p>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
            project?.marketing?.blotatoInterest
              ? 'bg-success/20 text-success border border-success/30'
              : 'bg-surface-2 text-muted border border-border'
          }`}>
            {project?.marketing?.blotatoInterest ? 'Interested' : 'Not Requested'}
          </span>
        </div>
        <button className="px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/80 transition-colors">
          Connect Blotato Account
        </button>
      </div>

      {/* Social Media Accounts */}
      <div className="p-6 rounded-xl bg-surface border border-border mb-8">
        <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">Social Media Accounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUPPORTED_PLATFORMS.map((platform) => {
            const handle = socialAccounts[platform.id];
            return (
              <div key={platform.id} className={`p-4 rounded-lg border ${handle ? 'border-success/30 bg-success/5' : 'border-border bg-surface-2'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${handle ? 'bg-success/20 text-success' : 'bg-surface text-muted'}`}>
                      {platform.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text">{platform.name}</div>
                      {handle && <div className="text-xs text-muted">{handle}</div>}
                    </div>
                  </div>
                  <span className={`text-xs ${handle ? 'text-success' : 'text-muted'}`}>{handle ? 'Connected' : 'Not linked'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Calendar Placeholder */}
      <div className="p-6 rounded-xl bg-surface border border-border mb-8">
        <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">Content Calendar</h2>
        <div className="text-center py-12 rounded-xl border-2 border-dashed border-border">
          <p className="text-muted text-sm mb-2">Content calendar will appear here once Blotato is connected.</p>
          <p className="text-xs text-muted">Schedule posts, track engagement, and manage content across all platforms.</p>
        </div>
      </div>

      {/* Marketing Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-surface border border-border">
          <h3 className="text-sm font-semibold text-text mb-2">Content Creation</h3>
          <p className="text-xs text-muted">AI-powered content generation for social media posts, stories, and campaigns.</p>
          <div className="mt-3 text-xs text-accent-light">Coming soon</div>
        </div>
        <div className="p-5 rounded-xl bg-surface border border-border">
          <h3 className="text-sm font-semibold text-text mb-2">Scheduling</h3>
          <p className="text-xs text-muted">Automated post scheduling across all platforms with optimal timing.</p>
          <div className="mt-3 text-xs text-accent-light">Coming soon</div>
        </div>
        <div className="p-5 rounded-xl bg-surface border border-border">
          <h3 className="text-sm font-semibold text-text mb-2">Analytics</h3>
          <p className="text-xs text-muted">Track engagement, reach, and growth metrics across all connected accounts.</p>
          <div className="mt-3 text-xs text-accent-light">Coming soon</div>
        </div>
      </div>

      {connectedPlatforms.length > 0 && (
        <div className="mt-8 p-4 rounded-xl bg-surface-2 border border-border">
          <div className="text-xs text-muted">
            {connectedPlatforms.length} platform{connectedPlatforms.length > 1 ? 's' : ''} linked: {connectedPlatforms.map(([p]) => p).join(', ')}
          </div>
        </div>
      )}
    </div>
  );
}
