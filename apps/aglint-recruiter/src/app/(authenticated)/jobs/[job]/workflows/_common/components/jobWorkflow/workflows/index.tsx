import { toast } from '@components/hooks/use-toast';
import { Accordion } from '@components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';

import { UIButton } from '@/components/Common/UIButton';
import {
  initiateJobAutomationState,
  useJobAutomationStore,
} from '@/job/workflows/contexts/workflowsStoreContext';
import { useGetJobWorkflow } from '@/job/workflows/hooks';
import { TriggerCategory } from '@/job/workflows/lib/constants';
import { api } from '@/trpc/client';

import { AutomationAccordion } from './AutomationAccordion';

export default function Main() {
  const { jobWorkflowTriggers, jobWorkflowActions, isWorkflowsUpdated } =
    useJobAutomationStore();
  const { data } = useGetJobWorkflow();
  const { mutate: updateJobWorkflowsActions } =
    api.jobs.job.workflow.updateJobWorkflowsActions.useMutation();
  const allCategories: TriggerCategory[] = [
    TriggerCategory.CandidateExperience,
    TriggerCategory.InterviewerManagement,
    TriggerCategory.SchedulingManagement,
    TriggerCategory.InterviewProcess,
  ];
  const handleSave = async () => {
    try {
      const deleted_actions = data.job_workflow_actions
        .filter(
          (act) =>
            jobWorkflowActions.findIndex((jwa) => jwa.id === act.id) === -1,
        )
        .map((act) => act.id);
      await updateJobWorkflowsActions({
        deleted_actions: deleted_actions,
        updated_actions: jobWorkflowActions,
        workflows: jobWorkflowTriggers,
      });
      toast({
        title: 'Job Automation Saved',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };
  const handleReset = () => {
    initiateJobAutomationState(data);
  };
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
      <div className='mt-6 flex flex-row justify-end space-x-1'>
        <UIButton
          disabled={!isWorkflowsUpdated}
          variant='destructive'
          onClick={handleReset}
        >
          Reset
        </UIButton>
        <UIButton onClick={handleSave}>Save</UIButton>
      </div>
    </div>
  );
}
