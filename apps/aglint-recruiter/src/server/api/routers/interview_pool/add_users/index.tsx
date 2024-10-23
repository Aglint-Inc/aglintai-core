import {
  type DatabaseTable,
  type DatabaseTableInsert,
  interviewModuleRelationInsertSchema,
} from '@aglint/shared-types';
import { z } from 'zod';

import { type StatusTraining } from '@/interview-pool/details/types/pool';
import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const UserSchema = z.object({
  user_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  profile_image: z.string(),
  position: z.string(),
});

const schema = z.object({
  selectedUsers: z.array(UserSchema),
  relations: z.array(interviewModuleRelationInsertSchema),
  trainingStatus:
    interviewModuleRelationInsertSchema.required().shape.training_status,
  pool: z.object({
    id: z.string(),
    noReverseShadow: z.number(),
    noShadow: z.number(),
  }),
});

const mutation = async ({
  input: { relations, selectedUsers, trainingStatus, pool },
}: PrivateProcedure<typeof schema>) => {
  const seletedUserIds = selectedUsers.map((user) => user.user_id);

  const archivedRelations = relations
    .filter((rel) => rel.is_archived)
    .filter((rel) => seletedUserIds.includes(rel.user_id));

  if (archivedRelations.length > 0) {
    await updateRelations(archivedRelations, trainingStatus);
  }

  const newRelations = selectedUsers.filter(
    (user) =>
      archivedRelations.findIndex((rel) => rel.user_id === user.user_id) === -1,
  );

  if (newRelations.length > 0) {
    await addMemberbyUserIds({
      module_id: pool.id,
      user_ids: selectedUsers.map((user) => user.user_id),
      training_status: trainingStatus,
      number_of_reverse_shadow: pool.noReverseShadow,
      number_of_shadow: pool.noShadow,
    });
  }

  return { success: true };
};

export const addUsers = privateProcedure.input(schema).mutation(mutation);

export type AddUsers = ProcedureDefinition<typeof addUsers>;

export const updateRelations = async (
  archivedRelations: z.infer<typeof schema>['relations'],
  training_status: DatabaseTable['interview_module_relation']['training_status'],
) => {
  const db = await createPrivateClient();
  const upsertRelations: DatabaseTableInsert['interview_module_relation'][] =
    archivedRelations.map((user) => ({
      id: user.id,
      user_id: user.user_id,
      module_id: user.module_id,
      training_status: training_status,
      is_archived: false,
    }));

  await db
    .from('interview_module_relation')
    .upsert(upsertRelations)
    .throwOnError();
};

export const addMemberbyUserIds = async ({
  user_ids,
  module_id,
  training_status,
  number_of_reverse_shadow,
  number_of_shadow,
}: {
  user_ids: string[];
  module_id: string;
  training_status: StatusTraining;
  number_of_reverse_shadow: number;
  number_of_shadow: number;
}) => {
  const db = await createPrivateClient();
  const interviewModRelations: DatabaseTableInsert['interview_module_relation'][] =
    user_ids.map((user_id) => ({
      user_id: user_id,
      module_id: module_id,
      training_status: training_status,
      number_of_reverse_shadow,
      number_of_shadow,
    }));

  await db
    .from('interview_module_relation')
    .insert(interviewModRelations)
    .throwOnError();
};
