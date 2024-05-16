import { createClient } from "@supabase/supabase-js";
import axios from "axios";

import dotenv from "dotenv";

dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const FETCH_CANDIDATES = process.env.FETCH_CANDIDATES;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables are required."
  );
}
if (!FETCH_CANDIDATES) {
  throw new Error("FETCH_CANDIDATESenvironment variables are required.");
}
export const supabase = createClient(supabaseUrl, supabaseKey);

export const callFetchCandidates = async ({
  page,
  apiKey,
}: {
  page: string;
  apiKey: string;
}) => {
  return await axios
    .post(FETCH_CANDIDATES, {
      page: page,
      apiKey: apiKey,
    })
    .then((res) => res.data);
};
