import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import MuiAvatar from '../MuiAvatar';
import { type Resource } from './types';

function RenderResourceContent(resourceInfo) {
  const { data } = resourceInfo.resource
    .extendedProps as Resource['extendedProps'];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className='flex gap-4 p-4'>
            <MuiAvatar
              src={data.profile_pic}
              level={data.name}
              variant='rounded'
              width='32px'
              height='32px'
              fontSize='12px'
            />
            <div className='flex flex-col'>
              <p className='text-sm text-neutral-12'>{data.name}</p>
              <p className='text-sm'>{data.position}</p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className='px-4 py-2'>
            <p className='text-xs font-normal'>{data.email}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default RenderResourceContent;
