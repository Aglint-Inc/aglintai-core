"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { SlotComp } from "./SlotComp";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ScheduleSelectPill.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-83":{"id":"e-83","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-53","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-84"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a3aaefc6-629c-4650-d639-cf91b2e7c689","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a3aaefc6-629c-4650-d639-cf91b2e7c689","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718779039053},"e-84":{"id":"e-84","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-54","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-83"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a3aaefc6-629c-4650-d639-cf91b2e7c689","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a3aaefc6-629c-4650-d639-cf91b2e7c689","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718779039053}},"actionLists":{"a-53":{"id":"a-53","title":"Schedule Select Hover in","actionItemGroups":[{"actionItems":[{"id":"a-53-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".ssp-close-wrap.cursor-pointer","selectorGuids":["44d01e68-9010-851d-efd2-a558dfa90a18","403fc7d9-50ea-1734-8a8b-421c2101a733"]},"value":0,"unit":""}},{"id":"a-53-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".ssp-close-wrap.cursor-pointer","selectorGuids":["44d01e68-9010-851d-efd2-a558dfa90a18","403fc7d9-50ea-1734-8a8b-421c2101a733"]},"value":"none"}}]},{"actionItems":[{"id":"a-53-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".ssp-close-wrap.cursor-pointer","selectorGuids":["44d01e68-9010-851d-efd2-a558dfa90a18","403fc7d9-50ea-1734-8a8b-421c2101a733"]},"value":1,"unit":""}},{"id":"a-53-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".ssp-close-wrap.cursor-pointer","selectorGuids":["44d01e68-9010-851d-efd2-a558dfa90a18","403fc7d9-50ea-1734-8a8b-421c2101a733"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718779061840},"a-54":{"id":"a-54","title":"Schedule Select Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-54-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".ssp-close-wrap.cursor-pointer","selectorGuids":["44d01e68-9010-851d-efd2-a558dfa90a18","403fc7d9-50ea-1734-8a8b-421c2101a733"]},"value":0,"unit":""}},{"id":"a-54-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".ssp-close-wrap.cursor-pointer","selectorGuids":["44d01e68-9010-851d-efd2-a558dfa90a18","403fc7d9-50ea-1734-8a8b-421c2101a733"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718779061840}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ScheduleSelectPill({
  as: _Component = _Builtin.Block,
  slotIcons,
  textScheduleName = "Company Indroduction",
  onClickClose = {},
  textTime = "1 Hour",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "schedule-select-pill-wrap")}
      data-w-id="a3aaefc6-629c-4650-d639-cf91b2e7c689"
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "ssp-content")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "ssp-header-wrap")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {slotIcons ?? <SlotComp componentNeme="Icon" />}
          </_Builtin.Block>
          <Text content={textScheduleName} weight="" />
        </_Builtin.Block>
        <Text content={textTime} size="1" weight="" color="neutral" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ssp-close-wrap", "cursor-pointer")}
        tag="div"
        {...onClickClose}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%226%22%20height%3D%228%22%20viewbox%3D%220%200%206%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.07812%206.42188L3%204.35938L0.9375%206.42188C0.8125%206.51562%200.692708%206.51562%200.578125%206.42188C0.484375%206.30729%200.484375%206.19271%200.578125%206.07812L2.64062%204L0.578125%201.9375C0.484375%201.8125%200.484375%201.69271%200.578125%201.57812C0.692708%201.48438%200.8125%201.48438%200.9375%201.57812L3%203.64062L5.07812%201.57812C5.19271%201.48438%205.30729%201.48438%205.42188%201.57812C5.51562%201.69271%205.51562%201.8125%205.42188%201.9375L3.35938%204L5.42188%206.07812C5.51562%206.19271%205.51562%206.30729%205.42188%206.42188C5.30729%206.51562%205.19271%206.51562%205.07812%206.42188Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
    </_Component>
  );
}
