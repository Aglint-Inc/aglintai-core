import { Avatar, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Page404 } from '@/devlink/Page404';
import { AiTaskBanner } from '@/devlink2/AiTaskBanner';
import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { ButtonSolid } from '@/devlink2/ButtonSolid';
import { PageLayout } from '@/devlink2/PageLayout';
import { RequestDetail } from '@/devlink2/RequestDetail';
import { useRequest } from '@/src/context/RequestContext';
import { useRequests } from '@/src/context/RequestsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';

import RequestProgress, {
  RequestProgressSkeleton,
} from '../RequestSections/Section/Request/RequestDetails/RequestProgress';
import { RequestDetailRight } from '@/devlink2/RequestDetailRight';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';
import { GlobalBadge, Text, TextWithIcon } from '@/devlink2';
import { getFullName } from '@aglint/shared-utils';
import { AssignedNameCard } from '@/devlink2/AssignedNameCard';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { UserInfoTeam } from '@/devlink/UserInfoTeam';
import Loader from '../../Common/Loader';
import ScheduleIndividualCard from '../../Scheduling/CandidateDetails/FullSchedule/ScheduleIndividual';

function ViewRequestDetails() {
  const { replace } = useRouterPro();
  const { query } = useRouter();
  const {
    requests: { data: requestList, status, isPlaceholderData },
  } = useRequests();

  const { setCollapse } = useRequest();

  useEffect(() => {
    setCollapse(true);
  }, [query?.id]);

  const selectedRequest = Object.values(requestList)
    .flat()
    .find((request) => request?.id === query?.id);

  const candidateDetails = selectedRequest?.applications?.candidates;

  console.log(selectedRequest);

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
            onClickButton={{
              onClick: () => {
                replace('/requests?tab=requests');
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
      <PageLayout
        slotTopbarLeft={
          <>
            <Breadcrum
              onClickLink={{
                onClick: () => {
                  replace('/requests?tab=requests');
                },
              }}
              isLink={true}
              textName={'Requests'}
            />
            <Breadcrum
              showArrow={true}
              textName={selectedRequest?.title.replace(
                '{{candidateName}}',
                getFullName(
                  selectedRequest?.applications?.candidates.first_name,
                  selectedRequest?.applications?.candidates.last_name,
                ),
              )}
            />
            <Breadcrum
              showArrow={true}
              textName={
                <GlobalBadge
                  size={1}
                  textBadge={capitalizeFirstLetter(selectedRequest?.status)}
                  color={
                    selectedRequest?.status === 'to_do'
                      ? 'purple'
                      : selectedRequest?.status === 'in_progress'
                        ? 'info'
                        : selectedRequest?.status === 'blocked'
                          ? 'error'
                          : selectedRequest?.status === 'completed'
                            ? 'success'
                            : 'neutral'
                  }
                />
              }
            />
          </>
        }
        slotBody={
          <RequestDetail
            slotNewTask={
              <>
                {Boolean(selectedRequest?.status === 'to_do') && (
                  <Stack width={'60%'}>
                    <AiTaskBanner
                      slotButton={<ButtonSolid size={1} textButton='Proceed' />}
                    />
                  </Stack>
                )}
                {selectedRequest?.type ? (
                  <RequestProgress request_type={selectedRequest?.type} />
                ) : (
                  <RequestProgressSkeleton />
                )}
              </>
            }
            slotRequestDetailRight={
              <RequestDetailRight
                slotPriority={
                  <GlobalBadge
                    showIcon={true}
                    iconName={'flag_2'}
                    color={'warning'}
                    textBadge={capitalizeFirstLetter(selectedRequest?.priority)}
                  />
                }
                slotRequestType={
                  <GlobalBadge
                    showIcon={true}
                    iconName={'calendar_add_on'}
                    color={'neutral'}
                    textBadge={capitalizeFirstLetter(selectedRequest?.type)}
                  />
                }
                textDueDate={dayjsLocal(
                  selectedRequest?.schedule_start_date,
                ).format('DD MMMM, YYYY')}
                slotAssignedTo={
                  <AssignedNameCard
                    textName={getFullName(
                      selectedRequest?.assigner?.first_name,
                      selectedRequest?.assignee?.last_name,
                    )}
                    textRole={selectedRequest?.assignee?.position}
                    slotImage={
                      <Avatar src={selectedRequest?.assignee?.profile_image} />
                    }
                  />
                }
                slotCandidate={
                  <UserInfoTeam
                    isLinkedInVisible={!!candidateDetails?.linkedin}
                    onClickLinkedIn={() => {
                      window.open(candidateDetails?.linkedin, '_blank');
                    }}
                    slotImage={<Avatar src={candidateDetails?.avatar} />}
                    textDesgination={candidateDetails?.current_job_title}
                    slotDetails={
                      <>
                        <TextWithIcon
                          textContent={
                            !candidateDetails?.city &&
                            !candidateDetails?.state &&
                            !candidateDetails?.country
                              ? '--'
                              : `${candidateDetails?.city} ${candidateDetails?.state}, ${candidateDetails?.country}`
                          }
                          iconName='location_on'
                          iconSize={4}
                          iconWeight={'medium'}
                        />

                        <TextWithIcon
                          textContent={candidateDetails?.email || '--'}
                          iconName='mail'
                          iconSize={4}
                          iconWeight={'medium'}
                        />
                        <TextWithIcon
                          textContent={candidateDetails?.phone || '--'}
                          iconName='smartphone'
                          iconSize={4}
                          iconWeight={'medium'}
                        />
                      </>
                    }
                    slotButton={<>asd</>}
                    textName={getFullName(
                      candidateDetails?.first_name,
                      candidateDetails?.last_name,
                    )}
                  />
                }
                slotRelatedJob={<>Not found</>}
              />
            }
          />
        }
      />
    </>
  );
}

export default ViewRequestDetails;
