const dotenv = require('dotenv');

dotenv.config();

export const envConfig = {
  SUPABASE_URL: process.env.SUPABASE_URL ?? '',
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ?? '',
};
