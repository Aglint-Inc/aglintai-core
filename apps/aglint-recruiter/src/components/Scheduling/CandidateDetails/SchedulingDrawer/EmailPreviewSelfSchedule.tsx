import { EmailTemplateAPi } from '@aglint/shared-types';
import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { EmailPreviewOnScheduling } from '@/devlink3/EmailPreviewOnScheduling';
import Loader from '@/src/components/Common/Loader';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import toast from '@/src/utils/toast';

import { useSchedulingApplicationStore } from '../store';
import DayCardWrapper from './StepSlotOptions/DayCardWrapper';
import { setEmailData, useSchedulingFlowStore } from './store';

function EmailPreviewSelfSchedule() {
  const { selectedApplication } = useSchedulingApplicationStore((state) => ({
    selectedApplication: state.selectedApplication,
  }));
  const [fetching, setFetching] = useState(false);

  const { recruiterUser } = useAuthDetails();

  const payload: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['api_payload'] =
    {
      application_id: selectedApplication.id,
      organizer_id: recruiterUser.user_id,
    };

  const { emailData, filteredSchedulingOptions, selectedCombIds } =
    useSchedulingFlowStore((state) => ({
      emailData: state.emailData,
      filteredSchedulingOptions: state.filteredSchedulingOptions,
      selectedCombIds: state.selectedCombIds,
    }));

  const selectedSlots = filteredSchedulingOptions
    .map((option) => ({
      ...option,
      plans: option.plans.filter((plan) =>
        selectedCombIds.includes(plan.plan_comb_id),
      ),
    }))
    .filter((option) => option.plans.length > 1);

  const numberOfDays = selectedSlots.length;

  const getEmail = () => {
    setFetching(true);
    axios
      .post('/api/emails/sendSelfScheduleRequest_email_applicant', {
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
  };

  return (
    <EmailPreviewOnScheduling
      showSelectedSchedules={true}
      textSlotCount={`You have selected ${selectedCombIds.length} slots across ${numberOfDays} days.`}
      slotSelectedScheduleOptions={selectedSlots.map((item, index) => {
        return (
          <DayCardWrapper
            key={item.date_range.join(', ')}
            isRadioNeeded={false}
            item={item}
            onClickSelect={() => {}}
            selectedCombIds={selectedCombIds}
            isDisabled={false}
            isDayCheckboxNeeded={false}
            isSlotCheckboxNeeded={false}
            isDayCollapseNeeded={true}
            isSlotCollapseNeeded={true}
            index={index}
            setSelectedCombIds={() => {}}
            isAutoCollapse={false}
            isSelectedOptionsTextVisible={false}
          />
        );
      })}
      textEmailPreview={
        <Stack spacing={1} direction={'column'}>
          <Typography>
          This email will be sent to the candidate. To edit the content, go to the template section, make edits, then click refresh.
          <br/>
          Click "Request Availability" to send.
          </Typography>
          <Stack direction={'row'} spacing={1} justifyItems={'start'}>
            <ButtonSoft
              size={1}
              textButton={'Edit Email Template'}
              color={'neutral'}
              onClickButton={{
                onClick: () => {
                  window.open(
                    `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling?tab=settings&subtab=emailTemplate&email=sendSelfScheduleRequest_email_applicant&template_tab=email`,
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
            <Stack height={'80vh'} width={'538px'}>
              <Loader />
            </Stack>
          </ShowCode.When>
          <ShowCode.Else>
            
            <Stack sx={{ py: 'var(--space-4)' }}>
              <iframe
                width={'600px'}
                height={'650px'}
                color='white'
                srcDoc={emailData?.html}
                title='Previw Email'
              />
            </Stack>
          </ShowCode.Else>
        </ShowCode>
      }
    />
  );
}

export default EmailPreviewSelfSchedule;
