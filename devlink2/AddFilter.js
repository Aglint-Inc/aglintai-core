import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './AddFilter.module.css';

export function AddFilter({
  as: _Component = _Builtin.Block,
  onClickAddFilter = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, 'div-block-829', 'cursor-pointer')}
      tag='div'
      {...onClickAddFilter}
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, 'icons')}
        value='%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.0625%203.6875V7.4375H11.8125C12.1562%207.46875%2012.3438%207.65625%2012.375%208C12.3438%208.34375%2012.1562%208.53125%2011.8125%208.5625H8.0625V12.3125C8.03125%2012.6562%207.84375%2012.8438%207.5%2012.875C7.15625%2012.8438%206.96875%2012.6562%206.9375%2012.3125V8.5625H3.1875C2.84375%208.53125%202.65625%208.34375%202.625%208C2.65625%207.65625%202.84375%207.46875%203.1875%207.4375H6.9375V3.6875C6.96875%203.34375%207.15625%203.15625%207.5%203.125C7.84375%203.15625%208.03125%203.34375%208.0625%203.6875Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E'
      />
      <_Builtin.Block
        className={_utils.cx(_styles, 'text-blue-500-2')}
        tag='div'
      >
        {'Add filter'}
      </_Builtin.Block>
    </_Component>
  );
}
