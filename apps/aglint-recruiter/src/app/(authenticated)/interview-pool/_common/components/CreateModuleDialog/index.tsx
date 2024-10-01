import { type DatabaseTable } from '@aglint/shared-types';
import { Checkbox as ShadcnCheckbox } from '@components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Label } from '@components/ui/label';
import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UISelectDropDown from '@/components/Common/UISelectDropDown';
import { UITextArea } from '@/components/Common/UITextArea';
import UITextField from '@/components/Common/UITextField';
import {
  setIsCreateDialogOpen,
  setSelectedUsers,
  useModulesStore,
} from '@/interview-pool/details/stores/store';
import { useCreateInterviewPool } from '@/interview-pool/hooks/useCreateInterviewPool';
import { useAllDepartments } from '@/queries/departments';
import { capitalize } from '@/utils/text/textUtils';
import toast from '@/utils/toast';

function CreateModuleDialog() {
  const { isCreateDialogOpen } = useModulesStore();
  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');
  const [selDepartment, setSelDepartment] =
    useState<DatabaseTable['departments']>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const { data: departments } = useAllDepartments();

  const validate = () => {
    let error = true;
    if (!name) {
      setNameError(true);
    }
    if (!selDepartment) {
      setDepartmentError(true);
    }
    if (name && selDepartment) {
      error = false;
    }
    return error;
  };

  const { isPending, mutateAsync } = useCreateInterviewPool();

  const createModuleHandler = async () => {
    if (!validate() && !isPending) {
      try {
        await mutateAsync({
          name: name,
          description: objective,
          isTraining: isTraining,
          department_id: selDepartment.id,
        });
        setIsCreateDialogOpen(null);
        setSelectedUsers([]);
      } catch (e) {
        toast.error(e.message);
        setIsCreateDialogOpen(null);
      }
    }
  };

  return (
    <Dialog
      open={isCreateDialogOpen}
      onOpenChange={(open) => setIsCreateDialogOpen(open)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Interview Type</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <p className='mb-2 text-sm text-gray-600'>
            Create a new interview type by specifying the name, department, and
            objective, and indicate if training is required.
          </p>
          <div className='w-full space-y-4'>
            <UITextField
              id='name'
              placeholder='Ex: Initial Screening'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              onFocus={() => {
                setNameError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  createModuleHandler();
                }
              }}
              error={nameError}
              helperText='Name cannot be empty.'
            />

            <UISelectDropDown
              label='Department'
              value={selDepartment?.id.toString() || ''}
              onValueChange={(value) => {
                const department = departments.find(
                  (d) => d.id.toString() === value,
                );
                setSelDepartment(department || null);
              }}
              menuOptions={departments.map((department) => ({
                name: capitalize(department.name),
                value: department.id.toString(),
              }))}
              error={departmentError}
              helperText='Department cannot be empty.'
            />

            <UITextArea
              id='objective'
              label='Objective'
              placeholder='Add a brief description of the interview'
              value={objective}
              onChange={(e) => {
                setObjective(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  createModuleHandler();
                }
              }}
            />

            {/* Checkbox */}
            <div className='flex items-center space-x-2'>
              <ShadcnCheckbox
                id='training'
                checked={isTraining}
                onCheckedChange={(checked) => {
                  setIsTraining(checked as boolean);
                }}
              />
              <Label htmlFor='training' className='text-sm font-normal'>
                Requires Training
              </Label>
            </div>
            <p className='ml-6 text-sm text-muted-foreground'>
              Select if the interviewer requires training before conducting this
              interview
            </p>
          </div>
        </div>
        <DialogFooter>
          <UIButton
            variant='outline'
            onClick={() => {
              setIsCreateDialogOpen(false);
            }}
          >
            Cancel
          </UIButton>
          <UIButton isLoading={isPending} onClick={createModuleHandler}>
            Create
          </UIButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateModuleDialog;
