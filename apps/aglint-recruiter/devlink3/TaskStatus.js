"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./TaskStatus.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-81":{"id":"e-81","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-58","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-82"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716979210746}},"actionLists":{"a-58":{"id":"a-58","title":"Req-recent-reschedule hover in","actionItemGroups":[{"actionItems":[{"id":"a-58-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":0,"unit":""}},{"id":"a-58-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae"},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-58-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":"none"}}]},{"actionItems":[{"id":"a-58-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":1,"unit":""}},{"id":"a-58-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":true,"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae"},"globalSwatchId":"","rValue":247,"bValue":251,"gValue":249,"aValue":1}},{"id":"a-58-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1716979214379}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TaskStatus({
  as: _Component = _Builtin.Block,
  textStatus = "Done",
  bgColorProps = {},
  textColorProps = {},
  isDropIconVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1353")}
      tag="div"
      {...bgColorProps}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1351")}
        tag="div"
        {...textColorProps}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewbox%3D%220%200%206%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%223%22%20cy%3D%223%22%20r%3D%223%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
          {textStatus}
        </_Builtin.Block>
        {isDropIconVisible ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%228%22%20height%3D%228%22%20viewbox%3D%220%200%208%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.73438%206.26562L0.734375%203.26562C0.588542%203.08854%200.588542%202.91146%200.734375%202.73438C0.911458%202.58854%201.08854%202.58854%201.26562%202.73438L4%205.46875L6.73438%202.73438C6.91146%202.58854%207.08854%202.58854%207.26562%202.73438C7.41146%202.91146%207.41146%203.08854%207.26562%203.26562L4.26562%206.26562C4.08854%206.41146%203.91146%206.41146%203.73438%206.26562Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
