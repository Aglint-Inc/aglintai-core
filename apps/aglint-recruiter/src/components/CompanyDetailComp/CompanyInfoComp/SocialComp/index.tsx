/* eslint-disable security/detect-object-injection */
import { RecruiterType } from '@aglint/shared-types';
import { Box, Dialog, Stack, Typography } from '@mui/material';
import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { AddSocialLink } from '@/devlink/AddSocialLink';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { NewSocialLinkPop } from '@/devlink/NewSocialLinkPop';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { debouncedSave } from '../../utils';
import { IconButtonSoft } from '@/devlink';

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
                  style={{ filter: 'grayscale(100%)' }}
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
            <CustomTooltip
              placement='right'
              title={
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
                  <IconButtonSoft iconName='delete' color={'error'} iconColor={'error'} />
                </Stack>
              }
              key={socialName}
            >
              <Stack
                position={'relative'}
                direction={'row'}
                alignItems={'center'}
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
                    src={`https://logo.clearbit.com/${socialName
                      .toLowerCase()
                      .replaceAll(' ', '')}.com `}
                    height={16}
                    width={16}
                    alt=''
                    style={{ filter: 'grayscale(100%)' }}
                  />
                </Box>

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
            </CustomTooltip>
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

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
    background: 'var(--white)',
    padding: '0px',
    boxShadow: 'none',
    // border: '1px solid var(--neutral-6)',
    borderRadius: 'none',
    color: 'var(--neutral-12)',
    fontSize: 'var(--font-size-1)',
    fontWeight: 400,
  },
  [theme.breakpoints.up('sm')]: {
    '& .MuiTooltip-tooltip': {
      fontSize: 'inherit',
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
}));
