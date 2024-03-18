import {
  Autocomplete,
  Dialog,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { AddRolesPop, RolesPill } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RecruiterType } from '@/src/types/data.types';

interface RolesProps {
  handleClose: () => void;
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  handleChange: (recruiter: RecruiterType) => void;
}

const AddRolesDialog: React.FC<RolesProps> = ({
  handleClose,
  open,
  handleChange
}) => {
  const { recruiter } = useAuthDetails();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [roles, setRoles] = useState<string[]>([]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    // Add the user's input as the first option
    if (!initialRoles.includes(newInputValue) && newInputValue.trim() !== '') {
      setOptions([newInputValue, ...initialRoles]);
    } else {
      setOptions(initialRoles);
    }
  };

  useEffect(() => {
    if (recruiter?.available_roles && open) {
      setRoles(recruiter?.available_roles);
      setOptions(initialRoles);
    }
  }, [recruiter?.available_roles, open]);

  let initialRoles = [];
  if (localStorage?.getItem('roles')) {
    if (Array.isArray(JSON.parse(localStorage?.getItem('roles')))) {
      initialRoles = JSON.parse(localStorage?.getItem('roles'));
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      const newValue = inputValue.trim();
      if (!roles.includes(newValue)) {
        setRoles([...new Set([...roles, newValue.toLocaleLowerCase()])]);
      }
      setTimeout(() => {
        setInputValue('');
        setOptions(initialRoles);
      }, 10);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={'xl'}>
      <AddRolesPop
        slotRolesPills={roles.map((role, ind) => {
          return (
            <RolesPill
              key={ind}
              textRoles={role}
              onClickRemoveRoles={{
                onClick: () => {
                  setRoles(roles.filter((rol) => role != rol));
                }
              }}
            />
          );
        })}
        slotInput={
          <Autocomplete
            sx={{ mt: roles.length > 0 ? '8px' : '0px' }}
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
                        setRoles([
                          ...new Set([...roles, option.toLocaleLowerCase()])
                        ]);
                        setTimeout(() => {
                          setInputValue('');
                          setOptions(initialRoles);
                        }, 10);
                      }}
                      alignItems={'center'}
                      spacing={'4px'}
                    >
                      <Typography variant='body1'>{option}</Typography>
                      <Typography variant='caption'>- Add Role</Typography>
                    </Stack>
                  </li>
                );
              }
              return (
                <li {...props}>
                  <Stack
                    width={'100%'}
                    onClick={() => {
                      if (!roles.includes(option)) {
                        setRoles([
                          ...new Set([...roles, option.toLocaleLowerCase()])
                        ]);
                        setTimeout(() => {
                          setInputValue('');
                        }, 50);
                        setOptions(initialRoles);
                      }
                    }}
                  >
                    <Typography variant='body1'>{option}</Typography>
                  </Stack>
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Type or Choose from the list and press enter'
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  disableUnderline: true
                }}
                onKeyDown={handleKeyDown}
              />
            )}
          />
        }
        onClickCancel={{
          onClick: () => {
            handleClose();
          }
        }}
        onClickDone={{
          onClick: () => {
            handleChange({
              ...recruiter,
              available_roles: roles
            });
            handleClose();
          }
        }}
      />
    </Dialog>
  );
};

export default AddRolesDialog;
