import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Textarea } from '@components/ui/textarea';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import { type Action } from '../type';

export const ActionContent = ({
  action,
  categoryIndex,
  automationIndex,
  actionIndex,
  handleActionChange,
  editingActions,
  toggleActionEdit,
}: {
  action: Action;
  categoryIndex: number;
  automationIndex: number;
  actionIndex: number;
  handleActionChange: any;
  editingActions: any;
  toggleActionEdit: any;
}) => {
  const [expandedActions, setExpandedActions] = useState<{
    [key: string]: boolean;
  }>({});
  const toggleActionExpand = (actionId: string) => {
    setExpandedActions((prev) => ({ ...prev, [actionId]: !prev[actionId] }));
  };

  if (action.type === 'email')
    return (
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <Label htmlFor={`${action.id}-subject`}>Email Subject</Label>
        </div>
        <Input
          id={`${action.id}-subject`}
          placeholder='Enter email subject'
          value={action.subject || ''}
          onChange={(e) =>
            handleActionChange(
              categoryIndex,
              automationIndex,
              actionIndex,
              'subject',
              e.target.value,
            )
          }
        />
        <div className='flex items-center justify-between'>
          <Label htmlFor={`${action.id}-content`}>Email Content</Label>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => toggleActionExpand(action.id)}
          >
            {expandedActions[action.id] ? (
              <ChevronUp className='h-4 w-4' />
            ) : (
              <ChevronDown className='h-4 w-4' />
            )}
          </Button>
        </div>
        {expandedActions[action.id] && (
          <>
            <Textarea
              id={`${action.id}-content`}
              placeholder='Enter email content'
              value={action.content}
              onChange={(e) =>
                handleActionChange(
                  categoryIndex,
                  automationIndex,
                  actionIndex,
                  'content',
                  e.target.value,
                )
              }
              rows={4}
              disabled={!editingActions[action.id]}
            />
            <Button
              variant='outline'
              size='sm'
              onClick={() => toggleActionEdit(action.id)}
            >
              {editingActions[action.id] ? 'Save' : 'Edit'}
            </Button>
          </>
        )}
      </div>
    );

  if (action.type === 'slack') return <div>sl</div>;
  if (action.type === 'message')
    return (
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <Label htmlFor={`${action.id}-content`}>
            {action.type.charAt(0).toUpperCase() + action.type.slice(1)} Content
          </Label>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => toggleActionExpand(action.id)}
          >
            {expandedActions[action.id] ? (
              <ChevronUp className='h-4 w-4' />
            ) : (
              <ChevronDown className='h-4 w-4' />
            )}
          </Button>
        </div>
        {expandedActions[action.id] && (
          <>
            <Textarea
              id={`${action.id}-content`}
              placeholder={`Enter ${action.type} content`}
              value={action.content}
              onChange={(e) =>
                handleActionChange(
                  categoryIndex,
                  automationIndex,
                  actionIndex,
                  'content',
                  e.target.value,
                )
              }
              rows={4}
              disabled={!editingActions[action.id]}
            />
            <Button
              variant='outline'
              size='sm'
              onClick={() => toggleActionEdit(action.id)}
            >
              {editingActions[action.id] ? 'Save' : 'Edit'}
            </Button>
          </>
        )}
      </div>
    );
  if (action.type === 'ai')
    return (
      <div className='space-y-2'>
        <Label htmlFor={`${action.id}-ai`}>AI Instructions</Label>
        <Textarea
          id={`${action.id}-ai`}
          placeholder='Enter instructions for the AI'
          value={action.content}
          onChange={(e) =>
            handleActionChange(
              categoryIndex,
              automationIndex,
              actionIndex,
              'content',
              e.target.value,
            )
          }
          rows={4}
        />
      </div>
    );
};
