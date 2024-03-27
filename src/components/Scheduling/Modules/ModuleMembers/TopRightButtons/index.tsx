import { Stack } from '@mui/material';
import React from 'react';

import { MoreButton } from '@/devlink3';

import { setIsDeleteModuleDialogOpen } from '../../store';
import { ModuleType } from '../../types';
import DeleteModuleDialog from './DeleteModuleDialog';
import ModuleSettingsButton from './ModuleSettingsButton';

function TopRightButtons({ editModule }: { editModule: ModuleType }) {
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={1}>
      <DeleteModuleDialog editModule={editModule} />
      <ModuleSettingsButton editModule={editModule} />
      <MoreButton
        onClickDelete={{
          onClick: () => {
            setIsDeleteModuleDialogOpen(true);
          },
        }}
      />
    </Stack>
  );
}

export default TopRightButtons;
