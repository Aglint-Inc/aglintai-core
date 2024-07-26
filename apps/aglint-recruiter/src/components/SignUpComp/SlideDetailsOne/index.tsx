'use client';

import { SocialsType } from '@aglint/shared-types';
import { Stack, TextField } from '@mui/material';
import axios from 'axios';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { RcInfoStep1 } from '@/devlink2/RcInfoStep1';
import { RecCompanyDetails } from '@/devlink2/RecCompanyDetails';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { addHttps } from '@/src/utils/fetchCompDetails';
import { supabase } from '@/src/utils/supabase/client';

import { sizes } from '../../CompanyDetailComp/CompanyInfoComp';
import { stepObj } from '../SlideSignup/utils';

interface Details {
  website: string;
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

  const { recruiter, setRecruiter } = useSignupDetails();
  const [details, setDetails] = useState<Details | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (recruiter?.id) {
      setDetails({
        website:
          recruiter?.company_website ||
          extractDomainAndAddCom(recruiter.email || ''),
      });
    }
  }, [recruiter]);

  async function saveRecruiterDetails() {
    try {
      setLoading(true);
      if (recruiter?.id) {
        const url = details.website.replace(/^https?:\/\//i, '');
        let companyDetails = (await fetchCompanyDetail(url)) as null | any;
        const company_size =
          companyDetails?.estimated_num_employees > 1 &&
          companyDetails?.estimated_num_employees < 5
            ? sizes[0]
            : companyDetails?.estimated_num_employees > 5 &&
                companyDetails?.estimated_num_employees < 50
              ? sizes[1]
              : companyDetails?.estimated_num_employees > 50 &&
                  companyDetails?.estimated_num_employees < 100
                ? sizes[2]
                : companyDetails?.estimated_num_employees > 100 &&
                    companyDetails?.estimated_num_employees < 1000
                  ? sizes[3]
                  : companyDetails?.estimated_num_employees > 1000 &&
                      companyDetails?.estimated_num_employees < 5000
                    ? sizes[4]
                    : companyDetails?.estimated_num_employees > 5000
                      ? sizes[5]
                      : '';
        const { data, error } = await supabase
          .from('recruiter')
          .update({
            company_website: addHttps(
              companyDetails?.website_url || details?.website || '',
            ),
            name: companyDetails?.name || '',
            phone_number: companyDetails?.primary_phone?.number || '',
            industry:
              capitalize(companyDetails?.industry?.replaceAll('-', ' ')) || '',
            employee_size: company_size || '',
            logo: companyDetails?.logo_url || null,
            company_overview: companyDetails?.short_description || '',
            socials: {
              custom: {
                crunchbase: companyDetails?.crunchbase_url || '',
                angellist: companyDetails?.angellist_url || '',
              },
              twitter: companyDetails?.twitter_url || '',
              youtube: companyDetails?.youtube_url || '',
              facebook: companyDetails?.facebook_url || '',
              linkedin: companyDetails?.linkedin_url || '',
              instagram: companyDetails?.instagram_url || '',
            },
            technology_score: companyDetails?.keywords.map(capitalize) || [],
            departments: Object.keys(
              companyDetails?.departmental_head_count || {},
            ).map((dep) => capitalize(dep.split('_').join(' '))),
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
            router.push(
              `?step=${stepObj.detailsTwo}&api_fetch=true`,
              undefined,
              {
                shallow: true,
              },
            );
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
    } catch (err) {
      router.push(`?step=${stepObj.detailsTwo}&api_fetch=false`, undefined, {
        shallow: true,
      });
    } finally {
      setLoading(false);
    }
  }
  const Agency = localStorage.getItem('flow');

  return (
    <RcInfoStep1
      textheader={`Let's create your ${Agency} profile.`}
      slotInput={
        <Stack width={'100%'} spacing={'var(--space-2)'}>
          <TextField
            margin='none'
            required
            fullWidth
            id='name'
            placeholder='companydomain.com'
            onChange={(e) => {
              setDetails({ ...details, website: e.target.value });
            }}
            value={details?.website}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={true}
            inputProps={{
              autoCapitalize: 'true',
              style: {
                fontSize: '14px',
              },
            }}
          />
          <Stack direction={'row'} justifyContent={'end'}>
            <ButtonSolid
              size={2}
              textButton={'Continue'}
              isLoading={loading}
              isDisabled={loading}
              onClickButton={{
                onClick: saveRecruiterDetails,
              }}
            />
          </Stack>
        </Stack>
      }
    />
  );
}

const fetchCompanyDetail = async (url) => {
  try {
    const { data: companyDetails } = await axios.post(
      `/api/fetchCompanyDetails`,
      {
        domain_name: url,
      },
    );
    return companyDetails;
  } catch (err) {
    return null;
  }
};
function extractDomainAndAddCom(email) {
  // Using a regular expression to match and extract the domain
  const domainMatch = email.match(/@(.+)$/);

  // Check if a match is found
  if (domainMatch && domainMatch.length > 1) {
    // Extracted domain is the second element in the array
    const extractedDomain = domainMatch[1];

    // Append ".com" to the extracted domain
    const domainWithCom = extractedDomain;

    return domainWithCom;
  } else {
    // If no match is found, return null or handle it as needed
    return null;
  }
}
