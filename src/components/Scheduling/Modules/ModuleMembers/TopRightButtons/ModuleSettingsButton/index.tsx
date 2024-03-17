import React from 'react';

import { ButtonSetting } from '@/devlink2';

import ModuleSettingDrawer from '../ModuleSettingDrawer';
import { setIsModuleSettingsDialogOpen } from '../../../store';
import { ModuleType } from '../../../types';

function ModuleSettingsButton({ editModule }: { editModule: ModuleType }) {
  return (
    <>
      <ModuleSettingDrawer editModule={editModule} />
      <ButtonSetting
        onClickButton={{
          onClick: () => {
            setIsModuleSettingsDialogOpen(true);
          },
        }}
      />
    </>
  );
}

export default ModuleSettingsButton;
