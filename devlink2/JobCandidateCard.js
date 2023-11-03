import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './JobCandidateCard.module.css';

export function JobCandidateCard({
  as: _Component = _Builtin.Block,
  isChecked = false,
  textOrder = '1.',
  slotProfilePic,
  textName = 'Mariana Diaz',
  textRole = 'Design Engineer',
  textMail = 'nathan.roberts@example.com',
  textPhone = '(303) 555-0105',
  slotScore,
  scoreTextColor = {},
  textScore = '--',
  statusBgColor = {},
  statusTextColor = {},
  textStatus = 'In Progress',
  textAppliedOn = 'Applied on 17 Aug 2023 11:30PM',
  onClickCard = {},
  onClickCheckbox = {},
  isInterview = false,
  isSelected = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, 'candidate-list-item')} tag='div'>
      <_Builtin.Block
        className={_utils.cx(_styles, 'cli-checkbox', 'padding-large')}
        tag='div'
        {...onClickCheckbox}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'checkbox-wrappers-job')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'checkbox-border-block')}
            tag='div'
          />
          {isChecked ? (
            <_Builtin.Image
              className={_utils.cx(_styles, 'cli-check-image')}
              loading='lazy'
              width='auto'
              height='auto'
              alt=''
              src='https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/6530fd234c567296fc1dc71f_Frame%201%20(2).png'
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'cdd-list-number')}
          tag='div'
        >
          <_Builtin.Block
            dyn={{
              bind: {},
            }}
            tag='div'
          >
            {textOrder}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'list-main-info')}
        tag='div'
        {...onClickCard}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'cli-column', 'candidate-info')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'candidate-profile-info')}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'slot-profile')}
              tag='div'
            >
              {slotProfilePic}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'frame-1020')}
              tag='div'
            >
              <_Builtin.Block
                className={_utils.cx(_styles, 'fw-semibold')}
                dyn={{
                  bind: {},
                }}
                tag='div'
              >
                {textName}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, 'text-grey-600')}
                dyn={{
                  bind: {},
                }}
                tag='div'
              >
                {textRole}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, 'frame-1018')}
                tag='div'
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, 'vectors-wrapper-46')}
                  width='11.999947547912598'
                  height='11.999947547912598'
                  loading='lazy'
                  src='https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504bb624dfe721c77c1cf3f_Vectors-Wrapper.svg'
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, '', 'text-grey-600', 'no-wrap')}
                  dyn={{
                    bind: {},
                  }}
                  tag='div'
                >
                  {textMail}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, 'frame-1018')}
                tag='div'
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, 'vectors-wrapper-43')}
                  width='12'
                  height='12'
                  loading='lazy'
                  src='https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504bb634328f76be652b614_Vectors-Wrapper.svg'
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, '', 'text-grey-600')}
                  dyn={{
                    bind: {},
                  }}
                  tag='div'
                >
                  {textPhone}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'cli-column', 'score')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'vectors-wrapper-44')}
            tag='div'
          >
            {slotScore}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'cli-column', 'score')}
          tag='div'
        >
          {isInterview ? (
            <_Builtin.Block
              className={_utils.cx(_styles, 'cli-int-score-block')}
              tag='div'
            >
              <_Builtin.Block
                className={_utils.cx(_styles, 'speedometer')}
                tag='div'
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, 'vectors-wrapper-47')}
                  width='10'
                  height='8.676880836486816'
                  loading='lazy'
                  src='https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504bb65d61e8c06f83171d1_Vectors-Wrapper.svg'
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, 'div-block-288')}
                tag='div'
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    'text-sm',
                    'fw-semibold',
                    'text-yellow-600',
                  )}
                  dyn={{
                    bind: {},
                  }}
                  tag='div'
                  {...scoreTextColor}
                >
                  {textScore}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    'text-sm',
                    'fw-semibold',
                    'text-yellow-600',
                  )}
                  tag='div'
                  {...scoreTextColor}
                >
                  {'/100'}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'cli-column', 'status')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'frame-1024')}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'frame-1096')}
              tag='div'
              {...statusBgColor}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, 'fw-semibold')}
                dyn={{
                  bind: {},
                }}
                tag='div'
                {...statusTextColor}
              >
                {textStatus}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'text-sm', 'color-grey-600')}
              tag='div'
            >
              {textAppliedOn}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, 'checked-bg', 'selected')}
          tag='div'
        />
      ) : null}
      {isChecked ? (
        <_Builtin.Block
          className={_utils.cx(_styles, 'checked-bg')}
          tag='div'
        />
      ) : null}
    </_Component>
  );
}
