import { RecruiterType } from '@aglint/shared-types';
import { Autocomplete, Dialog, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { AddDepartmentPop } from '@/devlink/AddDepartmentPop';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { RolesPill } from '@/devlink/RolesPill';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

interface DepartmentsProps {
  handleClose: () => void;
  open: any;
  // eslint-disable-next-line no-unused-vars
  handleChange: (recruiter: RecruiterType) => void;
}

const AddDepartmentsDialog: React.FC<DepartmentsProps> = ({
  handleClose,
  open,
  handleChange,
}) => {
  const { recruiter } = useAuthDetails();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [departmentState, setDepartmentState] = useState<string[]>([]);
  const [inputError, setInputError] = useState(false);
  const iniDepartments = useRef([]);

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

  useEffect(() => {
    if (recruiter?.departments && open) {
      setDepartmentState(recruiter?.departments);
      setOptions(initialDepartments);
      iniDepartments.current = recruiter?.departments;
    }
  }, [recruiter?.departments, open]);

  let initialDepartments = [];
  if (localStorage?.getItem('departments')) {
    if (Array.isArray(JSON.parse(localStorage?.getItem('departments')))) {
      initialDepartments = JSON.parse(localStorage?.getItem('departments'));
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      const newValue = inputValue.trim();
      if (!departmentState.includes(newValue)) {
        setDepartmentState([...new Set([...departmentState, newValue])]);
      }
      setTimeout(() => {
        setInputValue('');
        setOptions(initialDepartments);
      }, 10);
    }
  };

  function compareChanges() {
    const set1 = new Set(departmentState);
    const set2 = new Set(iniDepartments.current);
    if (set1.size !== set2.size) {
      return false;
    }
    return [...set1].every((element) => set2.has(element));
  }

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
                  handleClose();
                },
              }}
            />
            <ButtonSolid
              textButton='Add'
              size={2}
              onClickButton={{
                onClick: () => {
                  if (!compareChanges()) {
                    handleChange({
                      ...recruiter,
                      departments: departmentState,
                    });
                    handleClose();
                  } else {
                    setInputError(true);
                  }
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
