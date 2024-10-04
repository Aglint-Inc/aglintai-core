import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { type ResourceLabelContentArg } from '@fullcalendar/resource';

import { type Resource } from './types';

function RenderResourceContent(resourceInfo: ResourceLabelContentArg) {
  const { data } = resourceInfo.resource
    .extendedProps as Resource['extendedProps'];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className='flex gap-2 p-2'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={data.profile_pic ?? ''} alt={data.name} />
            <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <p className='text-xs'>{data.name}</p>
            <p className='text-xs text-muted-foreground'>{data.position}</p>
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
