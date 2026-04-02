'use client';

import { useState } from 'react';
import { CompetitorEntry } from '@/lib/projects';
import CompetitorCard from './CompetitorCard';

interface CompetitorGridProps {
  competitors: CompetitorEntry[];
  editable?: boolean;
  onUpdate?: (competitors: CompetitorEntry[]) => void;
}

export default function CompetitorGrid({ competitors, editable = false, onUpdate }: CompetitorGridProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newComp, setNewComp] = useState<CompetitorEntry>({
    name: '',
    url: '',
    standout: '',
  });

  const handleRemove = (index: number) => {
    if (!onUpdate) return;
    const updated = competitors.filter((_, i) => i !== index);
    onUpdate(updated);
  };

  const handleAdd = () => {
    if (!newComp.name || !onUpdate) return;
    onUpdate([...competitors, newComp]);
    setNewComp({ name: '', url: '', standout: '' });
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-accent uppercase tracking-wider">
          Competitors ({competitors.length}/20)
        </h3>
        {editable && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-sm text-accent-light hover:text-accent transition-colors"
          >
            {showAddForm ? 'Cancel' : '+ Add Manually'}
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="p-4 rounded-xl bg-surface-2 border border-border mb-4 space-y-3">
          <input
            type="text"
            value={newComp.name}
            onChange={(e) => setNewComp({ ...newComp, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-bg border border-border text-text text-sm focus:border-accent focus:outline-none"
            placeholder="Competitor name"
          />
          <input
            type="url"
            value={newComp.url}
            onChange={(e) => setNewComp({ ...newComp, url: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-bg border border-border text-text text-sm focus:border-accent focus:outline-none"
            placeholder="https://competitor.com"
          />
          <input
            type="text"
            value={newComp.standout}
            onChange={(e) => setNewComp({ ...newComp, standout: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-bg border border-border text-text text-sm focus:border-accent focus:outline-none"
            placeholder="What makes them stand out?"
          />
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max="10"
              value={newComp.designScore || ''}
              onChange={(e) => setNewComp({ ...newComp, designScore: Number(e.target.value) })}
              className="w-24 px-3 py-2 rounded-lg bg-bg border border-border text-text text-sm focus:border-accent focus:outline-none"
              placeholder="Score"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/80"
            >
              Add Competitor
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {competitors.map((comp, i) => (
          <CompetitorCard
            key={`${comp.name}-${i}`}
            competitor={comp}
            index={i}
            onRemove={editable ? handleRemove : undefined}
          />
        ))}
      </div>

      {competitors.length === 0 && (
        <div className="text-center py-12 rounded-xl border-2 border-dashed border-border">
          <p className="text-muted text-sm">
            No competitors analyzed yet. Run the analysis or add them manually.
          </p>
        </div>
      )}
    </div>
  );
}
