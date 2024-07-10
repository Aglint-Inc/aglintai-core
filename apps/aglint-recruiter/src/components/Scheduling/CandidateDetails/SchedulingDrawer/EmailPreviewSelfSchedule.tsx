import { Stack } from '@mui/material';

import { EmailPreviewOnScheduling } from '@/devlink3/EmailPreviewOnScheduling';

import DayCardWrapper from './StepSlotOptions/DayCardWrapper';
import { useSchedulingFlowStore } from './store';

function EmailPreviewSelfSchedule() {
  const { emailData, filteredSchedulingOptions, selectedCombIds } =
    useSchedulingFlowStore((state) => ({
      emailData: state.emailData,
      filteredSchedulingOptions: state.filteredSchedulingOptions,
      selectedCombIds: state.selectedCombIds,
    }));

  const selectedSlots = filteredSchedulingOptions
    .filter((option) =>
      option.plans.some((plan) => selectedCombIds.includes(plan.plan_comb_id)),
    )
    .filter((option) => option.plans.length > 1);

  const numberOfDays = selectedSlots.length;

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
          />
        );
      })}
      textEmailPreview={
        'To proceed to self scheduling please click on the button below. Upon doing so, an email containing the following message will be sent to the candidate:'
      }
      slotEmailPreview={
        emailData?.html && (
          <Stack sx={{ py: 'var(--space-4)' }}>
            <iframe
              width={'600px'}
              height={'650px'}
              color='white'
              srcDoc={emailData?.html}
              title='Previw Email'
            />
          </Stack>
        )
      }
    />
  );
}

export default EmailPreviewSelfSchedule;
