import { useRouter } from 'next/router';

import { Page404 } from '@/devlink/Page404';
import { ButtonSoft } from '@/devlink3/ButtonSoft';
import ROUTES from '@/src/utils/routing/routes';

const JobNotFound = () => {
  const { replace } = useRouter();
  return (
    <Page404
      text404={'Job not found'}
      slot404={
        <ButtonSoft
          iconSize={2}
          color={'neutral'}
          textButton={'Go to Jobs'}
          onClickButton={{ onClick: () => replace(ROUTES['/jobs']()) }}
        />
      }
    />
  );
};

export default JobNotFound;
