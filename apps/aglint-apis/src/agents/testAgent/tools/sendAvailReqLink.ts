import {DynamicStructuredTool} from 'langchain/tools';
import {dayjsLocal} from 'src/utils/dayjsLocal/dayjsLocal';
import z from 'zod';

export const sendAvailReqLink = () => {
  return new DynamicStructuredTool({
    name: 'send-availability-request-link-to-candidate',
    description:
      'collects details necessary for sending the sending availability request link and sends the link to the candidate',
    schema: z.object({
      interview_sessions: z
        .string()
        .array()
        .describe('selected interview sessions to schedule'),
      candidate: z.object({
        candidate_name: z
          .string()
          .describe("candidate's first name or lastname or full name"),
        job_title: z.string(),
      }),
      date_range: z.object({
        start_date: z
          .string()
          .optional()
          .default(
            dayjsLocal().add(1, 'week').startOf('week').format('DD/MM/YYYY')
          )
          .describe('Request availability from this date in DD/MM/YYYY'),
        end_date: z
          .string()
          .optional()
          .default(
            dayjsLocal().add(1, 'week').endOf('week').format('DD/MM/YYYY')
          )
          .describe('Request availabilitytill this date in DD/MM/YYYY'),
      }),
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
    func: async payload => {
      try {
        //
        return 'link sent sucessfully';
      } catch (error: any) {
        return 'Failed to perform the action';
      }
    },
  });
};
