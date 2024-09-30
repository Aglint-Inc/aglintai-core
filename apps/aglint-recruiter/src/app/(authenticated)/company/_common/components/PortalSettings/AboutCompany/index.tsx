import { ScrollArea } from '@components/ui/scroll-area';
import { Parser } from 'html-to-react';
import { PencilIcon, Plus } from 'lucide-react';
import { useState } from 'react';

import { usePortalSettings } from '@/company/hooks/usePortalSettings';
import { UIButton } from '@/components/Common/UIButton';
import UISectionCard from '@/components/Common/UISectionCard';

import { AboutCompanyDialog } from './AboutCompanyDialog';
import { useFlags } from '@/company/hooks/useFlags';

export default function AboutCompany() {
  const { about } = useFlags();

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
        emptyStateMessage={about ? '' : 'About Company not available'}
        action={
          about?.length ? (
            <UIButton
              variant='outline'
              onClick={() => setIsDialogOpen(true)}
              size='sm'
              icon={<PencilIcon className='mr-2 h-3 w-3' />}
            />
          ) : (
            <UIButton
              variant='outline'
              size='sm'
              onClick={() => setIsDialogOpen(true)}
              leftIcon={<Plus />}
            >
              Add
            </UIButton>
          )
        }
      >
        {about && (
          <ScrollArea className='w-full rounded-md border bg-gray-100'>
            <div className='max-h-72 w-full space-y-4 p-4'>
              {htmlParser.parse(about)}
            </div>
          </ScrollArea>
        )}
      </UISectionCard>
    </>
  );
}
