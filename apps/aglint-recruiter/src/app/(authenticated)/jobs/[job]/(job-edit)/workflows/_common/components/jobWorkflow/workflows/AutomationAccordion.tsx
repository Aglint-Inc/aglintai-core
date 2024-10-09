import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
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
    <AccordionItem key={category} value={category} className='border rounded-md overflow-hidden'>
      <AccordionTrigger className='hover:no-underline bg-gray-50 h-12 px-2 '>
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='hidden'>{categoryToIcon[category]}</div>
            <div className='text-sm font-medium'>{category}</div>
          </div>
          <div className={`text-xs font-normal px-3 py-1 mr-2 rounded-sm ${currentTriggers.some((s) => s.is_active) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
          {currentTriggers.filter((a) => a.is_active).length} /{' '}
          {currentTriggers.length} enabled
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className='py-2'>
        <div className='flex flex-col gap-2 px-3'>
          {currentTriggers
            .filter(
              (w) =>
                triggerToCategoryMap[
                  w.trigger as keyof typeof triggerToCategoryMap
                ] === category,
            )
            .map((wTrigger) => {
              return (
                <div key={wTrigger.id} className=''>
                  <div className='mb-2 flex items-center gap-2'>
                  <Switch
                      id={wTrigger.id}
                      checked={wTrigger.is_active}
                      onCheckedChange={(checked) => {
                        updateWTrigger({
                          ...wTrigger,
                          is_active: checked,
                        });
                      }}
                      className='transform scale-75'
                    />
                    <Label
                      htmlFor={wTrigger.id}
                      className='text-sm font-medium cursor-pointer'
                    >
                      {
                        triggerToQuestion[
                          wTrigger.trigger as keyof typeof triggerToCategoryMap
                        ]
                      }
                    </Label>
                    
                  </div>
                  {wTrigger.is_active && (
                    <div className='my-4 flex flex-col gap-2'>
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
  'Candidate Experience': <User className='h-4 w-4 text-muted-foreground' />,
  'Interviewer Management': (
    <UserCheck className='h-4 w-4 text-muted-foreground' />
  ),
  'Interview Process': <Clock className='h-4 w-4 text-muted-foreground' />,
  'Scheduling Management': (
    <Calendar className='h-4 w-4 text-muted-foreground' />
  ),
};
