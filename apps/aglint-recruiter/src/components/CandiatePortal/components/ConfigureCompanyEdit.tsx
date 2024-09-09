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
import { Parser } from 'html-to-react';
import { useState } from 'react';

import TipTapAIEditor from '@/components/Common/TipTapAIEditor';
import { usePortalSettings } from '@/components/CompanyDetailComp/hook';

export default function ConfigureCompanyEdit() {
  const { data, isDialogOpen, setIsDialogOpen, updateAbout } =
    usePortalSettings();
  const [text, setText] = useState(data?.about || '');

  const handleTextChange = (value) => {
    setText(value);
  };
  const htmlParser = Parser();
  return (
    <div>
      <div className='w-full max-w-2xl space-y-4'>
        <div className='flex flex-col'>
          <h1 className='text-md font-semibold'>Company About</h1>
          <p className='text-sm text-muted-foreground'>
            This section content will be displayed on the candidate portal as
            the about section.
          </p>
        </div>
        {data?.about && (
          <ScrollArea className='w-full rounded-md border bg-gray-100'>
            <div className='max-h-72 w-full p-4 space-y-4 '>
              {htmlParser.parse(data?.about)}
            </div>
          </ScrollArea>
        )}
      </div>

      <Dialog
  open={isDialogOpen === 'about'}
  onOpenChange={(open) => setIsDialogOpen(open ? 'about' : null)}  
>
  <DialogTrigger asChild>
    <Button
      variant='outline'
      className='mt-4'
      onClick={() => setIsDialogOpen('about')}
    >
      {data?.about?.length ? 'Edit Company About' : 'Add Company About'}
    </Button>
  </DialogTrigger>
  <DialogContent className='sm:max-w-[500px]'>
    <DialogHeader>
      <DialogTitle>Edit Company About</DialogTitle>
      <DialogDescription>
        Edit the about section of your company.
      </DialogDescription>
    </DialogHeader>
    <div className='border border-muted-foreground rounded-md bg-background'>
      <TipTapAIEditor
        enablAI={false}
        placeholder={''}
        minHeight='360px'
        height='330px'
        padding={'10px'}
        editor_type='email'
        isSize
        handleChange={handleTextChange}
        initialValue={data?.about}
      />
    </div>
    <DialogFooter className='w-full flex flex-row gap-2 justify-between'>
      <Button
        variant='secondary'
        className='w-full'
        onClick={() => {
          setText(data?.about || '');
          setIsDialogOpen(null);  // Updated to close the dialog
        }}
      >
        Cancel
      </Button>
      <Button
        type='submit'
        className='w-full'
        onClick={() => {
          updateAbout(text);
          // setIsDialogOpen(null);  // Close the dialog after saving
        }}
      >
        Save changes
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </div>
  );
}
