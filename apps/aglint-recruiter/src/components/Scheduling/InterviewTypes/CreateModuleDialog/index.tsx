import { type DatabaseTable } from '@aglint/shared-types';
import { Button } from '@components/ui/button';
import { Checkbox as ShadcnCheckbox } from '@components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useAllDepartments } from '@/queries/departments';
import ROUTES from '@/utils/routing/routes';
import { capitalize } from '@/utils/text/textUtils';
import toast from '@/utils/toast';

import * as store from '../store';
import { createModule } from '../utils';

function CreateModuleDialog() {
  const router = useRouter();
  const { recruiter_id } = useAuthDetails();
  const { isCreateDialogOpen } = store.useModulesStore();
  const [loading, setLoading] = useState(false);
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

  const createModuleHandler = async () => {
    if (!validate() && !loading) {
      try {
        setLoading(true);
        const res = await createModule({
          name: name,
          description: objective,
          isTraining: isTraining,
          recruiter_id,
          department_id: selDepartment.id,
        });
        await router.push(
          ROUTES['/scheduling/interview-types/[type_id]']({
            type_id: res.id,
          }),
        );
        store.setIsCreateDialogOpen(null);
        store.setSelectedUsers([]);
      } catch (e) {
        toast.error(e.message);
        store.setIsCreateDialogOpen(null);
      } finally {
        setLoading(true);
      }
    }
  };

  return (
    <Dialog
      open={isCreateDialogOpen}
      onOpenChange={(open) => store.setIsCreateDialogOpen(open)}
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
          <div className='space-y-4 w-full'>
            {/* Name Input */}
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
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
                className={nameError ? 'border-red-500' : ''}
              />
              {nameError && (
                <p className='text-xs text-red-500'>Name cannot be empty.</p>
              )}
            </div>

            {/* Department Select */}
            <div className='space-y-2'>
              <Label htmlFor='department'>Department</Label>
              <Select
                value={selDepartment?.id.toString() || ''}
                onValueChange={(value) => {
                  const department = departments.find(
                    (d) => d.id.toString() === value,
                  );
                  setSelDepartment(department || null);
                }}
              >
                <SelectTrigger
                  id='department'
                  className={`w-full ${departmentError ? 'border-red-500' : ''}`}
                >
                  <SelectValue placeholder='Select Department' />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem
                      key={department.id}
                      value={department.id.toString()}
                    >
                      {capitalize(department.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {departmentError && (
                <p className='text-xs text-red-500'>Department is required</p>
              )}
            </div>

            {/* Objective Input */}
            <div className='space-y-2'>
              <Label htmlFor='objective'>Objective</Label>
              <Input
                id='objective'
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
            </div>

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
            <p className='text-xs text-gray-500 ml-6'>
              Select if the interviewer requires training before conducting this
              interview
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => {
              store.setIsCreateDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={createModuleHandler}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateModuleDialog;
