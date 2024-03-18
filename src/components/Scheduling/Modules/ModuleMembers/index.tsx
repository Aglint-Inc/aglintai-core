import { useRouter } from 'next/router';

import { Breadcrum, PageLayout } from '@/devlink2';
import { pageRoutes } from '@/src/utils/pageRouting';

import SlotBodyComp from './SlotBodyComp';
import TopRightButtons from './TopRightButtons';
import { useModuleAndUsers } from '../queries/hooks';

function ModuleMembersComp() {
  const router = useRouter();

  const {
    data: editModule,
    isLoading: fetchingModule,
    isFetching
  } = useModuleAndUsers();

  return (
    <>
      <PageLayout
        onClickBack={{
          onClick: () => {
            router.push(`${pageRoutes.SCHEDULING}?tab=interviewModules`);
          }
        }}
        isBackButton={true}
        slotTopbarLeft={
          <>
            <Breadcrum textName={editModule?.name} />
          </>
        }
        slotTopbarRight={<TopRightButtons editModule={editModule} />}
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
