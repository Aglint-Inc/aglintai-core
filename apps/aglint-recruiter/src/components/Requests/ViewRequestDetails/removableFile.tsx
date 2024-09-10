/* eslint-disable jsx-a11y/no-static-element-interactions */
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Page404 } from '@devlink/Page404';
import { UserInfoTeam } from '@devlink/UserInfoTeam';
import { AiTaskBanner } from '@devlink2/AiTaskBanner';
import { ButtonSoft } from '@devlink2/ButtonSoft';
import { ButtonSolid } from '@devlink2/ButtonSolid';
import { GlobalBadge } from '@devlink2/GlobalBadge';
import { PageLayout } from '@devlink2/PageLayout';
import { RequestDetail } from '@devlink2/RequestDetail';
import { RequestDetailRight } from '@devlink2/RequestDetailRight';
import { SkeletonScheduleCard } from '@devlink2/SkeletonScheduleCard';

import { WorkflowConnectedCard } from '@devlink3/WorkflowConnectedCard';
import { Avatar, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import SideDrawerEdit from '@/components/ApplicationDetail/SlotBody/InterviewTabContent/StageSessions/EditDrawer';
import ScheduleIndividualCard from '@/components/ApplicationDetail/SlotBody/InterviewTabContent/StageSessions/StageIndividual/ScheduleIndividual';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRequest } from '@/context/RequestContext';
import { useRequests } from '@/context/RequestsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import Loader from '../../Common/Loader';

import { Label } from '@components/ui/label';
import { Mail, MapPin, Smartphone } from 'lucide-react';

import RequestProgress, {
  RequestProgressSkeleton,
} from '../_common/Components/RequestProgress';
import { getStatusColor } from '../_common/utils/getStatusColor';
import CandidateAvailability from './CandidateAvailability';
import RequestDetailsBreadcrumb from './Components/Breadcrumb';
import InterviewDateList from './Components/InterviewDateList';
import MemberList, { useMemberList } from './Components/MemberList';
import PriorityList from './Components/PriorityList';
import ConfirmAvailability from './ConfirmAvailability';
import { AvailabilityProvider } from './ConfirmAvailability/RequestAvailabilityContext';
import { useMeetingList } from './hooks';
import RequestNotes from './RequestNotes';
import SelfSchedulingDrawer from './SelfSchedulingDrawer';
// import RequestProgress, {
//   RequestProgressSkeleton,
// } from '../_common/Components/RequestProgress';

