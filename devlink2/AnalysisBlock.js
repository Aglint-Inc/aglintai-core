import React from 'react';
import * as _Builtin from './_Builtin';
import { AnalysisPill } from './AnalysisPill';
import * as _utils from './utils';
import _styles from './AnalysisBlock.module.css';

export function AnalysisBlock({
  as: _Component = _Builtin.Block,
  title = '--',
  description = '--',
  slotAnalysisPill,
}) {
  return (
    <_Component className={_utils.cx(_styles, 'analysis-block')} tag='div'>
      <_Builtin.Block
        className={_utils.cx(_styles, 'analysis-header')}
        tag='div'
      >
        <_Builtin.Block tag='div'>{title}</_Builtin.Block>
        <_Builtin.Block tag='div'>
          {slotAnalysisPill ?? <AnalysisPill />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, 'text-gray-600')} tag='div'>
        {description}
      </_Builtin.Block>
    </_Component>
  );
}
