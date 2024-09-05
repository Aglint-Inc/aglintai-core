import { AddSocialLink } from '@devlink/AddSocialLink';
import { ButtonSoft } from '@devlink/ButtonSoft';
import { ButtonSolid } from '@devlink/ButtonSolid';
import { NewSocialLinkPop } from '@devlink/NewSocialLinkPop';
import { Dialog, Stack } from '@mui/material';
import React, { useState } from 'react';

import UITextField from '@/components/Common/UITextField';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';

import { validation } from './utils';

const AddSocialLinkButton = () => {
  const { setRecruiter } = useAuthDetails();
  const [open, setOpen] = useState(false);
  const [social, setSocial] = useState({
    name: { value: '', error: false, type: 'string' },
    url: { value: '', error: false, type: 'url' },
  });
  const [loading, setLoading] = useState(false);

  const handleValidate = () => {
    const newSocial = { ...social };
    let hasError = false;

    Object.entries(social).forEach(([key, curr]) => {
      const err = !validation(curr.value, curr.type);
      newSocial[key] = { ...curr, error: err };
      if (err) hasError = true;
    });

    return { newSocial, error: hasError };
  };

  const handleSubmit = () => {
    setLoading(true);
    const { newSocial, error } = handleValidate();
    if (!error) {
      setRecruiter((recruiter) => {
        const newRecruiter = {
          ...recruiter,
          socials: {
            ...recruiter.socials,
            custom: {
              ...recruiter.socials.custom,
              [newSocial.name.value.trim().toLowerCase()]: newSocial.url.value
                .trim()
                .toLowerCase(),
            },
          },
        };
        handleClose();
        return newRecruiter;
      });
    } else {
      setSocial(newSocial);
    }
    setLoading(false);
  };

  const handleChange = (e, key: 'name' | 'url') => {
    setSocial((prev) => ({
      ...prev,
      [key]: { ...prev[key], value: e.target.value, error: false },
    }));
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
    setSocial({
      name: { value: '', error: false, type: 'string' },
      url: { value: '', error: false, type: 'url' },
    });
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
          social.name.error && 'Please enter a valid social media name'
        }
        onChange={(e) => handleChange(e, 'name')}
      />
      <UITextField
        label='Platform URL'
        placeholder='Platform URL'
        value={social.url.value}
        required
        error={social.url.error}
        helperText={social.url.error && 'Please enter a valid social media URL'}
        onChange={(e) => handleChange(e, 'url')}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
    </Stack>
  );

  return (
    <Stack alignItems='flex-start'>
      <Dialog open={open} onClose={handleClose}>
        <Stack style={{ pointerEvents: loading ? 'none' : 'auto' }}>
          <NewSocialLinkPop
            slotSocialForms={forms}
            slotButton={
              <>
                <ButtonSoft
                  textButton='Cancel'
                  size={2}
                  color='neutral'
                  onClickButton={{ onClick: handleClose }}
                />
                <ButtonSolid
                  textButton='Add'
                  size={2}
                  onClickButton={{ onClick: handleSubmit }}
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

export default AddSocialLinkButton;
