import { Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import { ShowCode } from '@/src/components/Common/ShowCode';
import toast from '@/src/utils/toast';

import {
  setDateRange,
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
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

function RequestAvailabilityPopUps() {
  const router = useRouter();
  const { availabilities } = useSchedulingApplicationStore();
  const [copied, setCopied] = useState(false);

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

  function handleRequestAgain(request_id: string) {
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
    setDateRange({
      start_date: dayjsLocal().toISOString(),
      end_date: dayjsLocal().add(7, 'day').toISOString(),
    });
    setRequestSessionIds([]);
    setSelectedSessionIds([]);
  }

  function sendReminderEmail({ request_id }: { request_id: string }) {
    axios.post(`/api/emails/sendAvailReqReminder_email_applicant`, {
      meta: {
        avail_req_id: request_id,
      },
    });
  }

  useEffect(() => {
    const selectedRequest = availabilities?.find((item) => {
      return item.id == router.query?.candidate_request_availability;
    });
    if (selectedRequest)
      setRequestSessionIds(selectedRequest.session_ids.map((ele) => ele.id));
  }, [router.query?.candidate_request_availability]);

  return (
    <div>
      <RequestAvailabilityDrawer />
      <Stack direction={'column'} gap={1}>
        {availabilities &&
          availabilities.map((item) => {
            const dates =
              item.slots &&
              item.slots
                .map((ele) => ele.dates)
                .flat()
                .map((ele) => `<b>${dayjs(ele.curr_day).format('DD MMM')}</b>`);

            return (
              <>
                <ShowCode>
                  <ShowCode.When isTrue={!item.slots}>
                    <GlobalBanner
                      color={'warning'}
                      iconName={'schedule'}
                      textTitle={
                        'Waiting for candidates availability submission'
                      }
                      textDescription={
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `Candidate received a link to choose multiple options for ${item.session_ids.map((ele) => `<b>${ele.name}</b>`)} Interviews.`,
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
                                sendReminderEmail({ request_id: item.id });

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
                            onClickButton={{
                              onClick: () => handleRequestAgain(item.id),
                            }}
                          />
                          <ButtonSoft
                            textButton={copied ? 'Copied' : 'Copy link'}
                            isLoading={false}
                            isLeftIcon={false}
                            isRightIcon={false}
                            slotIcon={<GlobalIcon iconName={'check_circle'} />}
                            size={1}
                            onClickButton={{
                              onClick: () => {
                                if (!copied) {
                                  setCopied(true);
                                  setTimeout(() => {
                                    setCopied(false);
                                  }, 2000);
                                  navigator.clipboard.writeText(
                                    `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/request-availability/${item.id}`,
                                  );
                                }
                              },
                            }}
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
                            __html: `Candidate submitted availability on ${dates} for ${item.session_ids.map((ele) => `<b>${ele.name}</b>`)} Interviews.`,
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
                                openDrawer(item.id);
                                setSelectedRequestAvailability(item);
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
                              onClick: () => handleRequestAgain(item.id),
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
