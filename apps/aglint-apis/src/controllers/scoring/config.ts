import dotenv from 'dotenv';
import OpenAI from 'openai';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variables are required.');
}

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const supabase = supabaseAdmin;
