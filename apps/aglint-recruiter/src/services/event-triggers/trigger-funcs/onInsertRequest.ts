import { type DatabaseTable } from '@aglint/shared-types';

import { cloneWorkflowsForRequests } from '@/utils/clone/cloneWorkflowsForRequests';

export const onInsertRequest = async ({
  new_data,
}: {
  new_data: DatabaseTable['request'];
}) => {
  await createRequestWorkflows({
    new_data,
  });
};

const createRequestWorkflows = async ({
  new_data,
}: {
  new_data: DatabaseTable['request'];
}) => {
  try {
    await cloneWorkflowsForRequests({
      request_id: new_data.id,
    });
  } catch (err: any) {
    console.error('Failed onInsertRequest createRequestWorkflows', err.message);
  }
};
