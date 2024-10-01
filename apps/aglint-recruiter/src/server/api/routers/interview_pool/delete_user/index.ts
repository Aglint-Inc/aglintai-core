import { createTRPCRouter } from '@/server/api/trpc';

import { deleteModuleRelation } from './delete_relation';
import { fetchRelations } from './fetch_relations';

export const deleteUser = createTRPCRouter({
  fetch_relations: fetchRelations,
  delete_relation: deleteModuleRelation,
});
