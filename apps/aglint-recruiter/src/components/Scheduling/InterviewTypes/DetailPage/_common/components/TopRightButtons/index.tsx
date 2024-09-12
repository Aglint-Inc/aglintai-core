import React from 'react';

import { type ModuleType } from '../../../../types';
import ArchiveModuleDialog from '../../dialogs/ArchiveModuleDialog';
import DeleteModuleDialog from '../../dialogs/DeleteModuleDialog';

function TopRightButtons({
  editModule,
  refetch,
}: {
  editModule: ModuleType;
  refetch: () => void;
}) {
  return (
    <>
      <div className='flex items-center space-x-4'>
        <DeleteModuleDialog editModule={editModule} />
        <ArchiveModuleDialog editModule={editModule} refetch={refetch} />
      </div>
    </>
  );
}

export default TopRightButtons;
