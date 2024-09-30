import { ScrollArea } from '@components/ui/scroll-area';
import { PencilIcon, Plus } from 'lucide-react';
import { useState } from 'react';

import { usePortalSettings } from '@/company/hooks/usePortalSettings';
import { UIButton } from '@/components/Common/UIButton';
import UISectionCard from '@/components/Common/UISectionCard';

import { GreetingEditDialog } from './GreetingEditDialog';
import { useFlags } from '@/company/hooks/useFlags';

export default function CandidateGreeting() {
  const { greetings } = useFlags();
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
        emptyStateMessage={greetings ? '' : 'Candidate Greeting not available'}
        action={
          greetings ? (
            <UIButton
              variant='outline'
              size='sm'
              icon={<PencilIcon className='h-3 w-3' />}
              onClick={() => {
                setIsDialogOpen(true);
              }}
            />
          ) : (
            <UIButton
              size='sm'
              onClick={() => {
                setIsDialogOpen(true);
              }}
              leftIcon={<Plus />}
            >
              Add
            </UIButton>
          )
        }
      >
        {greetings?.length && (
          <ScrollArea className='max-h-40 w-full rounded-md border bg-gray-100'>
            <div className='w-full space-y-4 p-4'>{greetings}</div>
          </ScrollArea>
        )}
      </UISectionCard>
    </>
  );
}
