import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  type FieldError,
  type SubmitHandler,
  type UseFormRegisterReturn,
  useForm,
} from 'react-hook-form';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ResetPassword } from '@/devlink/ResetPassword';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import Footer from '../Common/Footer';

interface ResetFormInputs {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordComponent() {
  const router = useRouterPro();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetFormInputs>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<ResetFormInputs> = async ({
    confirmPassword,
  }) => {
    const { error } = await supabase.auth.updateUser({
      password: confirmPassword,
      data: { is_invite: 'false' },
    });

    if (!error) {
      toast.success('Password reset successfully.');
      router.push(ROUTES['/loading']());
    } else {
      toast.error(error.message);
    }
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

      if (tempCreds.access_token) {
        supabase.auth.setSession({
          access_token: tempCreds.access_token,
          refresh_token: tempCreds.refresh_token,
        });
      }
    } catch (e) {
      // Handle error
    }
  }, [router]);

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
      validate: (value) =>
        value === watch('password') || 'The passwords are not matching.',
    }),
  };

  return (
    <Container
      maxWidth={false}
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
        <ResetPassword
          slotResetPasswordForm={
            <Stack
              component='form'
              onSubmit={handleSubmit(onSubmit)}
              spacing={2}
            >
              <Stack spacing={1}>
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
              <ButtonSolid
                isLeftIcon={false}
                isRightIcon={false}
                onClickButton={{
                  onClick: () => handleSubmit(onSubmit)(),
                }}
                textButton='Reset'
                size='2'
              />
            </Stack>
          }
        />
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

export const CustomFormField = ({
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
      minRows={multiLine ? 3 : undefined}
      maxRows={multiLine ? 5 : undefined}
      multiline={multiLine}
      placeholder={placeholder}
      type={type || 'text'}
      error={Boolean(error?.message)}
      helperText={error?.message || ''}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              edge='end'
            >
              {showPassword ? (
                <GlobalIcon iconName='visibility' />
              ) : (
                <GlobalIcon iconName='visibility_off' />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
