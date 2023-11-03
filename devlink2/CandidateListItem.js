import React from 'react';
import * as _Builtin from './_Builtin';
import * as _interactions from './interactions';
import * as _utils from './utils';
import _styles from './CandidateListItem.module.css';

const _interactionsData = JSON.parse(
  '{"events":{"e-49":{"id":"e-49","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-25","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-50"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-column","originalId":"4b74a769-3059-edcf-484b-79f39ef0625b","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-column","originalId":"4b74a769-3059-edcf-484b-79f39ef0625b","appliesTo":"CLASS"}],"config":{"loop":true,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1698671045933}},"actionLists":{"a-25":{"id":"a-25","title":"skeletal-loader","actionItemGroups":[{"actionItems":[{"id":"a-25-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".cv-skeletal-block.overlay","selectorGuids":["2ec0bc5c-523b-1d16-4320-7857f59c4392","0b04d1ab-054e-0f32-73a8-61df6c81b023"]},"xValue":-100,"yValue":-50,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-25-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":2000,"target":{"useEventTarget":"CHILDREN","selector":".cv-skeletal-block.overlay","selectorGuids":["2ec0bc5c-523b-1d16-4320-7857f59c4392","0b04d1ab-054e-0f32-73a8-61df6c81b023"]},"xValue":100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"id":"a-25-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-skeletal-block.overlay","selectorGuids":["2ec0bc5c-523b-1d16-4320-7857f59c4392","0b04d1ab-054e-0f32-73a8-61df6c81b023"]},"xValue":-100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698671059774}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}',
);

export function CandidateListItem({
  as: _Component = _Builtin.Block,
  onclickSelect = {},
  isChecked = false,
  slotProfileImage,
  name = 'Dianne Russell',
  jobTitle = 'Assosiate software engineer',
  email = 'sara.cruz@example.com',
  phone = '(704) 555-0127',
  isInterviewVisible = false,
  slotResumeScore,
  slotInterviewScore,
  isHighlighted = false,
  appliedDate = '17 Aug 2023 11:30PM',
  onclickCandidate = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, 'cv-list-row', 'item')} tag='div'>
      {isHighlighted ? (
        <_Builtin.Block
          className={_utils.cx(_styles, 'cv-list-item-highlight')}
          tag='div'
        />
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, 'cv-list-column', 'checkbox')}
        tag='div'
        {...onclickSelect}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'cv-list-checkbox')}
          tag='div'
        >
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
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'cv-list-row-main')}
        tag='div'
        {...onclickCandidate}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'cv-list-column', 'name')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'cv-list-profile-image')}
            tag='div'
          >
            {slotProfileImage}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'line-clamp-1')}
            tag='div'
          >
            {name}
          </_Builtin.Block>
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, 'cv-list-item-highlight')}
              tag='div'
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'cv-list-column', 'title')}
          tag='div'
        >
          <_Builtin.Block tag='div'>{jobTitle}</_Builtin.Block>
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, 'cv-list-item-highlight')}
              tag='div'
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'cv-list-column', 'score')}
          tag='div'
        >
          {slotResumeScore ??
            (isHighlighted ? (
              <_Builtin.Block
                className={_utils.cx(_styles, 'cv-list-item-highlight')}
                tag='div'
              />
            ) : null)}
        </_Builtin.Block>
        {isInterviewVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, 'cv-list-column', 'score')}
            tag='div'
          >
            {slotInterviewScore ??
              (isHighlighted ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, 'cv-list-item-highlight')}
                  tag='div'
                />
              ) : null)}
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, 'cv-list-column', 'email')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'line-clamp-1')}
            tag='div'
          >
            {email}
          </_Builtin.Block>
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, 'cv-list-item-highlight')}
              tag='div'
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'cv-list-column', 'phone')}
          tag='div'
        >
          <_Builtin.Block tag='div'>{phone}</_Builtin.Block>
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, 'cv-list-item-highlight')}
              tag='div'
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'cv-list-column', 'date')}
          tag='div'
        >
          <_Builtin.Block tag='div'>{appliedDate}</_Builtin.Block>
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, 'cv-list-item-highlight')}
              tag='div'
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value='%3Cstyle%3E%0A.line-clamp-1%20%7B%0Adisplay%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%201%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%20%20%0A%20%20overflow%3A%20hidden%3B%0A%7D%0A%3C%2Fstyle%3E' />
    </_Component>
  );
}
