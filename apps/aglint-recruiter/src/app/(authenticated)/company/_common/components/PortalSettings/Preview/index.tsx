import { Button } from '@components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@components/ui/drawer"

import { useTenant } from '@/company/hooks';

export const PortalPreview = ({
  application_id,
}: {
  application_id?: string;
}) => {
  const { recruiter_id } = useTenant();
  return (
    <div className='rounded-md bg-muted/50 p-3 flex flex-row justify-between items-center'>
      <div>Preview how the candidate portal looks</div>
      <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Preview</Button>
      </DrawerTrigger>
      <DrawerContent className='bg-muted border-border overflow-hidden' >
        <div className="mx-auto h-[700px]  bg-muted">
        <iframe
            src={`/candidate/home?recruiter_id=${recruiter_id}&isPreview=true${application_id ? '&application_id=' + application_id : ''}`}
            title='Example Website'
            width='1200'
            height='700'
            style={{ border: 'none' }}
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
