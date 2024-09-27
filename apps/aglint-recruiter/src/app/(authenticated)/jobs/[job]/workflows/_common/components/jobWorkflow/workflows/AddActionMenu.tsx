import { UIButton } from '@/components/Common/UIButton';
import {
  addWaction,
  useJobAutomationStore,
} from '@/job/workflows/contexts/workflowsStoreContext';
import { ACTION_TRIGGER_MAP } from '@/workflows/constants';
import { DatabaseTable } from '@aglint/shared-types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@components/ui/command';
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { v4 } from 'uuid';
import { dayjsLocal } from '@aglint/shared-utils';

const AddActionMenu = ({
  wTrigger,
}: {
  wTrigger: DatabaseTable['workflow'];
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const { jobWorkflowActions } = useJobAutomationStore();
  const actions = ACTION_TRIGGER_MAP[wTrigger.trigger];
  const filteredActions = actions.filter((action) => {
    return !jobWorkflowActions.find(
      (workflowAction) => workflowAction.target_api === action.value.target_api,
    );
  });
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <UIButton variant='secondary'>
            <div className='flex items-center gap-1'>
              <span>Add Action</span>
              <PlusCircle className='h-4 w-4' />
            </div>
          </UIButton>
        </PopoverTrigger>
        <PopoverContent
          className='min-w-450 flex flex-col gap-4 p-2'
          align='end'
          side='right'
        >
          <Command>
            <CommandList>
              <CommandGroup>
                <CommandEmpty>
                  <p className='text-sm text-muted-foreground'>
                    No Actions found.
                  </p>
                </CommandEmpty>
                {filteredActions.map((action) => {
                  return (
                    <CommandItem
                      key={action.value.target_api}
                      value={action.value.target_api}
                      onSelect={() => {
                        addWaction({
                          workflow_id: wTrigger.id,
                          action_type: action.value.action_type as any,
                          target_api: action.value.target_api as any,
                          order: 0,
                          payload: action.value.payload as any,
                          created_at: dayjsLocal().toISOString(),
                          id: v4(),
                        });
                        setOpen(false);
                      }}
                    >
                      {action.name}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AddActionMenu;
