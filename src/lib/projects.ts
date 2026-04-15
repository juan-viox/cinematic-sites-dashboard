import { promises as fs } from 'fs';
import path from 'path';

// Use ../output when running locally (Claude Code pipeline), /tmp on Vercel
const LOCAL_OUTPUT = path.resolve(process.cwd(), '../output');
const VERCEL_OUTPUT = '/tmp/cinematic-sites';
const IS_VERCEL = !!process.env.VERCEL;
const OUTPUT_DIR = IS_VERCEL ? VERCEL_OUTPUT : LOCAL_OUTPUT;

export interface ClientInfo {
  slug: string;
  name: string;
  sourceUrl: string;
  businessType: string;
  instagramUrl?: string;
  tagline?: string;
  founder?: string;
  phone?: string;
  email?: string;
  address?: string;
  location?: string;
  region?: string;
  description?: string;
  yearsInBusiness?: string;
  teamSize?: string;
}

export interface BrandPreferences {
  colorPreference: string;
  styleMood: string[];
  referenceUrls: string[];
  logoPath?: string;
  logoUrl?: string;
  brandColors?: string;
  typography?: string;
}

export interface TechnicalSetup {
  customDomain: string;
  githubUsername: string;
  seoKeywords: string[];
  schemaType: string;
  voicePersona: string;
  voiceLanguages: string[];
  voicePhoneNumber: string;
  enableVoiceAgent: boolean;
  enableGithubDeploy: boolean;
}

export interface ServiceItem {
  name: string;
  description: string;
  price?: string;
}

export interface GoalsInfo {
  goals: string[];
  knownCompetitors: string[];
  differentiator: string;
  budgetRange: string;
}

export interface MarketingInfo {
  socialAccounts: Record<string, string>;
  currentEfforts: string;
  blotatoInterest: boolean;
  contentPreferences: string[];
  newsletterProvider?: string;
  newsletterEmail?: string;
  enableNewsletter?: boolean;
}

export interface CompetitorEntry {
  name: string;
  url: string;
  standout: string;
  designScore?: number;
  heroStyle?: string;
  colorPalette?: string[];
  navStyle?: string;
  sections?: string[];
  interactiveElements?: string[];
  ctaStrategy?: string;
  mobileNotes?: string;
}

export interface ProjectData {
  version: string;
  client: ClientInfo;
  brandPreferences: BrandPreferences;
  services: ServiceItem[];
  servicesMeta?: { specialties: string; targetAudience: string };
  goals: GoalsInfo;
  technical?: TechnicalSetup;
  marketing: MarketingInfo;
  status: { phase: string; completedPhases: string[] };
  competitive: {
    competitors?: CompetitorEntry[];
    analysis?: Record<string, unknown>;
    clientAudit?: Record<string, unknown>;
  };
  brand: Record<string, unknown>;
  hero: Record<string, unknown>;
  site: Record<string, unknown>;
  voiceAgent: Record<string, unknown>;
}

async function ensureOutputDir(): Promise<void> {
  try {
    await fs.access(OUTPUT_DIR);
  } catch {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  }
}

export async function getProjects(): Promise<ProjectData[]> {
  try {
    await fs.access(OUTPUT_DIR);
  } catch {
    return [];
  }

  const entries = await fs.readdir(OUTPUT_DIR, { withFileTypes: true });
  const projects: ProjectData[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const projectFile = path.join(OUTPUT_DIR, entry.name, 'project.json');
    try {
      const raw = await fs.readFile(projectFile, 'utf-8');
      projects.push(JSON.parse(raw));
    } catch {
      // skip directories without valid project.json
    }
  }

  return projects;
}

export async function getProject(slug: string): Promise<ProjectData | null> {
  const projectFile = path.join(OUTPUT_DIR, slug, 'project.json');
  try {
    const raw = await fs.readFile(projectFile, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function createProject(data: ProjectData): Promise<void> {
  await ensureOutputDir();
  const dir = path.join(OUTPUT_DIR, data.client.slug);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    path.join(dir, 'project.json'),
    JSON.stringify(data, null, 2)
  );
}

export async function updateProject(
  slug: string,
  updates: Partial<ProjectData>
): Promise<ProjectData | null> {
  const existing = await getProject(slug);
  if (!existing) return null;
  const merged = { ...existing, ...updates };
  const dir = path.join(OUTPUT_DIR, slug);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    path.join(dir, 'project.json'),
    JSON.stringify(merged, null, 2)
  );
  return merged;
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
