import { DatabaseTable } from '@aglint/shared-types';

export const onUpdateRequest = async ({
  new_data,
  old_data,
}: {
  old_data: DatabaseTable['request'];
  new_data: DatabaseTable['request'];
}) => {
  if (new_data.status === 'to_do' && old_data.status === 'in_progress') {
    //
  }
};
