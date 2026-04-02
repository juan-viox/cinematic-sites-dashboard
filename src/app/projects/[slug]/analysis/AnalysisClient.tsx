'use client';

import { useState } from 'react';
import { CompetitorEntry } from '@/lib/projects';
import { AnalysisSummary } from '@/lib/analysis';
import CompetitorGrid from '@/components/MarketAnalysis/CompetitorGrid';
import GapAnalysis from '@/components/MarketAnalysis/GapAnalysis';
import ExportButtons from '@/components/MarketAnalysis/ExportButtons';

interface AnalysisClientProps {
  slug: string;
  competitors: CompetitorEntry[];
  summary: AnalysisSummary;
}

export default function AnalysisClient({ slug, competitors: initialCompetitors, summary }: AnalysisClientProps) {
  const [competitors, setCompetitors] = useState(initialCompetitors);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'grid' | 'analysis'>('grid');

  const handleUpdateCompetitors = async (updated: CompetitorEntry[]) => {
    setCompetitors(updated);
    setSaving(true);
    try {
      await fetch('/api/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, competitors: updated }),
      });
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs + Export */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 p-1 rounded-lg bg-surface">
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'grid' ? 'bg-accent text-white' : 'text-muted hover:text-text'
            }`}
          >
            Competitors
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'analysis' ? 'bg-accent text-white' : 'text-muted hover:text-text'
            }`}
          >
            Gap Analysis
          </button>
        </div>
        <div className="flex items-center gap-3">
          {saving && <span className="text-xs text-muted">Saving...</span>}
          <ExportButtons slug={slug} />
        </div>
      </div>

      {/* Content */}
      {activeTab === 'grid' ? (
        <CompetitorGrid
          competitors={competitors}
          editable={true}
          onUpdate={handleUpdateCompetitors}
        />
      ) : (
        <GapAnalysis summary={summary} />
      )}
    </div>
  );
}
