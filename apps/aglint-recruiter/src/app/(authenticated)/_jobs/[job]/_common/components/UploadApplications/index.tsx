import { Button } from '@components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import React from 'react';

import { ImportCsv } from './importCsv';
import { ImportManual } from './importManual';
import { ImportResume } from './importResume';

export const UploadApplications = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button size='sm' variant='outline' className='w-auto'>
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
