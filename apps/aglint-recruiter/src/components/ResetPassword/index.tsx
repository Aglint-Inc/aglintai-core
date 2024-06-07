import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  FieldError,
  SubmitHandler,
  useForm,
  UseFormRegisterReturn,
} from 'react-hook-form';

import { ResetPassword } from '@/devlink/ResetPassword';
// import { errorMessages } from '@utils/errorMessages';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

// import Password from '../Common/Password';

interface resetFormInputs {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordComponent() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const formObject = useForm<resetFormInputs>({
    defaultValues: {
      password: null,
      confirmPassword: null,
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = formObject;
  // const newPassword = useRef();
  // const confirmPassword = useRef();
  // const [passwordError, setPasswordError] = useState({
  //   password: {
  //     error: false,
  //     userError: false,
  //     msg: 'The Two Passwords That You Entered Do Not Match!',
  //     userMsg: errorMessages.passwordRequired,
  //   },
  // });
  // const [confirmPasswordError, setconfirmPasswordError] = useState({
  //   password: {
  //     error: false,
  //   },
  // });

  // const handlePassword = () => {
  //   const value = newPassword?.current?.value;
  //   if (value.length < 8) {
  //     setconfirmPasswordError((prevError) => ({
  //       ...prevError,
  //       password: {
  //         error: true,
  //         msg: 'Password must be at least 8 characters long',
  //       },
  //     }));
  //     return true;
  //   } else if (!/[A-Z]/.test(value)) {
  //     setconfirmPasswordError((prevError) => ({
  //       ...prevError,
  //       password: {
  //         error: true,
  //         msg: 'Password must contain at least one uppercase letter',
  //       },
  //     }));
  //     return true;
  //   } else if (!/[a-z]/.test(value)) {
  //     setconfirmPasswordError((prevError) => ({
  //       ...prevError,
  //       password: {
  //         error: true,
  //         msg: 'Password must contain at least one lowercase letter',
  //       },
  //     }));
  //     return true;
  //   } else if (!/[0-9]/.test(value)) {
  //     setconfirmPasswordError((prevError) => ({
  //       ...prevError,
  //       password: {
  //         error: true,
  //         msg: 'Password must contain at least one number',
  //       },
  //     }));
  //     return true;
  //   } else if (!/[!@#$%^&*.|]/.test(value)) {
  //     setconfirmPasswordError((prevError) => ({
  //       ...prevError,
  //       password: {
  //         error: true,
  //         msg: 'Password must contain at least one special character',
  //       },
  //     }));
  //     return true;
  //   } else {
  //     setconfirmPasswordError((prevError) => ({
  //       ...prevError,
  //       password: {
  //         error: false,
  //         userError: false,
  //         msg: '',
  //       },
  //     }));
  //   }
  //   return false;
  // };
  // const handleSubmit = async (event) => {
  //   try {
  //     event.preventDefault();
  //     if (newPassword?.current?.value == confirmPassword?.current?.value) {
  //       const { error } = await supabase.auth.updateUser({
  //         password: confirmPassword?.current?.value,
  //         data: { is_invite: 'false' }, // for invite user flow this is needed
  //       });
  //       if (!error) {
  //         toast.success('Password reset successful');
  //         const { data: user } = await supabase.auth.getSession();
  //         const { data, error } = await supabase
  //           .from('recruiter_user')
  //           .select('*')
  //           .eq('user_id', user.session.user.id);

  //         if (error) {
  //           throw error;
  //         }
  //         if (data[0].role === 'interviewer') {
  //           router.push(`${pages.SCHEDULING}?tab=mySchedules`);
  //           return null;
  //         } else {
  //           router.push(pages.DASHBOARD);
  //         }
  //         router.push(pages.DASHBOARD);
  //       } else {
  //         if (
  //           error == 'AuthApiError: Password should be at least 8 characters'
  //         ) {
  //           setPasswordError({
  //             ...passwordError,
  //             password: {
  //               ...passwordError.password,
  //               userError: true,
  //               error: false,
  //             },
  //           });
  //           setconfirmPasswordError({
  //             ...confirmPasswordError,
  //             password: {
  //               ...confirmPasswordError.password,
  //               error: true,
  //             },
  //           });
  //         } else {
  //           toast.error(error.message);
  //         }
  //       }
  //     } else {
  //       setPasswordError({
  //         ...passwordError,
  //         password: {
  //           ...passwordError.password,
  //           error: true,
  //           userError: false,
  //         },
  //       });
  //       setconfirmPasswordError({
  //         ...confirmPasswordError,
  //         password: {
  //           ...confirmPasswordError.password,
  //           error: true,
  //         },
  //       });
  //     }
  //   } catch (e) {
  //     toast.error('Something went wrong. Please try again later');
  //   }
  // };
  const onSubmit: SubmitHandler<resetFormInputs> = async ({
    confirmPassword,
  }) => {
    const { error } = await supabase.auth.updateUser({
      password: confirmPassword,
      data: { is_invite: 'false' }, // for invite user flow this is needed
    });
    if (!error) {
      toast.success('Password reseted  successfully.');
      router.push(ROUTES['/loading']());
    } else {
      toast.error(error.message);
    }
  };

  const form = {
    password: register('password', {
      required: 'Password is required',
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          'Password must contain at least 8 characters, including UPPER/lowercase, one number and special characters',
      },
    }),
    confirmPassword: register('confirmPassword', {
      required: 'Confirm Password is required',
      validate: (value) => {
        {
          return (
            value === watch('password') || 'The passwords are not matching.'
          );
        }
      },
    }),
  };

  useEffect(() => {
    try {
      const tempObj =
        router.asPath
          .slice(router.asPath.indexOf('#'))
          .replaceAll('=', '":"')
          .replaceAll('&', '","')
          .replaceAll('#', '{"') + '"}';
      const tempCreds = JSON.parse(tempObj);
      tempCreds.access_token &&
        supabase.auth.setSession({
          access_token: tempCreds.access_token,
          refresh_token: tempCreds.refresh_token,
        });
    } catch (e) {
      //
    }
  }, []);

  return (
    <>
      <ResetPassword
        slotResetPasswordForm={
          <Stack component='form' onSubmit={handleSubmit(onSubmit)} spacing={2}>
            <Stack spacing={2}>
              {/* <Password
                validate={handlePassword}
                passwordRef={newPassword}
                error={confirmPasswordError}
                setError={setconfirmPasswordError}
              />

              <Password
                validate={handlePassword}
                passwordRef={confirmPassword}
                label='Confirm Password'
                error={passwordError}
                setError={setPasswordError}
              /> */}
              <CustomFormField
                field={form.password}
                placeholder='Password'
                type={showPassword ? 'text' : 'password'}
                error={errors.password}
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
              />
              <CustomFormField
                field={form.confirmPassword}
                placeholder='Confirm Password'
                type={showPassword ? 'text' : 'password'}
                error={errors.confirmPassword}
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
              />
            </Stack>
            <Button
              variant='contained'
              color='primary'
              size='medium'
              // onClick={handleSubmit}
              type='submit'
            >
              Reset password
            </Button>
          </Stack>
        }
      />
    </>
  );
}

const CustomFormField = ({
  type,
  multiLine,
  placeholder,
  field,
  error,
  showPassword,
  handleClickShowPassword,
}: {
  type?: HTMLInputElement['type'];
  multiLine?: boolean;
  placeholder: string;
  field: UseFormRegisterReturn;
  error?: FieldError;
  showPassword?: boolean;
  handleClickShowPassword?: any;
}) => {
  return (
    <TextField
      {...field}
      id={field.name}
      fullWidth
      minRows={3}
      maxRows={5}
      multiline={multiLine}
      placeholder={placeholder}
      type={type ? type : 'text'}
      error={error && Boolean(error.message)}
      helperText={String(error?.message || '')}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              edge='end'
            >
              <EyeIcon showPassword={showPassword}></EyeIcon>
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export const EyeIcon = ({ showPassword }) => {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {showPassword ? (
        <path
          d='M3.49219 4.6875C2.99219 5.17188 2.57031 5.66406 2.22656 6.16406C1.89844 6.66406 1.65625 7.10938 1.5 7.5C1.65625 7.89062 1.89844 8.33594 2.22656 8.83594C2.57031 9.33594 2.99219 9.82812 3.49219 10.3125C4.00781 10.7969 4.59375 11.1953 5.25 11.5078C5.92188 11.8203 6.67188 11.9844 7.5 12C8.32812 11.9844 9.07812 11.8203 9.75 11.5078C10.4062 11.1953 10.9922 10.7969 11.5078 10.3125C12.0078 9.82812 12.4297 9.33594 12.7734 8.83594C13.1016 8.33594 13.3438 7.89062 13.5 7.5C13.3438 7.10938 13.1016 6.66406 12.7734 6.16406C12.4297 5.66406 12.0078 5.17188 11.5078 4.6875C10.9922 4.20312 10.4062 3.80469 9.75 3.49219C9.07812 3.17969 8.32812 3.01563 7.5 3C6.67188 3.01563 5.92188 3.17969 5.25 3.49219C4.59375 3.80469 4.00781 4.20312 3.49219 4.6875ZM7.5 2.25C8.45312 2.26563 9.30469 2.45313 10.0547 2.8125C10.8047 3.17187 11.4609 3.61719 12.0234 4.14844C12.5703 4.66406 13.0234 5.19531 13.3828 5.74219C13.7422 6.28906 14.0156 6.78125 14.2031 7.21875C14.2812 7.40625 14.2812 7.59375 14.2031 7.78125C14.0156 8.21875 13.7422 8.71094 13.3828 9.25781C13.0234 9.80469 12.5703 10.3359 12.0234 10.8516C11.4609 11.3828 10.8047 11.8281 10.0547 12.1875C9.30469 12.5469 8.45312 12.7344 7.5 12.75C6.54688 12.7344 5.69531 12.5469 4.94531 12.1875C4.19531 11.8281 3.53906 11.3828 2.97656 10.8516C2.42969 10.3359 1.97656 9.80469 1.61719 9.25781C1.25781 8.71094 0.992188 8.21875 0.820312 7.78125C0.742188 7.59375 0.742188 7.40625 0.820312 7.21875C0.992188 6.78125 1.25781 6.28906 1.61719 5.74219C1.97656 5.19531 2.42969 4.66406 2.97656 4.14844C3.53906 3.61719 4.19531 3.17187 4.94531 2.8125C5.69531 2.45313 6.54688 2.26563 7.5 2.25ZM5.25 7.5C5.25 7.90625 5.35156 8.28125 5.55469 8.625C5.75781 8.96875 6.03125 9.24219 6.375 9.44531C6.73438 9.64844 7.10938 9.75 7.5 9.75C7.89062 9.75 8.26562 9.64844 8.625 9.44531C8.96875 9.24219 9.24219 8.96875 9.44531 8.625C9.64844 8.28125 9.75 7.90625 9.75 7.5C9.75 7.09375 9.64844 6.71875 9.44531 6.375C9.24219 6.03125 8.96875 5.75781 8.625 5.55469C8.26562 5.35156 7.89062 5.25 7.5 5.25C7.10938 5.25 6.73438 5.35156 6.375 5.55469C6.03125 5.75781 5.75781 6.03125 5.55469 6.375C5.35156 6.71875 5.25 7.09375 5.25 7.5ZM10.5 7.5C10.5 8.04688 10.3672 8.54688 10.1016 9C9.83594 9.45312 9.46875 9.82031 9 10.1016C8.53125 10.3672 8.03125 10.5 7.5 10.5C6.96875 10.5 6.46875 10.3672 6 10.1016C5.53125 9.82031 5.16406 9.45312 4.89844 9C4.63281 8.54688 4.5 8.04688 4.5 7.5C4.5 6.95312 4.63281 6.45312 4.89844 6C5.16406 5.54688 5.53125 5.17969 6 4.89844C6.46875 4.63281 6.96875 4.5 7.5 4.5C8.03125 4.5 8.53125 4.63281 9 4.89844C9.46875 5.17969 9.83594 5.54688 10.1016 6C10.3672 6.45312 10.5 6.95312 10.5 7.5Z'
          fill='#2F3941'
        />
      ) : (
        <path
          d='M1.60938 1.57031L15.8594 12.8438C16.0312 13 16.0547 13.1719 15.9297 13.3594C15.7578 13.5312 15.5781 13.5547 15.3906 13.4297L1.14062 2.17969C0.96875 2.00781 0.945312 1.82812 1.07031 1.64062C1.24219 1.48437 1.42188 1.46094 1.60938 1.57031ZM15.2031 7.78125C14.9531 8.39062 14.5312 9.08594 13.9375 9.86719L13.3516 9.42188C13.8984 8.6875 14.2812 8.04688 14.5 7.5C14.3438 7.10938 14.1016 6.66406 13.7734 6.16406C13.4297 5.66406 13.0078 5.17188 12.5078 4.6875C11.9922 4.20312 11.4062 3.80469 10.75 3.49219C10.0781 3.17969 9.32812 3.01563 8.5 3C7.5625 3.01563 6.72656 3.21875 5.99219 3.60938L5.35938 3.11719C6.25 2.57031 7.29688 2.28125 8.5 2.25C9.45312 2.26563 10.3047 2.45313 11.0547 2.8125C11.8047 3.17187 12.4609 3.61719 13.0234 4.14844C13.5703 4.66406 14.0234 5.19531 14.3828 5.74219C14.7422 6.28906 15.0156 6.78125 15.2031 7.21875C15.2656 7.40625 15.2656 7.59375 15.2031 7.78125ZM3.0625 5.13281L3.67188 5.60156C3.10938 6.32031 2.71875 6.95312 2.5 7.5C2.65625 7.89062 2.89844 8.33594 3.22656 8.83594C3.57031 9.33594 3.99219 9.82812 4.49219 10.3125C5.00781 10.7969 5.59375 11.1953 6.25 11.5078C6.92188 11.8203 7.67188 11.9844 8.5 12C9.4375 11.9844 10.2734 11.7812 11.0078 11.3906L11.6406 11.8828C10.75 12.4297 9.70312 12.7188 8.5 12.75C7.54688 12.7344 6.69531 12.5469 5.94531 12.1875C5.19531 11.8281 4.54688 11.3828 4 10.8516C3.4375 10.3359 2.97656 9.80469 2.61719 9.25781C2.25781 8.71094 1.99219 8.21875 1.82031 7.78125C1.74219 7.59375 1.74219 7.40625 1.82031 7.21875C2.05469 6.60938 2.46875 5.91406 3.0625 5.13281ZM8.5 10.5C7.65625 10.4844 6.94531 10.1875 6.36719 9.60938C5.80469 9.04688 5.51562 8.34375 5.5 7.5C5.5 7.34375 5.50781 7.19531 5.52344 7.05469L6.25 7.64062C6.29688 8.23438 6.53125 8.73438 6.95312 9.14062C7.375 9.53125 7.89062 9.73438 8.5 9.75C8.625 9.75 8.75781 9.74219 8.89844 9.72656L9.60156 10.2891C9.25781 10.4297 8.89062 10.5 8.5 10.5ZM11.5 7.5C11.5 7.65625 11.4922 7.80469 11.4766 7.94531L10.75 7.35938C10.7031 6.76562 10.4688 6.26562 10.0469 5.85938C9.625 5.46875 9.10938 5.26562 8.5 5.25C8.375 5.25 8.25 5.26562 8.125 5.29688L7.39844 4.71094C7.74219 4.57031 8.10938 4.5 8.5 4.5C9.34375 4.51562 10.0547 4.80469 10.6328 5.36719C11.1953 5.94531 11.4844 6.65625 11.5 7.5Z'
          fill='#2F3941'
        />
      )}
    </svg>
  );
};
