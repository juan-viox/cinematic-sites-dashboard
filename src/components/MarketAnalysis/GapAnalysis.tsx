'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AnalysisSummary } from '@/lib/analysis';
import { getImpactColor } from '@/lib/analysis';

interface GapAnalysisProps {
  summary: AnalysisSummary;
}

export default function GapAnalysis({ summary }: GapAnalysisProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
    );
  }, []);

  return (
    <div ref={ref} className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-surface border border-border text-center">
          <div className="text-3xl font-bold text-accent-light">{summary.averageScore}</div>
          <div className="text-xs text-muted mt-1">Avg. Competitor Score</div>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-border text-center">
          <div className="text-3xl font-bold text-warning">{summary.missingFromClient.length}</div>
          <div className="text-xs text-muted mt-1">Missing Features</div>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-border text-center">
          <div className="text-3xl font-bold text-success">{summary.recommendations.length}</div>
          <div className="text-xs text-muted mt-1">Recommendations</div>
        </div>
      </div>

      {/* Missing Features */}
      {summary.missingFromClient.length > 0 && (
        <div className="p-5 rounded-xl bg-surface border border-border">
          <h3 className="text-sm font-bold text-warning uppercase tracking-wider mb-3">Missing From Client</h3>
          <div className="flex flex-wrap gap-2">
            {summary.missingFromClient.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full bg-warning/10 border border-warning/30 text-xs text-warning font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Top Patterns */}
      {summary.topPatterns.length > 0 && (
        <div className="p-5 rounded-xl bg-surface border border-border">
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Top Industry Patterns</h3>
          <div className="space-y-2">
            {summary.topPatterns.map((pattern) => (
              <div key={pattern.pattern} className="flex items-center justify-between">
                <span className="text-sm text-text">{pattern.pattern}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full bg-surface-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${(pattern.count / 20) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted w-8 text-right">{pattern.count}/20</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="p-5 rounded-xl bg-surface border border-border">
        <h3 className="text-sm font-bold text-success uppercase tracking-wider mb-3">Recommendations</h3>
        <div className="space-y-3">
          {summary.recommendations.map((rec, i) => (
            <div key={i} className="p-3 rounded-lg bg-surface-2 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-2 py-0.5 rounded text-xs font-bold uppercase"
                  style={{ color: getImpactColor(rec.impact), backgroundColor: `${getImpactColor(rec.impact)}15` }}
                >
                  {rec.impact}
                </span>
                <span className="text-sm font-semibold text-text">{rec.title}</span>
              </div>
              <p className="text-xs text-muted">{rec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
