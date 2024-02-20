import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './PhoneScreening.module.css';

export function PhoneScreening({
  as: _Component = _Builtin.Block,
  slotWelcomeText,
  slotQuestions,
  slotEndText,
  slotInfo,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, 'screening-content-block')}
      tag='div'
    >
      <_Builtin.Block
        className={_utils.cx(_styles, 'screening-title-block')}
        tag='div'
      >
        <_Builtin.Block className={_utils.cx(_styles, 'fw-semibold')} tag='div'>
          {'Phone Screening'}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'text-gray-600', 'max-width-500')}
          tag='div'
        >
          {
            'These are the screening questions will be presented to the candidates, allowing them to complete the form with the questions listed below.'
          }
        </_Builtin.Block>
        <_Builtin.Block tag='div'>{slotInfo}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'screening-body')}
        tag='div'
      >
        <_Builtin.Block tag='div'>{slotWelcomeText}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'flex-v', 'gap-10')}
          tag='div'
        >
          {slotQuestions}
        </_Builtin.Block>
        <_Builtin.Block tag='div'>{slotEndText}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
