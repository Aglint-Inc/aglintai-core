import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './ButtonWide.module.css';

export function ButtonWide({
  as: _Component = _Builtin.Block,
  isEnabled = false,
  isLoading = false,
  slotLoader,
  textButton = 'Create Panel',
  onClickButton = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, 'wide_button')} tag='div'>
      <_Builtin.Block
        className={_utils.cx(_styles, 'button_primary', 'is_disabled')}
        tag='div'
      >
        <_Builtin.Block tag='div'>{textButton}</_Builtin.Block>
      </_Builtin.Block>
      {isEnabled ? (
        <_Builtin.Block
          className={_utils.cx(_styles, 'button_primary', 'is_enabled')}
          tag='div'
          {...onClickButton}
        >
          <_Builtin.Block tag='div'>{textButton}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isLoading ? (
        <_Builtin.Block
          className={_utils.cx(_styles, 'button_primary', 'is_loading')}
          tag='div'
        >
          <_Builtin.Block tag='div'>{slotLoader}</_Builtin.Block>
          <_Builtin.Block tag='div'>{'Loading..'}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
