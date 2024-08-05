"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./StartOption.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-191":{"id":"e-191","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-117","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-192"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"71e5f55e-3fee-243e-4d72-b8cbe08c7762","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"71e5f55e-3fee-243e-4d72-b8cbe08c7762","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1722840634827},"e-192":{"id":"e-192","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-118","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-191"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"71e5f55e-3fee-243e-4d72-b8cbe08c7762","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"71e5f55e-3fee-243e-4d72-b8cbe08c7762","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1722840634828},"e-193":{"id":"e-193","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-117","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-194"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"99d5479d-3110-1e27-5270-df9cb750cbd4"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1722846861217},"e-194":{"id":"e-194","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-118","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-193"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"99d5479d-3110-1e27-5270-df9cb750cbd4"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1722846861218}},"actionLists":{"a-117":{"id":"a-117","title":"Get started hover in","actionItemGroups":[{"actionItems":[{"id":"a-117-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".send-started-wrap","selectorGuids":["2ea2ec47-72ac-780a-1317-e238ed51a62f"]},"value":"none"}},{"id":"a-117-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".send-started-wrap","selectorGuids":["2ea2ec47-72ac-780a-1317-e238ed51a62f"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-117-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".send-started-wrap","selectorGuids":["2ea2ec47-72ac-780a-1317-e238ed51a62f"]},"value":1,"unit":""}},{"id":"a-117-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".send-started-wrap","selectorGuids":["2ea2ec47-72ac-780a-1317-e238ed51a62f"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1722840655925},"a-118":{"id":"a-118","title":"Get started hover out","actionItemGroups":[{"actionItems":[{"id":"a-118-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".send-started-wrap","selectorGuids":["2ea2ec47-72ac-780a-1317-e238ed51a62f"]},"value":0,"unit":""}},{"id":"a-118-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".send-started-wrap","selectorGuids":["2ea2ec47-72ac-780a-1317-e238ed51a62f"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1722840655925}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function StartOption({
  as: _Component = _Builtin.Block,
  slotText,
  onClickCard = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "started-option-wrap")}
      data-w-id="99d5479d-3110-1e27-5270-df9cb750cbd4"
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "get-start-left-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "get-started-calendar-wrap")}
          tag="div"
        >
          <GlobalIcon iconName="calendar_today" size="3" />
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotText}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "send-started-wrap")}
        tag="div"
      >
        <GlobalIcon iconName="send" size="5" />
      </_Builtin.Block>
    </_Component>
  );
}
