/* eslint-disable security/detect-object-injection */
import {
  Autocomplete,
  Dialog,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { AddLocationPop } from '@/devlink/AddLocationPop';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { debouncedSave } from '../../utils';
import timeZone from '@/src/utils/timeZone';
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
  edit,
}) => {
  // const isClicked = useRef(false);
  // const { recruiter } = useAuthDetails();
  const { recruiter, setRecruiter } = useAuthDetails();
  const initialValue =
    edit > -1 ? recruiter.office_locations[edit] : (undefined as any);
  const initialFormFields = {
    addressLine1: {
      value: initialValue?.addressLine1 ?? '',
      error: false,
      validation: 'string',
      required: false,
    },
    addressLine2: {
      value: initialValue?.addressLine2 ?? '',
      error: false,
      validation: 'string',
      required: false,
    },
    city: {
      value: initialValue?.city ?? '',
      error: false,
      validation: 'string',
      required: true,
    },
    region: {
      value: initialValue?.region ?? '',
      error: false,
      validation: 'string',
      required: true,
    },
    country: {
      value: initialValue?.country ?? '',
      error: false,
      validation: 'string',
      required: true,
    },
    zipcode: {
      value: initialValue?.zipcode ?? '',
      error: false,
      validation: 'string',
      required: false,
    },
    is_headquarter: {
      value: initialValue?.is_headquarter ?? false,
      error: false,
      validation: 'boolean',
      required: false,
    },
    timezone: {
      value: initialValue?.timezone ?? '',
      error: false,
      validation: 'string',
      required: false,
    },
  };

  const [location, setLocation] = useState(initialFormFields);
  const [loading, setLoading] = useState(false);

  const handleAddLocation = () => {
    setLoading(true);

    const { error, newLocation } = handleValidate();
    if (!error) {
      setRecruiter((recruiter) => {
        const textLocationHeader = `${location.city.value},${location.region.value},${location.country.value}`;
        const fullAddress = `${location.addressLine1.value},${location.addressLine2.value},${location.zipcode.value}`;
        const newLocation = Object.assign(
          {
            full_address: fullAddress,
            location_header: textLocationHeader,
          },
          ...Object.entries(location).reduce((acc, [key, val]) => {
            acc.push({ [key]: val.value });
            return acc;
          }, []),
        );
        console.log(newLocation);
        const newRecruiter = {
          ...recruiter,
          office_locations:
            edit > -1
              ? (recruiter.office_locations.reduce((acc: any, curr, i) => {
                  if (i === edit) acc.push(newLocation);
                  else acc.push(curr);
                  return acc;
                }, []) as any)
              : ([...recruiter.office_locations, newLocation] as any),
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
          headerText={edit === -1 ? 'Add Location' : 'Edit location'}
          slotForm={
            <Stack spacing={2}>
              <CustomTextField
                placeholder='Address Line 1'
                label='Address Line 1'
                defaultValue={location.addressLine1.value}
                required={location.addressLine1.required}
                onChange={(e) => handleChange(e, 'addressLine1')}
                error={location.addressLine1.error}
                helperText={
                  location.addressLine1.error &&
                  'Please enter a valid address line'
                }
              />
              <CustomTextField
                placeholder='Address Line 2'
                label='Address Line 2'
                defaultValue={location.addressLine2.value}
                required={location.addressLine2.required}
                onChange={(e) => handleChange(e, 'addressLine2')}
                error={location.addressLine2.error}
                helperText={
                  location.addressLine2.error &&
                  'Please enter a valid address line'
                }
              />
              <Stack direction={'row'} spacing={'10px'}>
                <CustomTextField
                  sx={{ width: '225px' }}
                  // onFocus={() => {
                  //   setFormError({
                  //     ...formError,
                  //     interview_location: false,
                  //   });
                  // }}
                  name='city'
                  placeholder='Enter City'
                  error={!location.city.value}
                  helperText={
                    !location.city.value ? 'This field is required' : ''
                  }
                  label='City'
                  onChange={(e) => handleChange(e, 'city')}
                />
                <CustomTextField
                  sx={{ width: '225px' }}
                  // onFocus={() => {
                  //   setFormError({
                  //     ...formError,
                  //     interview_location: false,
                  //   });
                  // }}
                  name='region'
                  error={!location.region.value}
                  helperText={
                    !location.region.value ? 'This field is required' : ''
                  }
                  placeholder='Enter Region'
                  label='Region'
                  onChange={(e) => handleChange(e, 'region')}
                />
              </Stack>
              <Stack direction={'row'} spacing={'10px'}>
                <CustomTextField
                  // onFocus={() => {
                  //   setFormError({
                  //     ...formError,
                  //     interview_location: false,
                  //   });
                  // }}
                  sx={{ width: '225px' }}
                  required={true}
                  helperText={
                    !location.country.value ? 'This field is required' : ''
                  }
                  error={!location.country.value}
                  name='country'
                  placeholder='Enter Country'
                  label='Country'
                  onChange={(e) => handleChange(e, 'country')}
                />
                <CustomTextField
                  sx={{ width: '225px' }}
                  placeholder='Zip Code'
                  label='Zip Code'
                  defaultValue={location.zipcode.value}
                  onChange={(e) => handleChange(e, 'zipcode')}
                />
              </Stack>
              <Autocomplete
                fullWidth
                value={location.timezone.value || ''}
                onChange={(event: any, newValue: string) => {
                  setLocation({
                    ...location,
                    timezone: {
                      ...location.timezone,
                      value: newValue,
                    },
                  });
                }}
                options={timeZone.map((item) => {
                  //put type here
                  return `${item.label}`;
                })}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    // onFocus={() => {
                    //   setFormError({
                    //     ...formError,
                    //     interview_location: false,
                    //   });
                    // }}
                    defaultChecked={true}
                    name='timezone'
                    placeholder='Asia Calcutta (GMT +05:30)'
                    label='Automatically fetch timezone based on selected city.'
                    onChange={(e) => handleChange(e, 'timezone')}
                  />
                )}
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

const CustomTextField = (props: TextFieldProps) => {
  const label = props.label;
  return (
    <Stack>
      {Boolean(label) && (
        <Typography fontSize={'14px'} marginBottom={'3px'}>
          {label}
        </Typography>
      )}
      <TextField {...{ ...props, label: undefined }} />
    </Stack>
  );
};
