import { Stack, TextField } from '@mui/material';
import axios from 'axios';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { RcInfoStep1, RecCompanyDetails } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { SocialsType } from '@/src/types/data.types';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';

import Loader from '../Loader/Index';
import { stepObj } from '../SlideSignup/utils';
import AUIButton from '../../Common/AUIButton';
import UITypography from '../../Common/UITypography';

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
  return (
    <>
      <RecCompanyDetails slotMain={<FetchCompanyDetails />} />
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

export function FetchCompanyDetails() {
  const router = useRouter();

  const { recruiter, setRecruiter, userDetails } = useAuthDetails();
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
    if (userDetails?.user) {
      getRecruiter();
    } else {
      router.push(pageRoutes.SIGNUP);
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
    if ((await formValidation()) && recruiter?.id) {
      const url = details.website.replace(/^https?:\/\//i, '');
      setLoading(true);
      const { data: companyDetails } = await axios.post(
        `/api/fetchCompanyDetails`,
        {
          domain_name: url,
        },
      );
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
        if (companyDetails?.name) {
          router.push(`?step=${stepObj.detailsTwo}&api_fetch=true`, undefined, {
            shallow: true,
          });
        } else {
          router.push(
            `?step=${stepObj.detailsTwo}&api_fetch=false`,
            undefined,
            {
              shallow: true,
            },
          );
        }
      }
      setLoading(false);
    }
    setLoading(false);
  }

  if (loading) {
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
  } else
    return (
      <RcInfoStep1
        slotInput={
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
        }
      />
    );
}
