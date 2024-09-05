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

export default function ConfigureCandidateGreeting() {
  const [text, setText] = useState('');

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
        <ScrollArea className='h-40 w-full rounded-md border bg-gray-100'>
          <div className='w-full p-4 space-y-4  '>
            Welcome to our portal! We’re here to keep you connected every step
            of the way, whether you’re preparing for interviews or exploring new
            opportunities. Dive into detailed company profiles, discover
            comprehensive job descriptions, and don&apos;t hesitate to reach out with
            any questions you may have. We&apos;re committed to helping you find the
            right fit and making your job search experience as smooth as
            possible.
          </div>
        </ScrollArea>
        <Dialog>
        <DialogTrigger asChild>
          <Button className='mt-4' variant='outline'>Edit Candidate Greeting</Button>
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
            <Button variant='secondary' className='w-full'>
              Cancel
            </Button>
            <Button type='submit' className='w-full'>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>


    </>
  );
}
