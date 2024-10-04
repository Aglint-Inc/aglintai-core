import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Archive, ArchiveRestore, MoreVertical } from 'lucide-react';
import React from 'react';

import { UIButton } from '@/components/Common/UIButton';

import { useModuleAndUsers } from '../../hooks/useModuleAndUsers';
import { useUnArchivePool } from '../../hooks/useUnArchivePool';
import { setIsArchiveDialogOpen } from '../../stores/store';

function ActionsInterviewPools() {
  const { data: editModule } = useModuleAndUsers();
  const { mutate } = useUnArchivePool();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <UIButton
          variant='ghost'
          size='md'
          icon={<MoreVertical className='h-4 w-4' />}
        />
      </PopoverTrigger>
      <PopoverContent
        align='end'
        side='left'
        sideOffset={8}
        alignOffset={-40}
        className='w-[150px] cursor-pointer rounded-md border border-gray-200 bg-white p-2'
      >
        <div
          className='flex items-center space-x-2 rounded-md border-none p-2 text-sm hover:bg-gray-100'
          onClick={() => {
            editModule.is_archived
              ? mutate({
                  id: editModule.id,
                  is_archived: false,
                })
              : setIsArchiveDialogOpen(true);
          }}
        >
          {editModule?.is_archived ? (
            <>
              <Archive className='h-4 w-4' />
              <span>Unarchive</span>
            </>
          ) : (
            <>
              <ArchiveRestore className='h-4 w-4' />
              <span>Archive</span>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ActionsInterviewPools;
