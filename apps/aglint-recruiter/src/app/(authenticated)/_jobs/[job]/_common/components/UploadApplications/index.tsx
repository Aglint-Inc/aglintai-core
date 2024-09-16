import { Button } from '@components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import React from 'react';

import UIDialog from '@/components/Common/UIDialog';
import { useApplicationsStore } from '@/job/hooks';

import { ImportCsv } from './importCsv';
import { ImportManual } from './importManual';
import { ImportResume } from './importResume';

export const UploadApplications = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { importPopup } = useApplicationsStore((state) => state);
  const { setImportPopup } = useApplicationsStore((state) => state.actions);
  return (
    <>
      {children || (
        <Button
          size='sm'
          variant='outline'
          className='w-auto'
          onClick={() => setImportPopup(true)}
        >
          <PlusCircle className='mr-2 h-4 w-4' />
          Add candidates
        </Button>
      )}
      <UIDialog
        open={importPopup}
        onClose={() => setImportPopup(false)}
        slotButtons={<></>}
        title='Add Candidates'
        size='lg'
      >
        <Tabs defaultValue='manual' className='w-full mt-5'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='manual'>Manual</TabsTrigger>
            <TabsTrigger value='csv'>CSV</TabsTrigger>
            <TabsTrigger value='resume'>Resume</TabsTrigger>
          </TabsList>
          <div className='p-4'>
            <TabsContent value='manual'>
              <ImportManual />
            </TabsContent>
            <TabsContent value='csv'>
              <ImportCsv />
            </TabsContent>
            <TabsContent value='resume'>
              <ImportResume />
            </TabsContent>
          </div>
        </Tabs>
      </UIDialog>
    </>
  );
};
