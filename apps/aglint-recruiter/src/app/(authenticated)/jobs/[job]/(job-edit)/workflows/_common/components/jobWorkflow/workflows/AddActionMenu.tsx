import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { v4 } from 'uuid';

import { useTenant } from '@/company/hooks';
import { UIButton } from '@/components/Common/UIButton';
import { getSlackWorkflowActions } from '@/utils/getSlackWorkflowActions';

import {
  addWaction,
  useJobAutomationStore,
} from '../../../contexts/workflowsStoreContext';
import { agentInstructionEmailTargetApi } from '../../../lib/constants';

const AddActionMenu = ({
  wTrigger,
}: {
  wTrigger: DatabaseTable['workflow'];
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { recruiter } = useTenant();
  const { jobWorkflowActions, company_templates } = useJobAutomationStore();
  const actions = getSlackWorkflowActions(
    wTrigger.trigger,
    recruiter.recruiter_preferences.slack,
  );
  const filteredActions = actions.filter((action) => {
    return !jobWorkflowActions.find(
      (workflowAction) => workflowAction.target_api === action.value.target_api,
    );
  });
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className='mb-4'>
            <UIButton variant='secondary'>
              <div className='flex items-center gap-1'>
                <PlusCircle className='h-4 w-4' />
                <span>Add Action</span>
              </div>
            </UIButton>
          </div>
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
                        const templateData = company_templates.find(
                          (temp) =>
                            temp.type ===
                            (agentInstructionEmailTargetApi[
                              action.value.target_api
                            ] ?? action.value.target_api),
                        );
                        addWaction({
                          workflow_id: wTrigger.id,
                          action_type: action.value.action_type as any,
                          target_api: action.value.target_api as any,
                          order: 0,
                          payload: {
                            ...(action.value.payload ?? {}),
                            email: {
                              body: templateData?.body ?? null!,
                              subject: templateData?.subject ?? null!,
                            },
                          },
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
