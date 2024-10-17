import { EmptyState } from '@components/empty-state';
import { ScrollArea } from '@components/ui/scroll-area';
import { Parser } from 'html-to-react';
import { Building, Pen, Plus } from 'lucide-react';
import { useState } from 'react';

import { UIButton } from '@/common/UIButton';
import UISectionCard from '@/common/UISectionCard';
import { usePortalSettings } from '@/company/context/PortalsettingsContext';

import { AboutCompanyDialog } from './AboutCompanyDialog';

export default function AboutCompany() {
  const {
    data: { about },
  } = usePortalSettings();
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
        emptyStateMessage={
          !about && (
            <EmptyState
              icon={Building}
              header={`No about company found`}
              description={`Add the about company for candidate portal`}
              primarySlot={
                <UIButton
                  onClick={() => setIsDialogOpen(true)}
                  leftIcon={<Plus />}
                >
                  Add About
                </UIButton>
              }
            />
          )
        }
        action={
          !!about?.length && (
            <UIButton
              variant='outline'
              onClick={() => setIsDialogOpen(true)}
              size='sm'
              leftIcon={<Pen className='mr-2 h-3 w-3' />}
            >
              Edit
            </UIButton>
          )
        }
      >
        {about && (
          <ScrollArea className='w-full rounded-md border bg-muted'>
            <div className='max-h-72 w-full space-y-4 p-4'>
              {htmlParser.parse(about)}
            </div>
          </ScrollArea>
        )}
      </UISectionCard>
    </>
  );
}
