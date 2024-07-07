/* eslint-disable security/detect-object-injection */
import { RecruiterType } from '@aglint/shared-types';
import PublicIcon from '@mui/icons-material/Public';
import { Box, Dialog, Stack, Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { AddSocialLink } from '@/devlink/AddSocialLink';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { NewSocialLinkPop } from '@/devlink/NewSocialLinkPop';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { debouncedSave } from '../../utils';

const SocialComp = ({ setIsSaving }) => {
  const { recruiter, setRecruiter } = useAuthDetails();

  const socials = Object.keys(recruiter.socials)
    .filter((key) => key !== 'custom')
    .sort((a, b) => {
      const orderA = customOrder[a] || Infinity;
      const orderB = customOrder[b] || Infinity;
      return orderA - orderB;
    });

  const customSocials = Object.keys(recruiter.socials.custom).sort((a, b) => {
    const orderA = customOrder[a] || Infinity;
    const orderB = customOrder[b] || Infinity;
    return orderA - orderB;
  });

  const initialError = {
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
    custom: Object.assign(
      {},
      ...customSocials.map((s) => {
        return { [s]: { error: false, msg: '' } };
      }),
    ),
  };

  const [error, setError] = useState(initialError);

  const handleChange = async (
    recruit: RecruiterType,
    socialName?: string,
    custom: boolean = false,
  ) => {
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
      if (
        !custom ||
        (custom &&
          validateCustomUrl(recruiter.socials.custom[socialName], socialName))
      ) {
        setIsSaving(true);
        debouncedSave(recruit, recruiter.id);
        setTimeout(() => {
          setIsSaving(false);
        }, 1500);
      }
    }
    setRecruiter(recruit);
  };

  function validateFacebookUrl(url) {
    const facebookUrlPattern =
      // eslint-disable-next-line security/detect-unsafe-regex
      /^(https?:\/\/)?(www\.)?facebook\.com\/(profile\.php\?id=\d+|[A-Za-z0-9_.-]+)\/?$/;
    if (url.length !== 0) {
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
    } else {
      return null;
    }

    return facebookUrlPattern.test(url);
  }

  function validateLinkedInUrl(url) {
    const linkedinUrlPattern =
      // eslint-disable-next-line security/detect-unsafe-regex
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in\/[A-Za-z0-9_-]+|company\/[A-Za-z0-9_-]+)\/?$/;
    if (url.length !== 0) {
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
    } else {
      return null;
    }
    return linkedinUrlPattern.test(url);
  }

  function validateYouTubeUrl(url) {
    const youtubeUrlPattern =
      // eslint-disable-next-line security/detect-unsafe-regex
      /^(https?:\/\/)?(www\.)?youtube\.com\/.*$/;
    if (url.length !== 0) {
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
    } else {
      return null;
    }
    return youtubeUrlPattern.test(url);
  }

  function validateTwitterUrl(url) {
    const twitterUrlPattern =
      // eslint-disable-next-line security/detect-unsafe-regex
      /^(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/;
    if (url.length !== 0) {
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
    } else {
      return null;
    }
    return twitterUrlPattern.test(url);
  }

  function validateInstagramUrl(url) {
    const instagramUrlPattern =
      // eslint-disable-next-line security/detect-unsafe-regex
      /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$/;
    if (url.length !== 0) {
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
    } else {
      return null;
    }
    return instagramUrlPattern.test(url);
  }

  function validateCustomUrl(url: string, socialName: string) {
    if (url.length !== 0) {
      if (!validateUrl(url)) {
        setError((prev) => {
          return {
            ...prev,
            custom: {
              ...prev.custom,
              [socialName]: {
                error: true,
                msg: 'Please enter a valid url',
              },
            },
          };
        });
        return false;
      } else {
        setError((prev) => {
          return {
            ...prev,
            custom: {
              ...prev.custom,
              [socialName]: { error: false, msg: '' },
            },
          };
        });
        return true;
      }
    } else {
      return null;
    }
  }

  return (
    <Stack gap={'var(--space-2)'}>
      <Typography color={'var(--neutral-12)'}>Social</Typography>
      <Stack gap={'var(--space-4)'}>
        {socials?.map((socialName) => {
          return (
            <Stack
              key={socialName}
              direction={'row'}
              alignItems={'start'}
              justifyContent={'left'}
              gap={1}
            >
              <Box
                style={{
                  border: `1px solid var(--neutral-6)`,
                  borderRadius: 'var(--radius-2)',
                  display: 'flex',
                  height: '36px',
                  width: '36px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={`/images/logo/${socialName}.svg`}
                  height={16}
                  width={16}
                  alt=''
                />
              </Box>
              <Stack width={'380px'}>
                <UITextField
                  labelSize='small'
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
                  error={error[socialName]?.error}
                  helperText={error[socialName].msg}
                />
              </Stack>
            </Stack>
          );
        })}
        {customSocials?.map((socialName) => {
          return (
            <Stack
              key={socialName}
              direction={'row'}
              alignItems={'center'}
              gap={2}
            >
              <Stack
                style={{
                  border: `1px solid var(--neutral-6)`,
                  padding: 'var(--space-2)',
                  borderRadius: 'var(--radius-2)',
                  alignItems: 'start',
                }}
              >
                <SocialLogo socialName={socialName} />
              </Stack>
              <Stack width={'400px'}>
                <UITextField
                  labelSize='medium'
                  fullWidth
                  value={recruiter?.socials.custom[socialName]}
                  placeholder={`https://www.${socialName}.com/company-id`}
                  onBlur={() => {
                    handleChange(
                      {
                        ...recruiter,
                      },
                      socialName,
                      true,
                    );
                  }}
                  onChange={(e) => {
                    handleChange(
                      {
                        ...recruiter,
                        socials: {
                          ...recruiter.socials,
                          custom: {
                            ...(recruiter.socials.custom as any),
                            [socialName]: e.target.value,
                          } as any,
                        },
                      },
                      socialName,
                      true,
                    );
                  }}
                  error={error.custom[socialName].error}
                  helperText={error.custom[socialName].msg}
                />
              </Stack>
              <Stack
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  const newCustomSocials = recruiter.socials.custom;
                  delete newCustomSocials[socialName];
                  handleChange({
                    ...recruiter,
                    socials: {
                      ...recruiter.socials,
                      custom: newCustomSocials,
                    },
                  });
                }}
              >
                <DeleteIcon />
              </Stack>
            </Stack>
          );
        })}
        <AddSocialLinkButton setError={setError} />
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

const AddSocialLinkButton = ({
  setError,
}: {
  setError: Dispatch<SetStateAction<any>>;
}) => {
  const { setRecruiter } = useAuthDetails();
  const [open, setOpen] = useState(false);
  const initialSocial = {
    name: { value: null, error: false, type: 'string' },
    url: { value: null, error: false, type: 'url' },
  };
  const [social, setSocial] = useState(initialSocial);
  const [loading, setLoading] = useState(false);

  const handleValidate = () => {
    return Object.entries(social).reduce(
      (acc, [key, curr]) => {
        const err = !validation(curr.value, curr.type);
        return {
          newSocial: {
            ...acc.newSocial,
            [key]: {
              ...acc.newSocial[key],
              error: err,
            },
          },
          error: err && !acc.error ? true : acc.error,
        };
      },
      { newSocial: social, error: false },
    );
  };
  const handleSubmit = () => {
    setLoading(true);
    const { newSocial, error } = handleValidate();
    if (!error)
      setRecruiter((recruiter) => {
        const newRecruiter = {
          ...recruiter,
          socials: {
            ...recruiter.socials,
            custom: {
              ...(recruiter.socials.custom as any),
              [newSocial.name.value.trim().toLowerCase()]: newSocial.url.value
                .trim()
                .toLowerCase(),
            },
          },
        };
        debouncedSave(newRecruiter, newRecruiter.id);
        setError((prev) => {
          return {
            ...prev,
            custom: {
              ...prev.custom,
              [newSocial.name.value.trim().toLowerCase()]: {
                error: false,
                msg: '',
              },
            },
          };
        });
        handleClose();
        return newRecruiter;
      });
    else setSocial(newSocial);
    setLoading(false);
  };
  const handleChange = (e, key: 'name' | 'url') => {
    setSocial((prev) => {
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
  const handleClose = () => {
    setOpen(false);
    setLoading(false);
    setTimeout(() => {
      setSocial(initialSocial);
    }, 100);
  };
  const forms = (
    <Stack pt={2} spacing={2}>
      <UITextField
        label='Platform Name'
        placeholder='Platform name'
        value={social.name.value}
        required
        error={social.name.error}
        helperText={
          social.name.error && 'Please enter valid a social media name'
        }
        onFocus={() =>
          setSocial({
            ...social,
            name: {
              error: false,
              type: social.name.type,
              value: social.name.value,
            },
          })
        }
        onChange={(e) => handleChange(e, 'name')}
      />
      <UITextField
        label='Platform URL'
        placeholder='Platform URL'
        value={social.url.value}
        required
        error={social.url.error}
        helperText={social.url.error && 'Please enter valid a social media url'}
        onChange={(e) => handleChange(e, 'url')}
        onKeyDown={handleSubmit}
        onFocus={() =>
          setSocial({
            ...social,
            url: {
              error: false,
              type: social.url.type,
              value: social.url.value,
            },
          })
        }
      />
    </Stack>
  );
  return (
    <Stack alignItems={'flex-start'}>
      <Dialog open={open} onClose={() => handleClose()}>
        <Stack style={{ pointerEvents: loading ? 'none' : 'auto' }}>
          <NewSocialLinkPop
            slotSocialForms={forms}
            slotButton={
              <>
                <ButtonSoft
                  textButton='Cancel'
                  size={2}
                  color={'neutral'}
                  onClickButton={{ onClick: () => handleClose() }}
                />
                <ButtonSolid
                  textButton='Add'
                  size={2}
                  onClickButton={{ onClick: () => handleSubmit() }}
                />
              </>
            }
          />
        </Stack>
      </Dialog>
      <AddSocialLink onClickAddSocialLink={{ onClick: () => setOpen(true) }} />
    </Stack>
  );
};

export const customOrder = {
  linkedin: 1,
  instagram: 2,
  // Add other social media platforms in the desired order here
};

export const SocialLogo = ({ socialName }: { socialName: string }) => {
  return (
    <Avatar
      variant='square'
      sx={{
        bgcolor: 'white.700',
        width: '20px',
        height: '20px',
        color: 'inherit',
      }}
      src={`https://logo.clearbit.com/${socialName
        .toLowerCase()
        .replaceAll(' ', '')}.com `}
      alt={socialName}
    >
      <PublicIcon />
    </Avatar>
  );
};

const validation = (value: string, method: string) => {
  switch (method) {
    case 'string':
      return validateString(value);
    case 'url':
      return validateUrl(value);
  }
  return false;
};

const validateUrl = (url: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i',
  );
  return url !== null && pattern.test(url);
};

const validateString = (str: string) => {
  return str !== null && str.trim().length !== 0;
};

const DeleteIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9.24194 3.625C9.07788 3.625 8.95028 3.69792 8.85913 3.84375L8.44897 4.5H12.5505L12.1404 3.84375C12.0492 3.69792 11.9216 3.625 11.7576 3.625H9.24194ZM13.5896 4.5H14.8748H15.7498H16.1873C16.4607 4.51823 16.6065 4.66406 16.6248 4.9375C16.6065 5.21094 16.4607 5.35677 16.1873 5.375H15.6951L14.9841 15.1367C14.9477 15.5924 14.7654 15.9753 14.4373 16.2852C14.1091 16.5768 13.7081 16.7318 13.2341 16.75H7.76538C7.29142 16.7318 6.89038 16.5768 6.56226 16.2852C6.23413 15.9753 6.05184 15.5924 6.01538 15.1367L5.30444 5.375H4.81225C4.53882 5.35677 4.39298 5.21094 4.37475 4.9375C4.39298 4.66406 4.53882 4.51823 4.81225 4.5H5.24976H6.12476H7.40991L8.12085 3.3789C8.39429 2.97786 8.76798 2.76823 9.24194 2.75H11.7576C12.2315 2.76823 12.6052 2.97786 12.8787 3.3789L13.5896 4.5ZM14.8201 5.375H6.17944L6.89038 15.0547C6.90861 15.2917 6.99976 15.4831 7.16382 15.6289C7.32788 15.793 7.5284 15.875 7.76538 15.875H13.2341C13.4711 15.875 13.6716 15.793 13.8357 15.6289C13.9998 15.4831 14.0909 15.2917 14.1091 15.0547L14.8201 5.375Z'
        fill='#2F3941'
      />
    </svg>
  );
};
