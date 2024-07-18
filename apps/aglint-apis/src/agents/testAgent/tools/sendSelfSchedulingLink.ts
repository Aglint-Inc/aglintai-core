import {DynamicStructuredTool} from 'langchain/tools';
import {dayjsLocal} from 'src/utils/dayjsLocal/dayjsLocal';
import z from 'zod';

export const sendSelfSchedulingLink = () => {
  return new DynamicStructuredTool({
    name: 'send-self-scheduling-link-to-candidate',
    description:
      'collects details necessary for sending the sending self scheduling link and sends the link to the candidate',
    schema: z.object({
      candidate: z.object({
        first_name: z.string(),
        last_name: z.string().nullable().optional(),
        job_title: z.string(),
      }),
      date_range: z.object({
        start_date: z
          .string()
          .optional()
          .default(
            dayjsLocal().add(1, 'week').startOf('week').format('DD/MM/YYYY')
          )
          .describe('show slots from this date in DD/MM/YYYY'),
        end_date: z
          .string()
          .optional()
          .default(
            dayjsLocal().add(1, 'week').endOf('week').format('DD/MM/YYYY')
          )
          .describe('show slots till this date in DD/MM/YYYY'),
      }),
      options: z
        .object({
          show_soft_conflicts_slots: z
            .boolean()
            .default(false)
            .describe(
              'whther to allow candidate to schedule on soft conflicted slots'
            ),
          show_out_of_office_slots: z
            .boolean()
            .default(false)
            .describe(
              'whether to allow candidate to schedule on Out Of Office conflicted slots'
            ),
        })
        .optional()
        .default({}),
    }),
    func: async payload => {
      try {
        console.log(payload);
        return 'link sent sucessfully';
      } catch (error: any) {
        return 'Failed to perform the action';
      }
    },
  });
};
