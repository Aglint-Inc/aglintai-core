import { Popover, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { MoreMenu } from '@/devlink3/MoreMenu';
import toast from '@/src/utils/toast';

import { QueryKeysInteviewModules } from '../../queries/type';
import {
  setIsArchiveDialogOpen,
  setIsDeleteModuleDialogOpen,
  setIsSettingsDialogOpen,
} from '../../store';
import { ModuleType } from '../../types';
import { unArchiveModuleById } from '../../utils';
import ArchiveModuleDialog from './ArchiveModuleDialog';
import DeleteModuleDialog from './DeleteModuleDialog';

function TopRightButtons({ editModule }: { editModule: ModuleType }) {
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <DeleteModuleDialog editModule={editModule} />
        <ArchiveModuleDialog editModule={editModule} />

        <Stack flexDirection={'row'} gap={'var(--space-2)'}>
          <ButtonSolid
            textButton='Edit Interview Type'
            size={2}
            onClickButton={{
              onClick: () => setIsSettingsDialogOpen(true),
            }}
          />
          <IconButtonGhost
            onClickButton={{ onClick: handleClick }}
            iconName='more_vert'
            size={2}
            iconSize={6}
            color={'neutral'}
          />
        </Stack>
      </Stack>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            boxShadow: 'none',
            borderRadius: 0,
            backgroundColor: 'transparent',
          },
        }}
      >
        <MoreMenu
          isArchiveVisible={!editModule?.is_archived}
          isUnarchiveVisible={editModule?.is_archived}
          onClickDelete={{
            onClick: () => {
              setIsDeleteModuleDialogOpen(true);
              handleClose();
            },
          }}
          onClickArchive={{
            onClick: () => {
              setIsArchiveDialogOpen(true);
              handleClose();
            },
          }}
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
              handleClose();
            },
          }}
        />
      </Popover>
    </>
  );
}

export default TopRightButtons;
