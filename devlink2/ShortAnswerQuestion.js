import React from 'react';
import * as _Builtin from './_Builtin';
import { RcCheckbox } from './RcCheckbox';
import * as _utils from './utils';
import _styles from './ShortAnswerQuestion.module.css';

export function ShortAnswerQuestion({
  as: _Component = _Builtin.Block,
  slotQuestionInput,
  slotAnswerInput,
  slotToggle,
  slotDescriptionTextArea,
  slotDurationInput,
  slotRcCheckbox,
}) {
  return (
    <_Component className={_utils.cx(_styles, 'question_block')} tag='div'>
      <_Builtin.Block className={_utils.cx(_styles, 'ps_row')} tag='div'>
        <_Builtin.Block
          className={_utils.cx(_styles, 'text-gray-600')}
          tag='div'
        >
          {'Question'}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'ps_input_slot')}
          tag='div'
        >
          {slotQuestionInput}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'ps_row', 'is_left_fles')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'text-gray-600')}
          tag='div'
        >
          {'Expected Answer'}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'ps_input_slot', 'option_flex')}
          tag='div'
        >
          {slotAnswerInput}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, 'ps_row')} tag='div'>
        <_Builtin.Block
          className={_utils.cx(_styles, 'text-gray-600')}
          tag='div'
        >
          {'Description'}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, 'toggle_flex')} tag='div'>
          <_Builtin.Block
            className={_utils.cx(_styles, 'slot_toggle')}
            tag='div'
          >
            {slotToggle}
          </_Builtin.Block>
          <_Builtin.Block tag='div'>{'Show Description'}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'ps_input_slot', 'is_flex')}
          tag='div'
        >
          {slotDescriptionTextArea}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, 'ps_row')} tag='div'>
        <_Builtin.Block
          className={_utils.cx(_styles, 'text-gray-600')}
          tag='div'
        >
          {'Duration'}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'input_relative')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'ps_input_slot')}
            tag='div'
          >
            {slotDurationInput}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'input_absolute')}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'text-gray-600')}
              tag='div'
            >
              {'Minutes'}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, 'ps_row')} tag='div'>
        <_Builtin.Block tag='div'>
          {slotRcCheckbox ?? <RcCheckbox />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'text-gray-600')}
          tag='div'
        >
          {'If marked as required, candidates must answer this question.'}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
