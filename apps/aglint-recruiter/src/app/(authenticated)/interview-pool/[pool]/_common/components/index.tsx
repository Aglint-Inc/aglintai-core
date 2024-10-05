import {
  PageActions,
  PageDescription,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
import { TwoColumnPageLayout } from '@components/layouts/two-column-page-layout';
import { useEffect } from 'react';

import { UIBadge } from '@/components/Common/UIBadge';
import { useBreadcrumContext } from '@/context/BreadcrumContext/BreadcrumContext';
import ROUTES from '@/utils/routing/routes';

import ArchiveModuleDialog from '../dialogs/ArchiveModuleDialog';
import DeleteModuleDialog from '../dialogs/DeleteModuleDialog';
import { useModuleAndUsers } from '../hooks/useModuleAndUsers';
import StatsCards from './StatsCards';
import InterviewDetailsTabs from './Tabs';
import ActionsInterviewPools from './TobRightActions';

export default function InterviewTypeDetail({
  module_id,
}: {
  module_id: string;
}) {
  const { data: editModule } = useModuleAndUsers();
  const { setBreadcrum } = useBreadcrumContext();

  useEffect(() => {
    if (editModule.id) {
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
  }, [editModule.id]);

  return (
    <div className='h-full w-full'>
      <>
        <TwoColumnPageLayout
          header={
            <PageHeader>
              <PageHeaderText>
                <PageTitle>{editModule.name}</PageTitle>
                <PageDescription>
                  <div className='mt-2 flex items-center space-x-2'>
                    <UIBadge
                      textBadge={editModule.is_archived ? 'Archived' : 'Active'}
                      color={editModule.is_archived ? 'error' : 'success'}
                    />
                    <span className='text-muted-foreground'>•</span>
                    <span className='text-muted-foreground'>
                      {editModule.department?.name}
                    </span>
                  </div>
                </PageDescription>
              </PageHeaderText>
              <PageActions>
                <ActionsInterviewPools />
              </PageActions>
            </PageHeader>
          }
          sidebarPosition='right'
          sidebarWidth={420}
          sidebar={<StatsCards module_id={module_id} />}
        >
          <div className='px-4'>
            <InterviewDetailsTabs />
          </div>
        </TwoColumnPageLayout>
        <DeleteModuleDialog editModule={editModule} />
        <ArchiveModuleDialog />
      </>
    </div>
  );
}
