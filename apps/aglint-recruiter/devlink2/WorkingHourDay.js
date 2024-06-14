"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { RcCheckbox } from "./RcCheckbox";
import * as _utils from "./utils";
import _styles from "./WorkingHourDay.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-131":{"id":"e-131","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-77","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-132"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c1463ca7-e15a-706a-d8fc-80ae25eb4a5f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c1463ca7-e15a-706a-d8fc-80ae25eb4a5f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1709218630022},"e-132":{"id":"e-132","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-78","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-131"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c1463ca7-e15a-706a-d8fc-80ae25eb4a5f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c1463ca7-e15a-706a-d8fc-80ae25eb4a5f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1709218630022}},"actionLists":{"a-77":{"id":"a-77","title":"Apply All [show]","actionItemGroups":[{"actionItems":[{"id":"a-77-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".apply_to-all","selectorGuids":["44c082d8-6e8d-c144-b9dd-1d1f05b46897"]},"value":0,"unit":""}},{"id":"a-77-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".apply_to-all","selectorGuids":["44c082d8-6e8d-c144-b9dd-1d1f05b46897"]},"value":"none"}}]},{"actionItems":[{"id":"a-77-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".apply_to-all","selectorGuids":["44c082d8-6e8d-c144-b9dd-1d1f05b46897"]},"value":"flex"}}]},{"actionItems":[{"id":"a-77-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".apply_to-all","selectorGuids":["44c082d8-6e8d-c144-b9dd-1d1f05b46897"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1709218636811},"a-78":{"id":"a-78","title":"Apply All [show] 2","actionItemGroups":[{"actionItems":[{"id":"a-78-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":100,"target":{"useEventTarget":"CHILDREN","selector":".apply_to-all","selectorGuids":["44c082d8-6e8d-c144-b9dd-1d1f05b46897"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-78-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".apply_to-all","selectorGuids":["44c082d8-6e8d-c144-b9dd-1d1f05b46897"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1709218636811}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function WorkingHourDay({
  as: _Component = _Builtin.Block,
  slotRcCheckbox,
  slotTimeRageInput,
  isApplytoAll = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "day_wrap")}
      data-w-id="c1463ca7-e15a-706a-d8fc-80ae25eb4a5f"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "day_checkbox")}
        id={_utils.cx(
          _styles,
          "w-node-c1463ca7-e15a-706a-d8fc-80ae25eb4a60-25eb4a5f"
        )}
        tag="div"
      >
        {slotRcCheckbox ?? <RcCheckbox text="Sunday" />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_duration")}
        id={_utils.cx(
          _styles,
          "w-node-c1463ca7-e15a-706a-d8fc-80ae25eb4a62-25eb4a5f"
        )}
        tag="div"
      >
        {slotTimeRageInput ?? (
          <_Builtin.Block className={_utils.cx(_styles, "italic")} tag="div">
            {"Do not schedule"}
          </_Builtin.Block>
        )}
      </_Builtin.Block>
      {isApplytoAll ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "apply_to-all")}
          id={_utils.cx(
            _styles,
            "w-node-c1463ca7-e15a-706a-d8fc-80ae25eb4a67-25eb4a5f"
          )}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewbox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.1484%203.39844L6.39844%207.14844C6.13281%207.36719%205.86719%207.36719%205.60156%207.14844L3.72656%205.27344C3.50781%205.00781%203.50781%204.74219%203.72656%204.47656C3.99219%204.25781%204.25781%204.25781%204.52344%204.47656L6%205.95312L9.35156%202.60156C9.61719%202.38281%209.88281%202.38281%2010.1484%202.60156C10.3672%202.86719%2010.3672%203.13281%2010.1484%203.39844ZM12.5859%206.21094L6.39844%2012.3984C6.13281%2012.6172%205.86719%2012.6172%205.60156%2012.3984L2.41406%209.21094C2.19531%208.94531%202.19531%208.67969%202.41406%208.41406C2.67969%208.19531%202.94531%208.19531%203.21094%208.41406L6%2011.2031L11.7891%205.41406C12.0547%205.19531%2012.3203%205.19531%2012.5859%205.41406C12.8047%205.67969%2012.8047%205.94531%2012.5859%206.21094Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">
            {"Apply to all working days"}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
