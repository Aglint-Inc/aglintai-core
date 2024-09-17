import { CandidateSidedrawerTop } from '@devlink/CandidateSidedrawerTop';
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
    <div className='flex items-center space-x-2'>
      <span className='text-lg font-semibold'>
        {capitalizeAll(data?.name ?? '---')}
      </span>
      {data?.file_url && (
        <button
          onClick={() => setPreview(true)}
          className='text-blue-600 hover:text-blue-800 focus:outline-none'
        >
          Resume
        </button>
      )}
    </div>
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
    <div className='flex h-full w-full flex-row items-center justify-between'>
      {props.children ?? (
        <>
          <Info />
          <Actions />
        </>
      )}
    </div>
  );
};

export { Info, TopBar };
