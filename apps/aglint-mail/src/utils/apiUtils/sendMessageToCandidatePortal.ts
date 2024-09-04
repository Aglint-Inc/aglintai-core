import { supabaseAdmin } from '../../supabase/supabaseAdmin';

export default async function sendMessageToCandidatePortal({
  application_id,
  body,
  subject,
}: {
  application_id: string;
  body: string;
  subject: string;
}) {
  try {
    const { data } = await supabaseAdmin
      .from('applications')
      .select()
      .eq('status', 'interview')
      .eq('id', application_id);

    if (data) {
      const { error } = await supabaseAdmin
        .from('candidate_portal_message')
        .insert({
          application_id,
          message: body,
          is_readed: false,
          title: subject,
        });

      if (error) {
        throw new Error(error.message);
      }
    }
  } catch (error) {
    // console.log('message send to candidate portal failed', error.message);
  }
}
