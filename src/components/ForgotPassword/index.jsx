/* eslint-disable @next/next/no-img-element */
import { Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { createClient } from '@supabase/supabase-js';
import { errorMessages } from '@utils/errorMessages';
import posthog from 'posthog-js';
import { useRef, useState } from 'react';

import { PwResetConfirm, PwResetForm } from '@/devlink2';
let tempEmail = '';

import { useRouter } from 'next/router';

import { YTransform } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ForgotPasswordComponent() {
  const [loading, setLoading] = useState(false);
  const [changetext, setchangetext] = useState('Send');
  const [error, setError] = useState({
    valid: {
      error: false,
      msg: ''
    }
  });
  let email = useRef(null);
  const handleEmail = () => {
    const emailRef = email.current.value;
    const emailRegex =
      /^([a-zA-Z0-9]+)([_.+\-{1}])?([a-zA-Z0-9]+)@([a-zA-Z0-9]+)([.])([a-zA-Z]+)$/g;
    if (emailRef === '') {
      setError({
        ...error,
        valid: {
          error: true,
          msg: errorMessages.emailRequired
        }
      });
    } else if (!emailRegex.test(emailRef)) {
      setError({
        ...error,
        valid: {
          error: true,
          msg: errorMessages.emailRequired
        }
      });
    } else {
      setError({
        ...error,
        valid: {
          error: false
        }
      });
    }
  };
  const handleSubmit = async (event) => {
    if (!loading && email.current?.value.length !== 0) {
      event.preventDefault();
      setLoading(true);
      const currentEmail = email.current?.value
        ? email.current?.value
        : tempEmail;
      const { error } = await supabase.auth.resetPasswordForEmail(
        currentEmail,
        {
          redirectTo: `${process.env.NEXT_PUBLIC_HOST_NAME}/reset-password`
        }
      );
      if (!error) {
        setLoading(false);
        tempEmail = email.current?.value;
        setchangetext('Sent');
        posthog.identify(tempEmail, { Email: tempEmail });
        posthog.capture('Send reset linked Clicked');
      } else {
        setLoading(false);
      }
    } else {
      toast.error('Please enter email.');
    }
  };

  const router = useRouter();
  return (
    <>
      {changetext == 'Send' && (
        <YTransform uniqueKey={changetext}>
          <PwResetForm
            slotForm={
              <Box component='form' onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    inputRef={email}
                    fullWidth
                    onFocus={() =>
                      setError({
                        ...error,
                        valid: {
                          error: false
                        }
                      })
                    }
                    onBlur={handleEmail}
                    error={error.valid.error}
                    helperText={error.valid.error ? error.valid.msg : ''}
                    placeholder='Enter Email'
                    id='Email'
                    required
                  />
                </Stack>
              </Box>
            }
            onclickBack={{
              onClick: () => {
                router.push(pageRoutes.LOGIN);
              }
            }}
            onclickReset={{
              onClick: handleSubmit
            }}
            contactLink={{
              href: 'mailto:admin@aglinthq.com'
            }}
          />
        </YTransform>
      )}
      {changetext === 'Sent' && (
        <YTransform uniqueKey={changetext}>
          <PwResetConfirm
            onclickBack={{
              onClick: () => {
                router.push(pageRoutes.LOGIN);
              }
            }}
            contactLink={{
              href: 'mailto:admin@aglinthq.com'
            }}
            onclickReset={{
              onClick: (e) => {
                handleSubmit(e);
              }
            }}
          />
        </YTransform>
      )}
    </>
  );
}
