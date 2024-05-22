import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';

import { useModuleAndUsers } from '../queries/hooks';
import SlotBodyComp from './SlotBodyComp';
import TopRightButtons from './TopRightButtons';

function ModuleMembersComp() {
  const router = useRouter();
  const {
    data: editModule,
    isLoading: fetchingModule,
    isFetching,
  } = useModuleAndUsers();

  return (
    <>
      <PageLayout
        onClickBack={{
          onClick: () => {
            router.push('/scheduling?tab=interviewtypes');
          },
        }}
        isBackButton={true}
        slotTopbarLeft={
          <>
            <Breadcrum textName={editModule?.name} />
          </>
        }
        slotTopbarRight={
          <Stack direction={'row'} justifyItems={'center'} gap={'10px'}>
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
