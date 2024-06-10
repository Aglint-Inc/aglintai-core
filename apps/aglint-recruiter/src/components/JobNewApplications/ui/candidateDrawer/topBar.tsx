import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

import { CandidateName } from '@/devlink/CandidateName';
import { CandidateSidedrawerTop } from '@/devlink/CandidateSidedrawerTop';
import { useApplication } from '@/src/context/ApplicationContext';
import { getFullName } from '@/src/utils/jsonResume';

const Info = () => {
  const {
    application: { data, status },
  } = useApplication();
  if (status === 'pending') return <Stack>Loading...</Stack>;
  return (
    <CandidateName
      isLinedin={false}
      isResume={false}
      onClickLinkedin={{ onClick: () => {} }}
      onClickResume={{ onClick: () => {} }}
      textName={getFullName(
        data?.candidates?.first_name,
        data?.candidates?.last_name,
      )}
    />
  );
};

const Actions = () => {
  const {
    application: { data, status },
  } = useApplication();
  if (status === 'pending') return <Stack>Loading...</Stack>;
  return (
    <CandidateSidedrawerTop
      isBookmarked={data.bookmarked}
      isDownArrowEnable={false}
      isUpArrowEnable={false}
      onClickBookMark={{ onClick: () => {} }}
      onClickClose={{ onClick: () => {} }}
      onClickDown={{ onClick: () => {}, style: { display: 'none' } }}
      onClickUp={{ onClick: () => {}, style: { display: 'none' } }}
    />
  );
};

const TopBar = (props: PropsWithChildren) => {
  return (
    <Stack
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
      }}
    >
      {props.children ?? (
        <>
          <Info />
          <Actions />
        </>
      )}
    </Stack>
  );
};

TopBar.Info = Info;
TopBar.Actions = Actions;

export { TopBar };
