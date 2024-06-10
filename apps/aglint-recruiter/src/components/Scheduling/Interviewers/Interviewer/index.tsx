import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import { InterviewerDetail } from '@/devlink3/InterviewerDetail';
import { NewTabPill } from '@/devlink3/NewTabPill';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useInterviewerContext } from '@/src/context/InterviewerContext/InterviewerContext';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import ModuleSchedules from '../../Common/ModuleSchedules';
import { useScheduleList } from '../../Common/ModuleSchedules/hooks';
import DynamicLoader from '../DynamicLoader';
import PauseResumeDialog from '../PauseResumeDialog';
import { DetailsWithCount, PauseDialog } from '../type';
import { useImrQuery } from './hooks';
import InterviewerLevelSettings from './InterviewerLevelSettings';
import Overview from './Overview';
import TabInterviewModules from './TabModules';

export type detailsWithCount = {
  InterviewerDe;
};

function Interviewer() {
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

  const user_id = router.query.member_id as string;

  const {
    data: interviewerDetails,
    isLoading: isLoadingInterviewer,
    refetch,
  } = useImrQuery({ user_id });

  const {
    data: {
      schedules: scheduleList,
      totalHoursThisWeek,
      totalHoursToday,
      totalInterviewsThisWeek,
      totalInterviewsToday,
    },
    isFetched: isScheduleFetched,
    isLoading: isLoadingSchedule,
  } = useScheduleList({
    user_id: user_id,
  });

  const tab = (router.query.tab || 'overview') as
    | 'overview'
    | 'interviewtypes'
    | 'allschedules'
    | 'availibility'
    | 'keywords';

  const detailsWithCount: DetailsWithCount = useMemo(() => {
    return {
      ...interviewerDetails,
      modules: interviewerDetails?.modules.map((item) => {
        const moduleMeetings = scheduleList.filter(
          (sch) => sch.interview_meeting.module_id === item.module_id,
        );
        const completedCount = moduleMeetings.filter(
          (sch) => sch.interview_meeting.status === 'completed',
        ).length;
        const cancelledCount = moduleMeetings.filter(
          (sch) => sch.interview_meeting.status === 'cancelled',
        ).length;
        const confirmedCount = moduleMeetings.filter(
          (sch) => sch.interview_meeting.status === 'confirmed',
        ).length;
        return {
          ...item,
          completedCount,
          cancelledCount,
          confirmedCount,
          moduleMeetings,
        };
      }),
    };
  }, [interviewerDetails]);

  return (
    <>
      <PageLayout
        onClickBack={{
          onClick: () => {
            router.push(`/scheduling?tab=interviewers`);
          },
        }}
        isBackButton={true}
        slotTopbarLeft={
          <>
            <Breadcrum
              textName={getFullName(
                interviewerDetails?.interviewer?.first_name,
                interviewerDetails?.interviewer?.last_name,
              )}
            />
          </>
        }
        slotBody={
          <>
            {isLoadingInterviewer || isLoadingSchedule ? (
              <DynamicLoader />
            ) : (
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
                      textLabel={'Schedules'}
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
                        detailsWithCount={detailsWithCount}
                        setPauseResumeDialog={setPauseResumeDialog}
                        scheduleList={scheduleList}
                      />
                    )}
                    {tab === 'keywords' && (
                      <InterviewerLevelSettings
                        initialData={
                          interviewerDetails.interviewer
                            ?.scheduling_settings as any
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
                          interviewerDetails.interviewer
                            ?.scheduling_settings as any
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
                        detailsWithCount={detailsWithCount}
                        setPauseResumeDialog={setPauseResumeDialog}
                      />
                    )}
                    {tab === 'allschedules' && (
                      <ModuleSchedules
                        newScheduleList={scheduleList}
                        isFetched={isScheduleFetched}
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
                    variant='rounded'
                    height='100%'
                    width='100%'
                  />
                }
                textTimeZone={
                  interviewerDetails.interviewer.scheduling_settings?.timeZone
                    .label
                }
                textInterviewPerDay={
                  <ShowCode>
                    <ShowCode.When
                      isTrue={
                        interviewerDetails.interviewer?.scheduling_settings
                          ?.interviewLoad?.dailyLimit.type === 'Interviews'
                      }
                    >
                      {totalInterviewsToday +
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
                      {totalInterviewsThisWeek +
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
            )}
          </>
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
