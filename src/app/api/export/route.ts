import { NextRequest, NextResponse } from 'next/server';
import { getProject } from '@/lib/projects';
import { computeAnalysisSummary } from '@/lib/analysis';
import { generateAnalysisDeck } from '@/lib/pptx-generator';

export async function POST(request: NextRequest) {
  const { slug, format } = await request.json();

  if (!slug) {
    return NextResponse.json({ error: 'Project slug required' }, { status: 400 });
  }

  const project = await getProject(slug);
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const competitors = project.competitive?.competitors || [];
  const summary = computeAnalysisSummary(competitors);

  if (format === 'pptx') {
    const buffer = await generateAnalysisDeck(project, summary);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': `attachment; filename="${project.client.slug}-analysis.pptx"`,
      },
    });
  }

  // Default: return analysis summary as JSON
  return NextResponse.json({ project: project.client, summary });
}
