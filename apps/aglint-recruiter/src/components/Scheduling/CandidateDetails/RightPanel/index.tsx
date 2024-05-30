import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { EmptyState } from '@/devlink2/EmptyState';
import { Activities } from '@/devlink3/Activities';
import { ActivitiesCard } from '@/devlink3/ActivitiesCard';
import { ConfirmScheduleList } from '@/devlink3/ConfirmScheduleList';
import { ConfirmScheduleListCard } from '@/devlink3/ConfirmScheduleListCard';
import { ScheduleButton } from '@/devlink3/ScheduleButton';
import Icon from '@/src/components/Common/Icons/Icon';
import Loader from '@/src/components/Common/Loader';
import { getBreakLabel } from '@/src/components/JobNewInterviewPlan/utils';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';

import IconScheduleType from '../../Candidates/ListCard/Icon';
import { getScheduleType } from '../../Candidates/utils';
import IconCancelSchedule from '../../ScheduleDetails/Icons/IconCancelSchedule';
import IconReschedule from '../../ScheduleDetails/Icons/IconReschedule';
import { formatTimeWithTimeZone } from '../../utils';
import { useAllActivities } from '../hooks';
import {
  setIsScheduleNowOpen,
  setMultipleCancelOpen,
  setSelectedApplicationLog,
  setStepScheduling,
} from '../store';
import CancelMultipleScheduleDialog from './CancelMultipleScheduleDialog';
import IconApplicationLogs from './IconApplicationLogs';
import IconSessionType from './IconSessionType';

function RightPanel({
  allActivities,
}: {
  allActivities: ReturnType<typeof useAllActivities>;
}) {
  const router = useRouter();

  const { data: activities, isLoading, isFetched, refetch } = allActivities;

  return (
    <>
      <CancelMultipleScheduleDialog refetch={refetch} />
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
                <Loader />
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
                    isRescheduleVisible={false}
                    isContentVisible={Boolean(act.metadata?.sessions)}
                    slotContent={
                      <Stack spacing={2} width={'100%'}>
                        <Stack spacing={1} width={'100%'}>
                          {act?.metadata?.sessions?.map((session) => {
                            return (
                              <ConfirmScheduleList
                                key={session.id}
                                textDate={dayjs(
                                  session.interview_meeting.start_time,
                                ).format('DD MMMM YYYY')}
                                slotConfirmScheduleList={
                                  <ConfirmScheduleListCard
                                    textDuration={getBreakLabel(
                                      session.session_duration,
                                    )}
                                    textPanelName={session.name}
                                    textMeetingPlatformName={getScheduleType(
                                      session.schedule_type,
                                    )}
                                    textTime={formatTimeWithTimeZone({
                                      start_time:
                                        session.interview_meeting.start_time,
                                      end_time:
                                        session.interview_meeting.end_time,
                                      timeZone: userTzDayjs.tz.guess(),
                                    })}
                                    slotIconPanel={
                                      <IconSessionType
                                        type={session.session_type}
                                      />
                                    }
                                    slotMeetingIcon={
                                      <IconScheduleType
                                        type={session.schedule_type}
                                      />
                                    }
                                  />
                                }
                              />
                            );
                          })}
                        </Stack>
                        {act?.metadata?.filter_id &&
                          act?.metadata?.action === 'waiting' && (
                            <Stack direction={'row'} spacing={2}>
                              <ScheduleButton
                                textLabel={'Request Reschedule'}
                                slotIcon={<IconReschedule />}
                                onClickProps={{
                                  onClick: () => {
                                    setStepScheduling('reschedule');
                                    setSelectedApplicationLog(act);
                                    setIsScheduleNowOpen(true);
                                  },
                                }}
                              />
                              <ScheduleButton
                                textLabel={'Cancel Schedule'}
                                slotIcon={<IconCancelSchedule />}
                                textColorProps={{
                                  style: {
                                    color: '#D93F4C',
                                  },
                                }}
                                onClickProps={{
                                  style: { background: '#FFF0F1' },
                                  onClick: () => {
                                    setSelectedApplicationLog(act);
                                    setMultipleCancelOpen(true);
                                  },
                                }}
                              />
                            </Stack>
                          )}
                      </Stack>
                    }
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
