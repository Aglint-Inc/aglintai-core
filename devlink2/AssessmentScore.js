import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './AssessmentScore.module.css';

export function AssessmentScore({
  as: _Component = _Builtin.Block,
  textScore = '--',
  props = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, 'assessment-score')}
      tag='div'
      {...props}
    >
      <_Builtin.Block className={_utils.cx(_styles, 'icon-block')} tag='div'>
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, 'html-embed')}
          value='%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3DcurrentColor%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.52178%204.5H6.38928L7.85928%201.71C7.90428%201.5975%207.85178%201.5%207.73178%201.5H5.54178C5.42178%201.5%205.28678%201.5975%205.24178%201.71L4.14678%204.26C4.09428%204.38%204.14678%204.5%204.26678%204.5H5.24928L4.18428%207.5525C4.10178%207.77%204.16178%207.9575%204.43928%207.71L7.53678%204.7925C7.70928%204.62%207.70178%204.5%207.52178%204.5ZM2.99996%2011.0947L5.84467%208.25H11.25V0.75H0.75V8.25H3V8.625L2.99996%2011.0947ZM2.25%209H0.75C0.332893%209%200%208.66711%200%208.25V0.75C0%200.332893%200.332893%200%200.75%200H11.25C11.6671%200%2012%200.332893%2012%200.75V8.25C12%208.66711%2011.6671%209%2011.25%209H6.15533L3.52504%2011.6303C3.31076%2011.8404%202.99188%2011.9025%202.7144%2011.7882C2.43692%2011.674%202.25425%2011.4053%202.25%2011.1V9Z%22%2F%3E%0A%3C%2Fsvg%3E'
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'assessment-score-text')}
        tag='div'
      >
        {textScore}
      </_Builtin.Block>
    </_Component>
  );
}
