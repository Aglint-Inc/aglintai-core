import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { Switch } from '@components/ui/switch';

import { ActionsContainer } from './ActionsContainer';

export const AutomationAccordion = ({
  category,
  handleAutomationChange,
  categoryIndex,
  handleActionChange,
  removeAction,
  editingActions,
  toggleActionEdit,
  addAction,
}) => {
  return (
    <>
      <AccordionItem value={category.name} key={category.name}>
        <AccordionTrigger>
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-center space-x-2'>
              {category.icon}
              <span>{category.name}</span>
            </div>
            <Badge
              variant={
                category.automations.some((a) => a.enabled)
                  ? 'default'
                  : 'secondary'
              }
            >
              {category.automations.filter((a) => a.enabled).length} /{' '}
              {category.automations.length} enabled
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className='space-y-4'>
            {category.automations.map((automation, automationIndex) => (
              <div key={automation.id} className='py-2'>
                <div className='mb-2 flex items-center justify-between'>
                  <Label
                    htmlFor={automation.id}
                    className='text-sm font-medium'
                  >
                    {automation.question}
                  </Label>
                  <Switch
                    id={automation.id}
                    checked={automation.enabled}
                    onCheckedChange={(checked) =>
                      handleAutomationChange(
                        categoryIndex,
                        automationIndex,
                        'enabled',
                        checked,
                      )
                    }
                  />
                </div>
                {automation.enabled && (
                  <div className='mt-2 space-y-4'>
                    {automation.actions.map((action, actionIndex) => {
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
                      onClick={() => addAction(categoryIndex, automationIndex)}
                    >
                      Add Action
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
};
