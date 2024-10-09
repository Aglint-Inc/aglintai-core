import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { Alert, AlertDescription } from '@components/ui/alert';
import { ScrollArea } from '@components/ui/scroll-area';
import { CheckCircle, Lightbulb } from 'lucide-react';

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
    <ScrollArea className='min-h-[calc(100vh-160px)] w-[320px] rounded-md border'>
      <Section className='p-3'>
        <SectionHeader>
          <SectionHeaderText>
            <SectionTitle className='flex items-center'>
              <CheckCircle className='mr-2 h-4 w-4 text-green-600' />
              {enabledActions.length}{' '}
              {enabledActions.length === 1
                ? 'Automation enabled'
                : 'Automations enabled'}
            </SectionTitle>
            <SectionDescription>
              Here is the summary of configured automated actions for this job.
              {/* Total automations set :{' '}
            {enabledActions.length} */}
            </SectionDescription>
          </SectionHeaderText>
        </SectionHeader>
        <ul className='space-y-2'>
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
                      className='rounded-md bg-gray-100 p-3 last:border-b-0'
                    >
                      <h4 className='mb-2 text-sm font-medium'>
                        {
                          triggerToQuestion[
                            wTrigger.trigger as keyof typeof triggerToQuestion
                          ]
                        }
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
                                <div className='text-sm text-muted-foreground'>
                                  <p>{target_api_details!.name}</p>
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
      </Section>
    </ScrollArea>
  );
};

const renderAIAutomationCTA = () => {
  return (
    <Alert
      variant='default'
      className='mb-4 border-purple-200 bg-purple-100 p-3'
    >
      <div className='mb-2 flex flex-row items-center gap-1 text-purple-600'>
        <Lightbulb className='h-4 w-4' />
        <div className='text-sm'>Supercharge Your Hiring</div>
      </div>
      <AlertDescription className='flex flex-col items-start'>
        Unlock the power of AI automation
      </AlertDescription>
      <div className='mt-2 space-y-2 text-sm text-gray-600'>
        <p className='font-medium'>Key Benefits:</p>
        <ul className='list-inside list-disc space-y-2'>
          <li>Reduce time-to-hire by up to 40%</li>
          <li>Improve candidate satisfaction by 35%</li>
          <li>Save hours on manual tasks daily</li>
        </ul>
        <div>
          <p className='mb-2 font-medium'>Get Started:</p>
          <ol className='list-inside list-decimal space-y-1'>
            <li>Enable an automation in the left panel</li>
            <li>Add an AI action to automate responses</li>
            <li>Watch your hiring process transform</li>
          </ol>
        </div>
      </div>
    </Alert>
  );
};
