import { Autocomplete, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  BackButton,
  RcInfoForm,
  RcInfoStep1,
  RecCompanyDetails,
} from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { SocialsType } from '@/src/types/data.types';
import { industries } from '@/src/utils/industries';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';

import Loader from '../Loader/Index';
import { stepObj } from '../SlideSignup/utils';
import AUIButton from '../../Common/AUIButton';
import ImageUpload from '../../Common/ImageUpload';
import UIPhoneInput from '../../Common/UIPhoneInput';
import UITextField from '../../Common/UITextField';
import UITypography from '../../Common/UITypography';
import { sizes } from '../../CompanyDetailComp/CompanyInfoComp';

interface Details {
  website: string;
}

interface Error {
  website: ErrorField;
}

interface ErrorField {
  error: boolean;
  msg: string;
}

const SlideDetailsOne = () => {
  const { step, companyName, setCompanyName } = useSignupDetails();
  return (
    <>
      <RecCompanyDetails
        slotStatusText={
          step == stepObj.detailsTwo &&
          companyName !== null &&
          (companyName ? (
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              spacing={'10px'}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M8 0C3.58667 0 0 3.58667 0 8C0 12.4133 3.58667 16 8 16C12.4133 16 16 12.4133 16 8C16 3.58667 12.4133 0 8 0ZM12.5865 6.58651L7.91984 11.2532C7.75984 11.4132 7.54651 11.4932 7.33318 11.4932C7.11984 11.4932 6.90651 11.4132 6.74651 11.2532L4.07984 8.58651C3.75984 8.26651 3.75984 7.73318 4.07984 7.41318C4.39984 7.09318 4.93318 7.09318 5.25318 7.41318L7.33318 9.49318L11.4132 5.41318C11.7332 5.09318 12.2665 5.09318 12.5865 5.41318C12.9198 5.73318 12.9198 6.26651 12.5865 6.58651Z'
                  fill='#228F67'
                />
              </svg>
              <UITypography>
                Company details fetched successfully. Kindly confirm and
                continue.
              </UITypography>
            </Stack>
          ) : (
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              spacing={'10px'}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M7.33333 15.9997C3.28 15.9997 0 12.7197 0 8.66634C0 4.61301 3.28 1.33301 7.33333 1.33301C11.3867 1.33301 14.6667 4.61301 14.6667 8.66634C14.6667 12.7197 11.3867 15.9997 7.33333 15.9997ZM6.66667 12.6662C6.66667 13.0395 6.96 13.3328 7.33333 13.3328C7.70667 13.3328 8 13.0395 8 12.6662V8.66618C8 8.29285 7.70667 7.99951 7.33333 7.99951C6.96 7.99951 6.66667 8.29285 6.66667 8.66618V12.6662ZM7.33333 3.99951C6.6 3.99951 6 4.59951 6 5.33285C6 6.06618 6.6 6.66618 7.33333 6.66618C8.06667 6.66618 8.66667 6.06618 8.66667 5.33285C8.66667 4.59951 8.06667 3.99951 7.33333 3.99951Z'
                  fill='#ED8F1C'
                />
              </svg>
              <UITypography>
                Unable to fetch company information. Kindly input the details
                manually.
              </UITypography>
            </Stack>
          ))
        }
        slotMain={<FetchCompanyDetails setCompanyName={setCompanyName} />}
      />
    </>
  );
};

export default SlideDetailsOne;

export function validateURL(url) {
  // Check if the URL starts with 'http://' or 'https://'
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    // If not, prepend 'https://' to the URL
    url = 'https://' + url;
  }

  try {
    // Try creating a new URL object; this will throw an exception if the URL is invalid
    new URL(url);
    return true;
  } catch (error) {
    // The URL is invalid
    return false;
  }
}

export interface Error1 {
  phone: ErrorField;
  logo: ErrorField;
  name: ErrorField;
}

type phone = {
  countryCode: string;
  dialCode: string;
  format: string;
  name: string;
};

