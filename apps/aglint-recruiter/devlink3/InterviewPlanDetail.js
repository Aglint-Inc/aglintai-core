"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./InterviewPlanDetail.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-89":{"id":"e-89","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-62","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-90"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"dfd7b5cf-5883-bb31-ee83-39d727ddef77"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1722594860484},"e-90":{"id":"e-90","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-63","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-89"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"dfd7b5cf-5883-bb31-ee83-39d727ddef77"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1722594860484}},"actionLists":{"a-62":{"id":"a-62","title":"Interview Plan Detail Hover in","actionItemGroups":[{"actionItems":[{"id":"a-62-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".ipc-right-btn-wrap","selectorGuids":["062431b2-5122-bd10-27e6-7c4754658a1d"]},"value":0,"unit":""}},{"id":"a-62-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".ipc-right-btn-wrap","selectorGuids":["062431b2-5122-bd10-27e6-7c4754658a1d"]}}}]},{"actionItems":[{"id":"a-62-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".ipc-right-btn-wrap","selectorGuids":["062431b2-5122-bd10-27e6-7c4754658a1d"]},"value":1,"unit":""}},{"id":"a-62-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"flex","target":{"useEventTarget":"CHILDREN","selector":".ipc-right-btn-wrap","selectorGuids":["062431b2-5122-bd10-27e6-7c4754658a1d"]}}}]}],"createdOn":1722594864157,"useFirstGroupAsInitialState":true},"a-63":{"id":"a-63","title":"Interview Plan Detail Hover out","actionItemGroups":[{"actionItems":[{"id":"a-63-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".ipc-right-btn-wrap","selectorGuids":["062431b2-5122-bd10-27e6-7c4754658a1d"]},"value":0,"unit":""}},{"id":"a-63-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".ipc-right-btn-wrap","selectorGuids":["062431b2-5122-bd10-27e6-7c4754658a1d"]}}}]}],"createdOn":1722594864157,"useFirstGroupAsInitialState":false}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InterviewPlanDetail({
  as: _Component = _Builtin.Block,
  slotInterviewType,
  slotPlanDetail,
  slotBadge,
  textMemberSelected = "Interviewers(1 out of 4 members will be selected)",
  slotCandidate,
  slotRightButton,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "interview-plan-card-wrap")}
      data-w-id="dfd7b5cf-5883-bb31-ee83-39d727ddef77"
      tag="div"
    >
      <_Builtin.Block tag="div">{slotInterviewType}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-plan-details")}
        tag="div"
      >
        {slotPlanDetail}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-plan-badge")}
        tag="div"
      >
        {slotBadge}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "plan-candidate-wrap")}
        tag="div"
      >
        <Text
          content={textMemberSelected}
          weight="regular"
          color="neutral"
          size="1"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-plan-candidate-wrap")}
          tag="div"
        >
          {slotCandidate}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ipc-right-btn-wrap")}
        tag="div"
      >
        {slotRightButton}
      </_Builtin.Block>
    </_Component>
  );
}
