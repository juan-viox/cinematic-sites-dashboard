/**
 * Blotato.com integration stubs
 * Ready for API integration when Blotato API docs are available.
 * Blotato manages social media scheduling, content calendar, and multi-platform posting.
 */

export interface BlotatoAccount {
  platform: string;
  handle: string;
  connected: boolean;
  profileUrl?: string;
}

export interface BlotatoPost {
  id: string;
  content: string;
  platforms: string[];
  scheduledAt: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  mediaUrls?: string[];
}

export interface BlotatoCalendarEntry {
  date: string;
  posts: BlotatoPost[];
}

// Stub: Connect a social media account via Blotato
export async function connectAccount(
  _platform: string,
  _credentials: Record<string, string>
): Promise<BlotatoAccount> {
  // TODO: Integrate with Blotato API
  // POST https://api.blotato.com/v1/accounts/connect
  throw new Error('Blotato integration not yet configured. Visit blotato.com for API access.');
}

// Stub: Get connected accounts
export async function getConnectedAccounts(): Promise<BlotatoAccount[]> {
  // TODO: GET https://api.blotato.com/v1/accounts
  return [];
}

// Stub: Schedule a post across platforms
export async function schedulePost(
  _content: string,
  _platforms: string[],
  _scheduledAt: string,
  _mediaUrls?: string[]
): Promise<BlotatoPost> {
  // TODO: POST https://api.blotato.com/v1/posts/schedule
  throw new Error('Blotato integration not yet configured.');
}

// Stub: Get content calendar
export async function getCalendar(
  _startDate: string,
  _endDate: string
): Promise<BlotatoCalendarEntry[]> {
  // TODO: GET https://api.blotato.com/v1/calendar
  return [];
}

// Supported platforms for Blotato integration
export const SUPPORTED_PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: 'instagram' },
  { id: 'facebook', name: 'Facebook', icon: 'facebook' },
  { id: 'tiktok', name: 'TikTok', icon: 'tiktok' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin' },
  { id: 'x', name: 'X (Twitter)', icon: 'x' },
  { id: 'youtube', name: 'YouTube', icon: 'youtube' },
];
