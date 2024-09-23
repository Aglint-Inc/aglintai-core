import { Button } from '@components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';
import { useState } from 'react';

import { usePortalSettings } from '../../../hooks/hook';
import { GreetingEditDialog } from './Dialog/GreetingEditDialog';

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
      <div className='w-full max-w-2xl space-y-4'>
        <div className='flex flex-col'>
          <h1 className='text-md font-semibold'>Candidate Greeting</h1>
          <p className='text-sm text-muted-foreground'>
            This section content will be displayed on the candidate portal as
            the greeting message to the candidate.
          </p>
        </div>
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
      </div>
    </>
  );
}
