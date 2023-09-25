/* eslint-disable @next/next/no-img-element */
import { Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { errorMessages } from '@utils/errorMessages';
import { supabase } from '@utils/supabaseClient';
import { useRef, useState } from 'react';

import { ForgotPassword, MainNav } from '@/devlink';

import AUIButton from '../Common/AUIButton';

export default function ForgotPasswordComponent() {
  const [loading, setLoading] = useState(false);
  const [changetext, setchangetext] = useState('Send');
  const [error, setError] = useState({
    valid: {
      error: false,
      msg: '',
    },
  });
  let email = useRef('');
  const handleEmail = () => {
    const emailRef = email.current.value;
    const emailRegex =
      /^([a-zA-Z0-9]+)([_.+\-{1}])?([a-zA-Z0-9]+)@([a-zA-Z0-9]+)([.])([a-zA-Z]+)$/g;
    if (emailRef === '') {
      setError({
        ...error,
        valid: {
          error: true,
          msg: errorMessages.emailRequired,
        },
      });
    } else if (!emailRegex.test(emailRef)) {
      setError({
        ...error,
        valid: {
          error: true,
          msg: errorMessages.emailRequired,
        },
      });
    } else {
      setError({
        ...error,
        valid: {
          error: false,
        },
      });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(
      email?.current?.value,
      { redirectTo: `${process.env.NEXT_PUBLIC_HOST_NAME}/reset-password` },
    );
    if (!error) {
      setLoading(false);
      setchangetext('Sent');
    } else {
      setLoading(false);
    }
  };
  return (
    <>
      <MainNav />
      <ForgotPassword
        slotForgotPasswordForm={
          <Box component='form' onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                inputRef={email}
                fullWidth
                onFocus={() =>
                  setError({
                    ...error,
                    valid: {
                      error: false,
                    },
                  })
                }
                onBlur={handleEmail}
                error={error.valid.error}
                helperText={error.valid.error ? error.valid.msg : ''}
                label='Email'
                id='Email'
                required
              />

              <AUIButton disabled={loading}>{changetext}</AUIButton>
              {/* <LoadingButton
                disableElevation
                loading={loading}
                type='submit'
                variant='create'
                size='large'
                sx={{
                  p: '8px 12px',
                  gap: 1,
                  alignItems: 'center',
                }}
                loadingIndicator={
                  <CircularProgress sx={{ color: 'white.700' }} size={20} />
                }
              >
                {changetext}
                {loading || changetext === 'Sent' ? (
                  <FileDownloadDoneIcon fontSize='small' />
                ) : (
                  <SvgIcon
                    variant={'PaperPlane'}
                    height={16}
                    color={palette.grey[100]}
                  />
                )}
              </LoadingButton> */}
            </Stack>
          </Box>
        }
      />
      {/* <Stack
        sx={{ cursor: 'pointer' }}
        onClick={() =>
          window.open(`${process.env.NEXT_PUBLIC_WEBSITE_URL}`, '_blank')
        }
      >
        <Stack
          sx={{
            position: 'absolute',
            top: 18,
            left: 135,
          }}
        >
          <BetaBadge />
        </Stack>
        <img
          src='/images/logo/blacklogo.svg'
          alt=''
          style={{
            height: '32px',
            width: '116px',
            padding: '20px',
            position: 'absolute',
            top: 0,
          }}
        />
      </Stack>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        height='100vh'
        maxWidth='600'
        spacing={4}
      >
        <Paper
          elevation={2}
          sx={{
            overflow: 'hidden',
            width: 450,
            borderRadius: '20px',
            boxShadow: 'none',
            border: `1px solid grey.300`,
          }}
        >
          <Box component='form' onSubmit={handleSubmit} p={5}>
            <Typography variant='h2' fontWeight={600} gutterBottom>
              Forgot Password
            </Typography>
            <Typography variant='body1'>
              Enter the email you used to create your account so we can send you
              instructions on how to reset your password.
            </Typography>

            <Stack
              spacing={2}
              mt={3}
              sx={{
                maxWidth: '100%',
              }}
            >
              <TextField
                inputRef={email}
                fullWidth
                onFocus={() =>
                  setError({
                    ...error,
                    valid: {
                      error: false,
                    },
                  })
                }
                onBlur={handleEmail}
                error={error.valid.error}
                helperText={error.valid.error ? error.valid.msg : ''}
                label='Email'
                id='Email'
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 100,
                  },
                }}
              />

              <LoadingButton
                disableElevation
                loading={loading}
                type='submit'
                variant='create'
                size='large'
                sx={{
                  p: '12px',
                  gap: 1,
                  alignItems: 'center',
                  fontSize: '16px',
                  lineHeight: '16px',
                  // '&.MuiLoadingButton-root': {
                  //   backgroundColor: loading ? '#000000' : '#000000',
                  // },
                }}
                loadingIndicator={
                  <CircularProgress sx={{ color: 'white.700' }} size={20} />
                }
              >
                {changetext}
                {loading || changetext === 'Sent' ? (
                  <FileDownloadDoneIcon fontSize='small' />
                ) : (
                  <SvgIcon
                    variant={'PaperPlane'}
                    height={16}
                    color={palette.grey[100]}
                  />
                )}
              </LoadingButton>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Link href='login' className='link'>
                  <Typography
                    variant='body1'
                    sx={{
                      color: 'black',
                      alignItems: 'center',
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    <SvgIcon variant={'ArrowLeft'} width='18px' height='18px' />
                    {'Back to Login'}
                  </Typography>
                </Link>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Stack> */}
    </>
  );
}
