import {
  EmailTemplateAPi,
  SessionCombinationRespType,
} from '@aglint/shared-types';
import { Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { EmailPreviewOnScheduling } from '@/devlink3/EmailPreviewOnScheduling';
import Loader from '@/src/components/Common/Loader';
import { ShowCode } from '@/src/components/Common/ShowCode';
import toast from '@/src/utils/toast';

import DayCardWrapper from '../../../../SchedulingDrawer/StepSlotOptions/DayCardWrapper';
import { useSchedulingApplicationStore } from '../../../../store';
import { useAvailabilityContext } from '../../RequestAvailabilityContext';

function FinalScreen() {
  const { selectedDateSlots } = useAvailabilityContext();
  const { selectedApplication } = useSchedulingApplicationStore();

  const [emailData, setEmailData] = useState<{ html: string; subject: string }>(
    null,
  );
  const [fetching, setFetching] = useState(true);
  const allSessions: SessionCombinationRespType[] = selectedDateSlots
    .map((ele) => ele.dateSlots)
    .flat()
    .map((ele) => ele.sessions)
    .flat();
  const payload: EmailTemplateAPi<'confirmInterview_email_applicant'>['api_payload'] =
    {
      application_id: selectedApplication.id,
      session_ids: allSessions.map((ele) => ele.session_id),
      preview_details: {
        meeting_timings: allSessions.map((ele) => ({
          meeting_end_time: ele.end_time,
          meeting_start_time: ele.start_time,
        })),
      },
    };
  useEffect(() => {
    if (!emailData) {
      axios
        .post('/api/emails/confirmInterview_email_applicant', {
          meta: { ...payload },
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
            'While clicking send to candidate ,an email containing the following message will be sent to the candidate:'
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
                const date = item.dateSlots[0]?.sessions[0]?.start_time;
                return (
                  <DayCardWrapper
                    key={index}
                    isDebrief={true}
                    selectedCombIds={[]}
                    item={{
                      dateArray: [date],
                      plans: item.dateSlots,
                    }}
                    onClickSelect={() => {}}
                    isDayCollapseNeeded={false}
                    isSlotCollapseNeeded={false}
                    isCheckboxAndRadio={false}
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