export function FetchCompanyDetails({ setCompanyName }) {
  const router = useRouter();

  const { recruiter, setRecruiter, userDetails } = useAuthDetails();
  const { step, setStep } = useSignupDetails();
  const [details, setDetails] = useState<Details | null>(null);

  const [error, setError] = useState<Error>({
    website: {
      error: false,
      msg: '',
    },
  });
  const [loading, setLoading] = useState(false);

  async function getRecruiter() {
    const { data: recruiterUser, error: errorUser } = await supabase
      .from('recruiter_user')
      .select('*')
      .eq('user_id', userDetails.user.id);
    if (!errorUser && recruiterUser.length > 0) {
      const { data: recruiter, error } = await supabase
        .from('recruiter')
        .select('*')
        .eq('id', recruiterUser[0].recruiter_id);
      if (!error && recruiter.length > 0) {
        setRecruiter({
          ...recruiter[0],
          socials: recruiter[0]?.socials as unknown as SocialsType,
        });
      }
    } else {
      router.push(pageRoutes.SIGNUP);
    }
  }
  useEffect(() => {
    if (userDetails.user.id) {
      getRecruiter();
    }
  }, [useAuthDetails]);

  useEffect(() => {
    if (recruiter?.id) setDetails({ website: recruiter?.company_website });
  }, [recruiter]);

  const formValidation = async (): Promise<boolean> => {
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
      await axios
        .post('/api/dns/lookup', {
          url: details?.website,
        })
        .then((res) => {
          if (res.status == 200 && res.data) {
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
        });
    }

    return isValid;
  };

  async function saveRecruiterDetails() {
    const url = details.website.replace(/^https?:\/\//i, '');
    setLoading(true);
    if ((await formValidation()) && recruiter?.id) {
      const { data: companyDetails } = await axios.post(
        `/api/fetchCompanyDetails`,
        {
          domain_name: url,
        },
      );
      setCompanyName(companyDetails.name);
      const { data, error } = await supabase
        .from('recruiter')
        .update({
          company_website: details.website || '',
          name: companyDetails.name || '',
          phone_number: companyDetails.phoneNumber || '',
          industry:
            capitalize(companyDetails.industryMain?.replaceAll('-', ' ')) || '',
          employee_size: companyDetails.totalEmployees || '',
          logo: companyDetails.logo || null,
          office_locations:
            [
              {
                city: companyDetails.city?.name || '',
                line1: companyDetails.city?.address || '',
                line2: '',
                region: companyDetails.state?.name || '',
                country: companyDetails.country?.name || '',
                zipcode: '',
                full_address:
                  companyDetails.city?.address +
                    ', ' +
                    companyDetails.state?.name +
                    ',' +
                    companyDetails.city?.name || '',
                is_headquarter: true,
              },
            ] || [],
          company_overview: companyDetails.description || '',
          // technology_score: companyDetails.technologies || [],
          socials: {
            custom: {},
            twitter: companyDetails.socialNetworks?.twitter || '',
            youtube: companyDetails.socialNetworks?.youtube || '',
            facebook: companyDetails.socialNetworks?.facebook || '',
            linkedin: companyDetails.socialNetworks?.linkedin || '',
            instagram: companyDetails.socialNetworks?.instagram || '',
          },
        })
        .eq('id', recruiter.id)
        .select();
      if (!error) {
        setRecruiter({
          ...data[0],
          socials: data[0].socials as SocialsType,
          phone_number: data[0].phone_number as any,
        });
        router.push(`?step=${stepObj.detailsTwo}`, undefined, {
          shallow: true,
        });
      }
      setLoading(false);
    }
    setLoading(false);
  }

  // const submitHandler = async () => {
  //   if ((await formValidation()) && recruiter?.id) {
  //     setLoading(true);
  //     await axios
  //       .post('/api/crawlwebsite', { url: formatURL(details.website) })
  //       .then(async (res) => {
  //         if (res.status === 200) {
  //           const { data, error } = await supabase
  //             .from('recruiter')
  //             .update({
  //               company_website: formatURL(details.website),
  //               socials: {
  //                 custom: {},
  //                 twitter: res.data.twitters[0] || '',
  //                 youtube: res.data.youtubes[0] || '',
  //                 facebook: res.data.facebooks[0] || '',
  //                 linkedin: res.data.linkedIns[0] || '',
  //                 instagram: res.data.instagrams[0] || '',
  //               },
  //             })
  //             .eq('id', recruiter.id)
  //             .select();
  //           if (!error) {
  //             setRecruiter({
  //               ...data[0],
  //               socials: data[0].socials as SocialsType,
  //             });
  //             if (res.data.linkedIns[0]) {
  //               await axios
  //                 .post('/api/fetchcompany', {
  //                   url: res.data.linkedIns[0],
  //                 })
  //                 .then(async (res) => {
  //                   const company = res.data;
  //                   const { data: newData } = await supabase
  //                     .from('recruiter')
  //                     .update({
  //                       name: company.company_name || '',
  //                       industry: company.industries[0] || '',
  //                       employee_size: company.employee_range,
  //                       logo: company.logo_url,
  //                       office_locations: company.locations || [],
  //                       company_overview: company.description || '',
  //                       technology_score: extractKeywords(company.specialties),
  //                     })
  //                     .eq('id', recruiter.id)
  //                     .select();
  //                   setRecruiter({
  //                     ...newData[0],
  //                     socials: newData[0].socials as SocialsType,
  //                   });
  //                   setLoading(false);
  //                 });
  //             } else {
  //               setLoading(false);
  //             }
  //           }
  //         } else {
  //           setLoading(false);
  //         }
  //       });
  //   }
  // };

  // function extractKeywords(inputString) {
  //   if (inputString) {
  //     // Split the input string into an array of keywords using a comma as the delimiter
  //     const keywordsArray = inputString
  //       .split(',')
  //       .map((keyword) => keyword.trim());

  //     return keywordsArray;
  //   } else {
  //     return [];
  //   }
  // }

  // function formatURL(userURL) {
  //   // Remove leading and trailing spaces
  //   userURL = userURL.trim();

  //   // Check if the URL starts with "http://" or "https://"
  //   if (!userURL.startsWith('http://') && !userURL.startsWith('https://')) {
  //     // If not, add "https://"
  //     userURL = 'https://' + userURL;
  //   }

  //   // Check if the URL contains "www."
  //   if (!userURL.includes('www.')) {
  //     // If not, add "www."
  //     userURL = userURL.replace('https://', 'https://www.');
  //   }

  //   return userURL;
  // }
  if (loading)
    return (
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Loader />
        <UITypography color='grey.600'>
          Hold on, Fetching company info from the website.
        </UITypography>
      </Stack>
    );
  else
    return (
      <>
        {step === stepObj.detailsOne && (
          <RcInfoStep1
            slotInput={
              <>
                <Stack width={'100%'} spacing={'10px'}>
                  <TextField
                    margin='none'
                    required
                    fullWidth
                    id='name'
                    label='Company Website'
                    placeholder='companydomain.com'
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
                  <Stack direction={'row'} justifyContent={'end'}>
                    <AUIButton
                      disabled={loading}
                      onClick={saveRecruiterDetails}
                      variant='primary'
                    >
                      Continue
                    </AUIButton>
                  </Stack>
                </Stack>
              </>
            }
          />
        )}
        {step === stepObj.detailsTwo && (
          <>
            {recruiter?.company_website ? (
              <CompanyDetails />
            ) : userDetails.user.user_metadata.role !== 'recruiter' ? (
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
        )}
      </>
    );
}

export function CompanyDetails() {
  const router = useRouter();
  const { setStep } = useSignupDetails();
  const { recruiter, setRecruiter } = useAuthDetails();
  const [logo, setLogo] = useState(recruiter.logo);
  const [phone, setPhone] = useState(null);
  const [phonePattern, setPhonePattern] = useState<string>('');
  const [defaultCountry, setDefaultCountry] = useState('us'); // State to store the default country
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
    if (!recruiter.phone_number) {
      fetchUserLocation(); // Call the function to fetch user's location when the component mounts
    }
    // setLogo(recruiter.logo);
    setPhone(recruiter.phone_number);
  }, [recruiter]);

  // Function to fetch the user's location information based on IP address
  const fetchUserLocation = async () => {
    try {
      const response = await fetch('https://ipinfo.io/json', {
        headers: {
          Authorization: `Bearer e82b96e5cb0802`,
        },
      });
      const data = await response.json();

      const country = data.country; // Extract the country code from the response
      setDefaultCountry(country?.toLowerCase() || 'us'); // Set the default country based on the user's location
    } catch (error) {
      // Handle any errors that occur during the API call
    }
  };

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
      const { error: e2 } = await supabase
        .from('recruiter_user')
        .update({ phone: phone })
        .eq('recruiter_id', recruiter.id);
      if (!(e1 && e2)) {
        router.push(`?step=${stepObj.atsSystem}`, undefined, {
          shallow: true,
        });
        setStep(stepObj.atsSystem);
      }
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
