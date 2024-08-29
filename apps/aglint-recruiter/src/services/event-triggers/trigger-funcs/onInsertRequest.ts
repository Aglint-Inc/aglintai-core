import { DatabaseTable } from '@aglint/shared-types';

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
  // eslint-disable-next-line no-unused-vars
  new_data,
}: {
  new_data: DatabaseTable['request'];
}) => {
  try {
    // await cloneWorkflows({
    //   request_id: new_data.id,
    // });
  } catch (err) {
    console.error('Failed onInsertRequest createRequestWorkflows', err.message);
  }
};
