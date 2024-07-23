import {
  Autocomplete,
  capitalize,
  Dialog,
  Stack,
  TextField,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { supabase } from '@/src/utils/supabase/client';

import { QueryKeysInteviewModules } from '../../../queries/type';
import { setIsSettingsDialogOpen, useModulesStore } from '../../../store';
import { ModuleType } from '../../../types';

function SettingsDialog({ editModule }: { editModule: ModuleType }) {
  const { members } = useSchedulingContext();
  const { recruiter } = useAuthDetails();
  const isSettingDialogOpen = useModulesStore(
    (state) => state.isSettingDialogOpen,
  );
  const [localModule, setEditLocalModule] = useState<ModuleType | null>(null);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (editModule) {
      setEditLocalModule(editModule);
    }
  }, [editModule, members]);

  const updateModule = async () => {
    const { data, error } = await supabase
      .from('interview_module')
      .update({
        name: localModule.name,
        description: localModule.description,
        department: localModule.department,
      })
      .eq('id', editModule.id)
      .select();
    if (!error) {
      const updatedEditModule = {
        ...editModule,
        ...data[0],
      } as ModuleType;

      queryClient.setQueryData<ModuleType>(
        QueryKeysInteviewModules.USERS_BY_MODULE_ID({
          moduleId: editModule.id,
        }),
        {
          ...updatedEditModule,
        },
      );
      setIsSettingsDialogOpen(false);
    }
  };

  return (
    <Dialog
      open={isSettingDialogOpen}
      onClose={() => {
        setIsSettingsDialogOpen(false);
      }}
    >
      <DcPopup
        popupName={'Edit'}
        slotBody={
          <Stack spacing={2}>
            <TextField
              fullWidth
              placeholder='Ex: Initial Screening'
              value={localModule?.name}
              onChange={(e) =>
                setEditLocalModule((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <Stack gap={'var(--space-1)'}>
              <UITypography type={'small'} fontBold={'default'}>
                Department
              </UITypography>
              <Autocomplete
                fullWidth
                value={localModule?.department}
                onChange={(event: any, newValue: string | null) => {
                  setEditLocalModule((prev) => ({
                    ...prev,
                    department: newValue,
                  }));
                }}
                options={recruiter?.departments?.map((departments) =>
                  capitalize(departments),
                )}
                renderInput={(params) => (
                  <TextField
                    margin='none'
                    {...params}
                    name='department'
                    placeholder='Select Department'
                  />
                )}
              />
            </Stack>
            <UITextField
              label='Objective'
              multiline
              placeholder='Add a brief description of the interview'
              fullWidth
              value={localModule?.description}
              onChange={(e) => {
                setEditLocalModule((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
          </Stack>
        }
        onClickClosePopup={{ onClick: () => setIsSettingsDialogOpen(false) }}
        slotButtons={
          <>
            <ButtonSoft
              textButton='Cancel'
              size={2}
              color={'neutral'}
              onClickButton={{
                onClick: () => setIsSettingsDialogOpen(false),
              }}
            />
            <ButtonSolid
              size={2}
              textButton={'Update'}
              onClickButton={{ onClick: updateModule }}
            />
          </>
        }
      />
    </Dialog>
  );
}

export default SettingsDialog;
