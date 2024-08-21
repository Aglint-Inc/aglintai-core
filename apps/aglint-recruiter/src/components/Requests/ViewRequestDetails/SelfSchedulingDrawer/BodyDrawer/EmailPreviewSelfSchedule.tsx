import { EmailTemplateAPi } from '@aglint/shared-types';
import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { GlobalBannerInline } from '@/devlink2/GlobalBannerInline';
import { EmailPreviewOnScheduling } from '@/devlink3/EmailPreviewOnScheduling';
import Loader from '@/src/components/Common/Loader';
import { ShowCode } from '@/src/components/Common/ShowCode';
import DayCardWrapper from '@/src/components/Scheduling/CandidateDetails/SchedulingDrawer/StepSlotOptions/DayCardWrapper';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRequests } from '@/src/context/RequestsContext';
import toast from '@/src/utils/toast';

import { setEmailData, useSelfSchedulingFlowStore } from '../store';

function EmailPreviewSelfSchedule() {
  const {
    requests: {
      data: { schedule_request },
    },
  } = useRequests();
  const [fetching, setFetching] = useState(false);

  const { recruiterUser } = useAuthDetails();

  const payload: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['api_payload'] =
    {
      application_id: schedule_request[0].application_id,
      organizer_id: recruiterUser.user_id,
    };

  const { emailData, filteredSchedulingOptions, selectedCombIds } =
    useSelfSchedulingFlowStore((state) => ({
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
            This email will be sent to the candidate. To edit the content, go to
            the template section, make edits, then click refresh.
            <br />
            {`Click "Request Availability" to send.`}
          </Typography>
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
            <Stack
              display={'flex'}
              gap={'32px'}
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              width={'100%'}
              padding={'0px 20px'}
            >
              <Stack>
                <GlobalBannerInline
                  textContent='This is a preview only. All actions in this email are disabled.'
                  iconName='info'
                  slotButton={<></>}
                  color={'warning'}
                />
              </Stack>
              <Stack
                direction={'row'}
                spacing={1}
                justifyItems={'start'}
                minWidth={'152px'}
              >
                <ButtonSoft
                  size={1}
                  textButton={'Edit Email Template'}
                  color={'accent'}
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
