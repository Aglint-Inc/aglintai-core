import { CandidateName } from '@devlink/CandidateName';
import { CandidateSidedrawerTop } from '@devlink/CandidateSidedrawerTop';
import { Stack } from '@mui/material';
import { type PropsWithChildren, useEffect, useMemo } from 'react';

import { useApplication } from '@/context/ApplicationContext';
import { useApplicationStore } from '@/context/ApplicationContext/store';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useKeyPress } from '@/hooks/useKeyPress';
import { capitalizeAll } from '@/utils/text/textUtils';

const Info = () => {
  const {
    meta: { data },
  } = useApplication();
  const setPreview = useApplicationStore(({ setPreview }) => setPreview);
  return (
    <CandidateName
      isLinedin={false}
      isResume={!!data?.file_url}
      onClickResume={{ onClick: () => setPreview(true) }}
      textName={capitalizeAll(data?.name ?? '---')}
    />
  );
};

const Actions = () => {
  const { handlClose } = useApplicationStore(({ handlClose }) => ({
    handlClose,
  }));
  const {
    meta: { data },
    navigation,
    handleUpdateApplication,
  } = useApplication();
  const { pressed } = useKeyPress('b');
  useEffect(() => {
    if (pressed) handleUpdateApplication({ bookmarked: !data?.bookmarked });
  }, [pressed]);
  const { devlinkProps } = useRolesAndPermissions();
  const props = useMemo(() => devlinkProps(['manage_job']), [devlinkProps]);
  return (
    <CandidateSidedrawerTop
      isBookmarked={data.bookmarked}
      isDownArrowEnable={false}
      isUpArrowEnable={false}
      onClickBookMark={{
        onClick: () =>
          handleUpdateApplication({ bookmarked: !data.bookmarked }),
        ...props,
      }}
      onClickClose={{ onClick: () => handlClose() }}
      onClickDown={{
        style: { display: navigation?.handleDown ? 'flex' : 'none' },
        onClick: () => navigation?.handleDown(),
      }}
      onClickUp={{
        style: { display: navigation?.handleUp ? 'flex' : 'none' },
        onClick: () => navigation?.handleUp(),
      }}
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
