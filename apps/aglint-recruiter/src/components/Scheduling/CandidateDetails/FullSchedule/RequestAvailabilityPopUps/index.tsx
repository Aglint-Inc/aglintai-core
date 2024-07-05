import { Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import { ShowCode } from '@/src/components/Common/ShowCode';
import toast from '@/src/utils/toast';

import {
  setIsScheduleNowOpen,
  setScheduleFlow,
  setStepScheduling,
} from '../../SchedulingDrawer/store';
import {
  setRequestSessionIds,
  setSelectedSessionIds,
  useSchedulingApplicationStore,
} from '../../store';
import { useAvailabilityContext } from './RequestAvailabilityContext';
import RequestAvailabilityDrawer from './RequestAvailabilityDrawer';

function RequestAvailabilityPopUps() {
  const router = useRouter();
  const { availabilities, initialSessions } = useSchedulingApplicationStore();

  const { setSelectedRequestAvailability } = useAvailabilityContext();

  function openDrawer(id: string) {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    const updatedQuery = {
      ...currentQuery,
      request_availability_id: id,
    };
    router.replace({
      pathname: currentPath,
      query: updatedQuery,
    });
  }

  function handleRequestAgain(request_id: string, session_ids: string[]) {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    const updatedQuery = {
      ...currentQuery,
      candidate_request_availability: request_id,
    };
    router.replace({
      pathname: currentPath,
      query: updatedQuery,
    });
    setIsScheduleNowOpen(true);
    setStepScheduling('pick_date');
    setScheduleFlow('update_request_availibility');
    setSelectedSessionIds(session_ids);
    setRequestSessionIds(session_ids);
  }

  function sendReminderEmail({ request_id }: { request_id: string }) {
    axios.post(`/api/emails/sendAvailReqReminder_email_applicant`, {
      meta: {
        avail_req_id: request_id,
      },
    });
  }

  const selectedRequest = availabilities?.find((item) => {
    return (
      item.candidate_request_availability.id ==
      router.query?.candidate_request_availability
    );
  });

  const reqSesIds =
    selectedRequest?.request_session_relations.map((ele) => ele.session_id) ||
    [];

  useEffect(() => {
    if (selectedRequest) setRequestSessionIds(reqSesIds);
  }, [router.query?.candidate_request_availability]);

  return (
    <div>
      <RequestAvailabilityDrawer />
      <Stack direction={'column'} gap={1}>
        {availabilities &&
          availabilities.map((item) => {
            const dates =
              item.candidate_request_availability.slots &&
              item.candidate_request_availability.slots
                .map((ele) => ele.dates)
                .flat()
                .map((ele) => `<b>${dayjs(ele.curr_day).format('DD MMM')}</b>`);

            const sesIds = item?.request_session_relations
              ? item?.request_session_relations.map((ele) => ele.session_id)
              : [];

            const sessions =
              sesIds.length &&
              initialSessions.filter((session) =>
                sesIds.includes(session.interview_session.id),
              );

            return (
              <>
                <ShowCode>
                  <ShowCode.When
                    isTrue={!item.candidate_request_availability.slots}
                  >
                    <GlobalBanner
                      color={'warning'}
                      iconName={'schedule'}
                      textTitle={
                        'Waiting for candidates availability submission'
                      }
                      textDescription={
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `Candidate received a link to choose multiple options for ${sessions.map((ele) => `<b>${ele.interview_session.name}</b>`)} Interviews.`,
                          }}
                        ></div>
                      }
                      slotButtons={
                        <>
                          <ButtonSolid
                            textButton={'Resend invite'}
                            isLoading={false}
                            isLeftIcon={false}
                            isRightIcon={false}
                            size={1}
                            onClickButton={{
                              onClick: () => {
                                sendReminderEmail({
                                  request_id:
                                    item.candidate_request_availability.id,
                                });

                                toast.message(
                                  'Resend invited link sent successfully!',
                                );
                              },
                            }}
                          />

                          <ButtonSoft
                            textButton={'Request again'}
                            isLoading={false}
                            isLeftIcon={false}
                            isRightIcon={false}
                            size={1}
                            color={'neutral'}
                            onClickButton={{
                              onClick: () =>
                                handleRequestAgain(
                                  item.candidate_request_availability.id,
                                  sesIds,
                                ),
                            }}
                          />
                          <CopyButton
                            request_id={item.candidate_request_availability.id}
                          />
                        </>
                      }
                    />
                  </ShowCode.When>
                  <ShowCode.Else>
                    <GlobalBanner
                      iconName={'check_circle'}
                      color={'warning'}
                      textTitle={'Candidate submitted availability'}
                      textDescription={
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `Candidate submitted availability on ${dates} for ${sessions.map((ele) => `<b>${ele.interview_session.name}</b>`)} Interviews.`,
                          }}
                        ></div>
                      }
                      slotButtons={
                        <>
                          <ButtonSolid
                            textButton={'Schedule'}
                            isLoading={false}
                            isLeftIcon={false}
                            isRightIcon={false}
                            size={1}
                            onClickButton={{
                              onClick: () => {
                                openDrawer(
                                  item.candidate_request_availability.id,
                                );
                                setSelectedRequestAvailability(
                                  item.candidate_request_availability,
                                );
                              },
                            }}
                          />
                          <ButtonSoft
                            textButton={'Request again'}
                            isLoading={false}
                            isLeftIcon={false}
                            isRightIcon={false}
                            size={1}
                            onClickButton={{
                              onClick: () =>
                                handleRequestAgain(
                                  item.candidate_request_availability.id,
                                  sesIds,
                                ),
                            }}
                          />
                        </>
                      }
                    />
                  </ShowCode.Else>
                </ShowCode>
              </>
            );
          })}
      </Stack>
    </div>
  );
}

export default RequestAvailabilityPopUps;

function CopyButton({ request_id }: { request_id: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <IconButtonSoft
      size={1}
      onClickButton={{
        onClick: () => {
          if (!copied) {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/request-availability/${request_id}`,
            );
          }
        },
      }}
      iconName={copied ? 'check' : 'content_copy'}
    />
  );
}
