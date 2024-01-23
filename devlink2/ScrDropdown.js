import React from 'react';
import * as _Builtin from './_Builtin';
import * as _interactions from './interactions';
import { ScrCheckmarkIcon } from './ScrCheckmarkIcon';
import { ScrRadioIcon } from './ScrRadioIcon';
import { ScrShortTextIcon } from './ScrShortTextIcon';
import * as _utils from './utils';
import _styles from './ScrDropdown.module.css';

const _interactionsData = JSON.parse(
  '{"events":{"e-101":{"id":"e-101","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-48","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-102"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".scr-dropdown-option","originalId":"dcc9a764-8915-b7a1-bfe0-46ffc7f40573","appliesTo":"CLASS"},"targets":[{"selector":".scr-dropdown-option","originalId":"dcc9a764-8915-b7a1-bfe0-46ffc7f40573","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1704695093900}},"actionLists":{"a-48":{"id":"a-48","title":"scr-dropdown-[close]","actionItemGroups":[{"actionItems":[{"id":"a-48-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".scr-dropdown-option","selectorGuids":["a3fc59f3-7a0a-8a6f-158d-fc768374b2d4"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1704457732872}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}',
);

export function ScrDropdown({
  as: _Component = _Builtin.Block,
  onclickMultiSelect = {},
  onclickSingleSelect = {},
  onclickShortAnswer = {},
  slotSelectedIcon,
  selectedText = 'Single select',
  isOptionsBodyVisible = false,
  onclickTrigger = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, 'scr-dropdown')} tag='div'>
      <_Builtin.Block
        className={_utils.cx(_styles, 'scr-dropdown-trigger')}
        tag='div'
        {...onclickTrigger}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'scr-dropdown-icon')}
          tag='div'
        >
          {slotSelectedIcon}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'text-color-black')}
          tag='div'
        >
          {selectedText}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'scr-dropdown-arrow')}
          tag='div'
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, 'svg-icon')}
            value='%3Csvg%20width%3D%2216%22%20height%3D%2217%22%20viewBox%3D%220%200%2016%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.6877%206.10958C12.9033%205.93708%2013.2179%205.97204%2013.3905%206.18767C13.5438%206.37934%2013.5332%206.64925%2013.3775%206.82802L13.3124%206.89045L8.31237%2010.8905C8.15584%2011.0157%207.94285%2011.0336%207.77019%2010.9441L7.68767%2010.8905L2.68767%206.89045C2.47204%206.71795%202.43708%206.4033%202.60958%206.18767C2.76292%205.996%203.02857%205.94708%203.23715%206.05973L3.31237%206.10958L8.00002%209.85902L12.6877%206.10958Z%22%20fill%3D%22%2368737D%22%20style%3D%22fill%3A%2368737D%3Bfill%3Acolor(display-p3%200.4078%200.4510%200.4902)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E'
          />
        </_Builtin.Block>
      </_Builtin.Block>
      {isOptionsBodyVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, 'scr-dropdown-content')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'scr-dropdown-content-block')}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'scr-dropdown-option')}
              tag='div'
              {...onclickMultiSelect}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, 'scr-dropdown-icon')}
                tag='div'
              >
                <ScrCheckmarkIcon />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, 'text-color-black')}
                tag='div'
              >
                {'Multi select'}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'scr-dropdown-option')}
              tag='div'
              {...onclickSingleSelect}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, 'scr-dropdown-icon')}
                tag='div'
              >
                <ScrRadioIcon />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, 'text-color-black')}
                tag='div'
              >
                {'Single select'}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'scr-dropdown-option')}
              tag='div'
              {...onclickShortAnswer}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, 'scr-dropdown-icon')}
                tag='div'
              >
                <ScrShortTextIcon />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, 'text-color-black')}
                tag='div'
              >
                {'Short answer'}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
