import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { EmptyState } from '@/devlink2/EmptyState';
import { Activities } from '@/devlink3/Activities';
import { ActivitiesCard } from '@/devlink3/ActivitiesCard';
import { ConfirmScheduleList } from '@/devlink3/ConfirmScheduleList';
import { ConfirmScheduleListCard } from '@/devlink3/ConfirmScheduleListCard';
import Icon from '@/src/components/Common/Icons/Icon';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { PanelIcon } from '@/src/components/JobNewInterviewPlan/sessionForms';
import { getBreakLabel } from '@/src/components/JobNewInterviewPlan/utils';
import { EmailAgentIcon } from '@/src/components/Tasks/Components/EmailAgentIcon';
import { PhoneAgentIcon } from '@/src/components/Tasks/Components/PhoneAgentIcon';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';

import IconScheduleType from '../../Candidates/ListCard/Icon';
import { getScheduleType } from '../../Candidates/utils';
import { formatTimeWithTimeZone } from '../../utils';
import { useAllActivities } from '../hooks';
import IconApplicationLogs from './IconApplicationLogs';
import IconSessionType from './IconSessionType';

function RightPanel({
  allActivities,
}: {
  allActivities: ReturnType<typeof useAllActivities>;
}) {
  const router = useRouter();

  const { data: activities, isLoading, isFetched } = allActivities;

  return (
    <>
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
                    isContentVisible={true}
                    slotContent={act?.metadata?.sessions?.map((session) => {
                      return (
                        <ConfirmScheduleList
                          key={session.id}
                          textDate={dayjs(
                            session.interview_meeting.start_time,
                          ).format('DD MMM')}
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
                                end_time: session.interview_meeting.end_time,
                                timeZone: userTzDayjs.tz.guess(),
                              })}
                              slotIconPanel={
                                <IconSessionType type={session.session_type} />
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
