import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './ChatboxCandidateListItem.module.css';

export function ChatboxCandidateListItem({
  as: _Component = _Builtin.Block,
  name = 'Candidate Name',
  isApplied = false,
  email = 'Email Address',
  date = 'Applied Date',
  isSelected = false,
  onclickProps = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, 'cb-candidate-list-item')}
      tag='div'
      {...onclickProps}
    >
      <_Builtin.Block className={_utils.cx(_styles, 'cb-cli-main')} tag='div'>
        <_Builtin.Block
          className={_utils.cx(_styles, 'cb-candidate-item-name-block')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              'inline-block',
              'fw-semibold',
              'text-color-black',
            )}
            tag='div'
          >
            {name}
          </_Builtin.Block>
          {isApplied ? (
            <_Builtin.Block
              className={_utils.cx(_styles, 'cb-candidate-status')}
              tag='div'
            >
              {'Applied'}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block tag='div'>{email}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'text-gray-600')}
          tag='div'
        >
          {date}
        </_Builtin.Block>
      </_Builtin.Block>
      {isSelected ? (
        <_Builtin.Block className={_utils.cx(_styles, 'cb-cli-bg')} tag='div' />
      ) : null}
    </_Component>
  );
}
