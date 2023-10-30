import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './ButtonAiDefaultLarge.module.css';

export function ButtonAiDefaultLarge({
  as: _Component = _Builtin.Block,
  endIconSlot,
  buttonText = 'Button',
  startIconSlot,
  buttonProps = {},
  isFocused = false,
  isDisabled = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, 'button-wrapper')}
      tag='div'
      {...buttonProps}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, 'button-block', 'ai', 'default', 'large')}
        tag='div'
      >
        <_Builtin.Block className={_utils.cx(_styles, 'button-icon')} tag='div'>
          {startIconSlot}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, 'button-text')} tag='div'>
          {buttonText}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, 'button-icon')} tag='div'>
          {endIconSlot}
        </_Builtin.Block>
      </_Builtin.Block>
      {isDisabled ? (
        <_Builtin.Block
          className={_utils.cx(_styles, 'button-block', 'disabled', 'large')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'button-icon')}
            tag='div'
          >
            {startIconSlot}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'button-text')}
            tag='div'
          >
            {buttonText}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'button-icon')}
            tag='div'
          >
            {endIconSlot}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isFocused ? (
        <_Builtin.Block
          className={_utils.cx(_styles, 'button-focused', 'ai')}
          tag='div'
        />
      ) : null}
    </_Component>
  );
}
