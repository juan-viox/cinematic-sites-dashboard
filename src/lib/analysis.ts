import { CompetitorEntry } from './projects';

export interface AnalysisSummary {
  averageScore: number;
  topPatterns: { pattern: string; count: number }[];
  missingFromClient: string[];
  colorTrends: string[];
  recommendations: { title: string; impact: 'high' | 'medium' | 'low'; description: string }[];
}

export function computeAnalysisSummary(
  competitors: CompetitorEntry[],
  clientSections: string[] = []
): AnalysisSummary {
  const scores = competitors
    .filter((c) => c.designScore !== undefined)
    .map((c) => c.designScore!);
  const averageScore =
    scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

  // Count section frequency across competitors
  const sectionCounts: Record<string, number> = {};
  for (const c of competitors) {
    for (const s of c.sections || []) {
      sectionCounts[s] = (sectionCounts[s] || 0) + 1;
    }
  }

  const topPatterns = Object.entries(sectionCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([pattern, count]) => ({ pattern, count }));

  // What competitors have that client doesn't
  const commonSections = Object.keys(sectionCounts).filter(
    (s) => sectionCounts[s] >= competitors.length * 0.5
  );
  const missingFromClient = commonSections.filter(
    (s) => !clientSections.includes(s)
  );

  // Color trends
  const allColors: Record<string, number> = {};
  for (const c of competitors) {
    for (const color of c.colorPalette || []) {
      allColors[color] = (allColors[color] || 0) + 1;
    }
  }
  const colorTrends = Object.entries(allColors)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([color]) => color);

  const recommendations = [
    ...(missingFromClient.length > 0
      ? [
          {
            title: 'Add Missing Sections',
            impact: 'high' as const,
            description: `Top competitors have ${missingFromClient.join(', ')} sections that the client is missing.`,
          },
        ]
      : []),
    {
      title: 'Cinematic Hero Animation',
      impact: 'high' as const,
      description:
        'A scroll-driven cinematic hero will immediately differentiate from competitors using static or slider heroes.',
    },
    {
      title: 'Interactive Elements',
      impact: 'medium' as const,
      description:
        'Add scroll-triggered animations and hover effects to increase engagement and time-on-site.',
    },
  ];

  return {
    averageScore: Math.round(averageScore * 10) / 10,
    topPatterns,
    missingFromClient,
    colorTrends,
    recommendations,
  };
}

export function getScoreColor(score: number): string {
  if (score >= 8) return '#00b894';
  if (score >= 6) return '#fdcb6e';
  if (score >= 4) return '#e17055';
  return '#d63031';
}

export function getImpactColor(impact: 'high' | 'medium' | 'low'): string {
  switch (impact) {
    case 'high':
      return '#00b894';
    case 'medium':
      return '#fdcb6e';
    case 'low':
      return '#74b9ff';
  }
}
