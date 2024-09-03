/* eslint-disable @next/next/no-img-element */
import { Box, Container, Stack } from '@mui/material';
import { createClient } from '@supabase/supabase-js';
import { useRef, useState } from 'react';

import { PwResetConfirm } from '@/devlink2/PwResetConfirm';
import { PwResetForm } from '@/devlink2/PwResetForm';
let tempEmail = '';

import { useRouter } from 'next/navigation';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import ROUTES from '@/src/utils/routing/routes';

import Footer from '../Common/Footer';
import UITextField from '../Common/UITextField';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function ForgotPasswordComponent() {
  const [loading, setLoading] = useState(false);
  const [changetext, setchangetext] = useState('Send');
  const [error, setError] = useState({
    valid: {
      error: false,
      msg: '',
    },
  });
  let email = useRef(null);
  const handleEmail = () => {
    const emailRef = email.current.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
    if (emailRef === '') {
      setError({
        ...error,
        valid: {
          error: true,
          msg: 'Email cannot be empty',
        },
      });
      return false;
    } else if (!emailRegex.test(emailRef)) {
      setError({
        ...error,
        valid: {
          error: true,
          msg: 'Enter a valid email address',
        },
      });
      return false;
    } else {
      setError({
        ...error,
        valid: {
          error: false,
        },
      });
    }
    return true;
  };
  const handleSubmit = async (event) => {
    if (handleEmail() && !loading && email.current?.value.length !== 0) {
      event.preventDefault();
      setLoading(true);
      const currentEmail = email.current?.value
        ? email.current?.value
        : tempEmail;
      const { error } = await supabase.auth.resetPasswordForEmail(
        currentEmail,
        {
          redirectTo: `${process.env.NEXT_PUBLIC_HOST_NAME}/reset-password`,
        },
      );
      if (!error) {
        setLoading(false);
        tempEmail = email.current?.value;
        setchangetext('Sent');
      } else {
        setLoading(false);
      }
    }
  };

  const router = useRouter();
  return (
    <Container
      maxWidth='false'
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--neutral-2)',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {changetext == 'Send' && (
          <YTransform uniqueKey={changetext} height={'auto'}>
            <PwResetForm
              slotButton={
                <Stack spacing={'var(--space-2)'}>
                  <ButtonSolid
                    textButton='Reset'
                    size={2}
                    onClickButton={{ onClick: handleSubmit }}
                  />
                  <ButtonGhost
                    textButton='Back to Login'
                    size={1}
                    color={'neutral'}
                    onClickButton={{
                      onClick: () => {
                        router.push(ROUTES['/login']());
                      },
                    }}
                  />
                </Stack>
              }
              slotForm={
                <Box component='form' onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <UITextField
                      ref={email}
                      fullWidth
                      onFocus={() =>
                        setError({
                          ...error,
                          valid: {
                            error: false,
                          },
                        })
                      }
                      error={error.valid.error}
                      helperText={error.valid.error ? error.valid.msg : ''}
                      placeholder='Enter a email'
                      id='Email'
                      required
                    />
                  </Stack>
                </Box>
              }
              contactLink={{
                href: 'mailto:admin@aglinthq.com',
              }}
            />
          </YTransform>
        )}
        {changetext === 'Sent' && (
          <YTransform uniqueKey={changetext}>
            <PwResetConfirm
              onclickBack={{
                onClick: () => {
                  router.push(ROUTES['/login']());
                },
              }}
              contactLink={{
                href: 'mailto:admin@aglinthq.com',
              }}
              onclickReset={{
                onClick: (e) => {
                  handleSubmit(e);
                },
              }}
            />
          </YTransform>
        )}
      </Box>
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Footer />
      </Box>
    </Container>
  );
}
