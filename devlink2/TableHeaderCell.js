import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './TableHeaderCell.module.css';

export function TableHeaderCell({
  as: _Component = _Builtin.Block,
  textDateMonth = '17 Mon',
}) {
  return (
    <_Component
      className={_utils.cx(_styles, 'table_header_cell')}
      id={_utils.cx(
        _styles,
        'w-node-b2a6fc15-2f0f-1530-3708-b163b06c70a0-b06c70a0',
      )}
      tag='div'
    >
      <_Builtin.Block tag='div'>{textDateMonth}</_Builtin.Block>
    </_Component>
  );
}
