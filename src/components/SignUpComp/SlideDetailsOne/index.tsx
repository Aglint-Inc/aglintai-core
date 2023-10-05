import { Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { WelcomeSlider4 } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { AddressType, SocialsType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';

import { stepObj } from '../SlideSignup/utils';

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
  const router = useRouter();
  const { recruiter, setRecruiter } = useAuthDetails();

  const { setStep } = useSignupDetails();
  const [details, setDetails] = useState<Details | null>(null);
  const [error, setError] = useState<Error>({
    website: {
      error: false,
      msg: '',
    },
  });

  useEffect(() => {
    setDetails({ website: recruiter.company_website });
  }, []);

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

  const submitHandler = async () => {
    if ((await formValidation()) && recruiter?.id) {
      await axios
        .post('/api/crawlwebsite', { url: formatURL(details.website) })
        .then(async (res) => {
          if (res.status === 200) {
            const { data, error } = await supabase
              .from('recruiter')
              .update({
                company_website: formatURL(details.website),
                socials: {
                  custom: [],
                  twitter: res.data.twitters[0] || '',
                  youtube: res.data.youtubes[0] || '',
                  facebook: res.data.facebooks[0] || '',
                  linkedin: res.data.linkedIns[0] || '',
                  instagram: res.data.instagrams[0] || '',
                },
              })
              .eq('id', recruiter.id)
              .select();
            if (!error) {
              setRecruiter({
                ...data[0],
                address: data[0].address as AddressType,
                socials: data[0].socials as SocialsType,
              });
              if (res.data.linkedIns[0]) {
                await axios
                  .post('/api/fetchcompany', {
                    url: res.data.linkedIns[0],
                  })
                  .then(async (res) => {
                    const company = res.data;
                    let phone = null;
                    if (company.phone) {
                      phone =
                        company.hq_country == 'US'
                          ? `+1${company.phone}`
                          : company.phone;
                    }
                    await supabase
                      .from('recruiter')
                      .update({
                        industry: company.industries[0] || '',
                        employee_size: company.employee_range,
                        logo: company.logo_url,
                        phone_number: phone, //NEED TO CHANGE THIS LOGIC. It works temporary
                        office_locations: company.locations || [],
                        company_values: company.specialties || '',
                        company_overview: company.description || '',
                        m_v_statement: company.tagline || '',
                      })
                      .eq('id', recruiter.id)
                      .select();
                    router.push(`?step=${stepObj.detailsTwo}`, undefined, {
                      shallow: true,
                    });
                    setStep(stepObj.detailsTwo);
                  });
              } else {
                router.push(`?step=${stepObj.detailsTwo}`, undefined, {
                  shallow: true,
                });
                setStep(stepObj.detailsTwo);
              }
            }
          }
        });
    }
  };

  function formatURL(userURL) {
    // Remove leading and trailing spaces
    userURL = userURL.trim();

    // Check if the URL starts with "http://" or "https://"
    if (!userURL.startsWith('http://') && !userURL.startsWith('https://')) {
      // If not, add "https://"
      userURL = 'https://' + userURL;
    }

    // Check if the URL contains "www."
    if (!userURL.includes('www.')) {
      // If not, add "www."
      userURL = userURL.replace('https://', 'https://www.');
    }

    return userURL;
  }

  return (
    <>
      <WelcomeSlider4
        isSaveCompanySiteDisable={!details?.website}
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
          </Stack>
        }
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
