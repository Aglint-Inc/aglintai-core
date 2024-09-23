import { Button } from '@components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';
import { Parser } from 'html-to-react';
import { useState } from 'react';

import { usePortalSettings } from '../../../hooks/hook';
import { AboutCompanyDialog } from './Dialog/AboutCompanyDialog';

export default function AboutCompany() {
  const { data } = usePortalSettings();

  const htmlParser = Parser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <AboutCompanyDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
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
              <div className='max-h-72 w-full space-y-4 p-4'>
                {htmlParser.parse(data?.about)}
              </div>
            </ScrollArea>
          )}
        </div>
        <Button
          variant='outline'
          className='mt-4'
          onClick={() => setIsDialogOpen(true)}
        >
          {data?.about?.length ? 'Edit Company About' : 'Add Company About'}
        </Button>
      </div>
    </>
  );
}
