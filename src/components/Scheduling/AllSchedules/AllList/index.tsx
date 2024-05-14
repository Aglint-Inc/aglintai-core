import { Stack } from '@mui/material';
import Link from 'next/link';

import { AllInterviewEmpty } from '@/devlink2';
import Loader from '@/src/components/Common/Loader';
import { pages } from '@/src/utils/pageRouting';

import ListCardInterviewSchedule from '../ListCard';
import { ApplicationList } from '../store';

function AllList({
  isPending,
  isError,
  applicationList,
  isFetching,
  isLoading,
}: {
  isPending: boolean;
  isError: boolean;
  applicationList: ApplicationList[];
  isFetching: boolean;
  isLoading: boolean;
}) {
  return (
    <Stack
      style={{
        opacity: isLoading ? 0.5 : 1,
        pointerEvents: isLoading ? 'none' : 'auto',
      }}
    >
      {isFetching && applicationList.length === 0 && (
        <Stack width={'100%'} height={'500px'}>
          <Loader />
        </Stack>
      )}
      {isPending ? (
        <Stack width={'100%'} height={'100%'}>
          <Loader />
        </Stack>
      ) : isError ? (
        <Stack
          width={'100%'}
          height={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          Unable to fetch schedules
        </Stack>
      ) : (
        <>
          {!isPending && !isFetching && applicationList.length === 0 && (
            <AllInterviewEmpty textDynamic='No candidate found' />
          )}
          {applicationList.map((app) => {
            return (
              <Link
                key={app.applications.id}
                href={pages['/scheduling/application/[application_id]']({
                  application_id: app.applications.id,
                })}
              >
                <ListCardInterviewSchedule app={app} />
              </Link>
            );
          })}
        </>
      )}
    </Stack>
  );
}

export default AllList;
