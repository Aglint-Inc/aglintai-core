import {
  EmailTemplateAPi,
  SessionCombinationRespType,
} from '@aglint/shared-types';
import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { EmailPreviewOnScheduling } from '@/devlink3/EmailPreviewOnScheduling';
import Loader from '@/src/components/Common/Loader';
import { ShowCode } from '@/src/components/Common/ShowCode';
import DayCardWrapper from '@/src/components/Scheduling/CandidateDetails/SchedulingDrawer/StepSlotOptions/DayCardWrapper';
import toast from '@/src/utils/toast';

import { useAvailabilityContext } from '../RequestAvailabilityContext';
import { useConfirmAvailabilitySchedulingFlowStore } from '../store';

function FinalScreen() {
  const { selectedDateSlots } = useAvailabilityContext();
  const { applicationIdForConfirmAvailability } =
    useConfirmAvailabilitySchedulingFlowStore();

  const [emailData, setEmailData] = useState<{ html: string; subject: string }>(
    null,
  );
  const [fetching, setFetching] = useState(true);
  const allSessions: SessionCombinationRespType[] = selectedDateSlots
    .map((ele) => ele.selected_dates)
    .flat()
    .map((ele) => ele.plans)
    .flat()
    .map((ele) => ele.sessions)
    .flat();
  const payload: EmailTemplateAPi<'confirmInterview_email_applicant'>['api_payload'] =
    {
      application_id: applicationIdForConfirmAvailability,
      session_ids: allSessions.map((ele) => ele.session_id),
      preview_details: {
        meeting_timings: allSessions.map((ele) => ({
          meeting_end_time: ele.end_time,
          meeting_start_time: ele.start_time,
        })),
      },
    };

  function getEmail() {
    setFetching(true);
    axios
      .post('/api/emails/confirmInterview_email_applicant', {
        ...payload,
      })
      .then(({ data }) => {
        setEmailData(data);
        setFetching(false);
      })
      .catch(() => {
        toast.error('Fail to fetch email preview');
        setFetching(false);
      });
  }
  useEffect(() => {
    if (!emailData) {
      getEmail();
    }
  }, []);
  return (
    <div>
      <Stack
        overflow={'auto'}
        height={'calc(100vh - 96px)'}
        direction={'column'}
      >
        <EmailPreviewOnScheduling
          textSlotCount={'Please confirm the selected schedule'}
          slotButton={<></>}
          textEmailPreview={
            <Stack spacing={1} direction={'column'}>
              <Typography>
                {
                  'While clicking send to candidate ,an email containing the following message will be sent to the candidate:'
                }
              </Typography>
              <Stack direction={'row'} spacing={1} justifyItems={'start'}>
                <ButtonSoft
                  size={1}
                  textButton={'Edit Email Template'}
                  color={'neutral'}
                  onClickButton={{
                    onClick: () => {
                      window.open(
                        `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling?tab=settings&subtab=emailTemplate&email=agent_email_candidate&template_tab=email`,
                      );
                    },
                  }}
                />
                <IconButtonSoft
                  size={1}
                  color={'neutral'}
                  iconName={'refresh'}
                  onClickButton={{
                    onClick: getEmail,
                  }}
                />
              </Stack>
            </Stack>
          }
          slotEmailPreview={
            <ShowCode>
              <ShowCode.When isTrue={fetching}>
                <Loader />
              </ShowCode.When>
              <ShowCode.Else>
                <iframe
                  width={'600px'}
                  height={'620px'}
                  color='white'
                  srcDoc={emailData?.html}
                  title='Preview Email'
                />
              </ShowCode.Else>
            </ShowCode>
          }
          slotSelectedScheduleOptions={
            <>
              {selectedDateSlots?.map((item, index) => {
                const date = item.selected_dates[0].curr_date;
                return (
                  <DayCardWrapper
                    key={index}
                    selectedCombIds={[]}
                    // selectedCombIds={selectedDateSlots.map(ele=>ele.dateSlots).flat().map(ele=>ele.plan_comb_id)}
                    item={{
                      date_range: [date],
                      plans: item.selected_dates[0].plans,
                    }}
                    onClickSelect={() => {}}
                    isDayCollapseNeeded={false}
                    isSlotCollapseNeeded={false}
                    isRadioNeeded={false}
                    isDayCheckboxNeeded={false}
                    isSlotCheckboxNeeded={false}
                    index={index}
                    setSelectedCombIds={() => {}}
                  />
                );
              })}
            </>
          }
          showSelectedSchedules={true}
        />
      </Stack>
    </div>
  );
}

export default FinalScreen;
