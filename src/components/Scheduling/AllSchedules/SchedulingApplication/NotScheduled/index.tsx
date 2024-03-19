import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { ButtonPrimaryRegular } from '@/devlink';
import {
  AvailableOption,
  InterviewPlanEmpty,
  SchedulingFlow
} from '@/devlink2';
import { AvatarWithName, InterviewBreakCard } from '@/devlink3';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ResumeJson } from '@/src/pages/api/resumeScoring/types';
import { getFullName } from '@/src/utils/jsonResume';
import { pageRoutes } from '@/src/utils/pageRouting';

import GetScheduleOptions from './GetScheduleOptions';
import CandidateDetailsJobDrawer from '../Common/CandidateDetailsJob';
import InterviewPlanCardComp from '../Common/InterviewPlanCardComp';
import SchedulingOptionComp from '../Common/ScheduleOption';
import { useSendInviteForCandidate } from '../hooks';
import { setIsViewProfileOpen, useSchedulingApplicationStore } from '../store';

function NotScheduledApplication() {
  const router = useRouter();
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication
  );
  const interviewModules = useSchedulingApplicationStore(
    (state) => state.interviewModules
  );
  const members = useSchedulingApplicationStore((state) => state.members);
  const step = useSchedulingApplicationStore((state) => state.step);
  const fetchingPlan = useSchedulingApplicationStore(
    (state) => state.fetchingPlan
  );
  const fetchingSchedule = useSchedulingApplicationStore(
    (state) => state.fetchingSchedule
  );
  const isViewProfileOpen = useSchedulingApplicationStore(
    (state) => state.isViewProfileOpen
  );
  const schedulingOptions = useSchedulingApplicationStore(
    (state) => state.schedulingOptions
  );

  const allPlans = useMemo(() => {
    return selectedApplication?.public_jobs?.interview_plan?.plan;
  }, [selectedApplication?.public_jobs?.interview_plan?.plan]);

  const { sendToCandidate } = useSendInviteForCandidate();

  const coordinator = members.find(
    (member) =>
      member.user_id ===
      selectedApplication?.public_jobs?.interview_plan?.coordinator?.interv_id
  );

  return (
    <>
      {selectedApplication?.file?.resume_json && (
        <CandidateDetailsJobDrawer
          applications={selectedApplication.applications}
          candidate={selectedApplication.candidates}
          file={selectedApplication.file}
          isViewProfileOpen={isViewProfileOpen}
          setIsViewProfileOpen={setIsViewProfileOpen}
        />
      )}
      {!fetchingSchedule ? (
        allPlans?.length > 0 ? (
          <SchedulingFlow
            textCurrentRole={
              (selectedApplication.file.resume_json as unknown as ResumeJson)
                ?.basics?.currentJobTitle || '--'
            }
            textName={getFullName(
              selectedApplication.candidates.first_name,
              selectedApplication.candidates.last_name
            )}
            onClickViewProfile={{
              onClick: () => {
                setIsViewProfileOpen(true);
              }
            }}
            textCandidateMail={selectedApplication.candidates.email}
            slotCandidateImage={
              <MuiAvatar
                level={getFullName(
                  selectedApplication.candidates.first_name,
                  selectedApplication.candidates.last_name
                )}
                src={selectedApplication.candidates.avatar}
                variant={'rounded'}
                width={'74px'}
                height={'74px'}
                fontSize={'36px'}
              />
            }
            onClickJobSettings={{
              onClick: () => {
                router.push(
                  `${pageRoutes.JOBS}/${selectedApplication.public_jobs.id}/interview-plan`
                );
              }
            }}
            slotAvatarWithName={
              coordinator ? (
                <AvatarWithName
                  textName={getFullName(
                    coordinator.first_name,
                    coordinator.last_name
                  )}
                  slotAvatar={
                    <MuiAvatar
                      level={getFullName(
                        coordinator.first_name,
                        coordinator.last_name
                      )}
                      src={coordinator.profile_image}
                      variant={'circular'}
                      width={'100%'}
                      height={'100%'}
                      fontSize={'12px'}
                    />
                  }
                />
              ) : (
                'None'
              )
            }
            textRole={selectedApplication.public_jobs.job_title}
            textLocation={selectedApplication.public_jobs.location || '--'}
            slotScheduleOptions={
              <>
                {fetchingPlan ? (
                  <Stack height={'100%'} width={'100%'}>
                    <Loader />
                  </Stack>
                ) : step === 1 ? (
                  <GetScheduleOptions />
                ) : (
                  <AvailableOption
                    slotSendCandidatesButton={
                      <Stack direction={'row'} pt={4}>
                        <ButtonPrimaryRegular
                          textLabel={'Send to Candidate'}
                          onClickButton={{
                            onClick: async () => {
                              sendToCandidate({
                                allPlans
                              });
                            }
                          }}
                        />
                      </Stack>
                    }
                    slotOptionAvailableCard={
                      <SchedulingOptionComp
                        schedulingOptions={schedulingOptions}
                        isBadgeVisible={true}
                      />
                    }
                  />
                )}
              </>
            }
            slotPlanCard={
              <>
                {allPlans.map((plan) => {
                  const mod = interviewModules.find(
                    (module) => module.id === plan.module_id
                  );
                  return plan.isBreak ? (
                    <InterviewBreakCard
                      textDuration={plan.duration + ' Minutes'}
                      isEditDeleteVisible={false}
                    />
                  ) : (
                    <InterviewPlanCardComp
                      members={members}
                      plan={plan}
                      mod={mod}
                    />
                  );
                })}
              </>
            }
          />
        ) : (
          <InterviewPlanEmpty
            onClickCreateInterviewPlan={{
              onClick: () => {
                router.push(
                  `${pageRoutes.JOBS}/${selectedApplication.public_jobs.id}/interview-plan`
                );
              }
            }}
          />
        )
      ) : (
        <Loader />
      )}
    </>
  );
}

export default NotScheduledApplication;
