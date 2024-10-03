import { Label } from '@components/ui/label';
import React, { useState } from 'react';

import type { TenantType } from '@/company/hooks/useTenant';

import AddSocialLinkButton from './AddSocialLinkButton';
import CustomSocialField from './CustomSocialField';
import SocialField from './SocialField';
import { customOrder } from './utils';
type recruiterType = TenantType['recruiter'];
type SocialCompPropsType = {
  disabled: boolean;
  // eslint-disable-next-line no-unused-vars
  handleChange: (x: recruiterType) => void;
  recruiterLocal: recruiterType;
};

const SocialComp = ({
  disabled = false,
  handleChange,
  recruiterLocal,
}: SocialCompPropsType) => {
  const [error, setError] = useState<{
    [key: string]: {
      error: boolean;
      msg: string;
    };
  }>({});

  const socials = (
    Object.keys(
      recruiterLocal.socials,
    ) as unknown as (keyof typeof recruiterLocal.socials)[]
  )
    .filter((key) => key !== 'custom')
    .sort(
      (a, b) =>
        (customOrder[a as keyof typeof customOrder] || Infinity) -
        (customOrder[b as keyof typeof customOrder] || Infinity),
    );

  const customSocials = Object.keys(recruiterLocal.socials.custom).sort(
    (a, b) =>
      (customOrder[a as keyof typeof customOrder] || Infinity) -
      (customOrder[b as keyof typeof customOrder] || Infinity),
  );

  const handleChangeSocial = async (
    updatedRecruiter: SocialCompPropsType['recruiterLocal'],
    // socialName,
    // isCustom = false,
  ) => {
    // const validator = isCustom
    //   ? socialValidators.custom
    //   : socialValidators[socialName] || (() => true);

    // const isValid = validator(
    //   updatedRecruiter.socials[isCustom ? 'custom' : socialName],
    // );

    // if (isValid) {
    handleChange(updatedRecruiter);
    // }
  };

  return (
    <div className='flex w-full flex-col gap-2'>
      <Label className='text-sm font-semibold'>Social</Label>
      <div className='grid w-full grid-cols-2 gap-x-4 gap-y-4'>
        {socials.map((socialName) => (
          <SocialField
            key={socialName}
            socialName={socialName}
            value={
              recruiterLocal.socials[
                socialName as keyof typeof recruiterLocal.socials
              ] as unknown as string
            }
            disabled={disabled}
            error={error[socialName]}
            onChange={(value) => {
              handleChangeSocial(
                {
                  ...recruiterLocal,
                  socials: { ...recruiterLocal.socials, [socialName]: value },
                },
                // socialName,
              );
            }}
          />
        ))}
        {customSocials.map((socialName) => (
          <CustomSocialField
            key={socialName}
            socialName={socialName}
            value={recruiterLocal?.socials.custom[socialName]}
            error={error[socialName]}
            setError={(newError) =>
              setError((prev) => ({ ...prev, [socialName]: newError }))
            }
            onChange={(value) => {
              handleChangeSocial(
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
                // socialName,
                // true,
              );
            }}
            onDelete={() => {
              const newCustomSocials = { ...recruiterLocal.socials.custom };
              delete newCustomSocials[socialName];
              handleChangeSocial(
                {
                  ...recruiterLocal,
                  socials: {
                    ...recruiterLocal.socials,
                    custom: newCustomSocials,
                  },
                },
                // socialName,
                // true,
              );
            }}
          />
        ))}
      </div>
      <div>
        {!disabled && (
          <AddSocialLinkButton
            customSocials={recruiterLocal.socials.custom}
            AddCustomSocialHandle={(name, value) => {
              handleChangeSocial({
                ...recruiterLocal,
                socials: {
                  ...recruiterLocal.socials,
                  custom: {
                    ...recruiterLocal.socials.custom,
                    [name]: value,
                  },
                },
              });
            }}
          />
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default SocialComp;
