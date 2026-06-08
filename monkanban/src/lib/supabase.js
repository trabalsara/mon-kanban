// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Ces variables viennent du fichier .env.local

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const supabase = createClient(supabaseUrl, supabaseKey);
