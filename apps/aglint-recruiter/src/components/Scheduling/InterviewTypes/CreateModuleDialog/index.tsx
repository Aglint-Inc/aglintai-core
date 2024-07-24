import {
  Autocomplete,
  capitalize,
  Dialog,
  Stack,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { Checkbox } from '@/devlink/Checkbox';
import { DcPopup } from '@/devlink/DcPopup';
import UITextField from '@/src/components/Common/UITextField';
import RequiredField from '@/src/components/Common/UITextField/RequiredField';
import UITypography from '@/src/components/Common/UITypography';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import ROUTES from '@/src/utils/routing/routes';
import toast from '@/src/utils/toast';

import {
  setIsCreateDialogOpen,
  setSelectedUsers,
  useModulesStore,
} from '../store';
import { createModule } from '../utils';

function CreateModuleDialog() {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const { isCreateDialogOpen } = useModulesStore();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');
  const [department, setDepartment] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);

  const validate = () => {
    let error = true;
    if (!name) {
      setNameError(true);
    }
    if (!department) {
      setDepartmentError(true);
    }
    if (name && department) {
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
          recruiter_id: recruiter.id,
          department: department,
        });
        await router.push(
          ROUTES['/scheduling/module/members/[module_id]']({
            module_id: res.id,
          }),
        );
        setIsCreateDialogOpen(null);
        setSelectedUsers([]);
      } catch (e) {
        toast.error(e.message);
        setIsCreateDialogOpen(null);
      } finally {
        setLoading(true);
      }
    }
  };

  return (
    <Dialog
      open={isCreateDialogOpen}
      onClose={() => {
        setIsCreateDialogOpen(false);
      }}
    >
      <DcPopup
        popupName={'Create Interview Type'}
        slotBody={
          <Stack>
            <Typography mb={2}>
              Create a new interview type by specifying the name, department,
              and objective, and indicate if training is required.
            </Typography>
            <Stack spacing={2} width={'100%'}>
              <UITextField
                label='Name'
                required
                error={nameError}
                helperText={`Name cannot be empty`}
                placeholder='Ex: Initial Screening'
                fullWidth
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
              />
              <Stack gap={'var(--space-1)'}>
                <Stack direction={'row'}>
                  <UITypography
                    type={'small'}
                    fontBold={'default'}
                    color='var(--neutral-12)'
                  >
                    Department
                  </UITypography>
                  <RequiredField />
                </Stack>
                <Autocomplete
                  fullWidth
                  value={department}
                  onChange={(event: any, newValue: string | null) => {
                    setDepartment(newValue);
                  }}
                  options={recruiter?.departments?.map((departments) =>
                    capitalize(departments),
                  )}
                  renderInput={(params) => (
                    <UITextField
                      {...params}
                      required
                      name='department'
                      placeholder='Select Department'
                      error={departmentError}
                      helperText='Department cannot be empty'
                    />
                  )}
                />
              </Stack>

              <UITextField
                required
                label='Objective'
                multiline
                placeholder='Add a brief description of the interview'
                fullWidth
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
              <Stack>
                <Stack spacing={1} direction={'row'} alignItems={'center'}>
                  <Checkbox
                    isChecked={isTraining}
                    onClickCheck={{
                      onClick: () => {
                        setIsTraining(!isTraining);
                      },
                    }}
                  />
                  <Typography variant='inherit'>Requires Training</Typography>
                </Stack>
                <Stack
                  style={{
                    fontSize: '12px',
                    lineHeight: '14px',
                    marginTop: '8px',
                    marginLeft: '26px',
                    color: '#68737d',
                  }}
                >
                  <Typography variant='inherit'>
                    Select if the interviewer requires training before
                    conducting this interview
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        }
        onClickClosePopup={{
          onClick: () => {
            setIsCreateDialogOpen(false);
          },
        }}
        slotButtons={
          <>
            <ButtonSoft
              textButton='Cancel'
              size={2}
              color={'neutral'}
              onClickButton={{
                onClick: () => {
                  setIsCreateDialogOpen(false);
                },
              }}
            />
            <ButtonSolid
              size={2}
              textButton={'Create'}
              onClickButton={{ onClick: createModuleHandler }}
            />
          </>
        }
      />
    </Dialog>
  );
}

export default CreateModuleDialog;
