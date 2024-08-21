"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { IconButtonSoft } from "./IconButtonSoft";
import { InterviewPlanDetail } from "./InterviewPlanDetail";
import * as _utils from "./utils";
import _styles from "./InterviewPlanWrap.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-93":{"id":"e-93","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-68","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-94"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d01aecc9-c903-4bf2-705a-d784ffbf829d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d01aecc9-c903-4bf2-705a-d784ffbf829d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724078695574},"e-94":{"id":"e-94","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-69","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-93"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d01aecc9-c903-4bf2-705a-d784ffbf829d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d01aecc9-c903-4bf2-705a-d784ffbf829d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724078695575}},"actionLists":{"a-68":{"id":"a-68","title":"InterviewPlanWrap Hover in","actionItemGroups":[{"actionItems":[{"id":"a-68-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slot-edit-btn-icon-ipw","selectorGuids":["b39f10bb-6b21-7693-76ac-12923bce5632"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-68-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-edit-btn-icon-ipw","selectorGuids":["b39f10bb-6b21-7693-76ac-12923bce5632"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1724078704430},"a-69":{"id":"a-69","title":"InterviewPlanWrap Hover out","actionItemGroups":[{"actionItems":[{"id":"a-69-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-edit-btn-icon-ipw","selectorGuids":["b39f10bb-6b21-7693-76ac-12923bce5632"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1724078704430}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InterviewPlanWrap({
  as: _Component = _Builtin.Block,
  textStageName = "This is a global text component",
  onClickEdit = {},
  textInterviewCount = "This is a global text component",
  slotRightIconButton,
  slotInputButton,
  isInputVisible = false,
  slotInterviewPlanDetail,
  isSlotInterviewPlanVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "interview-plan-wrapper")}
      data-w-id="d01aecc9-c903-4bf2-705a-d784ffbf829d"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ip-input-header-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "interview-paln-header-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "interview-plan-title-wrap")}
            tag="div"
          >
            <Text content={textStageName} />
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-edit-btn-icon-ipw")}
              tag="div"
              {...onClickEdit}
            >
              <IconButtonSoft size="1" iconName="edit_square" color="neutral" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "interview-plan-title-right")}
            tag="div"
          >
            <Text content={textInterviewCount} weight="regular" size="1" />
            <_Builtin.Block tag="div">{slotRightIconButton}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isInputVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "input-slot-ip-wrap")}
            tag="div"
          >
            {slotInputButton}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isSlotInterviewPlanVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-interview-plan-card")}
          tag="div"
        >
          {slotInterviewPlanDetail ?? <InterviewPlanDetail />}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
