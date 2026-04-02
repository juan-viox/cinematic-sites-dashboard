import { NextRequest, NextResponse } from 'next/server';
import { getProject, updateProject, CompetitorEntry } from '@/lib/projects';

// POST: Trigger or save competitive analysis for a project
export async function POST(request: NextRequest) {
  const { slug, competitors, clientAudit } = await request.json();

  if (!slug) {
    return NextResponse.json({ error: 'Project slug required' }, { status: 400 });
  }

  const project = await getProject(slug);
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const competitiveData: {
    competitors?: CompetitorEntry[];
    analysis?: Record<string, unknown>;
    clientAudit?: Record<string, unknown>;
  } = { ...project.competitive };

  if (competitors) {
    competitiveData.competitors = competitors;
  }
  if (clientAudit) {
    competitiveData.clientAudit = clientAudit;
  }

  await updateProject(slug, {
    competitive: competitiveData,
    status: {
      phase: 'analysis',
      completedPhases: [...(project.status.completedPhases || []), 'analysis'],
    },
  });

  return NextResponse.json({ message: 'Analysis saved', slug });
}

// GET: Retrieve analysis data for a project
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ error: 'Slug required' }, { status: 400 });
  }

  const project = await getProject(slug);
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}
