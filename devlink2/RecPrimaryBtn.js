import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './RecPrimaryBtn.module.css';

export function RecPrimaryBtn({
  as: _Component = _Builtin.Block,
  isDisabled = false,
  isFocused = false,
  buttonText = 'Button',
  slotStartIcon,
  onClickButton = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, 'button-wrapper')}
      tag='div'
      {...onClickButton}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, 'button-block', 'primary', 'outlined')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'button-icon-2')}
          tag='div'
        >
          {slotStartIcon}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, 'button-text')} tag='div'>
          {buttonText}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'button-icon-2')}
          tag='div'
        />
      </_Builtin.Block>
      {isDisabled ? (
        <_Builtin.Block
          className={_utils.cx(_styles, 'button-block', 'disabled')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'button-icon-2')}
            tag='div'
          >
            {slotStartIcon}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'button-text')}
            tag='div'
          >
            {buttonText}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'button-icon-2')}
            tag='div'
          />
        </_Builtin.Block>
      ) : null}
      {isFocused ? (
        <_Builtin.Block
          className={_utils.cx(_styles, 'button-focused', 'primary')}
          tag='div'
        />
      ) : null}
    </_Component>
  );
}
