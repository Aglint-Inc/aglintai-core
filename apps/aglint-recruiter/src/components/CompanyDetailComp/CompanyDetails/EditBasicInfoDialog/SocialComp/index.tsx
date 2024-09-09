import { Label } from '@components/ui/label';
import React, { useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';

import AddSocialLinkButton from './AddSocialLinkButton';
import CustomSocialField from './CustomSocialField';
import SocialField from './SocialField';
import { customOrder, socialValidators } from './utils';

const SocialComp = ({
  disabled = false,
  handleChange: localHandleChange,
  recruiterLocal,
}) => {
  const { recruiter } = useAuthDetails();
  const [error, setError] = useState({});

  const socials = Object.keys(recruiter.socials)
    .filter((key) => key !== 'custom')
    .sort(
      (a, b) => (customOrder[a] || Infinity) - (customOrder[b] || Infinity),
    );

  const customSocials = Object.keys(recruiter.socials.custom).sort(
    (a, b) => (customOrder[a] || Infinity) - (customOrder[b] || Infinity),
  );

  const handleChange = async (
    updatedRecruiter,
    socialName,
    isCustom = false,
  ) => {
    const validator = isCustom
      ? socialValidators.custom
      : socialValidators[socialName] || (() => true);
    const isValid = validator(
      updatedRecruiter.socials[isCustom ? 'custom' : socialName],
    );

    if (isValid) {
      localHandleChange(updatedRecruiter);
    }
  };

  return (
    <div className='space-y-4 w-full'>
      <Label className='text-sm font-semibold'>Social</Label>
      <div className='grid grid-cols-2 gap-6'>
        <div className='space-y-6'>
          {socials.slice(0, Math.ceil(socials.length / 2)).map((socialName) => (
            <SocialField
              key={socialName}
              socialName={socialName}
              value={recruiterLocal?.socials[socialName]}
              disabled={disabled}
              error={error[socialName]}
              onChange={(value) =>
                handleChange(
                  {
                    ...recruiterLocal,
                    socials: { ...recruiterLocal.socials, [socialName]: value },
                  },
                  socialName,
                )
              }
            />
          ))}
        </div>
        <div className='space-y-6'>
          {socials.slice(Math.ceil(socials.length / 2)).map((socialName) => (
            <SocialField
              key={socialName}
              socialName={socialName}
              value={recruiterLocal?.socials[socialName]}
              disabled={disabled}
              error={error[socialName]}
              onChange={(value) =>
                handleChange(
                  {
                    ...recruiterLocal,
                    socials: { ...recruiterLocal.socials, [socialName]: value },
                  },
                  socialName,
                )
              }
            />
          ))}
          {customSocials.map((socialName) => (
            <CustomSocialField
              key={socialName}
              socialName={socialName}
              value={recruiter?.socials.custom[socialName]}
              error={error[socialName]}
              setError={(newError) =>
                setError((prev) => ({ ...prev, [socialName]: newError }))
              }
              onChange={(value) =>
                handleChange(
                  {
                    ...recruiterLocal,
                    socials: {
                      ...recruiterLocal.socials,
                      custom: {
                        ...recruiterLocal.socials.custom,
                        [socialName]: value,
                      },
                    },
                  },
                  socialName,
                  true,
                )
              }
              onDelete={() => {
                const newCustomSocials = { ...recruiter.socials.custom };
                delete newCustomSocials[socialName];
                handleChange(
                  {
                    ...recruiterLocal,
                    socials: {
                      ...recruiterLocal.socials,
                      custom: newCustomSocials,
                    },
                  },
                  socialName,
                  true,
                );
              }}
            />
          ))}
          {!disabled && <AddSocialLinkButton />}
        </div>
      </div>
    </div>
  );
};

export default SocialComp;
