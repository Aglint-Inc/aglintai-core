import { Autocomplete, Dialog, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

import { AddDepartmentPop } from '@/devlink/AddDepartmentPop';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { RolesPill } from '@/devlink/RolesPill';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import toast from '@/src/utils/toast';

interface DepartmentsProps {
  handleClose: () => void;
  open: any;
  handleChange: (
    // eslint-disable-next-line no-unused-vars
    recruiter: ReturnType<typeof useAuthDetails>['recruiter'],
  ) => void;
}

const AddDepartmentsDialog: React.FC<DepartmentsProps> = ({
  handleClose,
  open,
}) => {
  const { recruiter, handleDepartmentsUpdate } = useAuthDetails();
  const [inputValue, setInputValue] = useState('');
  let initialDepartments = [];
  if (localStorage?.getItem('departments')) {
    if (Array.isArray(JSON.parse(localStorage?.getItem('departments')))) {
      initialDepartments = JSON.parse(localStorage?.getItem('departments'));
    }
  }
  const [options, setOptions] = useState(initialDepartments);
  const [departmentState, setDepartmentState] = useState<string[]>([]);
  const [inputError, setInputError] = useState(false);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    // Add the user's input as the first option
    if (
      !initialDepartments.includes(newInputValue) &&
      newInputValue.trim() !== ''
    ) {
      setOptions([newInputValue, ...initialDepartments]);
    } else {
      setOptions(initialDepartments);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      const newValue = inputValue.trim();

      setDepartmentState([...new Set([...departmentState, newValue])]);
      setTimeout(() => {
        setInputValue('');
        setOptions(initialDepartments);
      }, 10);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={'xl'}>
      <AddDepartmentPop
        slotDepartmentsPills={departmentState.map((role, ind) => {
          return (
            <RolesPill
              key={ind}
              textRoles={role}
              onClickRemoveRoles={{
                onClick: () => {
                  setDepartmentState(
                    departmentState.filter((rol) => role != rol),
                  );
                },
              }}
            />
          );
        })}
        slotInput={
          <Autocomplete
            sx={{ mt: departmentState.length > 0 ? 'var(--space-2)' : '0px' }}
            fullWidth
            freeSolo
            id='free-solo-2-demo'
            options={options}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => {
              if (option === inputValue) {
                return (
                  <li
                    {...props}
                    style={{ background: '#d8dcde50', margin: '1px' }}
                  >
                    <Stack
                      direction={'row'}
                      width={'100%'}
                      onClick={() => {
                        setDepartmentState([
                          ...new Set([...departmentState, option]),
                        ]);
                        setTimeout(() => {
                          setInputValue('');
                          setOptions(initialDepartments);
                        }, 10);
                      }}
                      alignItems={'center'}
                      spacing={'var(--space-1)'}
                    >
                      <Typography variant='body1'>{option}</Typography>
                      <Typography variant='caption'>
                        - Add Department
                      </Typography>
                    </Stack>
                  </li>
                );
              }
              return (
                <li {...props}>
                  <Stack
                    width={'100%'}
                    onClick={() => {
                      if (!departmentState.includes(option)) {
                        setDepartmentState([
                          ...new Set([...departmentState, option]),
                        ]);
                        setTimeout(() => {
                          setInputValue('');
                        }, 50);
                        setOptions(initialDepartments);
                      }
                    }}
                  >
                    <Typography variant='body1'>{option}</Typography>
                  </Stack>
                </li>
              );
            }}
            renderInput={(params) => (
              <UITextField
                {...params}
                placeholder='Type or Choose from the list and press enter'
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
                onFocus={() => setInputError(false)}
                error={inputError}
                helperText='Make any changes then add the Department'
                onKeyDown={handleKeyDown}
              />
            )}
          />
        }
        slotClose={
          <IconButtonGhost
            iconName='close'
            size={2}
            color={'neutral'}
            onClickButton={{
              onClick: () => {
                setDepartmentState([]);
                setInputValue('');
                setOptions(initialDepartments);
                handleClose();
              },
            }}
          />
        }
        slotButton={
          <>
            <ButtonSoft
              textButton='Cancel'
              size={2}
              color={'neutral'}
              onClickButton={{
                onClick: () => {
                  setDepartmentState([]);
                  setInputValue('');
                  setOptions(initialDepartments);
                  handleClose();
                },
              }}
            />
            <ButtonSolid
              textButton='Add'
              size={2}
              onClickButton={{
                onClick: () => {
                  handleDepartmentsUpdate({
                    type: 'insert',
                    data: departmentState.map((item) => ({
                      recruiter_id: recruiter.id,
                      name: item,
                    })),
                  }).catch((err) => {
                    toast.error(
                      String(err).includes('unique_deps')
                        ? `Department is already exists.`
                        : String(err),
                    );
                  });
                  setTimeout(() => {
                    setDepartmentState([]);
                    setInputValue('');
                    setOptions(initialDepartments);
                  }, 10);
                  handleClose();
                },
              }}
            />
          </>
        }
      />
    </Dialog>
  );
};

export default AddDepartmentsDialog;
