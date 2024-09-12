import { useEffect } from 'react';

import { UIBadge } from '@/components/Common/UIBadge';
import { UIButton } from '@/components/Common/UIButton';
import { UIPageLayout } from '@/components/Common/UIPageLayout';
import { useBreadcrumContext } from '@/context/BreadcrumContext/BreadcrumContext';
import ROUTES from '@/utils/routing/routes';
import toast from '@/utils/toast';

import { unArchiveModuleById } from '../utils';
import SlotBodyComp from './_common/components/old/SlotBodyComp';
import TopRightButtons from './_common/components/TopRightButtons';
import { useModuleAndUsers } from './_common/hooks/useModuleAndUsers';

function ModuleMembersComp() {
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
          name: 'Interview Types',
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
      <UIPageLayout
        slotTopbarLeft={
          <>
            {breadcrum}
            {editModule?.is_archived && (
              <UIBadge textBadge='Archieved' color={'warning'} />
            )}
          </>
        }
        slotTopbarRight={
          <div className='flex flex-row items-center space-x-2'>
            {editModule?.is_archived && (
              <UIButton variant='secondary' onClick={unArcheive} size='sm'>
                Unarchive
              </UIButton>
            )}
            <TopRightButtons editModule={editModule} refetch={refetch} />
          </div>
        }
        slotBody={
          <>
            <SlotBodyComp
              editModule={editModule}
              fetchingModule={fetchingModule}
              isFetching={isFetching}
              refetch={refetch}
            />
          </>
        }
      />
    </>
  );
}

export default ModuleMembersComp;
