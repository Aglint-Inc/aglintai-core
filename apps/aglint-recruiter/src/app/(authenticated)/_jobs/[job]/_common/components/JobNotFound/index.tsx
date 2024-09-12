import { Page404 } from '@devlink/Page404';
import { useRouter } from 'next/router';

import { UIButton } from '@/components/Common/UIButton';
import ROUTES from '@/utils/routing/routes';

export const JobNotFound = () => {
  const { replace } = useRouter();
  return (
    <Page404
      text404={'Job not found'}
      slot404={
        <UIButton
          variant={'secondary'}
          onClick={() => replace(ROUTES['/jobs']())}
        >
          Go to Jobs
        </UIButton>
      }
    />
  );
};
