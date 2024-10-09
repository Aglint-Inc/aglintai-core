import z from 'zod';

export const schemaExecuteRequestWorkflow = z.object({
  request_id: z.string(),
});
