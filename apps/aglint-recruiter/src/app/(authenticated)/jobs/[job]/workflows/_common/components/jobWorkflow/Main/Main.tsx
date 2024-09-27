import { Accordion } from '@components/ui/accordion';
import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';

import { type Action, type Automation } from '../type';
import { AutomationAccordion } from './AutomationAccordion';

export default function Main({
  automationCategories,
  setAutomationCategories,
  editingActions,
  toggleActionEdit,
}) {
  const handleAutomationChange = (
    categoryIndex: number,
    automationIndex: number,
    field: keyof Automation,
    value: any,
  ) => {
    const updatedCategories = [...automationCategories];
    updatedCategories[categoryIndex].automations[automationIndex][field] =
      value;
    // updatedCategories[categoryIndex].automations[automationIndex][field] = value
    setAutomationCategories(updatedCategories);
  };

  const handleActionChange = (
    categoryIndex: number,
    automationIndex: number,
    actionIndex: number,
    field: keyof Action,
    value: any,
  ) => {
    const updatedCategories = [...automationCategories];
    updatedCategories[categoryIndex].automations[automationIndex].actions[
      actionIndex
    ][field] = value;
    setAutomationCategories(updatedCategories);
  };

  const addAction = (categoryIndex: number, automationIndex: number) => {
    const updatedCategories = [...automationCategories];
    const newAction: Action = {
      id: `action-${Date.now()}`,
      type: 'email',
      content: '',
      subject: '',
    };
    updatedCategories[categoryIndex].automations[automationIndex].actions.push(
      newAction,
    );
    setAutomationCategories(updatedCategories);
  };

  const removeAction = (
    categoryIndex: number,
    automationIndex: number,
    actionIndex: number,
  ) => {
    const updatedCategories = [...automationCategories];
    updatedCategories[categoryIndex].automations[
      automationIndex
    ].actions.splice(actionIndex, 1);
    setAutomationCategories(updatedCategories);
  };

  const getTotalAutomations = () => {
    return automationCategories.reduce((total, category) => {
      return (
        total +
        category.automations.filter((automation) => automation.enabled).length
      );
    }, 0);
  };

  return (
    <div className='md:col-span-2'>
      <Card className='border-0 shadow-none'>
        <CardHeader>
          <CardTitle>Job Automation Setup</CardTitle>
          <CardDescription>
            Configure automated actions for this job. Total automations set:{' '}
            {getTotalAutomations()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type='single' collapsible className='w-full'>
            {automationCategories.map((category, categoryIndex) => (
              <AutomationAccordion
                key={category.id}
                category={category}
                handleAutomationChange={handleAutomationChange}
                categoryIndex={categoryIndex}
                handleActionChange={handleActionChange}
                removeAction={removeAction}
                editingActions={editingActions}
                toggleActionEdit={toggleActionEdit}
                addAction={addAction}
              />
            ))}
          </Accordion>
        </CardContent>
      </Card>
      <div className='mt-6 flex justify-end'>
        <Button>Save</Button>
      </div>
    </div>
  );
}
