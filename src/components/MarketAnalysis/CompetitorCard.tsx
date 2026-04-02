'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CompetitorEntry } from '@/lib/projects';
import { getScoreColor } from '@/lib/analysis';

interface CompetitorCardProps {
  competitor: CompetitorEntry;
  index: number;
  onEdit?: (competitor: CompetitorEntry, index: number) => void;
  onRemove?: (index: number) => void;
}

export default function CompetitorCard({ competitor, index, onEdit, onRemove }: CompetitorCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, delay: index * 0.05, ease: 'power2.out' }
    );
  }, [index]);

  return (
    <div
      ref={ref}
      className="group p-4 rounded-xl bg-surface border border-border hover:border-accent/40 transition-all duration-300 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center text-xs font-bold text-muted">
            {index + 1}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text group-hover:text-accent-light transition-colors">
              {competitor.name}
            </h4>
            <p className="text-xs text-muted truncate max-w-[200px]">{competitor.url}</p>
          </div>
        </div>
        {competitor.designScore !== undefined && (
          <div
            className="px-2 py-1 rounded-md text-xs font-bold"
            style={{ color: getScoreColor(competitor.designScore), backgroundColor: `${getScoreColor(competitor.designScore)}20` }}
          >
            {competitor.designScore}/10
          </div>
        )}
      </div>

      <p className="text-xs text-muted line-clamp-2">{competitor.standout}</p>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-border space-y-2 text-xs">
          {competitor.heroStyle && (
            <div><span className="text-muted">Hero: </span><span className="text-text">{competitor.heroStyle}</span></div>
          )}
          {competitor.navStyle && (
            <div><span className="text-muted">Nav: </span><span className="text-text">{competitor.navStyle}</span></div>
          )}
          {competitor.ctaStrategy && (
            <div><span className="text-muted">CTA: </span><span className="text-text">{competitor.ctaStrategy}</span></div>
          )}
          {(competitor.sections || []).length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {competitor.sections!.map((s) => (
                <span key={s} className="px-2 py-0.5 rounded-full bg-surface-2 text-muted">{s}</span>
              ))}
            </div>
          )}
          {(onEdit || onRemove) && (
            <div className="flex gap-2 mt-2">
              {onEdit && (
                <button
                  onClick={(e) => { e.stopPropagation(); onEdit(competitor, index); }}
                  className="text-accent-light hover:text-accent text-xs"
                >
                  Edit
                </button>
              )}
              {onRemove && (
                <button
                  onClick={(e) => { e.stopPropagation(); onRemove(index); }}
                  className="text-danger hover:text-danger/80 text-xs"
                >
                  Remove
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
