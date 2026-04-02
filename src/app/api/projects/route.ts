import { NextRequest, NextResponse } from 'next/server';
import { createProject, getProjects, generateSlug, ProjectData } from '@/lib/projects';

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { business, brand, services, goals, marketing } = body;

  if (!business?.name || !business?.businessType) {
    return NextResponse.json(
      { error: 'Business name and type are required' },
      { status: 400 }
    );
  }

  const slug = generateSlug(business.name);

  const projectData: ProjectData = {
    version: '2.0',
    client: {
      slug,
      name: business.name,
      sourceUrl: business.sourceUrl || '',
      businessType: business.businessType,
      phone: business.phone,
      email: business.email,
      address: business.address,
      description: business.description,
      yearsInBusiness: business.yearsInBusiness,
      teamSize: business.teamSize,
    },
    brandPreferences: {
      colorPreference: brand?.colorPreference || 'ai',
      styleMood: brand?.styleMood || [],
      referenceUrls: brand?.referenceUrls || [],
    },
    services: services?.services?.filter((s: { name: string }) => s.name) || [],
    goals: {
      goals: goals?.goals || [],
      knownCompetitors: goals?.knownCompetitors || [],
      differentiator: goals?.differentiator || '',
      budgetRange: goals?.budgetRange || '',
    },
    marketing: {
      socialAccounts: marketing?.socialAccounts || {},
      currentEfforts: marketing?.currentEfforts || '',
      blotatoInterest: marketing?.blotatoInterest || false,
      contentPreferences: marketing?.contentPreferences || [],
    },
    status: { phase: 'intake', completedPhases: ['intake'] },
    competitive: {},
    brand: {},
    hero: {},
    site: {},
    voiceAgent: {},
  };

  await createProject(projectData);
  return NextResponse.json({ slug, message: 'Project created' });
}
