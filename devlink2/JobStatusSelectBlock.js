import React from 'react';
import * as _Builtin from './_Builtin';
import { RecPrimaryBtn } from './RecPrimaryBtn';
import * as _utils from './utils';
import _styles from './JobStatusSelectBlock.module.css';

export function JobStatusSelectBlock({
  as: _Component = _Builtin.Block,
  onClickStart = {},
  isStartActive = true,
  onClickSchedule = {},
  isScheduleActive = false,
  isSchedule = true,
  slotBody,
  slotButtons,
  scheduleText = 'Schedule',
}) {
  return (
    <_Component
      className={_utils.cx(_styles, 'tog-dropdown-content-block')}
      tag='div'
    >
      <_Builtin.Block
        className={_utils.cx(_styles, 'radio-buttons-wrapper')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'radio-btn-field')}
          tag='div'
          {...onClickStart}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'radio-btn-icon-block')}
            tag='div'
          >
            {isStartActive ? (
              <_Builtin.Block
                className={_utils.cx(_styles, 'radio-btn-inner')}
                tag='div'
              />
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'radio-label')}
            tag='div'
          >
            {'Start now'}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'radio-btn-field')}
          tag='div'
          {...onClickSchedule}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'radio-btn-icon-block')}
            tag='div'
          >
            {isScheduleActive ? (
              <_Builtin.Block
                className={_utils.cx(_styles, 'radio-btn-inner')}
                tag='div'
              />
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'radio-label')}
            tag='div'
          >
            {scheduleText}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'tog-dropdown-main')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'date-picker-form')}
          tag='div'
        >
          {isSchedule ? (
            <_Builtin.Block
              className={_utils.cx(_styles, 'date-picker-wrapper')}
              tag='div'
            >
              {slotBody}
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, 'date-picker-btn-wrapper')}
            tag='div'
          >
            {slotButtons ?? <RecPrimaryBtn />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
