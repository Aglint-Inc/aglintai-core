import {EmailTemplateAPi} from '@aglint/shared-types';
import {supabaseWrap} from '@aglint/shared-utils';
import axios from 'axios';
import {DynamicStructuredTool} from 'langchain/tools';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import {dayjsLocal} from 'src/utils/dayjsLocal/dayjsLocal';
import z from 'zod';

export const sendAvailReqLink = ({recruiter_id}: {recruiter_id: string}) => {
  return new DynamicStructuredTool({
    name: 'send-availability-request-link-to-candidate',
    description:
      'collects details necessary for sending the sending availability request link and sends the link to the candidate',
    schema: z.object({
      interview_sessions: z
        .string()
        .array()
        .describe('selected interview sessions to schedule'),
      candidate_info: z
        .object({
          candidate_name: z.string().describe("candidate's name"),
          job_role: z.string(),
        })
        .describe('candidate info as per system reponse'),
      date_range: z
        .object({
          start_date: z
            .string()
            .default(
              dayjsLocal().add(1, 'week').startOf('week').format('DD/MM/YYYY')
            )
            .describe('Request availability from this date in DD/MM/YYYY'),
          end_date: z
            .string()
            .default(
              dayjsLocal().add(1, 'week').endOf('week').format('DD/MM/YYYY')
            )
            .describe('Request availabilitytill this date in DD/MM/YYYY'),
        })
        .default({}),
      options: z
        .object({
          show_soft_conflicts_slots: z
            .boolean()
            .default(false)
            .describe(
              'whether to show slot preference on soft conflicted slots'
            ),
          show_out_of_office_slots: z
            .boolean()
            .default(false)
            .describe(
              'whether to show slot preference on Out Of Office conflicted slots'
            ),
        })
        .optional()
        .default({}),
    }),
    func: async func_params => {
      try {
        if (!func_params.date_range.start_date) {
          func_params.date_range.start_date = dayjsLocal()
            .add(1, 'week')
            .startOf('week')
            .format('DD/MM/YYYY');
          func_params.date_range.end_date = dayjsLocal()
            .add(1, 'week')
            .startOf('week')
            .format('DD/MM/YYYY');
        }
        const [matchedCandidate] = supabaseWrap(
          await supabaseAdmin
            .from('candidate_applications_view')
            .select()
            .eq('company_id', recruiter_id)
            .textSearch(
              'full_text_search',
              func_params.candidate_info.candidate_name.split(' ').join('<->')
            ),
          false
        );

        const payload: ReqAvai = {
          application_id: matchedCandidate.application_id,
          recruiter_id: recruiter_id,
          start_date: func_params.date_range.start_date,
          end_date: func_params.date_range.end_date,
          session_details: func_params.interview_sessions,
          api_options: {
            show_soft_conflicts_slots:
              func_params.options.show_soft_conflicts_slots,
            show_out_of_office_slots:
              func_params.options.show_out_of_office_slots,
          },
        };

        const res = await candidateAvailRequest(payload);

        return res;
      } catch (error) {
        console.error(error);
        return 'Failed to perform the action';
      }
    },
  });
};

type ReqAvai = {
  application_id: string;
  recruiter_id: string;
  start_date: string;
  end_date: string;
  session_details: string[];
  api_options: {
    show_soft_conflicts_slots: boolean;
    show_out_of_office_slots: boolean;
  };
};

export const candidateAvailRequest = async ({
  application_id,
  recruiter_id,
  start_date,
  end_date,
  session_details,
  api_options,
}: ReqAvai) => {
  const allSessions = await Promise.all(
    session_details.map(name =>
      supabaseAdmin
        .from('meeting_details')
        .select()
        .eq('application_id', application_id)
        .ilike('session_name', `%${name}%`)
        .then(response => {
          return response.data[0];
        })
    )
  );

  if (allSessions.filter(Boolean).length === 0) {
    return 'Unable to find the sessions mentioned in the request';
  }

  const {data} = await supabaseAdmin
    .from('candidate_request_availability')
    .select('*,request_session_relation(session_id)')
    .eq('application_id', application_id)
    .in(
      'request_session_relation.session_id',
      allSessions.map(s => s.id)
    );

  if (data.filter(req => req.request_session_relation.length > 0).length > 0) {
    return 'Availability Request already sent';
  }

  allSessions.forEach(async session => {
    await supabaseAdmin
      .from('interview_meeting')
      .update({
        status: 'waiting',
      })
      .eq('id', session.id);
  });

  const [avail_req] = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .insert({
        application_id,
        recruiter_id,
        is_task_created: false,
        number_of_days: 2,
        number_of_slots: 2,
        date_range: [start_date, end_date],
        total_slots: null,
        availability: {
          day_offs: true,
          free_keywords: true,
          outside_work_hours: true,
          recruiting_block_keywords: true,
        },
        request_id: null,
      })
      .select()
  );

  supabaseWrap(
    await supabaseAdmin.from('request_session_relation').insert(
      allSessions.map(session => ({
        session_id: session.session_id,
        request_availability_id: avail_req.id,
      }))
    )
  );
  const payload: EmailTemplateAPi<'sendAvailabilityRequest_email_applicant'>['api_payload'] =
    {
      organizer_user_id: allSessions[0].organizer_id,
      avail_req_id: avail_req.id,
    };

  await axios.post(
    `${process.env.CLIENT_APP_URL}/api/sendAvailabilityRequest_email_applicant`,
    {
      ...payload,
    }
  );

  return 'Availability Request sent successfully';
};
