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

import { usePortalSettings } from '@/components/CompanyDetailComp/hook';

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
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold'>Candidate Greeting</h1>
          <p className='text-sm text-muted-foreground'>
            This is a description that provides more details about the content
            you&apos;re about to create.
          </p>
        </div>
        {data?.greetings.length > 0 && (
          <ScrollArea className='max-h-40 w-full rounded-md border bg-gray-100'>
            <div className='w-full p-4 space-y-4  '>{data?.greetings}</div>
          </ScrollArea>
        )}
        <Dialog open={isDialogOpen === 'greetings'}>
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
              className='min-h-[200px] p-4 border border-muted-foreground rounded-md bg-background'
            />
            <DialogFooter className='w-full flex flex-row gap-2 justify-between'>
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
