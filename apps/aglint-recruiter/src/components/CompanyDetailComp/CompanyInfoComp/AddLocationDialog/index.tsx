/* eslint-disable security/detect-object-injection */
import {
  Autocomplete,
  Dialog,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { AddLocationPop } from '@/devlink/AddLocationPop';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import timeZone from '@/src/utils/timeZone';
import toast from '@/src/utils/toast';

import { debouncedSave } from '../../utils';

interface LocationProps {
  handleClose: () => void;
  open: boolean;
  edit: number;
}

interface Address {
  region: string;
  country: string;
}

interface Geolocation {
  add: Address;
  timeZoneId: string;
}

const AddLocationDialog: React.FC<LocationProps> = ({
  handleClose,
  open,
  edit,
}) => {
  const { recruiter, setRecruiter } = useAuthDetails();
  const address1Ref = useRef<HTMLInputElement>(null);
  const address2Ref = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const timezoneRef = useRef<HTMLInputElement>(null);

  const [timeValue, setTimeZoneValue] = useState(null);
  const [isRequired, setIsRequired] = useState(false);

  type initialValueType = {
    line1: string;
    line2: string;
    city: string;
    region: string;
    country: string;
    zipcode: string;
    is_headquarter: boolean;
    timezone: string;
    full_address?: string;
    location_header?: string;
  };

  const initialValue = (
    edit > -1 ? recruiter.office_locations[edit] : (undefined as any)
  ) as initialValueType;

  useEffect(() => {
    if (initialValue?.city && initialValue?.region && initialValue?.country) {
      setIsRequired(true);
    } else {
      setIsRequired(false);
    }
  }, []);
  const [isHeadQ, setHeadQ] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddLocation = () => {
    setLoading(true);

    const { error } = handleValidate();
    if (!error) {
      setRecruiter((recruiter) => {
        const textLocationHeader = `${cityRef.current.value},${regionRef.current.value},${countryRef.current.value}`;
        const fullAddress = `${address1Ref.current.value},${address2Ref.current.value},${zipRef.current.value}`;
        const newLocation = {
          full_address: fullAddress,
          location_header: textLocationHeader,
          city: cityRef.current.value,
          country: countryRef.current.value,
          is_headquarter: isHeadQ,
          line1: address1Ref.current.value,
          line2: address2Ref.current.value,
          region: regionRef.current.value,
          timezone: timeValue,
          zipcode: zipRef.current.value,
        } as initialValueType;
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
        handleClose();
        return newRecruiter;
      });
    }
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

  const handleChange = (value: string, key: string) => {
    if (key === 'city') {
      if (value.length > 3) {
        geoCodeLocation(value).then((data) => {
          if (data) {
            const responseData = data as any as Geolocation;
            regionRef.current.value = responseData.add.region;
            countryRef.current.value = responseData.add.country;
            if (responseData?.timeZoneId) {
              setTimeZoneValue(
                timeZone.find((ele) => ele.tzCode === responseData?.timeZoneId)
                  .label,
              );
            }
            if (
              cityRef.current.value &&
              regionRef.current.value &&
              countryRef.current.value
            ) {
              setIsRequired(true);
            } else {
              setIsRequired(false);
            }
          }
        });
      }
    }
  };
  const geoCodeLocation = async (address: string) => {
    if (address.length > 3) {
      const apiKey = 'AIzaSyDO-310g2JDNPmN3miVdhXl2gJtsBRYUrI';
      let locationData = null;
      try {
        locationData = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`,
        );
      } catch (error) {
        toast.message('Please give proper location');
      }
      const result = (locationData as any)?.data?.results[0];

      const add = {
        region: result?.address_components[3]?.long_name ?? '',
        country: result?.address_components[4]?.long_name ?? '',
      };
      const geo = {
        lat: result?.geometry.location.lat ?? '',
        lang: result?.geometry.location.lng ?? '',
      };
      let timezone = null;
      try {
        timezone = await axios.get(
          `https://maps.googleapis.com/maps/api/timezone/json?location=${geo.lat},${geo.lang}&timestamp=1331161200&key=${apiKey}`,
        );
      } catch (error) {
        toast.message('Failed to fetch timezone');
      }

      const timeZoneId = timezone && timezone?.data.timeZoneId;
      return { add, timeZoneId };
    }
  };

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
  ) => {
    if (key === 'city') {
      debouncedSearch(e.target.value);
    }
    if (
      cityRef.current.value &&
      regionRef.current.value &&
      countryRef.current.value
    ) {
      setIsRequired(true);
    } else {
      setIsRequired(false);
    }
  };
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      handleChange(text, 'city');
    }, 500),
    [],
  );
  function debounce(func: Function, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }
  useEffect(() => {
    if (recruiter) {
      setHeadQ(initialValue?.is_headquarter);
      setTimeZoneValue(initialValue?.timezone);
    }
  }, [recruiter]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <Stack style={{ pointerEvents: loading ? 'none' : 'auto' }}>
        <AddLocationPop
          isLocationDescVisible={!isRequired}
          isAddDisable={!isRequired}
          textLocationDesc='City, Region and Country are required fields'
          headerText={edit === -1 ? 'Add Location' : 'Edit location'}
          slotForm={
            <Stack spacing={2}>
              <CustomTextField
                inputRef={address1Ref}
                placeholder='123 Example St'
                label='Street Address'
                defaultValue={initialValue?.line1}
              />
              <CustomTextField
                inputRef={address2Ref}
                placeholder='Suite 456 (Optional)'
                label='Address Line 2'
                defaultValue={initialValue?.line2}
              />
              <Stack direction={'row'} spacing={'10px'}>
                <CustomTextField
                  sx={{ width: '225px' }}
                  inputRef={cityRef}
                  name='city'
                  placeholder='San Francisco'
                  label='City *'
                  onChange={(e) => handleSearch(e, 'city')}
                  defaultValue={initialValue?.city}
                />
                <CustomTextField
                  sx={{ width: '225px' }}
                  inputRef={regionRef}
                  name='region'
                  placeholder='CA'
                  label='State/Province/Region *'
                  onChange={(e) => handleSearch(e, 'region')}
                  defaultValue={initialValue?.region}
                />
              </Stack>
              <Stack direction={'row'} spacing={'10px'}>
                <CustomTextField
                  sx={{ width: '225px' }}
                  inputRef={countryRef}
                  required={true}
                  name='country'
                  onChange={(e) => handleSearch(e, 'country')}
                  // defaultValue={address1Ref.current?.value || ''}
                  placeholder='Please enter country name'
                  label='Country *'
                  defaultValue={initialValue?.country}
                />
                <CustomTextField
                  sx={{ width: '225px' }}
                  inputRef={zipRef}
                  placeholder='Please enter the zip code or postal code'
                  label='Zip Code'
                  defaultValue={initialValue?.zipcode}
                />
              </Stack>
              <Autocomplete
                fullWidth
                value={timeValue}
                options={timeZone.map((item) => {
                  //put type heres
                  return `${item.label}`;
                })}
                onChange={(_, value) => {
                  setTimeZoneValue(value);
                }}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    inputRef={timezoneRef}
                    name='timezone'
                    placeholder='e.g., America/New_York'
                    label='Timezone'
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
          isChecked={isHeadQ}
          onClickCheck={{
            onClick: () => {
              setHeadQ(!isHeadQ);
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

// if (
//   cityRef.current.value &&
//   regionRef.current.value &&
//   countryRef.current.value
// ) {
//   setIsRequired(true);
// }
