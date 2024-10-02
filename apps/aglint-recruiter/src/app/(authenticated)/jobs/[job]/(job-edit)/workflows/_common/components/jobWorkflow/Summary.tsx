import {
  Section,
  SectionDescription,
  SectionTitle,
} from '@components/layouts/sections-header';
import { ScrollArea } from '@components/ui/scroll-area';

import { ACTION_TRIGGER_MAP } from '@/workflows/constants';

import { useJobAutomationStore } from '../../contexts/workflowsStoreContext';
import { TriggerCategory, triggerToQuestion } from '../../lib/constants';

export const Summary = () => {
  const { jobWorkflowActions, jobWorkflowTriggers, isStateUpdating } =
    useJobAutomationStore();

  const enabledAutomations = jobWorkflowTriggers.filter((j) => j.is_active);
  if (enabledAutomations.length === 0 || isStateUpdating) {
    return renderAIAutomationCTA();
  }
  const enabledActions = jobWorkflowActions.filter((j) =>
    enabledAutomations.find((e) => e.id === j.workflow_id),
  );
  const allCategories: TriggerCategory[] = [
    TriggerCategory.CandidateExperience,
    TriggerCategory.InterviewerManagement,
    TriggerCategory.SchedulingManagement,
    TriggerCategory.InterviewProcess,
  ];
  return (
    <Section>
      <SectionTitle>Automation Summary</SectionTitle>
      <SectionDescription>
        Configured automated actions for this job. Total automations set :{' '}
        {enabledActions.length}
      </SectionDescription>
      <ScrollArea className='h-[calc(100vh-200px)] pr-4'>
        <ul className='space-y-4'>
          {allCategories.map((categ) => {
            const currentTriggers = jobWorkflowTriggers.filter(
              (trig) => trig.category === categ && trig.is_active,
            );

            return (
              <>
                {currentTriggers.map((wTrigger) => {
                  return (
                    <li
                      key={wTrigger.id}
                      className='border-b pb-4 last:border-b-0'
                    >
                      <h4 className='mb-2 font-semibold'>
                        {triggerToQuestion[wTrigger.trigger]}
                      </h4>
                      <ul className='space-y-2'>
                        {jobWorkflowActions
                          .filter((j) => j.workflow_id === wTrigger.id)
                          .map((action) => {
                            const target_api_details = ACTION_TRIGGER_MAP[
                              wTrigger.trigger
                            ].find(
                              (j) => j.value.target_api === action.target_api,
                            );
                            return (
                              <li key={action.id}>
                                <div className='rounded bg-gray-100 p-2 text-sm'>
                                  <p>{target_api_details.name}</p>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </li>
                  );
                })}
              </>
            );
          })}
        </ul>
      </ScrollArea>
    </Section>
  );
};

const renderAIAutomationCTA = () => {
  return (
    <Section>
      <SectionTitle>Supercharge Your Hiring</SectionTitle>
      <SectionDescription>Unlock the power of AI automation</SectionDescription>
      <div className='space-y-4'>
        <p className='font-semibold'>Key Benefits:</p>
        <ul className='list-inside list-disc space-y-2'>
          <li>Reduce time-to-hire by up to 40%</li>
          <li>Improve candidate satisfaction by 35%</li>
          <li>Save hours on manual tasks daily</li>
        </ul>
        <div>
          <p className='mb-2 font-semibold'>Get Started:</p>
          <ol className='list-inside list-decimal space-y-1'>
            <li>Enable an automation in the left panel</li>
            <li>Add an AI action to automate responses</li>
            <li>Watch your hiring process transform</li>
          </ol>
        </div>
      </div>
    </Section>
  );
};
