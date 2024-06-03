'use client';
import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './AssessmentSetting.module.css';

export function AssessmentSetting({
  as: _Component = _Builtin.Block,
  slotExpirationInput,
  slotRetrysCount,
  slotSwitchAudioVideo,
  slotToggleAssessment,
  isSwitchAudioVideoVisible = true,
  textDesc = 'Configure screening questions and welcome/ending messages. Activate the toggle if you wish to utilize AI-generated videos in the assessment.',
  textMode = 'Assessment Mode',
}) {
  return (
    <_Component className={_utils.cx(_styles, 'div-block-562')} tag='div'>
      <_Builtin.Block
        className={_utils.cx(_styles, 'new-screening-wrappers')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'accessment-wrap')}
          tag='div'
          id='assessment_mode'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'fw-semibold')}
            tag='div'
          >
            {textMode}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'accessment-desc')}
            tag='div'
          >
            {textDesc}
          </_Builtin.Block>
          {isSwitchAudioVideoVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, 'accessment-toggle-wrap')}
              tag='div'
            >
              <_Builtin.Block
                className={_utils.cx(_styles, 'slot-toggle-screening')}
                tag='div'
              >
                {slotToggleAssessment}
              </_Builtin.Block>
              <_Builtin.Block tag='div'>
                {'Use AI generated videos for assessment'}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block tag='div'>{slotSwitchAudioVideo}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'mt-30')}
          tag='div'
          id='validity'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'fw-semibold')}
            tag='div'
          >
            {'Assessment Validity'}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'color-grey-600', 'mt-8')}
            tag='div'
          >
            {
              'Set the assessment link’s expiration time and the maximum retry threshold for candidates.'
            }
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'expiration-duration-wrap', 'mt-10')}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'width-210', 'flex-expiration')}
              tag='div'
            >
              <_Builtin.Block tag='div'>{'Expiration duration'}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, 'fw-semibold')}
                tag='div'
              >
                {':'}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'div-block-575')}
              tag='div'
            >
              {slotExpirationInput}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'color-grey-600')}
              tag='div'
            >
              {'Days after sending the invite'}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'expiration-duration-wrap', 'mt-7')}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'width-210', 'flex-expiration')}
              tag='div'
            >
              <_Builtin.Block tag='div'>
                {'No of retries per candidate'}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, 'fw-semibold')}
                tag='div'
              >
                {':'}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'div-block-576')}
              tag='div'
            >
              {slotRetrysCount}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'color-grey-600')}
              tag='div'
            >
              {'Times excluding the first try'}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
