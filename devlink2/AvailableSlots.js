import React from 'react';

import _styles from './AvailableSlots.module.css';

import * as _Builtin from './_Builtin';
import * as _utils from './utils';

export function AvailableSlots({
  as: _Component = _Builtin.Block,
  slotLoadedSlotPill,
  textMonth = 'Feb',
  textDate = '27',
  textDay = 'Wednesday',
}) {
  return (
    <_Component className={_utils.cx(_styles, 'div-block-956')} tag='div'>
      <_Builtin.Block className={_utils.cx(_styles, 'date-wrap-box')} tag='div'>
        <_Builtin.Block className={_utils.cx(_styles, 'text-sm')} tag='div'>
          {textMonth}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'text-xl', 'fw-semibold')}
          tag='div'
        >
          {textDate}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'text-sm', 'fw-semibold')}
          tag='div'
        >
          {textDay}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-973")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-957")}
          tag="div"
        >
          {slotLoadedSlotPill}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
