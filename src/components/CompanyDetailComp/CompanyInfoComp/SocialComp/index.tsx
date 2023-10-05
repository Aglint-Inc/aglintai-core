/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { RecruiterType } from '@/src/types/data.types';

import { debouncedSave } from '../../utils';

const SocialComp = ({ setIsSaving }) => {
  const { recruiter, setRecruiter } = useAuthDetails();

  const [error, setError] = useState(initialError());

  let socials = Object.keys(recruiter.socials).sort((a, b) => {
    const orderA = customOrder[a] || Infinity;
    const orderB = customOrder[b] || Infinity;
    return orderA - orderB;
  });

  const handleChange = async (recruit: RecruiterType, socialName?: string) => {
    if (
      socialName == 'facebook'
        ? validateFacebookUrl(recruiter.socials[socialName])
        : socialName == 'linkedin'
        ? validateLinkedInUrl(recruiter.socials[socialName])
        : socialName == 'youtube'
        ? validateYouTubeUrl(recruiter.socials[socialName])
        : socialName == 'twitter'
        ? validateTwitterUrl(recruiter.socials[socialName])
        : socialName == 'instagram'
        ? validateInstagramUrl(recruiter.socials[socialName])
        : true
    ) {
      setIsSaving(true);
      debouncedSave(recruit, recruiter.id);
      setTimeout(() => {
        setIsSaving(false);
      }, 1500);
    }
    setRecruiter(recruit);
  };

  function validateFacebookUrl(url) {
    const facebookUrlPattern =
      // eslint-disable-next-line security/detect-unsafe-regex
      /^(https?:\/\/)?(www\.)?facebook\.com\/(profile\.php\?id=\d+|[A-Za-z0-9_.-]+)\/?$/;
    if (!facebookUrlPattern.test(url)) {
      setError({
        ...error,
        facebook: {
          error: true,
          msg: 'Please enter valid facebook url',
        },
      });
    } else {
      setError({
        ...error,
        facebook: { error: false, msg: '' },
      });
    }

    return facebookUrlPattern.test(url);
  }

  function validateLinkedInUrl(url) {
    const linkedinUrlPattern =
      // eslint-disable-next-line security/detect-unsafe-regex
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in\/[A-Za-z0-9_-]+|company\/[A-Za-z0-9_-]+)\/?$/;
    if (!linkedinUrlPattern.test(url)) {
      setError({
        ...error,
        linkedin: {
          error: true,
          msg: 'Please enter valid linkedin url',
        },
      });
    } else {
      setError({
        ...error,
        linkedin: { error: false, msg: '' },
      });
    }
    return linkedinUrlPattern.test(url);
  }

  function validateYouTubeUrl(url) {
    const youtubeUrlPattern =
      // eslint-disable-next-line security/detect-unsafe-regex
      /^(https?:\/\/)?(www\.)?youtube\.com\/.*$/;

    if (!youtubeUrlPattern.test(url)) {
      setError({
        ...error,
        youtube: {
          error: true,
          msg: 'Please enter valid youtube id',
        },
      });
    } else {
      setError({
        ...error,
        youtube: { error: false, msg: '' },
      });
    }
    return youtubeUrlPattern.test(url);
  }

  function validateTwitterUrl(url) {
    const twitterUrlPattern =
      // eslint-disable-next-line security/detect-unsafe-regex
      /^(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/;
    if (!twitterUrlPattern.test(url)) {
      setError({
        ...error,
        twitter: {
          error: true,
          msg: 'Please enter valid twitter url',
        },
      });
    } else {
      setError({
        ...error,
        twitter: { error: false, msg: '' },
      });
    }
    return twitterUrlPattern.test(url);
  }

  function validateInstagramUrl(url) {
    const instagramUrlPattern =
      // eslint-disable-next-line security/detect-unsafe-regex
      /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$/;
    if (!instagramUrlPattern.test(url)) {
      setError({
        ...error,
        instagram: {
          error: true,
          msg: 'Please enter valid instagram url',
        },
      });
    } else {
      setError({
        ...error,
        instagram: { error: false, msg: '' },
      });
    }
    return instagramUrlPattern.test(url);
  }

  return (
    <Stack spacing={'20px'}>
      <UITypography type={'medium'} color={palette.grey[800]} fontBold='normal'>
        Social Links
      </UITypography>
      <Stack spacing={'10px'}>
        {socials?.map((socialName) => {
          if (socialName === 'custom') {
            return null; // Skip this iteration
          }
          return (
            <Stack
              key={socialName}
              direction={'row'}
              alignItems={'center'}
              spacing={2}
            >
              <Image
                src={`/images/logo/${socialName}.svg`}
                height={20}
                width={20}
                alt=''
              />
              <UITextField
                labelSize='medium'
                fullWidth
                value={recruiter?.socials[socialName]}
                placeholder={socialPlaceholder[socialName]}
                onBlur={() => {
                  handleChange(
                    {
                      ...recruiter,
                    },
                    socialName,
                  );
                }}
                onChange={(e) => {
                  handleChange(
                    {
                      ...recruiter,
                      socials: {
                        ...recruiter.socials,
                        [socialName]: e.target.value,
                      },
                    },
                    socialName,
                  );
                }}
                error={error[socialName].error}
                helperText={error[socialName].msg}
              />
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default SocialComp;

const socialPlaceholder = {
  linkedin: 'https://www.linkedin.com/company/your-company',
  youtube: 'https://www.youtube.com/your-company',
  twitter: 'https://www.twitter.com/company-id',
  facebook: 'https://www.facebook.com/company-id',
  instagram: 'https://www.instagram.com/company-id',
};

const initialError = () => {
  return {
    linkedin: {
      error: false,
      msg: '',
    },
    youtube: {
      error: false,
      msg: '',
    },
    twitter: {
      error: false,
      msg: '',
    },
    facebook: {
      error: false,
      msg: '',
    },
    instagram: {
      error: false,
      msg: '',
    },
  };
};

export const customOrder = {
  linkedin: 1,
  instagram: 2,
  // Add other social media platforms in the desired order here
};
