import { Stack } from '@mui/material';
import React from 'react';

import { type ModuleType } from '../../types';
import ArchiveModuleDialog from './ArchiveModuleDialog';
import DeleteModuleDialog from './DeleteModuleDialog';

function TopRightButtons({
  editModule,
  refetch,
}: {
  editModule: ModuleType;
  refetch: () => void;
}) {
  return (
    <>
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <DeleteModuleDialog editModule={editModule} />
        <ArchiveModuleDialog editModule={editModule} refetch={refetch} />
      </Stack>
    </>
  );
}

export default TopRightButtons;
