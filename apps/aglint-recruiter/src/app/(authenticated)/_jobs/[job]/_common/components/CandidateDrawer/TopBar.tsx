import { Button } from '@components/ui/button';
import {
  BookmarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XIcon,
} from 'lucide-react';
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
    <div className='flex w-full items-center justify-between'>
      <Button
        variant='ghost'
        size='sm'
        className={
          data.bookmarked
            ? 'text-yellow-500 hover:text-yellow-600'
            : 'text-gray-400 hover:text-gray-500'
        }
        onClick={() =>
          handleUpdateApplication({ bookmarked: !data.bookmarked })
        }
        {...props}
      >
        <BookmarkIcon className='h-5 w-5' />
      </Button>

      <div className='flex items-center space-x-2'>
        {navigation?.handleUp && (
          <Button
            variant='ghost'
            size='sm'
            className='text-gray-600 hover:text-gray-800'
            onClick={() => navigation.handleUp()}
          >
            <ChevronUpIcon className='h-5 w-5' />
          </Button>
        )}

        {navigation?.handleDown && (
          <Button
            variant='ghost'
            size='sm'
            className='text-gray-600 hover:text-gray-800'
            onClick={() => navigation.handleDown()}
          >
            <ChevronDownIcon className='h-5 w-5' />
          </Button>
        )}

        <Button
          variant='ghost'
          size='sm'
          className='text-gray-600 hover:text-gray-800'
          onClick={() => handlClose()}
        >
          <XIcon className='h-5 w-5' />
        </Button>
      </div>
    </div>
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
