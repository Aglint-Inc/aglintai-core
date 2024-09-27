import { Accordion } from '@components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';

import { UIButton } from '@/components/Common/UIButton';
import { useJobAutomationStore } from '@/job/workflows/contexts/workflowsStoreContext';
import { TriggerCategory } from '@/job/workflows/lib/constants';

import { AutomationAccordion } from './AutomationAccordion';

export default function Main() {
  const { jobWorkflowTriggers, jobWorkflowActions } = useJobAutomationStore();

  const allCategories: TriggerCategory[] = [
    TriggerCategory.CandidateExperience,
    TriggerCategory.InterviewerManagement,
    TriggerCategory.SchedulingManagement,
    TriggerCategory.InterviewProcess,
  ];
  return (
    <div className='md:col-span-2'>
      <Card className='border-0 shadow-none'>
        <CardHeader>
          <CardTitle>Job Automation Setup</CardTitle>
          <CardDescription>
            Configure automated actions for this job. Total automations set:{' '}
            {jobWorkflowActions.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type='single' collapsible className='w-full'>
            {allCategories.map((categ, idx) => {
              const currentTriggers = jobWorkflowTriggers.filter(
                (trig) => trig.category === categ,
              );
              return (
                <AutomationAccordion
                  key={idx}
                  category={categ}
                  currentTriggers={currentTriggers}
                  currentActions={jobWorkflowActions}
                />
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
      <div className='mt-6 flex justify-end space-x-1'>
        {/* <UIButton variant='outline'>Reset</UIButton> */}
        <UIButton>Save</UIButton>
      </div>
    </div>
  );
}
