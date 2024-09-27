import { Button } from '@components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';
import { useState } from 'react';

import UISectionCard from '@/components/Common/UISectionCard';

import { usePortalSettings } from '../../../hooks/hook';
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
      >
        {data?.greetings?.length && (
          <ScrollArea className='max-h-40 w-full rounded-md border bg-gray-100'>
            <div className='w-full space-y-4 p-4'>{data?.greetings}</div>
          </ScrollArea>
        )}
        <Button
          className='mt-4'
          variant='outline'
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          {text.length ? 'Edit Candidate Greeting' : 'Add Candidate Greeting'}
        </Button>
      </UISectionCard>
    </>
  );
}
