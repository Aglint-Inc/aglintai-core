import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { ScrollArea } from '@components/ui/scroll-area';
import { Textarea } from '@components/ui/textarea';
import { useState } from 'react';

import { usePortalSettings } from '../../../hooks/hook';

export default function ConfigureCandidateGreeting() {
  const { data, setIsDialogOpen, isDialogOpen, updateGreetings } =
    usePortalSettings();
  const [text, setText] = useState<string>(data.greetings || '');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
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
        <Dialog
          open={isDialogOpen === 'greetings'}
          onOpenChange={(open) => setIsDialogOpen(open ? 'greetings' : null)}
        >
          <DialogTrigger asChild>
            <Button
              className='mt-4'
              variant='outline'
              onClick={() => {
                setIsDialogOpen('greetings');
              }}
            >
              {text.length
                ? 'Edit Candidate Greeting'
                : 'Add Candidate Greeting'}
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[500px]'>
            <DialogHeader>
              <DialogTitle>Edit Candidate Greeting</DialogTitle>
              <DialogDescription>
                Edit the greeting section for the candidate portal.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              value={text}
              onChange={handleTextChange}
              placeholder='Start typing here...'
              className='min-h-[200px] rounded-md border border-muted-foreground bg-background p-4'
            />
            <DialogFooter className='flex w-full flex-row justify-between gap-2'>
              <Button
                variant='secondary'
                className='w-full'
                onClick={() => {
                  setIsDialogOpen(null);
                  setText(data?.greetings || '');
                }}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='w-full'
                onClick={() => updateGreetings(text)}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
