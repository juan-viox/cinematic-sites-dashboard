import { NextRequest, NextResponse } from 'next/server';
import { createProject, getProjects, generateSlug, ProjectData } from '@/lib/projects';

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { business, brand, services, goals, technical, marketing } = body;

  if (!business?.name || !business?.businessType) {
    return NextResponse.json(
      { error: 'Business name and type are required' },
      { status: 400 }
    );
  }

  const slug = generateSlug(business.name);

  const projectData: ProjectData = {
    version: '3.0',
    client: {
      slug,
      name: business.name,
      sourceUrl: business.sourceUrl || '',
      instagramUrl: business.instagramUrl || '',
      businessType: business.businessType,
      tagline: business.tagline,
      founder: business.founder,
      phone: business.phone,
      email: business.email,
      address: business.address,
      location: business.location,
      region: business.region,
      description: business.description,
      yearsInBusiness: business.yearsInBusiness,
      teamSize: business.teamSize,
    },
    brandPreferences: {
      colorPreference: brand?.colorPreference || 'ai',
      styleMood: brand?.styleMood || [],
      referenceUrls: brand?.referenceUrls || [],
      logoUrl: brand?.logoUrl || '',
      brandColors: brand?.brandColors || '',
      typography: brand?.typography || '',
    },
    services: services?.services?.filter((s: { name: string }) => s.name) || [],
    servicesMeta: {
      specialties: services?.specialties || '',
      targetAudience: services?.targetAudience || '',
    },
    goals: {
      goals: goals?.goals || [],
      knownCompetitors: goals?.knownCompetitors || [],
      differentiator: goals?.differentiator || '',
      budgetRange: goals?.budgetRange || '',
    },
    technical: {
      customDomain: technical?.customDomain || '',
      githubUsername: technical?.githubUsername || '',
      seoKeywords: technical?.seoKeywords || [],
      schemaType: technical?.schemaType || '',
      voicePersona: technical?.voicePersona || '',
      voiceLanguages: technical?.voiceLanguages || ['English'],
      voicePhoneNumber: technical?.voicePhoneNumber || '',
      enableVoiceAgent: technical?.enableVoiceAgent !== false,
      enableGithubDeploy: technical?.enableGithubDeploy !== false,
    },
    marketing: {
      socialAccounts: marketing?.socialAccounts || {},
      currentEfforts: marketing?.currentEfforts || '',
      blotatoInterest: marketing?.blotatoInterest || false,
      contentPreferences: marketing?.contentPreferences || [],
      newsletterProvider: marketing?.newsletterProvider || '',
      newsletterEmail: marketing?.newsletterEmail || '',
      enableNewsletter: marketing?.enableNewsletter !== false,
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
