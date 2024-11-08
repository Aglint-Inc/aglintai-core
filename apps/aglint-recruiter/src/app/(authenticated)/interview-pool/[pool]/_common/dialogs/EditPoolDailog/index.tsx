import { useToast } from '@components/hooks/use-toast';
import { capitalize } from 'lodash';
import { useState } from 'react';

import { useDepartments } from '@/authenticated/hooks/useDepartments';
import UISelectDropDown from '@/common/UISelectDropDown';
import { UITextArea } from '@/common/UITextArea';
import UITextField from '@/common/UITextField';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { api } from '@/trpc/client';

import { useModuleAndUsers } from '../../hooks/useModuleAndUsers';
import {
  setIsAddMemberDialogOpen,
  setIsEditPoolDialogOpen,
  useModulesStore,
} from '../../stores/store';

function EditPoolDailog() {
  const { toast } = useToast();
  const isEditPoolDialogOpen = useModulesStore(
    (state) => state.isEditPoolDialogOpen,
  );
  const { data: departments } = useDepartments();
  const { data: editModule } = useModuleAndUsers();
  const { mutateAsync, isPending } = api.interview_pool.update.useMutation({
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  const [dep, setDep] = useState<number | null>(editModule.department_id);
  const [name, setName] = useState<string>(editModule.name);
  const [objective, setObjective] = useState<string>(
    editModule.description ?? '',
  );

  const onClickUpdate = async () => {
    try {
      await mutateAsync({
        department_id: dep,
        name: name,
        description: objective,
        id: editModule.id,
      });
      setIsEditPoolDialogOpen(false);
    } catch {
      toast({
        title: 'Error',
        description:
          'Something went wrong. Please try again later or contact support',
        variant: 'destructive',
      });
    }
  };

  return (
    <UIDialog
      title={`Edit ${editModule.name}`}
      open={isEditPoolDialogOpen}
      onClose={() => {
        setIsEditPoolDialogOpen(false);
      }}
      slotButtons={
        <>
          <UIButton
            variant='secondary'
            onClick={() => {
              setIsAddMemberDialogOpen(false);
            }}
          >
            Cancel
          </UIButton>

          <UIButton
            variant='default'
            isLoading={isPending}
            onClick={() => {
              if (!isPending) onClickUpdate();
            }}
          >
            Update
          </UIButton>
        </>
      }
    >
      <div className='flex w-full flex-col gap-2'>
        <UITextField
          label='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <UISelectDropDown
          label='Department'
          value={dep?.toString() || ''}
          onValueChange={(value) => {
            const department = (departments || []).find(
              (d) => d.id.toString() === value,
            );
            if (department) setDep(department.id);
          }}
          menuOptions={(departments || []).map((department) => ({
            name: capitalize(department.name),
            value: department.id.toString(),
          }))}
        />

        <UITextArea
          id='objective'
          label='Objective'
          placeholder='Add a brief description of the interview'
          value={objective}
          onChange={(e) => {
            setObjective(e.target.value);
          }}
        />
      </div>
    </UIDialog>
  );
}

export default EditPoolDailog;
