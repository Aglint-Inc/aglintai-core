import React from 'react';
import * as _Builtin from './_Builtin';
import * as _interactions from './interactions';
import * as _utils from './utils';
import _styles from './ScrQuestionOptionEdit.module.css';

const _interactionsData = JSON.parse(
  '{"events":{"e-117":{"id":"e-117","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-64","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-118"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".scr-question-option","originalId":"c8705a69-1cd3-8398-e2bb-1bb37d694a12","appliesTo":"CLASS"},"targets":[{"selector":".scr-question-option","originalId":"c8705a69-1cd3-8398-e2bb-1bb37d694a12","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705065102256},"e-118":{"id":"e-118","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-117"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".scr-question-option","originalId":"c8705a69-1cd3-8398-e2bb-1bb37d694a12","appliesTo":"CLASS"},"targets":[{"selector":".scr-question-option","originalId":"c8705a69-1cd3-8398-e2bb-1bb37d694a12","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705065102256}},"actionLists":{"a-64":{"id":"a-64","title":"question-option-[hover-in]","actionItemGroups":[{"actionItems":[{"id":"a-64-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".scr-option-remove","selectorGuids":["0714deb5-8aca-1f84-81c8-962996320641"]},"value":"none"}},{"id":"a-64-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".scr-option-remove","selectorGuids":["0714deb5-8aca-1f84-81c8-962996320641"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-64-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".scr-option-remove","selectorGuids":["0714deb5-8aca-1f84-81c8-962996320641"]},"value":"flex"}}]},{"actionItems":[{"id":"a-64-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".scr-option-remove","selectorGuids":["0714deb5-8aca-1f84-81c8-962996320641"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1705065106072},"a-65":{"id":"a-65","title":"question-option-[hover-out]","actionItemGroups":[{"actionItems":[{"id":"a-65-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".scr-option-remove","selectorGuids":["0714deb5-8aca-1f84-81c8-962996320641"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-65-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".scr-option-remove","selectorGuids":["0714deb5-8aca-1f84-81c8-962996320641"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1705065161274}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}',
);

export function ScrQuestionOptionEdit({
  as: _Component = _Builtin.Block,
  count = '1.',
  slotInput,
  onclickRemove = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, 'scr-question-option')} tag='div'>
      <_Builtin.Block tag='div'>{count}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'scr-question-option-input')}
        tag='div'
      >
        {slotInput}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'scr-option-remove')}
        tag='div'
        {...onclickRemove}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'div-block-422')}
          tag='div'
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, 'svg-icon')}
            value='%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3DcurrentColor%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.7812%202.28125L7.0625%206L10.7812%209.71875C11.0729%2010.0729%2011.0729%2010.4271%2010.7812%2010.7812C10.4271%2011.0729%2010.0729%2011.0729%209.71875%2010.7812L6%207.0625L2.28125%2010.7812C1.92708%2011.0729%201.57292%2011.0729%201.21875%2010.7812C0.927083%2010.4271%200.927083%2010.0729%201.21875%209.71875L4.9375%206L1.21875%202.28125C0.927083%201.92708%200.927083%201.57292%201.21875%201.21875C1.57292%200.927083%201.92708%200.927083%202.28125%201.21875L6%204.9375L9.71875%201.21875C10.0729%200.927083%2010.4271%200.927083%2010.7812%201.21875C11.0729%201.57292%2011.0729%201.92708%2010.7812%202.28125Z%22%2F%3E%0A%3C%2Fsvg%3E'
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
