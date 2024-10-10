import { Button } from '@components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import React from 'react';

import { Indicator } from '@/common/Indicator';
import { useFlags } from '@/company/hooks/useFlags';
import UIDialog from '@/components/Common/UIDialog';
import { useRouterPro } from '@/hooks/useRouterPro';
import { useApplicationsStore } from '@/job/hooks';

import { ImportCsv } from './importCsv';
import { ImportManual } from './importManual';
import { ImportResume } from './importResume';
import { useSearchParams } from 'next/navigation';
export const UploadApplications = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { importPopup } = useApplicationsStore((state) => state);
  const { setImportPopup } = useApplicationsStore((state) => state.actions);
  const { isShowFeature } = useFlags();

  const searchParams = useSearchParams();
  const { replace } = useRouterPro();

  const isIndicatorActive =
    searchParams?.get('indicator') == 'true' ? true : false;

  const handleRemoveParam = () => {
    const params = new URLSearchParams(searchParams!);
    params.delete('indicator');
    replace(`?${params.toString()}`);
  };

  return (
    <>
      {children || (
        <Indicator isActive={isIndicatorActive}>
          <Button
            variant='outline'
            className='w-auto'
            onClick={() => setImportPopup(true)}
          >
            Add candidates
          </Button>
        </Indicator>
      )}
      <UIDialog
        open={importPopup}
        onClose={() => {
          setImportPopup(false);
          handleRemoveParam();
        }}
        slotButtons={<></>}
        title='Add Candidates'
        size='lg'
      >
        <Tabs defaultValue='manual' className='mt-5 w-full'>
          <TabsList
            className={`grid w-full ${isShowFeature('SCORING') ? 'grid-cols-3' : 'grid-cols-2'}`}
          >
            <TabsTrigger value='manual'>Manual</TabsTrigger>
            <TabsTrigger value='csv'>CSV</TabsTrigger>

            {isShowFeature('SCORING') && (
              <TabsTrigger value='resume'>Resume</TabsTrigger>
            )}
          </TabsList>
          <div className='p-0'>
            <TabsContent value='manual'>
              <ImportManual />
            </TabsContent>
            <TabsContent value='csv'>
              <ImportCsv />
            </TabsContent>
            {isShowFeature('SCORING') && (
              <TabsContent value='resume'>
                <ImportResume />
              </TabsContent>
            )}
          </div>
        </Tabs>
      </UIDialog>
    </>
  );
};
