import { ScrollArea } from '@components/ui/scroll-area';
import { PencilIcon, Plus } from 'lucide-react';
import { useState } from 'react';

import { usePortalSettings } from '@/company/hooks/usePortalSettings';
import { UIButton } from '@/components/Common/UIButton';
import UISectionCard from '@/components/Common/UISectionCard';

import { GreetingEditDialog } from './GreetingEditDialog';

export default function CandidateGreeting() {
  const { data } = usePortalSettings();
  const [text, setText] = useState<string>(data.greetings || '');

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
          data.greetings ? '' : 'Candidate Greeting not available'
        }
        action={
          data.greetings ? (
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
        {data?.greetings?.length && (
          <ScrollArea className='max-h-40 w-full rounded-md border bg-gray-100'>
            <div className='w-full space-y-4 p-4'>{data?.greetings}</div>
          </ScrollArea>
        )}
      </UISectionCard>
    </>
  );
}
