import { Role } from '@/types';

// formatted env variables
export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'TradeSpace',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    default_url: (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000') + (process.env.NEXT_PUBLIC_DEFAULT_ROUTE || ''),
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    keyLocation: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },
  database: {
    url: process.env.DATABASE_URL || '',
  },
  auth: {
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    secret: process.env.NEXTAUTH_SECRET || '',
  },
  google: {
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    map_id: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || '',
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
    client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
};

// Middleware
export const privateRoutes: Record<string, Role> = {
  '/developer': 'admin',
  '/dashboard': 'user',
};

export const publicUserData = {
  name: true,
  contactInfo: true,
  jobsCreated: true,
  jobsWorking: true,
  offerings: true,
  ratingFrom: true,
  ratingTo: true,
  createdAt: true,
  updatedAt: true,
};