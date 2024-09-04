import { Button } from '@components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import React from 'react';

import { useApplicationsStore } from '@/context/ApplicationsContext/store';

import { ImportCsv } from './importCsv';
import { ImportManual } from './importManual';
import { ImportResume } from './importResume';

const UploadApplications = ({ children }: { children?: React.ReactNode }) => {
  const { importPopup, setImportPopup } = useApplicationsStore(
    ({ importPopup, setImportPopup }) => ({ importPopup, setImportPopup }),
  );

  return (
    <Dialog open={importPopup} onOpenChange={setImportPopup}>
      <DialogTrigger asChild>
        {children || (
          <Button variant='outline' className='w-auto'>
            <PlusCircle className='mr-2 h-4 w-4' />
            Add candidates
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Tabs defaultValue='manual' className='w-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='manual'>Manual</TabsTrigger>
            <TabsTrigger value='csv'>CSV</TabsTrigger>
            <TabsTrigger value='resume'>Resume</TabsTrigger>
          </TabsList>
          <TabsContent value='manual'>
            <ImportManual />
          </TabsContent>
          <TabsContent value='csv'>
            <ImportCsv />
          </TabsContent>
          <TabsContent value='resume'>
            <ImportResume />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export { UploadApplications };
