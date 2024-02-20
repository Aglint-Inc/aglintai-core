import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './AssessmentLevel.module.css';

export function AssessmentLevel({
  as: _Component = _Builtin.Block,
  slotLevelIcon,
  textLevel = 'Intermediate',
}) {
  return (
    <_Component className={_utils.cx(_styles, 'assesment_level')} tag='div'>
      <_Builtin.Block
        className={_utils.cx(_styles, 'assessment_level_bars')}
        tag='div'
      >
        {slotLevelIcon ?? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, 'embed_flex')}
            value='%3Csvg%20width%3D%2216%22%20height%3D%2214%22%20viewBox%3D%220%200%2016%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20y%3D%220.5%22%20width%3D%224%22%20height%3D%2213%22%20rx%3D%222%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3Crect%20x%3D%226%22%20y%3D%220.5%22%20width%3D%224%22%20height%3D%2213%22%20rx%3D%222%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3Crect%20x%3D%2212%22%20y%3D%220.5%22%20width%3D%224%22%20height%3D%2213%22%20rx%3D%222%22%20fill%3D%22%23E9EBED%22%2F%3E%0A%3C%2Fsvg%3E'
          />
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'text-sm', 'fw-semibold', 'text_camel')}
        tag='div'
      >
        {textLevel}
      </_Builtin.Block>
    </_Component>
  );
}
