'use client';

import { useState } from 'react';

interface ExportButtonsProps {
  slug: string;
}

export default function ExportButtons({ slug }: ExportButtonsProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const exportPPTX = async () => {
    setLoading('pptx');
    try {
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, format: 'pptx' }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${slug}-analysis.pptx`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setLoading(null);
    }
  };

  const exportJSON = async () => {
    setLoading('json');
    try {
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, format: 'json' }),
      });
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${slug}-analysis.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={exportPPTX}
        disabled={loading !== null}
        className="px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/80 transition-colors disabled:opacity-50"
      >
        {loading === 'pptx' ? 'Generating...' : 'Download PPT Deck'}
      </button>
      <button
        onClick={exportJSON}
        disabled={loading !== null}
        className="px-5 py-2.5 rounded-lg bg-surface-2 border border-border text-text text-sm font-medium hover:border-accent/50 transition-colors disabled:opacity-50"
      >
        {loading === 'json' ? 'Exporting...' : 'Export JSON'}
      </button>
    </div>
  );
}
