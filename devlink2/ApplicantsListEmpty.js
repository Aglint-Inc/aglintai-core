import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './ApplicantsListEmpty.module.css';

export function ApplicantsListEmpty({
  as: _Component = _Builtin.Block,
  slotLottie,
  textEmpty = 'applied',
}) {
  return (
    <_Component
      className={_utils.cx(_styles, 'cdd-list-empty-block')}
      tag='div'
    >
      <_Builtin.Block
        className={_utils.cx(_styles, 'cdd-list-empty-lottie-block')}
        tag='div'
      >
        {slotLottie}
      </_Builtin.Block>
      <_Builtin.Block tag='div'>
        <_Builtin.Block
          className={_utils.cx(_styles, 'inline-block')}
          tag='div'
        >
          {'No'}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'inline-block')}
          tag='div'
        >
          {textEmpty}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'inline-block')}
          tag='div'
        >
          {'candidates found.'}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
