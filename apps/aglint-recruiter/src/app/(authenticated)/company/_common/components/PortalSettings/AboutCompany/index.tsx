import { Button } from '@components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';
import { Parser } from 'html-to-react';
import { useState } from 'react';

import UISectionCard from '@/components/Common/UISectionCard';

import { usePortalSettings } from '../../../hooks/hook';
import { AboutCompanyDialog } from './AboutCompanyDialog';

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
      <UISectionCard
        title='Company About'
        description='  This section content will be displayed on the candidate portal as
              the about section.'
      >
        {data?.about && (
          <ScrollArea className='w-full rounded-md border bg-gray-100'>
            <div className='max-h-72 w-full space-y-4 p-4'>
              {htmlParser.parse(data?.about)}
            </div>
          </ScrollArea>
        )}
        <Button
          variant='outline'
          className='mt-4'
          onClick={() => setIsDialogOpen(true)}
        >
          {data?.about?.length ? 'Edit Company About' : 'Add Company About'}
        </Button>
      </UISectionCard>
    </>
  );
}
