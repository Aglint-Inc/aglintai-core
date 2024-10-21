import { type PrivateProcedure } from '@/server/api/trpc';
import { findReplacementIntsUtil } from '@/services/CandidateSchedule/utils/replaceInterviewer/findReplacementInt';

import { type schemaFindAlternativeSlots } from './schema';

export const findReplacementInt = async ({
  input,
}: PrivateProcedure<typeof schemaFindAlternativeSlots>) => {
  const replacement_ints = findReplacementIntsUtil({
    declined_int_sesn_reln_id: input.declined_int_sesn_reln_id,
    session_id: input.session_id,
  });
  return replacement_ints;
};
