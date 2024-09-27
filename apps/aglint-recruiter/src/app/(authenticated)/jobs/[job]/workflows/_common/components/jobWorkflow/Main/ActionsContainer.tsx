import { Button } from '@components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Bot, Mail, MessageSquare, Slack } from 'lucide-react';

import { ActionContent } from './ActionContent';

export const ActionsContainer = ({
  action,
  categoryIndex,
  automationIndex,
  actionIndex,
  toggleActionEdit,
  editingActions,
  handleActionChange,
  removeAction,
}) => {
  return (
    <div className='rounded-md bg-secondary p-4'>
      <div className='mb-2 flex items-center justify-between'>
        <Select
          value={action.type}
          onValueChange={(value) =>
            handleActionChange(
              categoryIndex,
              automationIndex,
              actionIndex,
              'type',
              value,
            )
          }
        >
          <DropDown />
        </Select>
        <Button
          variant='ghost'
          size='sm'
          onClick={() =>
            removeAction(categoryIndex, automationIndex, actionIndex)
          }
        >
          Remove
        </Button>
      </div>
      <ActionContent
        action={action}
        categoryIndex={categoryIndex}
        automationIndex={automationIndex}
        actionIndex={actionIndex}
        handleActionChange={handleActionChange}
        editingActions={editingActions}
        toggleActionEdit={toggleActionEdit}
      />
    </div>
  );
};

const DropDown = () => {
  return (
    <>
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='email'>
          <div className='flex items-center'>
            <Mail className='mr-2 h-4 w-4' />
            Email
          </div>
        </SelectItem>
        <SelectItem value='message'>
          <div className='flex items-center'>
            <MessageSquare className='mr-2 h-4 w-4' />
            Message
          </div>
        </SelectItem>
        <SelectItem value='ai'>
          <div className='flex items-center'>
            <Bot className='mr-2 h-4 w-4' />
            AI Action
          </div>
        </SelectItem>
        <SelectItem value='slack'>
          <div className='flex items-center'>
            <Slack className='mr-2 h-4 w-4' />
            Slack
          </div>
        </SelectItem>
      </SelectContent>
    </>
  );
};
