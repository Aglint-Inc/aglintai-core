import { Label } from '@components/ui/label';
import React, { useState } from 'react';

import AddSocialLinkButton from './AddSocialLinkButton';
import CustomSocialField from './CustomSocialField';
import SocialField from './SocialField';
import { customOrder } from './utils';

const SocialComp = ({ disabled = false, handleChange, recruiterLocal }) => {
  const [error, setError] = useState({});

  const socials = Object.keys(recruiterLocal.socials)
    .filter((key) => key !== 'custom')
    .sort(
      (a, b) => (customOrder[a] || Infinity) - (customOrder[b] || Infinity),
    );

  const customSocials = Object.keys(recruiterLocal.socials.custom).sort(
    (a, b) => (customOrder[a] || Infinity) - (customOrder[b] || Infinity),
  );

  const handleChangeSocial = async (
    updatedRecruiter,
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
    <div className=' w-full flex flex-col gap-2'>
      <Label className='text-sm font-semibold '>Social</Label>
      <div className='w-full grid grid-cols-2 gap-x-4 gap-y-4'>
        {socials.map((socialName) => (
          <SocialField
            key={socialName}
            socialName={socialName}
            value={recruiterLocal?.socials[socialName]}
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
