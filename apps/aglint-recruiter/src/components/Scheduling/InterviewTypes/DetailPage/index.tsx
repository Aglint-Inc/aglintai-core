import { GlobalBadge } from '@devlink/GlobalBadge';
import { PageLayout } from '@devlink2/PageLayout';
import { Stack } from '@mui/material';
import { useEffect } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { useBreadcrumContext } from '@/context/BreadcrumContext/BreadcrumContext';
import ROUTES from '@/utils/routing/routes';
import toast from '@/utils/toast';

import { useModuleAndUsers } from '../queries/hooks';
import { unArchiveModuleById } from '../utils';
import SlotBodyComp from './SlotBodyComp';
import TopRightButtons from './TopRightButtons';

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
          route: ROUTES['/scheduling/interview-types'](),
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
      <PageLayout
        slotTopbarLeft={
          <>
            {breadcrum}
            {editModule?.is_archived && (
              <GlobalBadge textBadge='Archieved' color={'warning'} />
            )}
          </>
        }
        slotTopbarRight={
          <Stack
            direction={'row'}
            justifyItems={'center'}
            gap={'var(--space-2)'}
          >
            {editModule?.is_archived && (
              <UIButton variant='secondary' onClick={unArcheive} size='sm'>
                Unarchive
              </UIButton>
            )}
            <TopRightButtons editModule={editModule} refetch={refetch} />
          </Stack>
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
