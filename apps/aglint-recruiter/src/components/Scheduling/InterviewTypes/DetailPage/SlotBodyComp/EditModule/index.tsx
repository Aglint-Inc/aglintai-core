import { capitalize } from '@mui/material';
import { useEffect, useState } from 'react';

import { UITextArea } from '@/components/Common/UITextArea';
import { useSchedulingContext } from '@/context/SchedulingMain/SchedulingMainProvider';
import { useAllDepartments } from '@/queries/departments';
import { supabase } from '@/utils/supabase/client';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import UISelectDropDown from '@/components/Common/UISelectDropDown';
import UITextField from '@/components/Common/UITextField';
import { useModuleAndUsers } from '../../../queries/hooks';
import { setIsSettingsDialogOpen, useModulesStore } from '../../../store';
import { type ModuleType } from '../../../types';

function SettingsDialog({ editModule }: { editModule: ModuleType }) {
  const { members } = useSchedulingContext();
  const isSettingDialogOpen = useModulesStore(
    (state) => state.isSettingDialogOpen,
  );
  const [localModule, setEditLocalModule] = useState<ModuleType | null>(null);

  const { refetch } = useModuleAndUsers();

  useEffect(() => {
    if (editModule) {
      setEditLocalModule(editModule);
    }
  }, [editModule, members]);

  const updateModule = async () => {
    try {
      await supabase
        .from('interview_module')
        .update({
          name: localModule.name,
          description: localModule.description,
          department_id: localModule.department_id,
        })
        .eq('id', editModule.id)
        .throwOnError();

      refetch();
      setIsSettingsDialogOpen(false);
    } catch (e) {
      //
    }
  };

  const { data: departments } = useAllDepartments();

  return (
    <UIDialog
      open={isSettingDialogOpen}
      onClose={() => {
        setIsSettingsDialogOpen(false);
      }}
      title='Edit'
      slotButtons={
        <>
          <UIButton
            variant='secondary'
            onClick={() => setIsSettingsDialogOpen(false)}
          >
            Cancel
          </UIButton>
          <UIButton variant='default' onClick={updateModule}>
            Update
          </UIButton>
        </>
      }
    >
      <div className='flex flex-col gap-2'>
        <UITextField
          fullWidth
          label='Name'
          placeholder='Ex: Initial Screening'
          value={localModule?.name}
          onChange={(e) =>
            setEditLocalModule((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
        <UISelectDropDown
          label='Department'
          placeholder='Select Department'
          menuOptions={departments.map((ele) => ({
            name: capitalize(ele.name),
            value: ele.id.toString(),
          }))}
          value={
            departments
              ?.find((dep) => dep.id === localModule?.department_id)
              ?.id.toString() || ''
          }
          onValueChange={(value) => {
            setEditLocalModule((prev) => ({
              ...prev,
              department_id: Number(value),
            }));
          }}
        />

        <UITextArea
          label='Objective'
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
      </div>
    </UIDialog>
  );
}

export default SettingsDialog;
