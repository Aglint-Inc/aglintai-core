import { Autocomplete, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { BackButton, RcInfoForm, RecCompanyDetails } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { industries } from '@/src/utils/industries';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';

import AUIButton from '../../Common/AUIButton';
import ImageUpload from '../../Common/ImageUpload';
import UIPhoneInput from '../../Common/UIPhoneInput';
import UITextField from '../../Common/UITextField';
import { sizes } from '../../CompanyDetailComp/CompanyInfoComp';
import { supabaseWrap } from '../../JobsDashboard/JobPostCreateUpdate/utils';
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
  const { recruiter, userDetails } = useAuthDetails();
  const router = useRouter();
  const { setStep } = useSignupDetails();

  useEffect(() => {
    if (router.asPath == `${pageRoutes.SIGNUP}?step=${stepObj.detailsTwo}`) {
      if (!userDetails?.user) {
        router.push(pageRoutes.SIGNUP);
      }
      if (recruiter?.name && userDetails?.user) {
        router.push(pageRoutes.JOBS);
      }
    }
  }, []);
  return (
    <RecCompanyDetails
      // slotStatusText={
      //   router.query?.api_fetch &&
      //   (router.query?.api_fetch == 'true' ? (
      //     <Stack
      //       direction={'row'}
      //       justifyContent={'space-between'}
      //       spacing={'10px'}
      //     >
      //       <svg
      //         xmlns='http://www.w3.org/2000/svg'
      //         width='16'
      //         height='16'
      //         viewBox='0 0 16 16'
      //         fill='none'
      //       >
      //         <path
      //           fill-rule='evenodd'
      //           clip-rule='evenodd'
      //           d='M8 0C3.58667 0 0 3.58667 0 8C0 12.4133 3.58667 16 8 16C12.4133 16 16 12.4133 16 8C16 3.58667 12.4133 0 8 0ZM12.5865 6.58651L7.91984 11.2532C7.75984 11.4132 7.54651 11.4932 7.33318 11.4932C7.11984 11.4932 6.90651 11.4132 6.74651 11.2532L4.07984 8.58651C3.75984 8.26651 3.75984 7.73318 4.07984 7.41318C4.39984 7.09318 4.93318 7.09318 5.25318 7.41318L7.33318 9.49318L11.4132 5.41318C11.7332 5.09318 12.2665 5.09318 12.5865 5.41318C12.9198 5.73318 12.9198 6.26651 12.5865 6.58651Z'
      //           fill='#228F67'
      //         />
      //       </svg>
      //       <UITypography>
      //         Company details fetched successfully. Kindly confirm and continue.
      //       </UITypography>
      //     </Stack>
      //   ) : (
      //     <Stack
      //       direction={'row'}
      //       justifyContent={'space-between'}
      //       spacing={'10px'}
      //     >
      //       <svg
      //         xmlns='http://www.w3.org/2000/svg'
      //         width='16'
      //         height='16'
      //         viewBox='0 0 16 16'
      //         fill='none'
      //       >
      //         <path
      //           fill-rule='evenodd'
      //           clip-rule='evenodd'
      //           d='M7.33333 15.9997C3.28 15.9997 0 12.7197 0 8.66634C0 4.61301 3.28 1.33301 7.33333 1.33301C11.3867 1.33301 14.6667 4.61301 14.6667 8.66634C14.6667 12.7197 11.3867 15.9997 7.33333 15.9997ZM6.66667 12.6662C6.66667 13.0395 6.96 13.3328 7.33333 13.3328C7.70667 13.3328 8 13.0395 8 12.6662V8.66618C8 8.29285 7.70667 7.99951 7.33333 7.99951C6.96 7.99951 6.66667 8.29285 6.66667 8.66618V12.6662ZM7.33333 3.99951C6.6 3.99951 6 4.59951 6 5.33285C6 6.06618 6.6 6.66618 7.33333 6.66618C8.06667 6.66618 8.66667 6.06618 8.66667 5.33285C8.66667 4.59951 8.06667 3.99951 7.33333 3.99951Z'
      //           fill='#ED8F1C'
      //         />
      //       </svg>
      //       <UITypography>
      //         Unable to fetch company information. Kindly input the details
      //         manually.
      //       </UITypography>
      //     </Stack>
      //   ))
      // }
      slotMain={
        <>
          {recruiter?.company_website ? (
            <CompanyDetails />
          ) : userDetails?.user.user_metadata.role !== 'recruiter' ? (
            <Stack
              alignItems={'center'}
              direction={'row'}
              justifyContent={'center'}
            >
              <AUIButton
                variant='text'
                onClick={() => {
                  router.push(`?step=${stepObj.atsSystem}`, undefined, {
                    shallow: true,
                  });
                  setStep(stepObj.atsSystem);
                }}
              >
                Skip this step
              </AUIButton>
            </Stack>
          ) : null}
        </>
      }
    />
  );
}

export default SlideDetailsTwo;

export function CompanyDetails() {
  const router = useRouter();
  const { setStep } = useSignupDetails();
  const {
    recruiter,
    setRecruiter,
    recruiterUser,
    setRecruiterUser,
    userCountry,
    userDetails,
  } = useAuthDetails();
  const [logo, setLogo] = useState(recruiter.logo);
  const [phone, setPhone] = useState(null);
  const [phonePattern, setPhonePattern] = useState<string>('');
  const defaultCountry = recruiter?.phone_number ? null : userCountry;
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
        <Stack spacing={2}>
          <UITextField
            label='Company Name'
            labelSize='medium'
            fullWidth
            value={recruiter?.name}
            placeholder={'Ex. Google'}
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
                  <Typography variant='body2' color={'#000'}>
                    {option}
                  </Typography>
                </li>
              );
            }}
            renderInput={(params) => {
              return (
                <UITextField
                  rest={{ ...params }}
                  labelSize='medium'
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
                  <Typography variant='body2' color={'#000'}>
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
                labelSize='medium'
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
            <BackButton
              onclickProps={{
                onClick: () => {
                  router.back();
                },
              }}
            />
            <AUIButton disabled={false} onClick={submitHandler}>
              Continue
            </AUIButton>
          </Stack>
        </Stack>
      }
    />
  );
}
