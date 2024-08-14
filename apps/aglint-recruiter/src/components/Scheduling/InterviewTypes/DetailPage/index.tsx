import { Stack } from '@mui/material';
import { useEffect } from 'react';

import { GlobalBadge } from '@/devlink/GlobalBadge';
import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { PageLayout } from '@/devlink2/PageLayout';
import { useBreadcrumContext } from '@/src/context/BreadcrumContext/BreadcrumContext';
import ROUTES from '@/src/utils/routing/routes';
import toast from '@/src/utils/toast';

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
              // <Stack maxWidth={'866px'}>
              //   <GlobalBannerInline
              //     color={'warning'}
              //     slotButton={
              //       <>
              //         <ButtonSolid
              //           textButton='Unarchive'
              //           size={1}
              //           onClickButton={{
              //             onClick: unArcheive,
              //           }}
              //         />
              //       </>
              //     }
              //     // isDescriptionVisible={false}

              //     textContent={
              //       'This interview type is archived. Click "Unarchive" to reactivate.'
              //     }
              //   />
              // </Stack>
              <ButtonSoft
                textButton='Unarchive'
                color={'neutral'}
                onClickButton={{
                  onClick: unArcheive,
                }}
                size={1}
              />
            )}
            <TopRightButtons editModule={editModule} refetch={refetch} />
          </Stack>
        }
        slotBody={
          <SlotBodyComp
            editModule={editModule}
            fetchingModule={fetchingModule}
            isFetching={isFetching}
            refetch={refetch}
          />
        }
      />
    </>
  );
}

export default ModuleMembersComp;
