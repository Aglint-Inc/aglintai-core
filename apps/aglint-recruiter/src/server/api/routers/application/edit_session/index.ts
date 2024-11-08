/* eslint-disable no-console */

import { editInterviewSession } from '@/queries/interview-plans/utils';
import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';

import { schemaEditSession } from './schema';

const mutation = async ({
  input,
  ctx: { db },
}: PrivateProcedure<typeof schemaEditSession>) => {
  await editInterviewSession(input, db);
  return true;
};

export const editSession = privateProcedure
  .input(schemaEditSession)
  .mutation(mutation);
