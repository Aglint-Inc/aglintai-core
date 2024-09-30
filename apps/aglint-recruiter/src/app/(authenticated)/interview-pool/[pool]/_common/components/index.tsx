import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Archive, ArchiveRestore, MoreVertical } from 'lucide-react';
import { useEffect } from 'react';

import { Loader } from '@/components/Common/Loader';
import { UIBadge } from '@/components/Common/UIBadge';
import { UIButton } from '@/components/Common/UIButton';
import { useBreadcrumContext } from '@/context/BreadcrumContext/BreadcrumContext';
import ROUTES from '@/utils/routing/routes';
import toast from '@/utils/toast';

import ArchiveModuleDialog from '../dialogs/ArchiveModuleDialog';
import DeleteModuleDialog from '../dialogs/DeleteModuleDialog';
import { useModuleAndUsers } from '../hooks/useModuleAndUsers';
import { setIsArchiveDialogOpen } from '../stores/store';
import { unArchiveModuleById } from '../utils/pool';
import StatsCards from './StatsCards';
import InterviewDetailsTabs from './Tabs';

export default function InterviewTypeDetail({
  module_id,
}: {
  module_id: string;
}) {
  const {
    data: editModule,
    isLoading: fetchingModule,
    refetch,
  } = useModuleAndUsers();

  const { breadcrum, setBreadcrum } = useBreadcrumContext();
  useEffect(() => {
    if (editModule?.id) {
      setBreadcrum([
        {
          name: 'Interview Pool',
          route: ROUTES['/interview-pool'](),
        },
        {
          name: `${editModule.name}`,
          route: '',
        },
      ]);
    }
  }, [editModule?.id]);

  const unArcheive = async () => {
    const isUnArchived = await unArchiveModuleById(editModule.id);
    if (isUnArchived) {
      refetch();
      toast.success('Interview type unarchived successfully.');
    }
  };

  return (
    <div className='h-full w-full'>
      {fetchingModule ? (
        <div className='fixed inset-0 flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <div className='container-lg mx-auto w-full px-4'>
          <nav className='mb-6 flex items-center space-x-2 text-sm text-gray-600'>
            {breadcrum}
          </nav>

          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h1 className='text-xl font-bold text-gray-900'>
                {editModule?.name}
              </h1>
              <div className='mt-2 flex items-center space-x-2'>
                <UIBadge
                  textBadge={editModule.is_archived ? 'Archived' : 'Active'}
                  color={editModule.is_archived ? 'error' : 'success'}
                />
                <span className='text-gray-500'>•</span>
                <span className='text-gray-500'>
                  {editModule.department.name}
                </span>
              </div>
            </div>
            <div className='flex flex-row items-center space-x-2'>
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
                      editModule?.is_archived
                        ? unArcheive()
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

              <DeleteModuleDialog editModule={editModule} />
              <ArchiveModuleDialog />
            </div>
          </div>
          <StatsCards module_id={module_id} />
          <InterviewDetailsTabs />
        </div>
      )}
    </div>
  );
}
