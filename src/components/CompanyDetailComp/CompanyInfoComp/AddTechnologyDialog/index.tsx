import {
  Autocomplete,
  Dialog,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { AddTechStack, RolesPill } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RecruiterType } from '@/src/types/data.types';

interface StacksProps {
  handleClose: () => void;
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  handleChange: (recruiter: RecruiterType) => void;
}

const AddTechnologyDialog: React.FC<StacksProps> = ({
  handleClose,
  open,
  handleChange,
}) => {
  const { recruiter } = useAuthDetails();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [stacks, setStacks] = useState<string[]>([]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    // Add the user's input as the first option
    if (!initialStacks.includes(newInputValue) && newInputValue.trim() !== '') {
      setOptions([newInputValue, ...initialStacks]);
    } else {
      setOptions(initialStacks);
    }
  };

  useEffect(() => {
    if (recruiter?.technology_score && open)
      setStacks(recruiter?.technology_score);
  }, [recruiter?.technology_score, open]);

  let initialStacks = [];
  if (localStorage?.getItem('technologies')) {
    if (Array.isArray(JSON.parse(localStorage?.getItem('technologies')))) {
      initialStacks = JSON.parse(localStorage?.getItem('technologies'));
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      const newValue = inputValue.trim();
      if (!stacks.includes(newValue)) {
        setStacks([...stacks, newValue]);
      }
      setTimeout(() => {
        setInputValue('');
        setOptions(initialStacks);
      }, 10);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={'xl'}>
      <AddTechStack
        slotTechPills={stacks.map((role, ind) => {
          return (
            <RolesPill
              key={ind}
              textRoles={role}
              onClickRemoveRoles={{
                onClick: () => {
                  setStacks(stacks.filter((rol) => role != rol));
                },
              }}
            />
          );
        })}
        slotInput={
          <Autocomplete
            sx={{ mt: stacks.length > 0 ? '20px' : '0px' }}
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
                        if (!stacks.includes(option)) {
                          stacks.push(option);
                        }
                        setTimeout(() => {
                          setInputValue('');
                          setOptions(initialStacks);
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
                      if (!stacks.includes(option)) {
                        stacks.push(option);
                        setTimeout(() => {
                          setInputValue('');
                        }, 50);
                        setOptions(initialStacks);
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
                label='Type or Choose from the list and press enter'
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  disableUnderline: true,
                }}
                onKeyDown={handleKeyDown}
              />
            )}
          />
        }
        onClickCancel={{
          onClick: () => {
            handleClose();
          },
        }}
        onClickDone={{
          onClick: () => {
            handleChange({
              ...recruiter,
              technology_score: stacks,
            });
            handleClose();
          },
        }}
      />
    </Dialog>
  );
};

export default AddTechnologyDialog;
