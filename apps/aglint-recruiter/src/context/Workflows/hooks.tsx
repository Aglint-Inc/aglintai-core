import { useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  useWorkflowCreate,
  useWorkflowDelete,
  useWorkflowJobFilter,
  useWorkflowMutations,
  useWorkflowQuery,
  useWorkflowUpdate,
} from '@/src/queries/workflow';
import { SafeObject } from '@/src/utils/safeObject';

import { useAuthDetails } from '../AuthContext/AuthContext';
import { useRolesAndPermissions } from '../RolesAndPermissions/RolesAndPermissionsContext';

const useWorkflowsContext = () => {
  const { recruiter_id } = useAuthDetails();
  const workflows = useWorkflowQuery();
  const { mutate: createWorkflowMutation } = useWorkflowCreate();
  const workflowJobFilter = useWorkflowJobFilter();
  const { mutate: deleteWorkflowMutation } = useWorkflowDelete();
  const workflowUpdate = useWorkflowUpdate();
  const workflowMutations = useWorkflowMutations();

  const handleCreateWorkflow = useCallback(
    (
      payload: Omit<
        Parameters<typeof createWorkflowMutation>[0]['payload'],
        'recruiter_id'
      >,
    ) => {
      const id = uuidv4();
      createWorkflowMutation({
        id,
        recruiter_id,
        payload,
      });
    },
    [workflows.data],
  );

  const handleDeleteWorkflow = useCallback(
    (payload: Parameters<typeof deleteWorkflowMutation>[0]) => {
      deleteWorkflowMutation(payload);
    },
    [workflows.data],
  );

  const { devlinkProps: getDevlinkProps, checkPermissions } =
    useRolesAndPermissions();

  const manageWorkflow = useMemo(
    () => checkPermissions(['manage_workflow']),
    [checkPermissions],
  );

  const devlinkProps = useMemo(
    () => getDevlinkProps(['manage_workflow']),
    [getDevlinkProps],
  );

  const mutations = SafeObject.values(workflowMutations)
    .flatMap((values) => values)
    .map(({ id }) => id);

  return {
    workflows,
    workflowUpdate,
    workflowMutations: mutations,
    workflowJobFilter,
    handleCreateWorkflow,
    handleDeleteWorkflow,
    devlinkProps,
    manageWorkflow,
  };
};

export default useWorkflowsContext;
