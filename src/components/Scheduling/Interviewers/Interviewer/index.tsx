import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { InterviewerDetail, NewTabPill } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useInterviewerContext } from '@/src/context/InterviewerContext/InterviewerContext';
import {
  useImrQuery,
  useInterviewerSchedulesQuery,
} from '@/src/pages/scheduling/interviewer/[member_id]';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import ModuleSchedules, { useScheduleList } from '../../Common/ModuleSchedules';
import PauseResumeDialog from '../PauseResumeDialog';
import { InterviewerDetailsType, PauseDialog } from '../type';
import InterviewerLevelSettings from './InterviewerLevelSettings';
import Overview from './Overview';
import TabInterviewModules from './TabModules';

function Interviewer({
  interviewerDetails,
}: {
  interviewerDetails: InterviewerDetailsType;
}) {
  const router = useRouter();
  const { handelUpdateSchedule, handelRemoveMemberFormPanel } =
    useInterviewerContext();
  const { handelMemberUpdate } = useAuthDetails();

  const [pauseResumeDialog, setPauseResumeDialog] = useState<PauseDialog>({
    isOpen: false,
    isAll: false,
    type: 'pause',
    panel_id: null,
    isLoading: false,
    end_time: '',
  });
  const { refetch } = useImrQuery();
  const today = dayjs().startOf('day');
  let totalInterviewsThisWeek: ReturnType<
    typeof useInterviewerSchedulesQuery
  >['data'] = [];
  let totalInterviewsToday: ReturnType<
    typeof useInterviewerSchedulesQuery
  >['data'] = [];
  let totalHoursThisWeek = 0;
  let totalHoursToday = 0;

  const firstDayOfWeek = dayjs().startOf('week').startOf('day').format();
  const lastDayOfWeek = dayjs().endOf('week').endOf('day').format();

  const interviewerSchedules = useInterviewerSchedulesQuery();
  if (interviewerSchedules.isFetched) {
    const completedInterviews = interviewerSchedules.data.filter(
      (item) =>
        item.interview_meeting.status == 'completed' ||
        item.interview_meeting.status == 'confirmed',
    );
    totalInterviewsToday = completedInterviews.filter((interview) =>
      dayjs(interview.interview_meeting.end_time).isSame(today, 'day'),
    );

    totalInterviewsThisWeek = completedInterviews.filter(
      (interview) =>
        interview.interview_meeting.start_time >= firstDayOfWeek &&
        interview.interview_meeting.end_time <= lastDayOfWeek,
    );

    totalHoursToday =
      Number(
        totalInterviewsToday.reduce(
          (a, b) => a + b.interview_session.session_duration,
          0,
        ),
      ) / 60;

    totalHoursThisWeek =
      Number(
        totalInterviewsThisWeek.reduce(
          (a, b) => a + b.interview_session.session_duration,
          0,
        ),
      ) / 60;
  }

  const [userMeetings, setUserMeetings] = useState<
    Awaited<ReturnType<typeof getMeetingsByUserIdModuleId>>
  >({});
  useEffect(() => {
    if (interviewerDetails.interviewer.user_id) {
      getMeetingsByUserIdModuleId({
        user_id: interviewerDetails.interviewer.user_id,
        module_ids: interviewerDetails.modules.map((item) => item.module_id),
      }).then((data) => {
        setUserMeetings(data);
      });
    }
  }, [interviewerDetails]);

  const tab = (router.query.tab || 'overview') as
    | 'overview'
    | 'interviewtypes'
    | 'allschedules'
    | 'availibility'
    | 'keywords';

  const { data: scheduleList, isFetched } = useScheduleList({
    user_id: interviewerDetails.interviewer.user_id,
  });

  return (
    <>
      <InterviewerDetail
        slotNewTabPill={
          <>
            <NewTabPill
              textLabel={'Overview'}
              isPillActive={tab === 'overview'}
              onClickPill={{
                onClick: () => {
                  router.push(
                    `/scheduling/interviewer/${interviewerDetails.interviewer.user_id}?tab=overview`,
                  );
                },
              }}
            />
            <NewTabPill
              textLabel={'Interview Types'}
              isPillActive={tab === 'interviewtypes'}
              onClickPill={{
                onClick: () => {
                  router.push(
                    `/scheduling/interviewer/${interviewerDetails.interviewer.user_id}?tab=interviewtypes`,
                  );
                },
              }}
            />
            <NewTabPill
              textLabel={'All Schedules'}
              isPillActive={tab === 'allschedules'}
              onClickPill={{
                onClick: () => {
                  router.push(
                    `/scheduling/interviewer/${interviewerDetails.interviewer.user_id}?tab=allschedules`,
                  );
                },
              }}
            />
            <NewTabPill
              textLabel={'Availibility'}
              isPillActive={tab === 'availibility'}
              onClickPill={{
                onClick: () => {
                  router.push(
                    `/scheduling/interviewer/${interviewerDetails.interviewer.user_id}?tab=availibility`,
                  );
                },
              }}
            />
            <NewTabPill
              textLabel={'Keywords'}
              isPillActive={tab === 'keywords'}
              onClickPill={{
                onClick: () => {
                  router.push(
                    `/scheduling/interviewer/${interviewerDetails.interviewer.user_id}?tab=keywords`,
                  );
                },
              }}
            />
          </>
        }
        slotTabContent={
          <>
            {tab === 'overview' && (
              <Overview
                interviewerDetails={interviewerDetails}
                setPauseResumeDialog={setPauseResumeDialog}
                userMeetings={userMeetings}
                scheduleList={scheduleList}
              />
            )}
            {tab === 'keywords' && (
              <InterviewerLevelSettings
                initialData={
                  interviewerDetails.interviewer?.scheduling_settings as any
                }
                updateSettings={(x) => {
                  return handelMemberUpdate({
                    user_id: interviewerDetails.interviewer.user_id,
                    data: { scheduling_settings: x },
                  });
                }}
                isAvailability={false}
              />
            )}
            {tab === 'availibility' && (
              <InterviewerLevelSettings
                initialData={
                  interviewerDetails.interviewer?.scheduling_settings as any
                }
                updateSettings={(x) => {
                  return handelMemberUpdate({
                    user_id: interviewerDetails.interviewer.user_id,
                    data: { scheduling_settings: x },
                  });
                }}
                isAvailability={true}
              />
            )}
            {tab === 'interviewtypes' && (
              <TabInterviewModules
                interviewerDetails={interviewerDetails}
                userMeetings={userMeetings}
                setPauseResumeDialog={setPauseResumeDialog}
              />
            )}
            {tab === 'allschedules' && (
              <ModuleSchedules
                newScheduleList={scheduleList}
                isFetched={isFetched}
              />
            )}
          </>
        }
        textMail={interviewerDetails.interviewer?.email}
        textDepartment={interviewerDetails.interviewer.position}
        textInterviewerName={
          interviewerDetails.interviewer.first_name +
          ' ' +
          (interviewerDetails.interviewer.last_name
            ? interviewerDetails.interviewer.last_name
            : '')
        }
        slotInterviewerAvatar={
          <MuiAvatar
            key={interviewerDetails.interviewer.user_id}
            src={interviewerDetails.interviewer.profile_image}
            level={getFullName(
              interviewerDetails.interviewer.first_name,
              interviewerDetails.interviewer.last_name,
            )}
            variant='circular'
            height='100%'
            width='100%'
            fontSize='20px'
          />
        }
        textTimeZone={
          interviewerDetails.interviewer.scheduling_settings?.timeZone.label
        }
        textInterviewPerDay={
          <ShowCode>
            <ShowCode.When
              isTrue={
                interviewerDetails.interviewer?.scheduling_settings
                  ?.interviewLoad?.dailyLimit.type === 'Interviews'
              }
            >
              {totalInterviewsToday.length +
                ' / ' +
                interviewerDetails.interviewer.scheduling_settings
                  ?.interviewLoad?.dailyLimit.value || 0}{' '}
              Interviews
            </ShowCode.When>
            <ShowCode.When
              isTrue={
                interviewerDetails.interviewer?.scheduling_settings
                  ?.interviewLoad?.dailyLimit.type === 'Hours'
              }
            >
              {totalHoursToday +
                ' / ' +
                interviewerDetails.interviewer.scheduling_settings
                  ?.interviewLoad?.dailyLimit.value || 0}{' '}
              Hours
            </ShowCode.When>
          </ShowCode>
        }
        textInterviewPerWeek={
          <ShowCode>
            <ShowCode.When
              isTrue={
                interviewerDetails.interviewer?.scheduling_settings
                  ?.interviewLoad?.weeklyLimit.type === 'Interviews'
              }
            >
              {totalInterviewsThisWeek.length +
                ' / ' +
                interviewerDetails.interviewer.scheduling_settings
                  ?.interviewLoad?.weeklyLimit.value || 0}{' '}
              Interviews
            </ShowCode.When>
            <ShowCode.When
              isTrue={
                interviewerDetails.interviewer?.scheduling_settings
                  ?.interviewLoad?.weeklyLimit.type === 'Hours'
              }
            >
              {totalHoursThisWeek +
                ' / ' +
                interviewerDetails.interviewer.scheduling_settings
                  ?.interviewLoad?.weeklyLimit.value || 0}{' '}
              Hours
            </ShowCode.When>
          </ShowCode>
        }
      />

      <PauseResumeDialog
        pauseResumeDialog={pauseResumeDialog}
        close={() => {
          setPauseResumeDialog((pre) => ({
            ...pre,
            isAll: false,
            isOpen: false,
            isLoading: false,
          }));
        }}
        pause={async (pause_json) => {
          setPauseResumeDialog((pre) => ({
            ...pre,
            isLoading: true,
          }));
          await handelUpdateSchedule({
            panel_id: pauseResumeDialog.isAll
              ? undefined
              : pauseResumeDialog.panel_id,
            pause_json,
            training_status: pauseResumeDialog.training_status,
          });
          refetch();
          setPauseResumeDialog((pre) => ({
            ...pre,
            isAll: false,
            isOpen: false,
          }));
        }}
        resume={async () => {
          setPauseResumeDialog((pre) => ({
            ...pre,
            isLoading: true,
          }));
          await handelUpdateSchedule({
            panel_id: pauseResumeDialog.isAll
              ? undefined
              : pauseResumeDialog.panel_id,
            pause_json: null,
            training_status: pauseResumeDialog.training_status,
          });

          refetch();
          setPauseResumeDialog((pre) => ({
            ...pre,
            isAll: false,
            isOpen: false,
          }));
        }}
        remove={async () => {
          setPauseResumeDialog((pre) => ({
            ...pre,
            isLoading: true,
          }));
          await handelRemoveMemberFormPanel({
            panel_id: pauseResumeDialog.isAll
              ? undefined
              : pauseResumeDialog.panel_id,
            training_status: pauseResumeDialog.training_status,
          }).catch((e) => {
            toast.error(e.message);
          });
          refetch();
          setPauseResumeDialog((pre) => ({
            ...pre,
            isAll: false,
            isOpen: false,
          }));
        }}
      />
    </>
  );
}

