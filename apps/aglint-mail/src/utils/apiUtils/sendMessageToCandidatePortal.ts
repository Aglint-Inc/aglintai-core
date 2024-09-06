import { supabaseAdmin } from '../../supabase/supabaseAdmin';
import type { PortalPayload } from '../types/portalMessage';

export default async function sendMessageToCandidatePortal({
  portalMessage,
  body,
  subject,
}: {
  portalMessage: PortalPayload;
  body: string;
  subject: string;
}) {
  try {
    const { data, error } = await supabaseAdmin
      .from('applications')
      .select()
      .eq('status', 'interview')
      .eq('id', portalMessage.application_id);

    if (error) throw new Error(error.message);
    if (!(data.length > 0)) throw new Error(': application not present');

    if (data.length > 0) {
      const { error: portalError } = await supabaseAdmin
        .from('candidate_portal_message')
        .insert({
          ...portalMessage,
          message: body,
          is_readed: false,
          title: subject,
        });

      if (portalError) {
        throw new Error(portalError.message);
      }
    }
  } catch (error) {
    // console.log('portal message sending failed ', error.message);
  }
}
