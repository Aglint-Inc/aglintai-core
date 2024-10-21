import { supabaseWrap } from '@aglint/shared-utils';
import { seed_integrations } from '../data/integrations';
import { getSupabaseServer } from '../supabaseAdmin';

export const createIntegrations = async ({
  recruiter_id,
}: {
  recruiter_id: string;
}) => {
  const supabaseAdmin = getSupabaseServer();

  supabaseWrap(
    await supabaseAdmin
      .from('integrations')
      .update({
        service_json: seed_integrations.service_json,
        zoom_auth: seed_integrations.zoom_auth,
        google_workspace_domain: seed_integrations.google_workspace_domain,
      })
      .eq('recruiter_id', recruiter_id)
  );
  console.log('Integrations are created');
};
