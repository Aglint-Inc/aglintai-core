import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';

import MuiAvatar from '../MuiAvatar';
import { type Resource } from './types';

function RenderResourceContent(resourceInfo) {
  const { data } = resourceInfo.resource
    .extendedProps as Resource['extendedProps'];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className='flex gap-2 p-2'>
          <MuiAvatar
            src={data.profile_pic}
            level={data.name}
            width='32px'
            height='32px'
            fontSize='12px'
          />
          <div className='flex flex-col'>
            <p className='text-xs'>{data.name}</p>
            <p className='text-xs text-neutral-400'>{data.position}</p>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className='px-4 py-2'>
          <p className='text-xs font-normal'>{data.email}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export default RenderResourceContent;
