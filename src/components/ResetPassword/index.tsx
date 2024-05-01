import { Button, Stack, TextField } from '@mui/material';
// import { errorMessages } from '@utils/errorMessages';
import { pageRoutes } from '@utils/pageRouting';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  FieldError,
  SubmitHandler,
  useForm,
  UseFormRegisterReturn,
} from 'react-hook-form';

import { ResetPassword } from '@/devlink';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

// import Password from '../Common/Password';

interface resetFormInputs {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordComponent() {
  const router = useRouter();
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
  //           router.push(`${pageRoutes.SCHEDULING}?tab=mySchedules`);
  //           return null;
  //         } else {
  //           router.push(pageRoutes.DASHBOARD);
  //         }
  //         router.push(pageRoutes.DASHBOARD);
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
      toast.success('Password reset successful.');
      router.push(pageRoutes.LOADING);
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
                type='password'
                error={errors.password}
              />
              <CustomFormField
                field={form.confirmPassword}
                placeholder='Confirm Password'
                type='password'
                error={errors.confirmPassword}
              />
            </Stack>
            <Button
              variant='contained'
              color='info'
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
}: {
  type?: HTMLInputElement['type'];
  multiLine?: boolean;
  placeholder: string;
  field: UseFormRegisterReturn;
  error?: FieldError;
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
    />
  );
};
