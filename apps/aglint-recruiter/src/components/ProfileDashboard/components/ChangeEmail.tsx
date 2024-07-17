import { Dialog } from '@mui/material';
import { useState } from 'react';

import { EmailChangePop } from '@/devlink/EmailChangePop';
import { UserChangeEmail } from '@/devlink/UserChangeEmail';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { ProfileForms } from '..';
import {
  EmailFormFields,
  FormValues,
  refactorEmail,
  validateGMail,
  validateMail,
} from '../util';

export const ChangeEmail = () => {
  const { userDetails, handleUpdateEmail } = useAuthDetails();
  const userMail = userDetails.user.email;
  const initialFormValues: FormValues = {
    value: null,
    label: null,
    type: 'text',
    helperText: null,
    placeholder: null,
    error: false,
    blocked: false,
    validation: 'string',
    required: false,
    disabled: false,
    specialForm: false,
    options: null,
    modal: false,
  };

  const initialEmail: EmailFormFields = {
    email: {
      ...initialFormValues,
      value: '',
      validation: 'mail',
      placeholder: 'john.doe@example.com',
      blocked: false,
    },
  };
  const [email, setEmail] = useState(initialEmail);
  const [Loading, setLoading] = useState(false);

  const handleCloseEmail = () => {
    setEmail(initialEmail);
  };

  const handleValidateMail = () => {
    if (!email.email.value) {
      return {
        newEmail: null,
        error: 'Please enter a email',
      };
    }
    if (userMail === email.email.value) {
      return {
        newEmail: null,
        error:
          'You have entered your current email address. Please use different email',
      };
    }
    if (validateMail(email.email.value)) {
      if (validateGMail(email.email.value))
        return {
          newEmail: null,
          error: 'Enter a valid work email',
        };
      return {
        newEmail: refactorEmail(email.email.value).trim(),
        error: null,
      };
    } else return { newEmail: null, error: 'Enter a valid work email' };
  };

  const handleSubmitEmail = async () => {
    const { newEmail, error } = handleValidateMail();

    if (!error) {
      const confirmation = await handleUpdateEmail(newEmail);
      if (confirmation) {
        setEmail((prev) => ({
          ...prev,
          email: { ...prev.email, modal: true },
        }));
        return true;
      } else return false;
    } else {
      setEmail((prev) => {
        return {
          ...prev,
          email: { ...prev.email, error: true, helperText: error },
        };
      });
    }
  };
  return (
    <>
      <Dialog open={email.email.modal} onClose={() => handleCloseEmail()}>
        <EmailChangePop
          textDesc={
            <>
              <>A confirmation link has been sent to </>
              <span
                style={{
                  color: 'var(--accent-11)',
                  fontWeight: 400,
                }}
              >
                {email.email.value}
              </span>
              <>. Please confirm it to update your email ID.</>
            </>
          }
          onClickClose={{
            onClick: () => handleCloseEmail(),
          }}
        />
      </Dialog>
      <UserChangeEmail
        texDesc={
          <>
            <>Your registered email is </>
            <span style={{ color: 'var(--accent-11)', fontWeight: 400 }}>
              {userMail}
            </span>
            <>
              To change your email, enter the new email address below. A
              verification link will be sent to this new address.
            </>
          </>
        }
        onClickEmailChange={{
          onClick: async () => {
            setLoading(true);
            if (!Loading) await handleSubmitEmail();
            setLoading(false);
          },
        }}
        slotEmail={
          <ProfileForms
            profile={email}
            setProfile={setEmail}
            // setChanges={() => setPasswordChange(true)}
          />
        }
      />
    </>
  );
};
