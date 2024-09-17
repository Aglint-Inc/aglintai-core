import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { MoreVertical } from 'lucide-react';
import { useEffect } from 'react';

import Loader from '@/components/Common/Loader';
import { UIBadge } from '@/components/Common/UIBadge';
import { UIButton } from '@/components/Common/UIButton';
import { useBreadcrumContext } from '@/context/BreadcrumContext/BreadcrumContext';
import ROUTES from '@/utils/routing/routes';
import toast from '@/utils/toast';

import { setIsArchiveDialogOpen } from '../../../../components/Scheduling/InterviewTypes/store';
import { unArchiveModuleById } from '../../../../components/Scheduling/InterviewTypes/utils';
import StatsCards from './_common/components/StatsCards';
import InterviewDetailsTabs from './_common/components/Tabs';
import ArchiveModuleDialog from './_common/dialogs/ArchiveModuleDialog';
import DeleteModuleDialog from './_common/dialogs/DeleteModuleDialog';
import { useModuleAndUsers } from './_common/hooks/useModuleAndUsers';

export default function InterviewTypeDetail() {
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
          name: 'Interview Pools',
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
    <>
      {fetchingModule ? (
        <Loader />
      ) : (
        <div className='bg-gradient-to-b from-gray-50 to-white min-h-screen'>
          <div className='container mx-auto p-6 '>
            <nav className='flex items-center space-x-2 text-sm text-gray-600 mb-6'>
              {breadcrum}
            </nav>

            <div className='flex justify-between items-center mb-6'>
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>
                  {editModule?.name}
                </h1>
                <div className='flex items-center space-x-2 mt-2'>
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
                      variant='outline'
                      size='sm'
                      icon={<MoreVertical className='h-4 w-4' />}
                    />
                  </PopoverTrigger>
                  <PopoverContent className='p-0 w-auto'>
                    {
                      <UIButton
                        variant='ghost'
                        onClick={() => {
                          editModule?.is_archived
                            ? unArcheive()
                            : setIsArchiveDialogOpen(true);
                        }}
                        size='sm'
                      >
                        {editModule?.is_archived ? 'Unarchive' : 'Archive'}
                      </UIButton>
                    }
                  </PopoverContent>
                </Popover>

                <DeleteModuleDialog editModule={editModule} />
                <ArchiveModuleDialog />
              </div>
            </div>
            <StatsCards />
            <InterviewDetailsTabs />
          </div>
        </div>
      )}
    </>
  );
}
