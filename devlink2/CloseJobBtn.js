import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './CloseJobBtn.module.css';

export function CloseJobBtn({
  as: _Component = _Builtin.Block,
  onClick = {},
  isDisabled = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, 'button-wrapper')}
      tag='div'
      {...onClick}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, 'button-block', 'danger')}
        tag='div'
      >
        <_Builtin.Block className={_utils.cx(_styles, 'button-text')} tag='div'>
          {'Close Job Permanently'}
        </_Builtin.Block>
      </_Builtin.Block>
      {isDisabled ? (
        <_Builtin.Block
          className={_utils.cx(_styles, 'button-block', 'disabled')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'button-text')}
            tag='div'
          >
            {'Close Job Permanently'}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
