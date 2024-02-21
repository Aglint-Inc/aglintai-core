import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './RcCollaborationInfo.module.css';

export function RcCollaborationInfo({
  as: _Component = _Builtin.Block,
  slotForms,
  slotButtons,
  onclickAdd = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, 'sl-goal-wrapper')} tag='div'>
      <_Builtin.Block
        className={_utils.cx(_styles, 'sl-goal-title-block')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'text-lg', 'fw-semibold')}
          tag='div'
        >
          {'Invite your team members to collaborate'}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'sl-collaboration-block')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'sl-collaboration-form')}
          tag='div'
        >
          {slotForms}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'sl-button', 'simple')}
          tag='div'
          {...onclickAdd}
        >
          <_Builtin.Block tag='div'>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, 'svg-icon')}
              value='%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22currentColor%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.00016%201.33325C7.59106%201.33325%207.25942%201.66489%207.25942%202.07399V7.25918H2.07424C1.66514%207.25918%201.3335%207.59082%201.3335%207.99992C1.3335%208.40902%201.66514%208.74066%202.07424%208.74066H7.25942V13.9258C7.25942%2014.3349%207.59106%2014.6666%208.00016%2014.6666C8.40926%2014.6666%208.7409%2014.3349%208.7409%2013.9258V8.74066H13.9261C14.3352%208.74066%2014.6668%208.40902%2014.6668%207.99992C14.6668%207.59082%2014.3352%207.25918%2013.9261%207.25918H8.7409V2.07399C8.7409%201.66489%208.40926%201.33325%208.00016%201.33325Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E'
            />
          </_Builtin.Block>
          <_Builtin.Block tag='div'>{'Add another'}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'sl-goal-buttons-wrapper')}
        tag='div'
      >
        {slotButtons}
      </_Builtin.Block>
    </_Component>
  );
}
