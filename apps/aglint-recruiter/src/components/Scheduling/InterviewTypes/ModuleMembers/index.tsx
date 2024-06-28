import { Stack } from '@mui/material';
import { useEffect } from 'react';

import { PageLayout } from '@/devlink2/PageLayout';
import { useBreadcrumContext } from '@/src/context/BreadcrumContext/BreadcrumContext';
import ROUTES from '@/src/utils/routing/routes';

import { useModuleAndUsers } from '../queries/hooks';
import SlotBodyComp from './SlotBodyComp';
import TopRightButtons from './TopRightButtons';

function ModuleMembersComp() {
  const {
    data: editModule,
    isLoading: fetchingModule,
    isFetching,
  } = useModuleAndUsers();

  const { breadcrum, setBreadcrum } = useBreadcrumContext();
  useEffect(() => {
    if (editModule?.id) {
      setBreadcrum([
        {
          name: 'Scheduling',
          route: ROUTES['/scheduling']() + `?tab=dashboard`,
        },
        {
          name: 'Interview Types',
          route: ROUTES['/scheduling']() + `?tab=interviewtypes`,
        },
        {
          name: `${editModule.name}`,
          route: ROUTES['/scheduling'](),
        },
      ]);
    }
  }, [editModule?.id]);

  return (
    <>
      <PageLayout
        slotTopbarLeft={<>{breadcrum}</>}
        slotTopbarRight={
          <Stack
            direction={'row'}
            justifyItems={'center'}
            gap={'var(--space-2)'}
          >
            <TopRightButtons editModule={editModule} />
          </Stack>
        }
        slotBody={
          <SlotBodyComp
            editModule={editModule}
            fetchingModule={fetchingModule}
            isFetching={isFetching}
          />
        }
      />
    </>
  );
}

export default ModuleMembersComp;
