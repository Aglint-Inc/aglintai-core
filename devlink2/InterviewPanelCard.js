import React from 'react';
import * as _Builtin from './_Builtin';
import { InterviewPanelMember } from './InterviewPanelMember';
import * as _utils from './utils';
import _styles from './InterviewPanelCard.module.css';

export function InterviewPanelCard({
  as: _Component = _Builtin.Block,
  textPanelName = 'Team Engineering',
  slotInterviewPanelMember,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, 'interview_panel_card')}
      tag='div'
    >
      <_Builtin.Block className={_utils.cx(_styles, 'fw-semibold')} tag='div'>
        {textPanelName}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'panel_member_flex')}
        tag='div'
      >
        {slotInterviewPanelMember ?? (
          <>
            <InterviewPanelMember />
            <InterviewPanelMember />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
