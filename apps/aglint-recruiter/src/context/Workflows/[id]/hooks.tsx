import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

import { useWorkflows } from '..';

const useWorkflowContext = () => {
  const {
    query: { id },
  } = useRouter();
  const {
    workflows: { data, status },
    workflowDelete: { mutate: deleteMutation },
    workflowUpdate: { mutate: updateMuation },
  } = useWorkflows();
  const workflow = useMemo(
    () =>
      status === 'success'
        ? (data ?? []).find((workflow) => workflow.id === id)
        : null,
    [status, data],
  );

  const handleDelete = useCallback(
    () => deleteMutation({ id: workflow?.id ?? null }),
    [workflow],
  );

  const handleUpdate = useCallback(
    (payload: Parameters<typeof updateMuation>[0]['payload']) =>
      updateMuation({ id: workflow?.id ?? null, payload }),
    [workflow],
  );
  return {
    workflow,
    handleDelete,
    handleUpdate,
  };
};

export default useWorkflowContext;
