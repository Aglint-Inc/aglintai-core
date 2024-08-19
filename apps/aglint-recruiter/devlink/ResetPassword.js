'use client';
import React from 'react';
import * as _Builtin from './_Builtin';
import { Logo } from './Logo';
import { Text } from './Text';
import { ButtonGhost } from './ButtonGhost';
import * as _utils from './utils';
import _styles from './ResetPassword.module.css';

export function ResetPassword({
  as: _Component = _Builtin.Block,
  slotResetPasswordForm,
}) {
  return (
    <_Component className={_utils.cx(_styles, 'block')} tag='div'>
      <_Builtin.Block
        className={_utils.cx(_styles, 'forgot-password-wrapper')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'forgot-password-header-wrapper')}
          tag='div'
        >
          <Logo />
          <Text
            content='Reset Password'
            size='4'
            weight='bold'
            align=''
            highContrast=''
          />
          <Text
            content='Enter a new password to reset your account password.'
            size='1'
            weight=''
            align=''
            highContrast=''
            color='neutral-11'
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'forgot-password-slot')}
          tag='div'
        >
          {slotResetPasswordForm}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Link
        className={_utils.cx(_styles, 'back-link')}
        button={false}
        block='inline'
        options={{
          href: '/login',
        }}
      >
        <ButtonGhost
          isRightIcon={false}
          isLeftIcon={false}
          textButton='Back to Login'
          size='1'
          color='neutral'
        />
      </_Builtin.Link>
    </_Component>
  );
}
