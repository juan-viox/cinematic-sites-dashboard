'use client';

import { useState } from 'react';

const GOAL_OPTIONS = [
  'Lead Generation',
  'Online Bookings',
  'Brand Awareness',
  'E-commerce Sales',
  'Portfolio Showcase',
  'Customer Engagement',
  'SEO & Visibility',
  'Social Proof',
];

const BUDGET_RANGES = [
  '$500 - $1,500',
  '$1,500 - $3,000',
  '$3,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000+',
  'Not sure yet',
];

interface StepGoalsProps {
  data: {
    goals: string[];
    knownCompetitors: string[];
    differentiator: string;
    budgetRange: string;
  };
  onChange: (field: string, value: string | string[]) => void;
}

export default function StepGoals({ data, onChange }: StepGoalsProps) {
  const [newCompetitor, setNewCompetitor] = useState('');

  const toggleGoal = (goal: string) => {
    const current = data.goals || [];
    const updated = current.includes(goal)
      ? current.filter((g) => g !== goal)
      : current.length < 3
      ? [...current, goal]
      : current;
    onChange('goals', updated);
  };

  const addCompetitor = () => {
    if (!newCompetitor.trim()) return;
    const list = data.knownCompetitors || [];
    if (list.length < 10) {
      onChange('knownCompetitors', [...list, newCompetitor.trim()]);
      setNewCompetitor('');
    }
  };

  const removeCompetitor = (index: number) => {
    const list = [...(data.knownCompetitors || [])];
    list.splice(index, 1);
    onChange('knownCompetitors', list);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold gradient-text">Goals & Competition</h2>
      <p className="text-muted text-sm">What should the site achieve? Who are the competitors?</p>

      {/* Goals */}
      <div>
        <label className="block text-sm font-medium text-muted mb-3">
          Top 3 Business Goals
        </label>
        <div className="flex flex-wrap gap-3">
          {GOAL_OPTIONS.map((goal) => (
            <button
              key={goal}
              onClick={() => toggleGoal(goal)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                (data.goals || []).includes(goal)
                  ? 'border-accent bg-accent text-white'
                  : 'border-border bg-surface-2 text-muted hover:border-accent/50'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted mt-2">
          {(data.goals || []).length}/3 selected
        </p>
      </div>

      {/* Known Competitors */}
      <div>
        <label className="block text-sm font-medium text-muted mb-3">
          Known Competitors (URLs or names, up to 10)
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newCompetitor}
            onChange={(e) => setNewCompetitor(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCompetitor())}
            className="flex-1 px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors"
            placeholder="https://competitor.com or Competitor Name"
          />
          <button
            onClick={addCompetitor}
            className="px-4 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/80 transition-colors"
          >
            Add
          </button>
        </div>
        {(data.knownCompetitors || []).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.knownCompetitors.map((comp, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-2 border border-border text-sm"
              >
                {comp}
                <button onClick={() => removeCompetitor(i)} className="text-muted hover:text-danger ml-1">
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Differentiator */}
      <div>
        <label className="block text-sm font-medium text-muted mb-1">
          What should this site do better than competitors?
        </label>
        <textarea
          value={data.differentiator || ''}
          onChange={(e) => onChange('differentiator', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:border-accent focus:outline-none transition-colors resize-none"
          placeholder="Better visuals, faster load times, clearer CTAs, more modern feel..."
        />
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-muted mb-3">Budget Range</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {BUDGET_RANGES.map((range) => (
            <button
              key={range}
              onClick={() => onChange('budgetRange', range)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                data.budgetRange === range
                  ? 'border-accent bg-accent/20 text-accent-light'
                  : 'border-border bg-surface-2 text-muted hover:border-accent/50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
