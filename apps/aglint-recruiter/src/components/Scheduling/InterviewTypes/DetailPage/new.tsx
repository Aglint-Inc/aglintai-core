import { Badge } from '@components/ui/badge';
import { useEffect } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { useBreadcrumContext } from '@/context/BreadcrumContext/BreadcrumContext';
import ROUTES from '@/utils/routing/routes';
import toast from '@/utils/toast';

import { unArchiveModuleById } from '../utils';
import StatsCards from './_common/components/StatsCards';
import InterviewDetailsTabs from './_common/components/Tabs';
import ArchiveModuleDialog from './_common/dialogs/ArchiveModuleDialog';
import DeleteModuleDialog from './_common/dialogs/DeleteModuleDialog';
import { useModuleAndUsers } from './_common/hooks/useModuleAndUsers';

export default function InterviewTypeDetail() {
  const {
    data: editModule,
    isLoading: fetchingModule,
    isFetching,
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
    <div className='bg-gradient-to-b from-gray-50 to-white min-h-screen'>
      <div className='container mx-auto p-6 '>
        <nav className='flex items-center space-x-2 text-sm text-gray-600 mb-6'>
          {breadcrum}
        </nav>

        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              DevOps Interview Pool
            </h1>
            <div className='flex items-center space-x-2 mt-2'>
              <Badge variant='default' className='bg-blue-100 text-blue-800'>
                Active
              </Badge>
              <span className='text-gray-500'>•</span>
              <span className='text-gray-500'>Engineering Department</span>
            </div>
          </div>
          <div className='flex flex-row items-center space-x-2'>
            {editModule?.is_archived && (
              <UIButton variant='secondary' onClick={unArcheive} size='sm'>
                Unarchive
              </UIButton>
            )}
            <DeleteModuleDialog editModule={editModule} />
            <ArchiveModuleDialog editModule={editModule} refetch={refetch} />
          </div>
        </div>
        <StatsCards />
        {fetchingModule || isFetching ? '' : <InterviewDetailsTabs />}
      </div>
    </div>
  );
}
