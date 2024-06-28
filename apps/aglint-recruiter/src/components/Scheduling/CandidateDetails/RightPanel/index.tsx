import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { EmptyState } from '@/devlink2/EmptyState';
import { Skeleton } from '@/devlink2/Skeleton';
import { Activities } from '@/devlink3/Activities';
import { ActivitiesCard } from '@/devlink3/ActivitiesCard';
import { SkeletonActivitiesCard } from '@/devlink3/SkeletonActivitiesCard';
import Icon from '@/src/components/Common/Icons/Icon';

import CancelScheduleDialog from '../../ScheduleDetails/CancelScheduleDialog';
import { useAllActivities, useGetScheduleApplication } from '../hooks';
import {
  setCancelSessions,
  setMultipleCancelOpen,
  useSchedulingApplicationStore,
} from '../store';
import IconApplicationLogs from './IconApplicationLogs';
import SlotContent from './SlotWidgets';

function RightPanel({
  allActivities,
}: {
  allActivities: ReturnType<typeof useAllActivities>;
}) {
  const router = useRouter();
  const { data: activities, isLoading, isFetched, refetch } = allActivities;
  const { cancelSessions, isMultipleCancelOpen, selectedApplicationLog } =
    useSchedulingApplicationStore((state) => ({
      cancelSessions: state.cancelSessions,
      isMultipleCancelOpen: state.isMultipleCancelOpen,
      selectedApplicationLog: state.selectedApplicationLog,
    }));

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  return (
    <>
      {cancelSessions?.length > 0 && (
        <CancelScheduleDialog
          refetch={() => {
            fetchInterviewDataByApplication();
            refetch();
          }}
          metaDetails={cancelSessions || []}
          isDeclineOpen={isMultipleCancelOpen}
          setIsDeclineOpen={setMultipleCancelOpen}
          closeDialog={() => {
            setCancelSessions(null);
          }}
          application_log_id={selectedApplicationLog?.id}
        />
      )}

      <Activities
        slotActivitiesCard={
          <>
            {isFetched && !isLoading && activities.length === 0 && (
              <EmptyState
                slotIcons={
                  <Icon variant='ActivityTimeline' width='50px' height='50px' />
                }
                textDescription={'No activities found.'}
              />
            )}
            {!isFetched || isLoading ? (
              <Stack height={'calc(100vh - 60px)'}>
                <SkeletonActivitiesCard slotSkeleton={<Skeleton />} />
                <SkeletonActivitiesCard slotSkeleton={<Skeleton />} />
                <SkeletonActivitiesCard slotSkeleton={<Skeleton />} />
                <SkeletonActivitiesCard slotSkeleton={<Skeleton />} />
                <SkeletonActivitiesCard slotSkeleton={<Skeleton />} />
              </Stack>
            ) : (
              activities?.map((act, ind) => {
                return (
                  <ActivitiesCard
                    key={act.id}
                    textTitle={act.title || ''}
                    textTime={dayjs(act.created_at).fromNow()}
                    isLineVisible={!(ind == activities.length - 1)}
                    isViewTaskVisible={Boolean(act.task_id)}
                    textDesc={act.description}
                    onClickViewTask={{
                      onClick: () => {
                        router.push(`/tasks?task_id=${act.task_id}`);
                      },
                    }}
                    isActionVisible={false}
                    isContentVisible={Boolean(act.metadata)}
                    slotContent={<SlotContent act={act} />}
                    slotImage={<IconApplicationLogs act={act} />}
                  />
                );
              })
            )}
          </>
        }
      />
    </>
  );
}

export default RightPanel;
