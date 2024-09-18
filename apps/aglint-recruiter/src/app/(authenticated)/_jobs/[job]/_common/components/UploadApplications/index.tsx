import { Button } from '@components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
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
          variant='outline'
          className='w-auto'
          onClick={() => setImportPopup(true)}
        >
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
        <Tabs defaultValue='manual' className='mt-5 w-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='manual'>Manual</TabsTrigger>
            <TabsTrigger value='csv'>CSV</TabsTrigger>
            <TabsTrigger value='resume'>Resume</TabsTrigger>
          </TabsList>
          <div className='p-0'>
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
