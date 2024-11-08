/* eslint-disable no-console */

import {
  type EditInterviewSession,
  editInterviewSession,
} from '@/queries/interview-plans';
import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';

import { schemaEditSession } from './schema';

const mutation = async ({
  input,
}: PrivateProcedure<typeof schemaEditSession>) => {
  const { interview_module_relation_entries, ...rest } = input;
  const editInterviewSessionParams: EditInterviewSession = {
    ...rest,
    interview_module_relation_entries,
  };
  await editInterviewSession(editInterviewSessionParams);
  return true;
};

export const editSession = privateProcedure
  .input(schemaEditSession)
  .mutation(mutation);
