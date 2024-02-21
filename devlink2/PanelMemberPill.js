import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './PanelMemberPill.module.css';

export function PanelMemberPill({
  as: _Component = _Builtin.Block,
  slotImage,
  textMemberName = 'Member Name',
  onClickClose = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, 'team_pill')} tag='div'>
      <_Builtin.Block className={_utils.cx(_styles, 'member_photo')} tag='div'>
        {slotImage}
      </_Builtin.Block>
      <_Builtin.Block tag='div'>{textMemberName}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'remove_member')}
        tag='div'
        {...onClickClose}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, 'embed_flex')}
          value='%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.5859%206.21094L9.79688%209L12.5859%2011.7891C12.8047%2012.0547%2012.8047%2012.3203%2012.5859%2012.5859C12.3203%2012.8047%2012.0547%2012.8047%2011.7891%2012.5859L9%209.79688L6.21094%2012.5859C5.94531%2012.8047%205.67969%2012.8047%205.41406%2012.5859C5.19531%2012.3203%205.19531%2012.0547%205.41406%2011.7891L8.20312%209L5.41406%206.21094C5.19531%205.94531%205.19531%205.67969%205.41406%205.41406C5.67969%205.19531%205.94531%205.19531%206.21094%205.41406L9%208.20312L11.7891%205.41406C12.0547%205.19531%2012.3203%205.19531%2012.5859%205.41406C12.8047%205.67969%2012.8047%205.94531%2012.5859%206.21094Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E'
        />
      </_Builtin.Block>
    </_Component>
  );
}
