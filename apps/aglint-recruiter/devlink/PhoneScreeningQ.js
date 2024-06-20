'use client';
import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './PhoneScreeningQ.module.css';

export function PhoneScreeningQ({
  as: _Component = _Builtin.Block,
  slotLogo,
  currentQuestionNo = '01',
  totalQuestionNo = '10',
  textQuestion = 'Have you completed the following degree: Bachelors Degree? ',
  slotInputAndButton,
  textDescription = 'Answer this by choosing an option',
  isDescriptionVisible = true,
  isSubmitButtonVisible = true,
  isOkDisable = true,
  isSubmitDisable = true,
  isBackVisible = true,
  slotButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, 'phone-screen-1')} tag='div'>
      <_Builtin.Block className={_utils.cx(_styles, 'div-block-671')} tag='div'>
        {slotLogo}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, 'div-block-669')} tag='div'>
        <_Builtin.Block tag='div'>{currentQuestionNo}</_Builtin.Block>
        <_Builtin.Block tag='div'>{'of'}</_Builtin.Block>
        <_Builtin.Block tag='div'>{totalQuestionNo}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'mt-23', 'gap-4')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'div-block-670')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'text-lg', 'fw-semibold')}
            tag='div'
          >
            {textQuestion}
          </_Builtin.Block>
        </_Builtin.Block>
        {isDescriptionVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, 'text-grey-600')}
            tag='div'
          >
            {textDescription}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'slot-input-phone')}
        tag='div'
      >
        {slotInputAndButton}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'psq-button-wrap')}
        tag='div'
      >
        {slotButton}
      </_Builtin.Block>
      {isSubmitButtonVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, 'div-block-704')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'text-grey-600')}
            tag='div'
          >
            {
              'By clicking submit button you will be submitting the form to the recruiter'
            }
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
