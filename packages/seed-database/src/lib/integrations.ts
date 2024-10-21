import { seed_integrations } from '../data/integrations';
import { getSupabaseServer } from '../supabaseAdmin';

export const createIntegrations = async ({
  recruiter_id,
}: {
  recruiter_id: string;
}) => {
  const supabaseAdmin = getSupabaseServer();
  await supabaseAdmin.from('integrations').insert({
    recruiter_id,
    service_json: seed_integrations.service_json,
    zoom_auth: seed_integrations.zoom_auth,
  });
  console.log('Integrations are created');
};
