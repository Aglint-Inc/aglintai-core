/* eslint-disable security/detect-object-injection */
import { Dialog, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';

import { AddLocationPop } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { debouncedSave } from '../../utils';

interface LocationProps {
  handleClose: () => void;
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  // handleChange: (recruiter: RecruiterType) => void;
}

const AddLocationDialog: React.FC<LocationProps> = ({
  handleClose,
  open,
  // handleChange,
}) => {
  // const isClicked = useRef(false);
  // const { recruiter } = useAuthDetails();
  const { setRecruiter } = useAuthDetails();

  const initialFormFields = {
    line1: { value: '', error: false, validation: 'string' },
    line2: { value: '', error: false, validation: 'string' },
    city: { value: '', error: false, validation: 'string' },
    region: { value: '', error: false, validation: 'string' },
    country: { value: '', error: false, validation: 'string' },
    zipcode: { value: '', error: false, validation: 'string' },
    is_headquarter: { value: false, error: false, validation: 'boolean' },
  };

  const [location, setLocation] = useState(initialFormFields);
  const [loading, setLoading] = useState(false);

  const handleAddLocation = () => {
    setLoading(true);
    const { error, newLocation } = handleValidate();
    if (!error) {
      setRecruiter((recruiter) => {
        const fullAddress = `${location.line1.value},${location.line2.value},${location.city.value},${location.region.value},${location.country.value},${location.zipcode.value}`;
        const newLocation = Object.assign(
          { full_address: fullAddress },
          ...Object.entries(location).reduce((acc, [key, val]) => {
            acc.push({ [key]: val.value });
            return acc;
          }, []),
        );
        const newRecruiter = {
          ...recruiter,
          office_locations: [...recruiter.office_locations, newLocation] as any,
        };
        debouncedSave(newRecruiter, newRecruiter.id);
        setLocation(initialFormFields);
        handleClose();
        return newRecruiter;
      });
    } else setLocation(newLocation);
    setLoading(false);
  };

  const handleValidate = () => {
    return Object.entries(location).reduce(
      (acc, [key, curr]) => {
        let value = curr.value as any;
        let error = false;
        switch (curr.validation) {
          case 'string':
            {
              if (value.trim().length === 0) {
                error = true;
              } else {
                value = value.trim();
              }
            }
            break;
          case 'boolean': {
            if (typeof value !== 'boolean') {
              error = true;
            }
          }
        }
        return {
          newLocation: {
            ...acc.newLocation,
            [key]: { ...acc.newLocation[key], value, error },
          },
          error: error && !acc.error ? true : acc.error,
        };
      },
      { newLocation: location, error: false },
    );
  };

  const handleChange = (e, key: string) => {
    setLocation((prev) => {
      return {
        ...prev,
        [key]: {
          ...prev[key],
          value: e.target.value,
          error: false,
        },
      };
    });
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <Stack style={{ pointerEvents: loading ? 'none' : 'auto' }}>
        <AddLocationPop
          slotForm={
            <Stack>
              <TextField
                label='Line 1'
                onChange={(e) => handleChange(e, 'line1')}
                error={location.line1.error}
                helperText={
                  location.line1.error && 'Please enter a valid address line'
                }
              />
              <TextField
                label='Line 2'
                onChange={(e) => handleChange(e, 'line2')}
                error={location.line2.error}
                helperText={
                  location.line2.error && 'Please enter a valid address line'
                }
              />
              <TextField
                label='City'
                onChange={(e) => handleChange(e, 'city')}
                error={location.city.error}
                helperText={location.city.error && 'Please enter a valid city'}
              />
              <TextField
                label='Region'
                onChange={(e) => handleChange(e, 'region')}
                error={location.region.error}
                helperText={
                  location.region.error && 'Please enter a valid region'
                }
              />
              <TextField
                label='Country'
                onChange={(e) => handleChange(e, 'country')}
                error={location.country.error}
                helperText={
                  location.country.error && 'Please enter a valid country'
                }
              />
              <TextField
                label='Zip code'
                onChange={(e) => handleChange(e, 'zipcode')}
                error={location.zipcode.error}
                helperText={
                  location.zipcode.error && 'Please enter a valid zipcode'
                }
              />
            </Stack>
          }
          onClickCancel={{
            onClick: () => {
              handleClose();
            },
          }}
          onClickAdd={{
            onClick: () => {
              handleAddLocation();
            },
          }}
          isChecked={location.is_headquarter.value}
          onClickCheck={{
            onClick: () => {
              setLocation((prev) => {
                return {
                  ...prev,
                  is_headquarter: {
                    ...prev.is_headquarter,
                    value: !prev.is_headquarter.value,
                  },
                };
              });
            },
          }}
        />
      </Stack>
    </Dialog>
  );
};

export default AddLocationDialog;
