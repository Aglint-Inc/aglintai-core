import { Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { MoreButton } from '@/devlink3/MoreButton';
import toast from '@/src/utils/toast';

import { QueryKeysInteviewModules } from '../../queries/type';
import {
  setIsArchiveDialogOpen,
  setIsDeleteModuleDialogOpen,
} from '../../store';
import { ModuleType } from '../../types';
import { unArchiveModuleById } from '../../utils';
import ArchiveModuleDialog from './ArchiveModuleDialog';
import DeleteModuleDialog from './DeleteModuleDialog';

function TopRightButtons({ editModule }: { editModule: ModuleType }) {
  const queryClient = useQueryClient();
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={1}>
      <DeleteModuleDialog editModule={editModule} />
      <ArchiveModuleDialog editModule={editModule} />
      <MoreButton
        onClickDelete={{
          onClick: () => {
            setIsDeleteModuleDialogOpen(true);
          },
        }}
        onClickArchive={{
          onClick: () => {
            setIsArchiveDialogOpen(true);
          },
        }}
        isArchiveVisible={!editModule?.is_archived}
        isUnarchiveVisible={editModule?.is_archived}
        onClickUnarchive={{
          onClick: async () => {
            const isUnArchived = await unArchiveModuleById(editModule.id);
            if (isUnArchived) {
              const updatedEditModule = {
                ...editModule,
                is_archived: false,
              } as ModuleType;
              queryClient.setQueryData<ModuleType>(
                QueryKeysInteviewModules.USERS_BY_MODULE_ID({
                  moduleId: editModule.id,
                }),
                {
                  ...updatedEditModule,
                },
              );
              toast.success('Interview type unarchived successfully.');
            }
          },
        }}
      />
    </Stack>
  );
}

export default TopRightButtons;
