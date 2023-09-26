import { Autocomplete, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { WelcomeSlider4 } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { industries } from '@/src/utils/industries';
import { supabase } from '@/src/utils/supabaseClient';

import { stepObj } from '../SlideSignup/utils';
interface Details {
  website: string;
  industry: string;
}

interface Error {
  website: ErrorField;
  industry: ErrorField;
}

interface ErrorField {
  error: boolean;
  msg: string;
}

const SlideDetailsOne = () => {
  const router = useRouter();
  const { recruiter } = useAuthDetails();

  const { setStep } = useSignupDetails();
  const [details, setDetails] = useState<Details | null>(null);
  const [error, setError] = useState<Error>({
    website: {
      error: false,
      msg: '',
    },
    industry: {
      error: false,
      msg: '',
    },
  });

  const formValidation = (): boolean => {
    let isValid = true;
    if (!details?.website) {
      isValid = false;
      error.website = {
        error: true,
        msg: 'Website is required field',
      };
      setError({
        ...error,
      });
    } else {
      if (validateURL(details?.website)) {
        error.website = {
          error: false,
          msg: '',
        };
        setError({
          ...error,
        });
      } else {
        isValid = false;
        error.website = {
          error: true,
          msg: 'Website is not valid url',
        };
        setError({
          ...error,
        });
      }
    }

    if (!details?.industry) {
      isValid = false;
      error.industry = {
        error: true,
        msg: 'Industry is required field',
      };
      setError({
        ...error,
      });
    } else {
      error.industry = {
        error: false,
        msg: '',
      };
      setError({
        ...error,
      });
    }
    return isValid;
  };

  const submitHandler = async () => {
    if (formValidation() && recruiter?.id) {
      const { error } = await supabase
        .from('recruiter')
        .update({
          company_website: details.website,
          industry: details.industry,
        })
        .eq('id', recruiter.id)
        .select();
      if (!error) {
        router.push(`?step=${stepObj.detailsTwo}`, undefined, {
          shallow: true,
        });
        setStep(stepObj.detailsTwo);
      }
    }
  };

  return (
    <>
      <WelcomeSlider4
        isSaveCompanySiteDisable={!details?.website || !details?.industry}
        userName={recruiter?.name}
        onClickSaveCompanySites={{
          onClick: () => {
            submitHandler();
          },
        }}
        slotProfileForm1={
          <Stack spacing={'20px'} p={'4px'}>
            <TextField
              margin='none'
              required
              fullWidth
              id='name'
              label='Company Website'
              placeholder='https://companydomain.com'
              value={details?.website}
              onChange={(e) => {
                setDetails({ ...details, website: e.target.value });
              }}
              error={error.website.error}
              helperText={error.website.error ? error.website.msg : ''}
              inputProps={{
                autoCapitalize: 'true',
                style: {
                  fontSize: '14px',
                },
              }}
            />
            <Autocomplete
              disableClearable
              fullWidth
              options={industries}
              onChange={(event, value) => {
                if (value) {
                  setDetails({ ...details, industry: value });
                }
              }}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  type='text'
                  fullWidth
                  required
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                  }}
                  label='Choose industry'
                  error={error.industry.error}
                  helperText={error.industry.error ? error.industry.msg : ''}
                />
              )}
            />
          </Stack>
        }
      />
    </>
  );
};

export default SlideDetailsOne;

export function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
