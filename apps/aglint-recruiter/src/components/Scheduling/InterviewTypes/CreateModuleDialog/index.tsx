import {
  Autocomplete,
  capitalize,
  Dialog,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import UITextField from '@/src/components/Common/UITextField';
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

  const createModuleHandler = async () => {
    if (!name) {
      setNameError(true);
    }
    if (name && !loading) {
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
      <ConfirmationPopup
        isDescriptionVisible={false}
        textPopupTitle={'Create Interview Type'}
        textPopupDescription={'Create a new interview type by specifying the name, department, and objective, and indicate if training is required.'}
        isIcon={false}
        slotWidget={
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
              <UITypography type={'small'} fontBold={'default'}>
                Department
              </UITypography>
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
                  Select if the interviewer requires training before conducting
                  this interview
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        }
        isWidget={true}
        onClickCancel={{
          onClick: () => {
            setIsCreateDialogOpen(false);
          },
        }}
        onClickAction={{
          onClick: createModuleHandler,
        }}
        textPopupButton={'Create'}
      />
    </Dialog>
  );
}

export default CreateModuleDialog;
