/* eslint-disable security/detect-object-injection */
import { Dialog, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';

import { AddLocationPop } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { debouncedSave } from '../../utils';

interface LocationProps {
  handleClose: () => void;
  open: boolean;
  edit: number;
  // eslint-disable-next-line no-unused-vars
  // handleChange: (recruiter: RecruiterType) => void;
}

const AddLocationDialog: React.FC<LocationProps> = ({
  handleClose,
  open,
  edit
}) => {
  // const isClicked = useRef(false);
  // const { recruiter } = useAuthDetails();
  const { recruiter, setRecruiter } = useAuthDetails();
  const initialValue =
    edit > -1 ? recruiter.office_locations[edit] : (undefined as any);
  const initialFormFields = {
    line1: {
      value: initialValue?.line1 ?? '',
      error: false,
      validation: 'string',
      required: false
    },
    line2: {
      value: initialValue?.line2 ?? '',
      error: false,
      validation: 'string',
      required: false
    },
    city: {
      value: initialValue?.city ?? '',
      error: false,
      validation: 'string',
      required: true
    },
    region: {
      value: initialValue?.region ?? '',
      error: false,
      validation: 'string',
      required: true
    },
    country: {
      value: initialValue?.country ?? '',
      error: false,
      validation: 'string',
      required: true
    },
    zipcode: {
      value: initialValue?.zipcode ?? '',
      error: false,
      validation: 'string',
      required: false
    },
    is_headquarter: {
      value: initialValue?.is_headquarter ?? false,
      error: false,
      validation: 'boolean',
      required: true
    }
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
          }, [])
        );
        const newRecruiter = {
          ...recruiter,
          office_locations:
            edit > -1
              ? (recruiter.office_locations.reduce((acc: any, curr, i) => {
                  if (i === edit) acc.push(newLocation);
                  else acc.push(curr);
                  return acc;
                }, []) as any)
              : ([...recruiter.office_locations, newLocation] as any)
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
              if (curr.required && value.trim().length === 0) {
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
            [key]: { ...acc.newLocation[key], value, error }
          },
          error: error && !acc.error ? true : acc.error
        };
      },
      { newLocation: location, error: false }
    );
  };

  const handleChange = (e, key: string) => {
    setLocation((prev) => {
      return {
        ...prev,
        [key]: {
          ...prev[key],
          value: e.target.value,
          error: false
        }
      };
    });
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <Stack style={{ pointerEvents: loading ? 'none' : 'auto' }}>
        <AddLocationPop
          headerText={edit === -1 ? 'Add Location' : 'Edit location'}
          slotForm={
            <Stack spacing={2}>
              <TextField
                placeholder='Line 1'
                defaultValue={location.line1.value}
                required={location.line1.required}
                onChange={(e) => handleChange(e, 'line1')}
                error={location.line1.error}
                helperText={
                  location.line1.error && 'Please enter a valid address line'
                }
              />
              <TextField
                placeholder='Line 2'
                defaultValue={location.line2.value}
                required={location.line2.required}
                onChange={(e) => handleChange(e, 'line2')}
                error={location.line2.error}
                helperText={
                  location.line2.error && 'Please enter a valid address line'
                }
              />
              <TextField
                placeholder='City'
                defaultValue={location.city.value}
                required={location.city.required}
                onChange={(e) => handleChange(e, 'city')}
                error={location.city.error}
                helperText={location.city.error && 'Please enter a valid city'}
              />
              <TextField
                placeholder='Region'
                defaultValue={location.region.value}
                required={location.region.required}
                onChange={(e) => handleChange(e, 'region')}
                error={location.region.error}
                helperText={
                  location.region.error && 'Please enter a valid region'
                }
              />
              <TextField
                placeholder='Country'
                defaultValue={location.country.value}
                required={location.country.required}
                onChange={(e) => handleChange(e, 'country')}
                error={location.country.error}
                helperText={
                  location.country.error && 'Please enter a valid country'
                }
              />
              <TextField
                placeholder='Zip Code'
                defaultValue={location.zipcode.value}
                onChange={(e) => handleChange(e, 'zipcode')}
              />
            </Stack>
          }
          onClickCancel={{
            onClick: () => {
              handleClose();
            }
          }}
          onClickAdd={{
            onClick: () => {
              handleAddLocation();
            }
          }}
          isChecked={location.is_headquarter.value}
          onClickCheck={{
            onClick: () => {
              setLocation((prev) => {
                return {
                  ...prev,
                  is_headquarter: {
                    ...prev.is_headquarter,
                    value: !prev.is_headquarter.value
                  }
                };
              });
            }
          }}
        />
      </Stack>
    </Dialog>
  );
};

export default AddLocationDialog;
