import { Stack } from '@mui/material';

import { Breadcrum, PageLayout } from '@/devlink2';

import { useModuleAndUsers } from '../queries/hooks';
import Instructions from './Instructions';
import SlotBodyComp from './SlotBodyComp';
import TopRightButtons from './TopRightButtons';

function ModuleMembersComp() {
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
            window.history.back();
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
            <Instructions editModule={editModule} />
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
