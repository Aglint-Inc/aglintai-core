import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { Switch } from '@components/ui/switch';
import { Calendar, Clock, User, UserCheck } from 'lucide-react';

import { useJobAutomationStore } from '@/job/workflows/contexts/workflowsStoreContext';
import {
  type TriggerCategory,
  triggerToCategoryMap,
  triggerToQuestion,
} from '@/job/workflows/lib/constants';

import { ActionsContainer } from './ActionsContainer';

export const AutomationAccordion = ({
  category,
}: {
  category: TriggerCategory;
}) => {
  const { jobWorkflowTriggers, jobWorkflowActions } = useJobAutomationStore();

  return (
    <AccordionItem key={category} value={category}>
      <AccordionTrigger>
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center space-x-2'>
            {categoryToIcon[category]}
            <div className='text-sm font-medium'>{category}</div>
          </div>
          <Badge
            variant={
              jobWorkflowTriggers.some((s) => !s.is_paused)
                ? 'default'
                : 'secondary'
            }
          >
            {jobWorkflowTriggers.filter((a) => !a.is_paused).length} /{' '}
            {jobWorkflowTriggers.length} enabled
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className='space-y-4'>
          {jobWorkflowTriggers
            .filter((w) => triggerToCategoryMap[w.trigger] === category)
            .map((wTrigger) => {
              return (
                <div key={wTrigger.id} className='py-2'>
                  <div className='mb-2 flex items-center justify-between'>
                    <Label
                      htmlFor={wTrigger.id}
                      className='text-sm font-medium'
                    >
                      {triggerToQuestion[wTrigger.trigger]}
                    </Label>
                    <Switch
                      id={wTrigger.id}
                      checked={wTrigger.is_paused}
                      onCheckedChange={(checked) => {
                        // onChangeTriggerPause(wTrigger.id, checked)
                      }}
                    />
                  </div>
                  {wTrigger.is_paused && (
                    <div className='mt-2 space-y-4'>
                      {jobWorkflowActions
                        .filter((act) => act.workflow_id === wTrigger.id)
                        .map((action, actionIndex) => {
                          return (
                            <ActionsContainer
                              key={action.id}
                              action={action}
                              categoryIndex={categoryIndex}
                              automationIndex={automationIndex}
                              actionIndex={actionIndex}
                              toggleActionEdit={toggleActionEdit}
                              editingActions={editingActions}
                              handleActionChange={handleActionChange}
                              removeAction={removeAction}
                            />
                          );
                        })}
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          // onAddAction(categoryIndex, automationIndex)
                        }}
                      >
                        Add Action
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export const categoryToIcon: Record<TriggerCategory, JSX.Element> = {
  'Candidate Experience': <User className='h-4 w-4' />,
  'Interviewer Management': <UserCheck className='h-4 w-4' />,
  'Interview Process': <Clock className='h-4 w-4' />,
  'Scheduling Management': <Calendar className='h-4 w-4' />,
};
