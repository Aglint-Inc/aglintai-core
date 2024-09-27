import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { Zap } from 'lucide-react';

import { ACTION_TRIGGER_MAP } from '@/workflows/constants';

import { useJobAutomationStore } from '../../contexts/workflowsStoreContext';
import { triggerToQuestion } from '../../lib/constants';

export const Summary = () => {
  const { jobWorkflowActions, jobWorkflowTriggers } = useJobAutomationStore();

  const enabledAutomations = jobWorkflowTriggers.filter((j) => j.is_active);
  if (enabledAutomations.length === 0) {
    return renderAIAutomationCTA();
  }

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Automation Summary</CardTitle>
        <CardDescription>Overview of enabled automations</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[calc(100vh-200px)] pr-4'>
          <ul className='space-y-4'>
            {jobWorkflowTriggers
              .filter((j) => j.is_active)
              .map((wTrigger) => {
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
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const renderAIAutomationCTA = () => {
  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle className='flex items-center'>
          <Zap className='mr-2 h-5 w-5 text-yellow-500' />
          Supercharge Your Hiring
        </CardTitle>
        <CardDescription>Unlock the power of AI automation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <p className='font-semibold'>Key Benefits:</p>
          <ul className='list-inside list-disc space-y-2'>
            <li>Reduce time-to-hire by up to 40%</li>
            <li>Improve candidate satisfaction by 35%</li>
            <li>Save hours on manual tasks daily</li>
          </ul>
          <div className='mt-4 rounded-md bg-secondary p-4'>
            <p className='mb-2 font-semibold'>Get Started:</p>
            <ol className='list-inside list-decimal space-y-1'>
              <li>Enable an automation in the left panel</li>
              <li>Add an AI action to automate responses</li>
              <li>Watch your hiring process transform</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