export default Interviewer;

export const getMeetingsByUserIdModuleId = ({
  user_id,
  module_ids,
}: {
  user_id: string;
  module_ids: string[];
}) => {
  return supabase
    .from('interview_module_relation')
    .select(
      'module_id,interview_session_relation(training_type,interview_session(interview_meeting(*), name, schedule_type) )',
    )
    .match({ user_id, training_status: 'training' })
    .eq('interview_session_relation.is_confirmed', true)
    .in('module_id', module_ids)
    .then(({ data, error }) => {
      if (error) new Error(error.message);
      const tempData: {
        [
          key: string
        ]: ((typeof data)[number]['interview_session_relation'][number]['interview_session']['interview_meeting'] & {
          training_type: (typeof data)[number]['interview_session_relation'][number]['training_type'];
          module_id: string;
          name: string;
          schedule_type: (typeof data)[number]['interview_session_relation'][number]['interview_session']['schedule_type'];
        })[];
      } = {};
      data
        .filter((item) => Boolean(item.interview_session_relation.length))
        .map(
          (item) =>
            item.interview_session_relation.map((itemX) => ({
              ...itemX,
              module_id: item.module_id,
            })) || [],
        )
        .flat()
        .forEach((item) => {
          const temp = tempData[item.module_id] || [];
          tempData[item.module_id] = [
            ...temp,
            {
              ...item.interview_session.interview_meeting,
              training_type: item.training_type,
              module_id: item.module_id,
              name: item.interview_session.name,
              schedule_type: item.interview_session.schedule_type,
            },
          ];
        });
      return tempData;
    });
};
