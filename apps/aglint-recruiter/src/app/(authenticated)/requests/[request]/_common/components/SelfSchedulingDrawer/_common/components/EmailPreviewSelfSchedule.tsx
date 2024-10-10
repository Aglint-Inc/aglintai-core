import type { TargetApiPayloadType } from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import Typography from '@components/typography';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { useRequests } from '@requests/hooks';
import { RefreshCcw } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { useTenant } from '@/company/hooks';
import { Loader } from '@/components/Common/Loader';
import { UIBadge } from '@/components/Common/UIBadge';
import { UIButton } from '@/components/Common/UIButton';
import { mailSender } from '@/utils/mailSender';

import { setEmailData, useSelfSchedulingFlowStore } from '../store/store';
import DayCardWrapper from './StepSlotOptions/DayCardWrapper';

function EmailPreviewSelfSchedule() {
  const [fetching, setFetching] = useState(false);
  const params = useParams();
  const requestId = params?.request as string;

  const { recruiter_user } = useTenant();

  const {
    requests: { data: requestList },
  } = useRequests();

  const selectedRequest = Object.values(requestList ?? {})
    .flat()
    .find((request) => request?.id === (requestId || ''));

  const payload: TargetApiPayloadType<'sendSelfScheduleRequest_email_applicant'> =
    {
      is_preview: true,
      organizer_id: recruiter_user?.user_id ?? '',
      application_id: selectedRequest?.application_id,
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
    .filter((option) => option.plans.length > 0);

  const numberOfDays = selectedSlots.length;

  const getEmail = () => {
    setFetching(true);
    mailSender({
      target_api: 'sendSelfScheduleRequest_email_applicant',
      payload,
    })
      .then((data) => {
        setEmailData(data);
        setFetching(false);
      })
      .catch(() => {
        toast({ variant: 'destructive', title: 'Fail to fetch email preview' });
        setFetching(false);
      });
  };

  return (
    <div className='flex h-[calc(100vh-98px)] flex-col gap-2 overflow-auto p-4'>
      <Typography type='small'>
        You have selected {selectedCombIds.length} slots across {numberOfDays}
        days.
      </Typography>
      {selectedSlots.map((item, index) => {
        return (
          <DayCardWrapper
            key={item.date_range.join(', ')}
            isRadioNeeded={false}
            item={item}
            selectedCombIds={[]}
            isDisabled={false}
            isDayCheckboxNeeded={false}
            isSlotCheckboxNeeded={false}
            isDayCollapseNeeded={true}
            isSlotCollapseNeeded={true}
            index={index}
            isAutoCollapse={false}
          />
        );
      })}
      <div className='flex flex-col space-y-1'>
        <Typography type='small'>
          This email will be sent to the candidate. To edit the content, go to
          the template section, make edits, then click refresh.
        </Typography>
      </div>
      {fetching ? (
        <div className='h-[80vh] w-[538px]'>
          <Loader />
        </div>
      ) : (
        <>
          <Card className='w-full'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 p-2 pb-2'>
              <div className='flex w-full flex-row items-center justify-between gap-4'>
                <UIBadge
                  textBadge='This is a preview only.'
                  iconName='Info'
                  color={'warning'}
                />
                <div className='flex flex-row items-start space-x-2'>
                  <UIButton
                    variant='secondary'
                    size='sm'
                    onClick={() => {
                      window.open(
                        `${process.env.NEXT_PUBLIC_HOST_NAME}/company?tab=emailTemplate&email=sendSelfScheduleRequest_email_applicant`,
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
            </CardHeader>
            <CardContent className='bg-neutral-50 p-0'>
              <ScrollArea className='h-[calc(100vh-320px)] w-full'>
                <iframe
                  width={'100%'}
                  height={'672px'}
                  color='white'
                  srcDoc={emailData?.html}
                  title='Preview Email'
                />
              </ScrollArea>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export default EmailPreviewSelfSchedule;
