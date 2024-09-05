import TipTapAIEditor from '@/components/Common/TipTapAIEditor';
import { usePortalSettings } from '@/components/CompanyDetailComp/hook';
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
import { Parser } from 'html-to-react';
import { useState } from 'react';

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
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold'>Company About</h1>
          <p className='text-sm text-muted-foreground'>
            This section content will be displayed on the candidate portal as
            the about section.
          </p>
        </div>
        {data?.about && (
          <ScrollArea className=' w-full rounded-md border bg-gray-100'>
            <div className='max-h-72 w-full p-4 space-y-4 border '>
              {htmlParser.parse(data?.about)}
            </div>
          </ScrollArea>
        )}
      </div>

      <Dialog
        open={isDialogOpen === 'about'}
        onOpenChange={() => setIsDialogOpen('about')}
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
          {/* <Textarea
            value={text}
            onChange={handleTextChange}
            placeholder='Start typing here...'
            className='min-h-[200px] p-4 border border-muted-foreground rounded-md bg-background'
          /> */}

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
          <DialogFooter className='w-full flex flex-row gap-2 justify-between'>
            <Button
              variant='secondary'
              className='w-full'
              onClick={() => {
                setText(data?.about || '');
                setIsDialogOpen(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='w-full'
              onClick={() => {
                updateAbout(text);
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
