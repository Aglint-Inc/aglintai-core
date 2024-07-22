import { memo } from 'react';

import { GlobalBannerInline } from '@/devlink2/GlobalBannerInline';
import { WorkflowItem } from '@/devlink3/WorkflowItem';
import UISelect from '@/src/components/Common/Uiselect';
import { useWorkflow } from '@/src/context/Workflows/[id]';
import { Workflow } from '@/src/types/workflow.types';
import {
  DURATION_OPTIONS,
  TRIGGER_PAYLOAD,
  getTriggerOption,
} from './constants';

const Trigger = () => {
  return (
    <WorkflowItem
      textWorkflowType={'Trigger'}
      textTypeDescription={'When something happens'}
      slotWorkflowIcon={<TriggerIcon />}
      slotInputFields={<Forms />}
      isDeleteVisible={false}
    />
  );
};

export default Trigger;

const Forms = () => {
  const {
    workflow: { phase },
  } = useWorkflow();
  return (
    <>
      <TriggerForm />
      {phase !== 'now' && <DurationForm />}
      <TriggerInfo />
    </>
  );
};

const TriggerForm = () => {
  const {
    workflow: { trigger, phase, interval },
    manageWorkflow,
    handleUpdateWorkflow,
  } = useWorkflow();
  const payload = { trigger, phase };
  return (
    <UISelect
      label='When will the event trigger?'
      disabled={!manageWorkflow}
      value={JSON.stringify(payload)}
      menuOptions={TRIGGER_OPTIONS}
      onChange={(e) => {
        const { phase, trigger } = JSON.parse(e.target.value) as typeof payload;
        handleUpdateWorkflow({
          phase,
          trigger,
          interval: phase === 'now' ? 0 : interval === 0 ? 30 : interval,
        });
      }}
    />
  );
};

const DurationForm = () => {
  const {
    workflow: { interval },
    manageWorkflow,
    handleUpdateWorkflow,
  } = useWorkflow();
  return (
    <UISelect
      label='Interval between the trigger and action'
      disabled={!manageWorkflow}
      value={interval}
      menuOptions={DURATION_OPTIONS}
      onChange={(e) => handleUpdateWorkflow({ interval: e.target.value })}
    />
  );
};

const TriggerInfo = () => {
  const {
    workflow: { interval, trigger, phase },
  } = useWorkflow();
  const option = DURATION_OPTIONS.find(({ value }) => value === interval);
  return (
    <GlobalBannerInline
      slotButton={<></>}
      textContent={`Any subsequent actions will be triggered ${phase ? (option.value === 0 ? 'with no delay' : option.name ?? '' + ' ') : ''} ${getTriggerOption(trigger, phase).toLowerCase()}.`}
    />
  );
};

const TRIGGER_OPTIONS = TRIGGER_PAYLOAD.reduce(
  (acc, { trigger, phase: phases }) => {
    acc.push(
      ...phases.map((phase) => ({
        name: getTriggerOption(trigger, phase),
        value: JSON.stringify({
          trigger,
          phase,
        }) as unknown as (typeof acc)[number]['value'],
      })),
    );
    return acc;
  },
  [] as {
    name: string;
    value: {
      trigger: Workflow['trigger'];
      phase: Workflow['phase'];
    };
  }[],
);

const TriggerIcon = memo(() => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='20' height='20' rx='4' />
      <path
        d='M11.5562 5.7125C11.6437 5.6375 11.7437 5.6 11.8562 5.6C12.0312 5.6125 12.1625 5.68125 12.25 5.80625C12.3375 5.93125 12.3562 6.06875 12.3062 6.21875L11.0312 9.8H13.0937C13.2312 9.8 13.35 9.85 13.45 9.95C13.55 10.05 13.6 10.1687 13.6 10.3062C13.6 10.4562 13.5437 10.5812 13.4312 10.6812L8.4437 15.0875C8.3562 15.1625 8.2562 15.2 8.1437 15.2C7.9687 15.1875 7.83745 15.1188 7.74995 14.9938C7.66245 14.8688 7.6437 14.7313 7.6937 14.5813L8.9687 11H6.88745C6.58745 10.975 6.42495 10.8125 6.39995 10.5125C6.39995 10.375 6.4562 10.2562 6.5687 10.1562L11.5562 5.7125ZM11.5562 6.51875L7.18745 10.4H9.39995C9.49995 10.4 9.5812 10.4437 9.6437 10.5312C9.7062 10.6187 9.7187 10.7062 9.6812 10.7937L8.4437 14.3L12.85 10.4H10.6C10.5 10.4 10.4187 10.3562 10.3562 10.2687C10.2937 10.1812 10.2812 10.0937 10.3187 10.0062L11.5562 6.51875Z'
        fill='#cc4e00'
      />
    </svg>
  );
});
TriggerIcon.displayName = 'TriggerIcon';
