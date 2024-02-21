import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './SidebarBlockNotScheduled.module.css';

export function SidebarBlockNotScheduled({
  as: _Component = _Builtin.Block,
  onClickSchedule = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, 'div-block-843')} tag='div'>
      <_Builtin.Block className={_utils.cx(_styles, 'not_scheduler')} tag='div'>
        <_Builtin.Block tag='div'>{'Not Scheduled'}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag='div'>
        {'You haven’t scheduled interview with this candidate yet.'}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'text-underline', 'text-blue-500')}
        tag='div'
        {...onClickSchedule}
      >
        {'Schedule Now'}
      </_Builtin.Block>
    </_Component>
  );
}
