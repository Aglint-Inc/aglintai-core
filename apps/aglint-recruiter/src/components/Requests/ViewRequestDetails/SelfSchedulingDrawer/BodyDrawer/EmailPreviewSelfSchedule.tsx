import type { EmailTemplateAPi } from '@aglint/shared-types';
import { GlobalBannerInline } from '@devlink2/GlobalBannerInline';
import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import { RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Loader from '@/components/Common/Loader';
import { UIButton } from '@/components/Common/UIButton';
import UITypography from '@/components/Common/UITypography';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRequests } from '@/context/RequestsContext';
import toast from '@/utils/toast';

import { setEmailData, useSelfSchedulingFlowStore } from '../store';
import DayCardWrapper from './StepSlotOptions/DayCardWrapper';

function EmailPreviewSelfSchedule() {
  const [fetching, setFetching] = useState(false);
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();

  const {
    requests: { data: requestList },
  } = useRequests();

  const selectedRequest = Object.values(requestList)
    .flat()
    .find((request) => request?.id === router.query?.id);

  const payload: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['api_payload'] =
    {
      is_preview: true,
      organizer_id: recruiterUser.user_id,
      application_id: selectedRequest.application_id,
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
    <div className='flex flex-col gap-2 p-4 h-[calc(100vh-96px)] overflow-scroll'>
      <UITypography>
        You have selected {selectedCombIds.length} slots across {numberOfDays}
        days.
      </UITypography>
      {selectedSlots.map((item, index) => {
        return (
          <DayCardWrapper
            key={item.date_range.join(', ')}
            isRadioNeeded={false}
            item={item}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClickSelect={() => {}}
            selectedCombIds={selectedCombIds}
            isDisabled={false}
            isDayCheckboxNeeded={false}
            isSlotCheckboxNeeded={false}
            isDayCollapseNeeded={true}
            isSlotCollapseNeeded={true}
            index={index}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setSelectedCombIds={() => {}}
            isAutoCollapse={false}
          />
        );
      })}
      <Stack spacing={1} direction={'column'}>
        <Typography>
          This email will be sent to the candidate. To edit the content, go to
          the template section, make edits, then click refresh.
        </Typography>
      </Stack>
      {fetching ? (
        <Stack height={'80vh'} width={'538px'}>
          <Loader />
        </Stack>
      ) : (
        <>
          <div className='flex flex-row justify-between items-center w-full gap-4'>
            <GlobalBannerInline
              textContent='This is a preview only. All actions in this email are disabled.'
              iconName='info'
              slotButton={<></>}
              color={'warning'}
            />
            <div className='flex flex-row space-x-2 items-start'>
              <UIButton
                variant='secondary'
                size='sm'
                onClick={() => {
                  window.open(
                    `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling?tab=settings&subtab=emailTemplate&email=sendSelfScheduleRequest_email_applicant&template_tab=email`,
                  );
                }}
              >
                Edit Email Template
              </UIButton>
              <UIButton variant='secondary' size='sm' onClick={getEmail}>
                <RefreshCcw size={14} />
              </UIButton>
            </div>
          </div>

          <Stack sx={{ py: 'var(--space-4)' }}>
            <iframe
              width={'510px'}
              height={'750px'}
              color='white'
              srcDoc={emailData?.html}
              title='Previw Email'
            />
          </Stack>
        </>
      )}
    </div>
  );
}

export default EmailPreviewSelfSchedule;
