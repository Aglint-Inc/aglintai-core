"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { TaskStatus } from "./TaskStatus";
import { PriorityPill } from "./PriorityPill";
import * as _utils from "./utils";
import _styles from "./TaskTableCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-69":{"id":"e-69","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-41","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-70"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"577b6da5-5053-c3a6-5b02-37d3f9aebf0d"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1714403660473},"e-70":{"id":"e-70","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-42","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-69"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"577b6da5-5053-c3a6-5b02-37d3f9aebf0d"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1714403660474}},"actionLists":{"a-41":{"id":"a-41","title":"OverView Task Hover in","actionItemGroups":[{"actionItems":[{"id":"a-41-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1625","selectorGuids":["d7251646-e544-144d-6546-9ddba97b4a78"]},"value":0,"unit":""}},{"id":"a-41-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".div-block-1625","selectorGuids":["d7251646-e544-144d-6546-9ddba97b4a78"]}}}]},{"actionItems":[{"id":"a-41-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1625","selectorGuids":["d7251646-e544-144d-6546-9ddba97b4a78"]},"value":1,"unit":""}},{"id":"a-41-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"flex","target":{"useEventTarget":"CHILDREN","selector":".div-block-1625","selectorGuids":["d7251646-e544-144d-6546-9ddba97b4a78"]}}}]}],"createdOn":1714403666454,"useFirstGroupAsInitialState":true},"a-42":{"id":"a-42","title":"OverView Task Hover out","actionItemGroups":[{"actionItems":[{"id":"a-42-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1625","selectorGuids":["d7251646-e544-144d-6546-9ddba97b4a78"]},"value":0,"unit":""}},{"id":"a-42-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".div-block-1625","selectorGuids":["d7251646-e544-144d-6546-9ddba97b4a78"]}}}]}],"createdOn":1714403666454,"useFirstGroupAsInitialState":false}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TaskTableCard({
  as: _Component = _Builtin.Block,
  slotCheckbox,
  slotStatus,
  textTask = "Agent with Watsapp and text messages",
  isEmailAgentVisible = true,
  isPhoneAgentVisible = false,
  isAssignedtoVisible = false,
  slotAvatarWithName,
  textJob = "Architect",
  slotCandidate,
  isActiveCard = false,
  slotAssignedToCard,
  onClickCard = {},
  slotPriority,
  onClickOverview = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1434", "height-53", "pointer")}
      data-w-id="577b6da5-5053-c3a6-5b02-37d3f9aebf0d"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1535")}
        id={_utils.cx(
          _styles,
          "w-node-_64cd7013-b477-21b7-5d99-36b360482539-f9aebf0d"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "checkbox-wrap-task")}
          id={_utils.cx(
            _styles,
            "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf0e-f9aebf0d"
          )}
          tag="div"
        >
          {slotCheckbox}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1435", "overview-wrap")}
        id={_utils.cx(
          _styles,
          "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf10-f9aebf0d"
        )}
        tag="div"
        {...onClickCard}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "one-line-clamp")}
          tag="div"
        >
          {textTask}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1435")}
        id={_utils.cx(
          _styles,
          "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf0f-f9aebf0d"
        )}
        tag="div"
      >
        {slotStatus ?? <TaskStatus />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1435")}
        id={_utils.cx(
          _styles,
          "w-node-_11278828-2b21-6637-8526-f1ac7659ccbf-f9aebf0d"
        )}
        tag="div"
      >
        {slotPriority ?? <PriorityPill />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1435")}
        id={_utils.cx(
          _styles,
          "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf13-f9aebf0d"
        )}
        tag="div"
        {...onClickCard}
      >
        {slotAssignedToCard}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1435")}
        id={_utils.cx(
          _styles,
          "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf1d-f9aebf0d"
        )}
        tag="div"
        {...onClickCard}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "one-line-clamp")}
          tag="div"
        >
          {textJob}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1435")}
        id={_utils.cx(
          _styles,
          "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf20-f9aebf0d"
        )}
        tag="div"
        {...onClickCard}
      >
        {slotCandidate}
      </_Builtin.Block>
      {isActiveCard ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1449")}
          id={_utils.cx(
            _styles,
            "w-node-_5835e3c5-e90c-dac6-4a0a-13a054034032-f9aebf0d"
          )}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
