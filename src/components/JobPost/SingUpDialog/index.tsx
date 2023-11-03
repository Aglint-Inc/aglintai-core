import {
  Dialog,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { useRef, useState } from 'react';

import { JobPostPop } from '@/devlink';
import { IconLock } from '@/src/components/Icons/IconLock';
import { IconUnlock } from '@/src/components/Icons/IconUnlock';
import { palette } from '@/src/context/Theme/Theme';
import { errorMessages } from '@/src/utils/errorMessages';
import toast from '@/src/utils/toast';
import { handleEmail, handlePassword } from '@/src/utils/validation/validation';
import { supabase } from '@/supabaseClient';

function SingUpDialog({ openDialog, setOpenDialog, application }) {
  const passwordRef = useRef<any>();
  const nameRef = useRef<any>();
  const emailRef = useRef<any>();
  const [showPassword, setShowPassword] = useState<any>(false);
  const [signUpError, setSignUpError] = useState<any>({
    name: {
      error: false,
      msg: '',
    },
    email: {
      error: false,
      msg: '',
    },
    password: {
      error: false,
      msg: errorMessages.passwordRequired,
    },
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    if (nameRef.current.value) {
      signUpError.name = {
        error: false,
        msg: '',
      };
      setSignUpError({ ...signUpError });
    } else {
      signUpError.name = {
        error: true,
        msg: errorMessages.nameRequired,
      };
      setSignUpError({ ...signUpError });
    }
    const emailValid = handleEmail(emailRef.current.value);
    if (!emailValid.isValid) {
      signUpError.email = {
        error: true,
        msg: emailValid.error,
      };
      setSignUpError({ ...signUpError });
    } else {
      signUpError.email = {
        error: false,
        msg: '',
      };
      setSignUpError({ ...signUpError });
    }
    const passwordValid = handlePassword(passwordRef.current.value);
    if (!passwordValid.isValid) {
      signUpError.password = {
        error: true,
        msg: passwordValid.error,
      };
      setSignUpError({ ...signUpError });
    } else {
      signUpError.password = {
        error: false,
        msg: '',
      };
      setSignUpError({ ...signUpError });
    }
    return (
      emailValid.isValid && passwordValid.isValid && !!nameRef.current.value
    );
  };

  const oauthHandler = async (provider) => {
    if (typeof window !== 'undefined')
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: provider,
          options: {
            redirectTo: `https://app.aglinthq.com/loading`,
          },
        });

        if (error) {
          toast.error(
            'Sorry unable to signup. Try signup using different methods'
          );
        }
      } catch (err) {
        toast.error(
          'Sorry unable to signup. Try signup using different methods'
        );
      }
  };

  const authHandler = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
      options: {
        data: {
          name: nameRef?.current?.value,
          role: 'Employee',
        },
      },
    });

    if (!error) {
      try {
        window.location.href = `http://app.aglinthq.com/loading?access_token=${data.session.access_token}&refresh_token=${data.session.refresh_token}&token_type=${data.session.token_type}`;
      } catch (error) {
        // console.log(error);
      } finally {
        //
      }
    } else {
      signUpError.email = { error: true, msg: error.message };
      setSignUpError({ ...signUpError });
    }
  };

  const handelSignUp = async () => {
    if (validate()) {
      authHandler();
    }
  };

  return (
    <div>
      <Dialog
        onClose={() => setOpenDialog(false)}
        open={openDialog}
        PaperProps={{ sx: { borderRadius: '20px', border: 'none' } }}
      >
        <JobPostPop
          onClickGoogle={{
            onClick: () => {
              oauthHandler('google');
            },
          }}
          onClickLinkedin={{
            onClick: () => {
              oauthHandler('linkedin');
            },
          }}
          slotForm={
            <Stack spacing={0.5}>
              <TextField
                defaultValue={
                  application
                    ? `${application[0]?.first_name} ${application[0]?.last_name}`
                    : ''
                }
                margin='none'
                sx={style}
                required
                fullWidth
                id='name'
                variant='outlined'
                placeholder='Full Name'
                inputRef={nameRef}
                error={signUpError.name.error}
                helperText={signUpError.name.error ? signUpError.name.msg : ''}
                inputProps={{
                  autoCapitalize: 'true',
                  style: {
                    fontSize: '14px',
                  },
                }}
              />
              <TextField
                defaultValue={application ? application[0]?.email : ''}
                variant='outlined'
                margin='none'
                required
                fullWidth
                sx={style}
                id='email'
                placeholder='Email'
                name='email'
                autoComplete='email'
                inputRef={emailRef}
                error={signUpError.email.error || signUpError.email.userError}
                helperText={
                  signUpError.email.error
                    ? signUpError.email.msg
                    : signUpError.email.userError
                    ? signUpError.email.userMsg
                    : ''
                }
                inputProps={{
                  autoCapitalize: 'true',
                  style: {
                    fontSize: '14px',
                  },
                }}
              />
              <TextField
                sx={style}
                required
                margin='none'
                fullWidth
                variant='outlined'
                name='password'
                type={showPassword ? 'text' : 'password'}
                placeholder={'Password'}
                autoComplete='current-password'
                id='password'
                error={signUpError.password.error}
                helperText={
                  signUpError.password.error ? signUpError.password.msg : ''
                }
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <IconUnlock /> : <IconLock />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                inputRef={passwordRef}
                inputProps={{
                  autoCapitalize: 'true',
                  style: {
                    fontSize: '14px',
                  },
                }}
              />
            </Stack>
          }
          onClickSignUp={{
            onClick: () => {
              handelSignUp();
            },
          }}
        />
      </Dialog>
    </div>
  );
}

export default SingUpDialog;

export const style = {
  height: '64px',
  '& .MuiInputBase-input + fieldset': {
    border: '1px solid #FFEEDB',
  },
  '& .MuiInputBase-root': {
    bgcolor: '#fff',
    color: palette.black[700],
    borderRadius: '4px',
    border: '1px solid #FFEEDB',
  },
  '& .MuiFormHelperText-root': {
    marginTop: '0px',
  },
  '& .MuiOutlinedInput-root': {
    py: '4px !important',
    fieldset: {
      border: `1px solid #FFEEDB !important`,
    },
    '&:hover fieldset': {
      border: `1px solid #FFEEDB !important`,
    },
    '&': {
      outline: `transparent`,
    },
  },
};
