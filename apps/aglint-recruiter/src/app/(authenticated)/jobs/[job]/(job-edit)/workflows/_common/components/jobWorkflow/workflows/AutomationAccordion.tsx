import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { Badge } from '@components/ui/badge';
import { Label } from '@components/ui/label';
import { Switch } from '@components/ui/switch';
import { Calendar, Clock, User, UserCheck } from 'lucide-react';

import {
  type JobAutomationState,
  updateWTrigger,
} from '../../../contexts/workflowsStoreContext';
import {
  type TriggerCategory,
  triggerToCategoryMap,
  triggerToQuestion,
} from '../../../lib/constants';
import ActionsContainer from './ActionsContainer';
import AddActionMenu from './AddActionMenu';

export const AutomationAccordion = ({
  category,
  currentActions,
  currentTriggers,
}: {
  category: TriggerCategory;
  currentTriggers: JobAutomationState['jobWorkflowTriggers'];
  currentActions: JobAutomationState['jobWorkflowActions'];
}) => {
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
              currentTriggers.some((s) => s.is_active) ? 'default' : 'secondary'
            }
          >
            {currentTriggers.filter((a) => a.is_active).length} /{' '}
            {currentTriggers.length} enabled
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className='space-y-4'>
          {currentTriggers
            .filter(
              (w) =>
                triggerToCategoryMap[
                  w.trigger as keyof typeof triggerToCategoryMap
                ] === category,
            )
            .map((wTrigger) => {
              return (
                <div key={wTrigger.id} className='py-2'>
                  <div className='mb-2 flex items-center justify-between'>
                    <Label
                      htmlFor={wTrigger.id}
                      className='text-sm font-medium'
                    >
                      {
                        triggerToQuestion[
                          wTrigger.trigger as keyof typeof triggerToCategoryMap
                        ]
                      }
                    </Label>
                    <Switch
                      id={wTrigger.id}
                      checked={wTrigger.is_active}
                      onCheckedChange={(checked) => {
                        updateWTrigger({
                          ...wTrigger,
                          is_active: checked,
                        });
                      }}
                    />
                  </div>
                  {wTrigger.is_active && (
                    <div className='mt-2 space-y-4'>
                      {currentActions
                        .filter((act) => act.workflow_id === wTrigger.id)
                        .map((action) => {
                          return (
                            <ActionsContainer
                              key={action.id}
                              wAction={action}
                              wTrigger={wTrigger}
                            />
                          );
                        })}
                      <AddActionMenu wTrigger={wTrigger} />
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