function ViewRequestDetails() {
  const { replace } = useRouterPro();
  const { query } = useRouter();

  const { recruiterUser } = useAuthDetails();

  const {
    requests: { data: requestList, isPlaceholderData },
    handleAsyncUpdateRequest,
  } = useRequests();

  const { setCollapse } = useRequest();
  const { data: members } = useMemberList();

  useEffect(() => {
    setCollapse(true);
  }, [query?.id]);

  const selectedRequest = Object.values(requestList)
    .flat()
    .find((request) => request?.id === query?.id);

  const candidateDetails = selectedRequest?.applications?.candidates;
  const jobDetails = selectedRequest?.applications?.public_jobs;

  const { data: sessionsCards, status, refetch } = useMeetingList();

  if (isPlaceholderData) {
    return (
      <Stack
        width={'100%'}
        height={'100vh'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Loader />
      </Stack>
    );
  }

  if (!isPlaceholderData && !selectedRequest) {
    return (
      <Page404
        slot404={
          <ButtonSoft
            size={2}
            onClickButton={{
              onClick: () => {
                replace('/requests');
              },
            }}
            textButton='Back to requests'
          />
        }
      />
    );
  }

  return (
    <>
      <AvailabilityProvider>
        <ConfirmAvailability />
      </AvailabilityProvider>
      <CandidateAvailability selectedRequest={selectedRequest} />
      <SideDrawerEdit refetch={refetch} />
      <PageLayout
        slotTopbarLeft={
          <RequestDetailsBreadcrumb
            selectedRequest={selectedRequest}
            jobDetails={jobDetails}
            candidateDetails={candidateDetails}
          />
        }
        slotBody={
          <RequestDetail
            slotInterview={
              <>
                {status === 'pending' ? (
                  <Stack position={'relative'}>
                    <SkeletonScheduleCard />
                  </Stack>
                ) : (
                  <>
                    <SelfSchedulingDrawer refetch={refetch} />
                    {sessionsCards.map((session) => {
                      return (
                        <ScheduleIndividualCard
                          hideDateAndTime={
                            session.interview_meeting?.status === 'completed'
                          }
                          session={session}
                          key={session.interview_session.id}
                          selectedSessionIds={[]}
                          // eslint-disable-next-line @typescript-eslint/no-empty-function
                          onClickCheckBox={() => {}}
                          isCheckboxVisible={false}
                          candidate={null}
                          isEditIconVisible={selectedRequest.status === 'to_do'}
                          isViewDetailVisible={true}
                          isStatusVisible={
                            session.interview_meeting?.status ===
                            'not_scheduled'
                          }
                        />
                      );
                    })}
                  </>
                )}
              </>
            }
            slotNotes={<RequestNotes />}
            slotNewTask={
              <>
                {Boolean(selectedRequest?.status === 'to_do') &&
                  selectedRequest?.type === 'schedule_request' && (
                    <Stack width={'60%'}>
                      <AiTaskBanner
                        slotButton={
                          <ButtonSolid
                            onClickButton={{
                              onClick: async () => {
                                await handleAsyncUpdateRequest({
                                  payload: {
                                    requestId: selectedRequest.id,
                                    requestPayload: { status: 'in_progress' },
                                  },
                                });
                              },
                            }}
                            size={1}
                            textButton='Proceed'
                          />
                        }
                      />
                    </Stack>
                  )}
                {selectedRequest?.type ? (
                  <RequestProgress />
                ) : (
                  <RequestProgressSkeleton />
                )}
              </>
            }
            slotRequestDetailRight={
              <RequestDetailRight
                slotStatus={
                  <GlobalBadge
                    size={1}
                    textBadge={capitalizeFirstLetter(selectedRequest?.status)}
                    color={getStatusColor({ status: selectedRequest?.status })}
                  />
                }
                // slotStatusEdit={
                //   // <StatusList selectedFilter={selectedRequest?.status} />
                // }
                slotPriority={
                  <GlobalBadge
                    showIcon={true}
                    iconSize={4}
                    iconName={
                      selectedRequest?.priority === 'urgent' ? 'flag_2' : ''
                    }
                    color={
                      selectedRequest?.priority === 'urgent'
                        ? 'warning'
                        : 'neutral'
                    }
                    textBadge={capitalizeFirstLetter(selectedRequest?.priority)}
                  />
                }
                slotPriorityEdit={
                  <PriorityList selectedFilter={selectedRequest?.priority} />
                }
                slotRequestType={
                  <GlobalBadge
                    showIcon={true}
                    iconSize={4}
                    iconName={'calendar_add_on'}
                    color={'neutral'}
                    textBadge={capitalizeFirstLetter(selectedRequest?.type)}
                  />
                }
                slotRequestTypeEdit={<></>}
                textDueDate={
                  <Label>
                    {dayjsLocal(selectedRequest?.schedule_start_date).format(
                      'DD MMM, YYYY',
                    ) +
                      ' - ' +
                      dayjsLocal(selectedRequest?.schedule_end_date).format(
                        'DD MMM, YYYY',
                      )}
                  </Label>
                }
                slotInterviewDate={
                  selectedRequest?.status === 'to_do' &&
                  selectedRequest?.assigner_id === recruiterUser?.user_id && (
                    <InterviewDateList
                      selectedFilter={{
                        startDate: selectedRequest?.schedule_start_date,
                        endDate: selectedRequest?.schedule_end_date,
                      }}
                    />
                  )
                }
                slotAssignedTo={
                  <MemberList
                    selectedMemberId={selectedRequest?.assignee.user_id}
                    members={members}
                    onChange={async (id) => {
                      await handleAsyncUpdateRequest({
                        payload: {
                          requestId: String(query?.id),
                          requestPayload: {
                            assignee_id: id,
                          },
                        },
                        loading: false,
                        toast: false,
                      });
                    }}
                    width={'375px'}
                  />
                }
                slotCandidate={
                  <UserInfoTeam
                    isLinkedInVisible={!!candidateDetails?.linkedin}
                    onClickLinkedIn={() => {
                      window.open(candidateDetails?.linkedin, '_blank');
                    }}
                    slotImage={
                      <Avatar
                        variant='rounded'
                        src={candidateDetails?.avatar}
                      />
                    }
                    textName={getFullName(
                      candidateDetails?.first_name,
                      candidateDetails?.last_name,
                    )}
                    textDesgination={capitalizeFirstLetter(
                      candidateDetails?.current_job_title,
                    )}
                    slotDetails={
                      <>
                        <Label>
                          <MapPin className='mr-2 h-4 w-4' />
                          {!candidateDetails?.city &&
                          !candidateDetails?.state &&
                          !candidateDetails?.country
                            ? '--'
                            : `${candidateDetails?.city} ${candidateDetails?.state}, ${candidateDetails?.country}`}
                        </Label>

                        <Label>
                          <Mail className='mr-2 h-4 w-4' />
                          {candidateDetails?.email || '--'}
                        </Label>

                        <Label>
                          <Smartphone className='mr-2 h-4 w-4' />
                          {candidateDetails?.phone || '--'}
                        </Label>
                      </>
                    }
                    isButtonVisible={true}
                    slotButton={
                      <ButtonSoft
                        onClickButton={{
                          onClick: () => {
                            window.open(
                              ROUTES[
                                '/jobs/[job]/application/[application_id]'
                              ]({
                                job: jobDetails.id,
                                application_id: selectedRequest.application_id,
                              }) + '?tab=interview',
                              '_blank',
                            );
                          },
                        }}
                        size={1}
                        color={'neutral'}
                        textButton={'View Profile'}
                        isRightIcon={true}
                        iconName='call_made'
                      />
                    }
                  />
                }
                slotRelatedJob={
                  <Stack bgcolor={'white'}>
                    <WorkflowConnectedCard
                      isLinkOffVisible={false}
                      textRoleCategory={
                        capitalizeFirstLetter(jobDetails.departments?.name) ||
                        '--'
                      }
                      role={jobDetails.job_title || '--'}
                      textLocation={
                        !jobDetails.office_locations?.city ||
                        !jobDetails.office_locations?.country
                          ? '--'
                          : `${jobDetails.office_locations?.city}, ${jobDetails.office_locations?.country}`
                      }
                      jobLink={{
                        href: `/jobs/${jobDetails.id}?section=interview`,
                        target: '_blank',
                      }}
                    />
                  </Stack>
                }
              />
            }
          />
        }
      />
    </>
  );
}

export default ViewRequestDetails;
