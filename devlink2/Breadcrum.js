import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './Breadcrum.module.css';

export function Breadcrum({
  as: _Component = _Builtin.Block,
  onClickLink = {},
  isLink = false,
  textName = 'Scheduler',
  showArrow = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, 'breadcrum_element')} tag='div'>
      {showArrow ? (
        <_Builtin.Block className={_utils.cx(_styles, 'arrow_svg')} tag='div'>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, 'embed_flex')}
            value='%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.64645%2010.3536C3.47288%2010.18%203.4536%209.91056%203.58859%209.71569L3.64645%209.64645L7.293%206L3.64645%202.35355C3.47288%202.17999%203.4536%201.91056%203.58859%201.71569L3.64645%201.64645C3.82001%201.47288%204.08944%201.4536%204.28431%201.58859L4.35355%201.64645L8.35355%205.64645C8.52712%205.82001%208.5464%206.08944%208.41141%206.28431L8.35355%206.35355L4.35355%2010.3536C4.15829%2010.5488%203.84171%2010.5488%203.64645%2010.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E'
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, 'fw-semibold')} tag='div'>
        {textName}
      </_Builtin.Block>
      {isLink ? (
        <_Builtin.Block
          className={_utils.cx(_styles, 'is_active_link')}
          tag='div'
        >
          {showArrow ? (
            <_Builtin.Block
              className={_utils.cx(_styles, 'arrow_svg')}
              tag='div'
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, 'embed_flex')}
                value='%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.64645%2010.3536C3.47288%2010.18%203.4536%209.91056%203.58859%209.71569L3.64645%209.64645L7.293%206L3.64645%202.35355C3.47288%202.17999%203.4536%201.91056%203.58859%201.71569L3.64645%201.64645C3.82001%201.47288%204.08944%201.4536%204.28431%201.58859L4.35355%201.64645L8.35355%205.64645C8.52712%205.82001%208.5464%206.08944%208.41141%206.28431L8.35355%206.35355L4.35355%2010.3536C4.15829%2010.5488%203.84171%2010.5488%203.64645%2010.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E'
              />
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, 'fw-semibold')}
            tag='div'
            {...onClickLink}
          >
            {textName}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
