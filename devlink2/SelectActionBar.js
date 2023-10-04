import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './SelectActionBar.module.css';

export function SelectActionBar({
  as: _Component = _Builtin.Block,
  isInterview = true,
  isQualified = true,
  isDisqualified = true,
  onClickDisqualified = {},
  onClickQualified = {},
  onClickInterview = {},
  onClickMoveNew = {},
  isMoveNew = false,
  onClickClear = {},
  textSelected = '2 Candidate selected',
}) {
  return (
    <_Component className={_utils.cx(_styles, 'select-action-bar')} tag='div'>
      <_Builtin.Block
        className={_utils.cx(_styles, 'select-action-left-block')}
        tag='div'
      >
        <_Builtin.Block className={_utils.cx(_styles, 'fw-semibold')} tag='div'>
          {textSelected}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'select-clear-btn')}
          tag='div'
          {...onClickClear}
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              'text-sm',
              'text-blue-600',
              'text-underline',
            )}
            tag='div'
          >
            {'Clear Selection'}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'select-action-right-block')}
        tag='div'
      >
        {isInterview ? (
          <_Builtin.Block
            className={_utils.cx(_styles, 'select-action-btn', 'blue-100')}
            tag='div'
            {...onClickInterview}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, 'icon-embed')}
              value='%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.74253%205.28348H7.44824L9.12824%202.09491C9.17967%201.96634%209.11967%201.85491%208.98253%201.85491H6.47967C6.34253%201.85491%206.18824%201.96634%206.13681%202.09491L4.88538%205.0092C4.82538%205.14634%204.88538%205.28348%205.02253%205.28348H6.14538L4.92824%208.77205C4.83396%209.02062%204.90253%209.23491%205.21967%208.95205L8.75967%205.61777C8.95681%205.42062%208.94824%205.28348%208.74253%205.28348ZM3.57306%2012.8203L6.82415%209.5692H13.0017V0.997768H1.00167V9.5692H3.5731V9.99777L3.57306%2012.8203ZM2.71596%2010.4263H1.00167C0.524981%2010.4263%200.144531%2010.0459%200.144531%209.5692V0.997768C0.144531%200.521074%200.524981%200.140625%201.00167%200.140625H13.0017C13.4784%200.140625%2013.8588%200.521074%2013.8588%200.997768V9.5692C13.8588%2010.0459%2013.4784%2010.4263%2013.0017%2010.4263H7.17919L4.17314%2013.4324C3.92826%2013.6725%203.56383%2013.7435%203.2467%2013.6129C2.92958%2013.4823%202.72082%2013.1753%202.71596%2012.8263V10.4263Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E'
            />
            <_Builtin.Block
              className={_utils.cx(_styles, 'text-blue-700')}
              tag='div'
            >
              {'Send Interview'}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isQualified ? (
          <_Builtin.Block
            className={_utils.cx(_styles, 'select-action-btn', 'green-100')}
            tag='div'
            {...onClickQualified}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, 'icon-embed')}
              value='%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1464%204.64645C10.3417%204.45118%2010.6583%204.45118%2010.8536%204.64645C11.0488%204.84171%2011.0488%205.15829%2010.8536%205.35355L4.35355%2011.8536C4.15829%2012.0488%203.84171%2012.0488%203.64645%2011.8536L1.14645%209.35355C0.951184%209.15829%200.951184%208.84171%201.14645%208.64645C1.34171%208.45118%201.65829%208.45118%201.85355%208.64645L4%2010.7929L10.1464%204.64645ZM8.35355%2011.8536C8.15829%2012.0488%207.84171%2012.0488%207.64645%2011.8536C7.45118%2011.6583%207.45118%2011.3417%207.64645%2011.1464L14.1464%204.64645C14.3417%204.45118%2014.6583%204.45118%2014.8536%204.64645C15.0488%204.84171%2015.0488%205.15829%2014.8536%205.35355L8.35355%2011.8536Z%22%20fill%3D%22%230B3B29%22%2F%3E%0A%3C%2Fsvg%3E'
            />
            <_Builtin.Block
              className={_utils.cx(_styles, 'text-green-700')}
              tag='div'
            >
              {'Move to Qualified'}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isDisqualified ? (
          <_Builtin.Block
            className={_utils.cx(_styles, 'select-action-btn', 'red-100')}
            tag='div'
            {...onClickDisqualified}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, 'icon-embed')}
              value='%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%2211%22%20viewBox%3D%220%200%2010%2011%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M5%207.126V11H0C0%208.79085%201.79086%207%204%207C4.3453%207%204.6804%207.04375%205%207.126ZM4%206.5C2.3425%206.5%201%205.1575%201%203.5C1%201.8425%202.3425%200.5%204%200.5C5.6575%200.5%207%201.8425%207%203.5C7%205.1575%205.6575%206.5%204%206.5ZM7.5%208.2929L8.56065%207.23225L9.26775%207.93935L8.2071%209L9.26775%2010.0606L8.56065%2010.7677L7.5%209.7071L6.43935%2010.7677L5.73225%2010.0606L6.7929%209L5.73225%207.93935L6.43935%207.23225L7.5%208.2929Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E'
            />
            <_Builtin.Block
              className={_utils.cx(_styles, 'text-red-500')}
              tag='div'
            >
              {'Mark Disqualified'}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isMoveNew ? (
          <_Builtin.Block
            className={_utils.cx(_styles, 'select-action-btn', 'grey-100')}
            tag='div'
            {...onClickMoveNew}
          >
            <_Builtin.Block tag='div'>{'Move to New'}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
