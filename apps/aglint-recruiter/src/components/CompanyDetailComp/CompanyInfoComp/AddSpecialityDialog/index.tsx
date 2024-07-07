import { RecruiterType } from '@aglint/shared-types';
import { Autocomplete, Dialog, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { AddTechStack } from '@/devlink/AddTechStack';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { RolesPill } from '@/devlink/RolesPill';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

interface StacksProps {
  handleClose: () => void;
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  handleChange: (recruiter: RecruiterType) => void;
}

const AddSpecialityDialog: React.FC<StacksProps> = ({
  handleClose,
  open,
  handleChange,
}) => {
  const { recruiter } = useAuthDetails();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [stacks, setStacks] = useState<string[]>([]);
  const iniSpeciality = useRef([]);
  const [inputError, setInputError] = useState(false);

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
    if (recruiter?.technology_score && open) {
      setStacks(recruiter?.technology_score);
      setOptions(initialStacks);
      iniSpeciality.current = recruiter?.technology_score;
    }
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
        setStacks([...new Set([...stacks, newValue])]);
      }
      setTimeout(() => {
        setInputValue('');
        setOptions(initialStacks);
      }, 10);
    }
  };

  function campareChanges() {
    const set1 = new Set(stacks);
    const set2 = new Set(iniSpeciality.current);

    if (set1.size !== set2.size) {
      return false;
    }

    return [...set1].every((element) => set2.has(element));
  }

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
            sx={{ mt: stacks.length > 0 ? 'var(--space-2)' : '0px' }}
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
                        setStacks([...new Set([...stacks, option])]);
                        setTimeout(() => {
                          setInputValue('');
                          setOptions(initialStacks);
                        }, 10);
                      }}
                      alignItems={'center'}
                      spacing={'var(--space-1)'}
                    >
                      <Typography variant='body1'>{option}</Typography>
                      <Typography variant='caption'>
                        - Add Speciality
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
                      if (!stacks.includes(option)) {
                        setStacks([...new Set([...stacks, option])]);
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
              <UITextField
                {...params}
                placeholder='Type or Choose from the list and press enter'
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
                onFocus={() => setInputError(false)}
                onKeyDown={handleKeyDown}
                error={inputError}
                helperText='Make any changes then add the Speciality'
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
                  if (!campareChanges()) {
                    handleChange({
                      ...recruiter,
                      technology_score: stacks,
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

export default AddSpecialityDialog;
