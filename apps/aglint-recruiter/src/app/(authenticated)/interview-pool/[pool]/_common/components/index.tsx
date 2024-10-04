import {
  PageActions,
  PageDescription,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
import { TwoColumnPageLayout } from '@components/layouts/two-column-page-layout';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Archive, ArchiveRestore, MoreVertical } from 'lucide-react';
import { useEffect } from 'react';

import { UIBadge } from '@/components/Common/UIBadge';
import { UIButton } from '@/components/Common/UIButton';
import { useBreadcrumContext } from '@/context/BreadcrumContext/BreadcrumContext';
import ROUTES from '@/utils/routing/routes';

import ArchiveModuleDialog from '../dialogs/ArchiveModuleDialog';
import DeleteModuleDialog from '../dialogs/DeleteModuleDialog';
import { useModuleAndUsers } from '../hooks/useModuleAndUsers';
import { useUnArchivePool } from '../hooks/useUnArchivePool';
import { setIsArchiveDialogOpen } from '../stores/store';
import StatsCards from './StatsCards';
import InterviewDetailsTabs from './Tabs';

export default function InterviewTypeDetail({
  module_id,
}: {
  module_id: string;
}) {
  const { data: editModule } = useModuleAndUsers();
  const { mutate } = useUnArchivePool();
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
