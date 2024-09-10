import { WithPermission } from '@/components/withPermission';

import Create from './popup/create';

export const Actions = () => {
  return (
    <WithPermission permission={['manage_workflow']}>
      <Create />
    </WithPermission>
  );
};
