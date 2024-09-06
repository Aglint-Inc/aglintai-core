import { DatabaseEnums } from '@aglint/shared-types';
import { supabaseAdmin } from '../../supabase/supabaseAdmin';
import { PortalMessageType, PortalPayload } from '../types/portalMessage';

export default async function sendMessageToCandidatePortal({
  portalMessage,
  body,
  subject,
  type,
}: {
  portalMessage: PortalPayload;
  body: string;
  subject: string;
  type: DatabaseEnums['email_slack_types'];
}) {
  const mailType = getType(type);
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
          type: mailType,
        });

      if (portalError) {
        throw new Error(portalError.message);
      }
    }
  } catch (error) {
    // console.log('portal message sending failed ', error.message);
  }
}

const getType = (
  mailType: DatabaseEnums['email_slack_types'],
): PortalMessageType => {
  if (
    mailType === 'sendSelfScheduleRequest_email_applicant' ||
    mailType === 'selfScheduleReminder_email_applicant'
  )
    return 'selfSchedule';
  if (
    mailType === 'sendAvailReqReminder_email_applicant' ||
    mailType === 'sendAvailabilityRequest_email_applicant'
  )
    return 'availability';

  return null;
};
