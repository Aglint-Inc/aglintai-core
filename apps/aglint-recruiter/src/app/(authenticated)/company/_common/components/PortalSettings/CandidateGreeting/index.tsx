import { EmptyState } from '@components/empty-state';
import { ScrollArea } from '@components/ui/scroll-area';
import { CircleUser, Pen, Plus } from 'lucide-react';
import { useState } from 'react';

import { UIButton } from '@/common/UIButton';
import UISectionCard from '@/common/UISectionCard';
import { usePortalSettings } from '@/company/context/PortalsettingsContext';

import { GreetingEditDialog } from './GreetingEditDialog';

export default function CandidateGreeting() {
  const {
    data: { greetings },
  } = usePortalSettings();
  const [text, setText] = useState<string>(greetings || '');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <GreetingEditDialog
        setIsDialogOpen={setIsDialogOpen}
        isDialogOpen={isDialogOpen}
        setText={setText}
        text={text}
      />

      <UISectionCard
        title='Candidate Greeting'
        description='This section content will be displayed on the candidate portal as
            the greeting message to the candidate.'
        emptyStateMessage={
          !greetings && (
            <EmptyState
              icon={CircleUser}
              header={`No Candidate Greeting found`}
              description={`Add the Greeting  for candidate portal`}
              primarySlot={
                <UIButton
                  onClick={() => setIsDialogOpen(true)}
                  leftIcon={<Plus />}
                >
                  Add Greeting
                </UIButton>
              }
            />
          )
        }
        action={
          !!greetings && (
            <UIButton
              variant='outline'
              onClick={() => setIsDialogOpen(true)}
              size='sm'
              leftIcon={<Pen className='mr-2 h-3 w-3' />}
            >
              Edit
            </UIButton>
          )
        }
      >
        {greetings?.length && (
          <ScrollArea className='max-h-40 w-full rounded-md border bg-muted'>
            <div className='w-full space-y-4 p-4'>{greetings}</div>
          </ScrollArea>
        )}
      </UISectionCard>
    </>
  );
}
