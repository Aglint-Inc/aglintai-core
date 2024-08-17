import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Avatar, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Page404 } from '@/devlink/Page404';
import { UserInfoTeam } from '@/devlink/UserInfoTeam';
import { AiTaskBanner } from '@/devlink2/AiTaskBanner';
import { AssignedNameCard } from '@/devlink2/AssignedNameCard';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { ButtonSolid } from '@/devlink2/ButtonSolid';
import { GlobalBadge } from '@/devlink2/GlobalBadge';
import { PageLayout } from '@/devlink2/PageLayout';
import { RequestDetail } from '@/devlink2/RequestDetail';
import { RequestDetailRight } from '@/devlink2/RequestDetailRight';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { useRequest } from '@/src/context/RequestContext';
import { useRequests } from '@/src/context/RequestsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import Loader from '../../Common/Loader';
import RequestProgress, {
  RequestProgressSkeleton,
} from '../RequestSections/Section/Request/RequestDetails/RequestProgress';

function ViewRequestDetails() {
  const { replace } = useRouterPro();
  const { query } = useRouter();
  const {
    requests: { data: requestList, isPlaceholderData },
    handleAsyncUpdateRequest,
  } = useRequests();

  const { setCollapse } = useRequest();

  useEffect(() => {
    setCollapse(true);
  }, [query?.id]);

  const selectedRequest = Object.values(requestList)
    .flat()
    .find((request) => request?.id === query?.id);

  const candidateDetails = selectedRequest?.applications?.candidates;

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

  async function handleProceed(id) {
    await handleAsyncUpdateRequest({
      payload: {
        requestId: id,
        requestPayload: { status: 'in_progress' },
      },
    });
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
                      slotButton={
                        <ButtonSolid
                          onClickButton={{
                            onClick: () => {
                              handleProceed(selectedRequest.id);
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
                slotRequestType={
                  <GlobalBadge
                    showIcon={true}
                    iconSize={4}
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
                      <Avatar
                        variant='rounded'
                        src={selectedRequest?.assignee?.profile_image}
                      />
                    }
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
                        <Stack width={'110px'}></Stack>
                      </>
                    }
                    isButtonVisible={true}
                    slotButton={
                      <>
                        <ButtonSoft
                          onClickButton={{
                            onClick: () => {
                              window.open(
                                `/scheduling/application/${candidateDetails?.id}`,
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
                      </>
                    }
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
