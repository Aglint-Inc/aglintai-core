"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./InterviewerListRd.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-201":{"id":"e-201","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-123","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-202"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"d41e6221-bfe9-1b5a-396a-1cabe5c5ca7b"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724067123027},"e-202":{"id":"e-202","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-124","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-201"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"d41e6221-bfe9-1b5a-396a-1cabe5c5ca7b"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724067123027}},"actionLists":{"a-123":{"id":"a-123","title":"InterviewerList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-123-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slot-arrow-hover-in","selectorGuids":["c26a69de-d273-1d7c-2086-0bde71422ee6"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-123-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-arrow-hover-in","selectorGuids":["c26a69de-d273-1d7c-2086-0bde71422ee6"]},"value":1,"unit":""}}]}],"createdOn":1724067127508,"useFirstGroupAsInitialState":true},"a-124":{"id":"a-124","title":"InterviewerList Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-124-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-arrow-hover-in","selectorGuids":["c26a69de-d273-1d7c-2086-0bde71422ee6"]},"value":0,"unit":""}}]}],"createdOn":1724067127508,"useFirstGroupAsInitialState":false}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InterviewerListRd({
  as: _Component = _Builtin.Block,
  slotStatus,
  slotTextWithIcon,
  slotIconButtonSoft,
  onClickCard = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "interviewer-rd-card")}
      data-w-id="d41e6221-bfe9-1b5a-396a-1cabe5c5ca7b"
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewer-rd-left-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotStatus}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "interview-rd-text-icon")}
          tag="div"
        >
          {slotTextWithIcon}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-arrow-hover-in")}
        tag="div"
      >
        {slotIconButtonSoft}
      </_Builtin.Block>
    </_Component>
  );
}
