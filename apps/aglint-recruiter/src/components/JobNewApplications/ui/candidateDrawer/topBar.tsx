import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

import { CandidateName } from '@/devlink/CandidateName';
import { CandidateSidedrawerTop } from '@/devlink/CandidateSidedrawerTop';
import { useApplication } from '@/src/context/ApplicationContext';
import { useApplicationStore } from '@/src/context/ApplicationContext/store';

const Info = () => {
  const {
    meta: { data },
  } = useApplication();
  const setPreview = useApplicationStore(({ setPreview }) => setPreview);
  return (
    <CandidateName
      isLinedin={false}
      isResume={!!data?.file_url}
      onClickLinkedin={{ onClick: () => {} }}
      onClickResume={{ onClick: () => setPreview(true) }}
      textName={data?.name ?? '---'}
    />
  );
};

const Actions = () => {
  const { handlClose } = useApplicationStore(({ handlClose }) => ({
    handlClose,
  }));
  const {
    meta: { data },
    handleUpdateApplication,
  } = useApplication();
  return (
    <CandidateSidedrawerTop
      isBookmarked={data.bookmarked}
      isDownArrowEnable={false}
      isUpArrowEnable={false}
      onClickBookMark={{
        onClick: () =>
          handleUpdateApplication({ bookmarked: !data.bookmarked }),
      }}
      onClickClose={{ onClick: () => handlClose() }}
      onClickDown={{ onClick: () => {}, style: { display: 'none' } }}
      onClickUp={{ onClick: () => {}, style: { display: 'none' } }}
    />
  );
};

const TopBar = (props: PropsWithChildren) => {
  const {
    meta: { status },
  } = useApplication();
  if (status === 'pending') return <>Loadin...</>;
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
