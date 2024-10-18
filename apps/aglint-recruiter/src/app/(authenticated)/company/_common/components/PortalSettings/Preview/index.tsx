import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';

import { useTenant } from '@/company/hooks';

export const PortalPreview = ({
  application_id,
}: {
  application_id?: string;
}) => {
  const { recruiter_id } = useTenant();
  return (
    <div className='ml-auto'>
      <Popover>
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
      </Popover>
    </div>
  );
};
