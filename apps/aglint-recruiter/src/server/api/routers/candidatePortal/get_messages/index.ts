import {
  type CandidatePortalProcedure,
  candidatePortalProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const query = async ({ ctx: { application_id } }: CandidatePortalProcedure) => {
  const db = createPublicClient();

  const messages = (
    await db
      .from('candidate_portal_message')
      .select(
        'id,message,created_at,title,availability_id,filter_id,applications(recruiter(name,logo)),interview_filter_json(id,viewed_on,confirmed_on),candidate_request_availability(id,slots,visited),type',
      )
      .eq('application_id', application_id)
      .order('created_at', { ascending: false })
      .throwOnError()
  ).data!;

  const enrichedMessages = messages.map((message) => {
    const {
      candidate_request_availability,
      interview_filter_json,
      applications,
      ...rest
    } = message;

    const company = applications?.recruiter;

    const messageWithCompany = {
      ...rest,
      company_name: company?.name,
      company_logo: company?.logo,
    };
    if (message.availability_id)
      return {
        ...messageWithCompany,
        isNew: !candidate_request_availability?.visited,
        isSubmitted: Boolean(candidate_request_availability?.slots),
        link: `/request-availability/${message.availability_id}`,
      };
    if (message.filter_id)
      return {
        ...messageWithCompany,
        isNew: !interview_filter_json?.viewed_on,
        isSubmitted: Boolean(interview_filter_json?.confirmed_on),
        link: `/self-scheduling/${message.filter_id}`,
      };
    return {
      ...messageWithCompany,
      isNew: null,
      isSubmitted: null,
      link: null,
    };
  });

  return enrichedMessages!;
};

export const get_messages = candidatePortalProcedure.query(query);

export type GetMessages = ProcedureDefinition<typeof get_messages>;
