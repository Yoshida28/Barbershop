import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  price: string;
  description: string | null;
  category: string | null;
  image_url: string | null;
  duration: string | null;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string | null;
  category: string | null;
  image_url: string | null;
  rating: number | null;
  reviews: number | null;
  details: string[];
  sort_order: number;
  created_at: string;
}

export interface RateCardItem {
  id: string;
  service_name: string;
  price: string;
  duration: string | null;
  category: string | null;
  sort_order: number;
  created_at: string;
}

export interface Location {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  hours: string | null;
  lat: number | null;
  lng: number | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  title: string | null;
  image_url: string;
  category: string | null;
  sort_order: number;
  created_at: string;
}

export interface MediaItem {
  id: string;
  title: string;
  description: string | null;
  media_url: string | null;
  media_type: string;
  published_at: string;
  created_at: string;
}

export interface FranchiseInfo {
  id: string;
  key: string;
  label: string;
  value: string;
  sort_order: number;
}

export interface ContactSubmission {
  id: string;
  type: 'general' | 'franchise' | 'career';
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  message: string | null;
  created_at: string;
}
