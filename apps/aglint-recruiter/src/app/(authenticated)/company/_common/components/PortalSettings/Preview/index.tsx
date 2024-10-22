import { Button } from '@components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@components/ui/drawer';

import { useTenant } from '@/company/hooks';

export const PortalPreview = ({
  application_id,
}: {
  application_id?: string;
}) => {
  const { recruiter_id } = useTenant();
  return (
    <div className='mb-2 flex w-full flex-row items-center justify-between rounded-md bg-muted/50 p-3'>
      <div className='w-full'>Preview how the candidate portal looks</div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='outline'>Preview</Button>
        </DrawerTrigger>
        <DrawerContent className='h-[calc(100vh-100px)] w-full overflow-hidden border-border bg-muted'>
          <div className='mx-auto h-full w-full bg-muted'>
            <iframe
              src={`/candidate/home?recruiter_id=${recruiter_id}&isPreview=true${application_id ? '&application_id=' + application_id : ''}`}
              title='Example Website'
              // width='1200'
              // height='700'
              style={{ border: 'none', height: '100%', width: '100%' }}
            />
          </div>
        </DrawerContent>
      </Drawer>
      {/* <Popover>
        <PopoverTrigger>
          <Button size={'sm'}>Preview</Button>
        </PopoverTrigger>
        <PopoverContent side='left' align='start' className='w-[1032px] p-4'>
          <iframe
            src={`/candidate/home?recruiter_id=${recruiter_id}&isPreview=true${application_id ? '&application_id=' + application_id : ''}`}
            title='Example Website'
            width='1000'
            height='700'
            style={{ border: 'none' }}
          />
        </PopoverContent>
      </Popover> */}
    </div>
  );
};
