'use client';

import { supabaseWrap } from '@aglint/shared-utils';
import { Autocomplete, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { RcInfoForm } from '@/devlink2/RcInfoForm';
import { RecCompanyDetails } from '@/devlink2/RecCompanyDetails';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { industries } from '@/src/utils/industries';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';

import ImageUpload from '../../Common/ImageUpload';
import UIPhoneInput from '../../Common/UIPhoneInput';
import UITextField from '../../Common/UITextField';
import { sizes } from '../../CompanyDetailComp/CompanyInfoComp';
import { stepObj } from '../SlideSignup/utils';
type phone = {
  countryCode: string;
  dialCode: string;
  format: string;
  name: string;
};

interface ErrorField {
  error: boolean;
  msg: string;
}

export interface Error1 {
  phone: ErrorField;
  logo: ErrorField;
  name: ErrorField;
}
function SlideDetailsTwo() {
  const router = useRouter();
  const { recruiter, userDetails } = useSignupDetails();

  useEffect(() => {
    if (router.asPath == `${ROUTES['/signup']()}?step=${stepObj.detailsTwo}`) {
      if (!userDetails?.user) {
        router.push(ROUTES['/signup']());
      }
      if (recruiter?.name && userDetails?.user) {
        router.push(ROUTES['/jobs']());
      }
    }
  }, []);

  return (
    <RecCompanyDetails
      slotMain={
        <>
          <CompanyDetails />
        </>
      }
    />
  );
}

export default SlideDetailsTwo;

export function CompanyDetails() {
  const router = useRouter();
  const {
    setStep,
    recruiter,
    recruiterUser,
    userDetails,
    setRecruiterUser,
    setRecruiter,
  } = useSignupDetails();

  const [logo, setLogo] = useState(recruiter.logo);
  const [phone, setPhone] = useState(null);
  const [phonePattern, setPhonePattern] = useState<string>('');
  const defaultCountry = recruiter?.phone_number ? null : 'US';
  const [error, setError] = useState<Error1>({
    phone: {
      error: false,
      msg: '',
    },
    logo: {
      error: false,
      msg: '',
    },
    name: {
      error: false,
      msg: '',
    },
  });

  useEffect(() => {
    if (userDetails?.user) setPhone(recruiter.phone_number);
  }, [userDetails]);

  const phoneValidation = (format) => {
    if (!phone?.trim() || countRept(phone, /\d/g) != countRept(format, /\./g)) {
      setError({
        ...error,
        phone: { error: true, msg: '' },
      });
    } else {
      setError({
        ...error,
        phone: { ...error.phone, error: false },
      });
    }
  };

  function countRept(string, regex) {
    var numbers = string?.match(regex);
    return numbers ? numbers.length : 0;
  }

  const formValidation = (value) => {
    let isValid = true;
    if (!value) {
      isValid = false;
      setError({
        ...error,
        name: {
          error: true,
          msg: 'Company name is required',
        },
      });
    } else {
      setError({
        ...error,
        name: {
          error: false,
          msg: '',
        },
      });
    }
    return isValid;
  };

  const submitHandler = async () => {
    if (recruiter?.id && formValidation(recruiter?.name)) {
      const { error: e1 } = await supabase
        .from('recruiter')
        .update({
          logo: logo,
          phone_number: phone,
          employee_size: recruiter.employee_size,
          name: recruiter.name,
          industry: recruiter.industry,
        })
        .eq('id', recruiter.id);
      cacheUserInfo(recruiterUser.email, recruiterUser.user_id);

      if (!e1) {
        router.push(`?step=${stepObj.atsSystem}`, undefined, {
          shallow: true,
        });
        setStep(stepObj.atsSystem);
      }
    }
  };

  const cacheUserInfo = async (email: string, rec_user_id: string) => {
    try {
      let [cand] = supabaseWrap(
        await supabase.from('aglint_candidates').select().eq('email', email),
      );

      let profile_img;
      let position;
      if (!cand) {
        const {
          data: { person },
        } = await axios.post('/api/candidatedb/get-email', {
          email: email,
        });
        supabaseWrap(
          await supabase.from('aglint_candidates').insert({
            city: person.city,
            country: person.country,
            departments: person.departments,
            email: person.email,
            email_status: person.email_status,
            employment_history: person.employment_history,
            extrapolated_email_confidence: person.extrapolated_email_confidence,
            facebook_url: person.facebook_url,
            first_name: person.first_name,
            functions: person.functions,
            intent_strength: person.intent_strength,
            github_url: person.github_url,
            headline: person.headline,
            id: person.id,
            is_likely_to_engage: person.is_likely_to_engage,
            last_name: person.last_name,
            linkedin_url: person.linkedin_url,
            name: person.name,
            organization: person.organization,
            organization_id: person.organization_id,
            phone_numbers: person.phone_numbers,
            photo_url: person.photo_url,
            revealed_for_current_team: person.revealed_for_current_team,
            seniority: person.seniority,
            show_intent: person.show_intent,
            state: person.state,
            subdepartments: person.subdepartments,
            title: person.title,
            twitter_url: person.twitter_url,
            search_query: {},
          }),
        );
        profile_img = person.photo_url;
        position = person.title;
      } else {
        profile_img = cand.photo_url;
        position = cand.title;
      }

      supabaseWrap(
        await supabase
          .from('recruiter_user')
          .update({
            profile_image: profile_img,
            position: position,
          })
          .eq('user_id', rec_user_id),
      );
      setRecruiterUser((prev) => ({
        ...prev,
        position: position,
        profile_image: profile_img,
      }));
    } catch (err) {
      //
    }
  };

  return (
    <RcInfoForm
      slotLogo={
        <ImageUpload
          image={logo}
          setImage={setLogo}
          size={80}
          dynamic
          table='company-logo'
        />
      }
      slotForm={
        <Stack spacing={1}>
          <UITextField
            label='Company Name'
            labelSize='small'
            fullWidth
            value={recruiter?.name}
            placeholder={'Ex. Acme Inc.'}
            error={error.name.error}
            helperText={error.name.error ? error.name.msg : ''}
            onChange={(e) => {
              formValidation(e.target.value);
              setRecruiter({ ...recruiter, name: e.target.value });
            }}
          />
          <Autocomplete
            disableClearable
            options={industries}
            value={recruiter?.industry}
            onChange={(event, value) => {
              if (value) {
                setRecruiter({
                  ...recruiter,
                  industry: value,
                });
              }
            }}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => {
              return (
                <li {...props}>
                  <Typography variant='body1' color={'var(--neutral-12)'}>
                    {option}
                  </Typography>
                </li>
              );
            }}
            renderInput={(params) => {
              return (
                <UITextField
                  rest={{ ...params }}
                  labelSize='small'
                  fullWidth
                  label='Industry Type'
                  placeholder='Ex. Healthcare'
                  InputProps={{
                    ...params.InputProps,
                  }}
                  onChange={(e) => {
                    setRecruiter({ ...recruiter, industry: e.target.value });
                  }}
                />
              );
            }}
          />
          <Autocomplete
            disableClearable
            freeSolo
            fullWidth
            options={sizes}
            onChange={(event, value) => {
              if (value) {
                setRecruiter({
                  ...recruiter,
                  employee_size: value,
                });
              }
            }}
            value={recruiter.employee_size}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => {
              return (
                <li {...props}>
                  <Typography variant='body1' color={'var(--neutral-12)'}>
                    {option}
                  </Typography>
                </li>
              );
            }}
            renderInput={(params) => (
              <UITextField
                rest={{ ...params }}
                fullWidth
                InputProps={{
                  ...params.InputProps,
                }}
                label='Employee Size'
                placeholder='Ex. 1000-2000'
                labelSize='small'
                onChange={(event) => {
                  setRecruiter({
                    ...recruiter,
                    employee_size: event.target.value,
                  });
                }}
              />
            )}
          />
          <UIPhoneInput
            defaultCountry={defaultCountry}
            label='Phone'
            onBlur={(value, country: phone) => {
              phoneValidation(country.format);
            }}
            placeholder='Enter your phone number'
            value={phone}
            labelSize='small'
            error={error.phone.error}
            onChange={(value, data: phone, event, formattedValue) => {
              setPhonePattern(data.format);
              setPhone(formattedValue);
            }}
            helperText={
              !phone
                ? 'Please enter your phone number.'
                : error.phone.error
                  ? `Invalid phone number. Please use the ${
                      phonePattern?.replaceAll('.', 'x') || 'correct'
                    } format.`
                  : ''
            }
          />
          <Stack
            mt={'50px !important'}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <ButtonGhost
              color={'neutral'}
              onClickButton={{
                onClick: () => {
                  router.back();
                },
              }}
              textButton='Back'
              size={2}
            />
            <Stack
              direction={'row'}
              alignItems={'center'}
              gap={'var(--space-2)'}
            >
              <ButtonGhost
                textButton='Skip'
                size={2}
                onClickButton={{
                  onClick: () => {
                    router.push(`?step=${stepObj.atsSystem}`, undefined, {
                      shallow: true,
                    });
                    setStep(stepObj.atsSystem);
                  },
                }}
              />
              <ButtonSolid
                size={2}
                textButton='Continue'
                onClickButton={{
                  onClick: submitHandler,
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      }
    />
  );
}
