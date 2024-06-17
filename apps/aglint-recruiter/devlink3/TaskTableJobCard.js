"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ButtonGhost } from "./ButtonGhost";
import { NewTaskCard } from "./NewTaskCard";
import { TaskTableJobSubCard } from "./TaskTableJobSubCard";
import * as _utils from "./utils";
import _styles from "./TaskTableJobCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-57":{"id":"e-57","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-35","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-58"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9da4f4b4-a7a7-a6db-016f-1db257523c4b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9da4f4b4-a7a7-a6db-016f-1db257523c4b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713937608410},"e-58":{"id":"e-58","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-36","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-57"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9da4f4b4-a7a7-a6db-016f-1db257523c4b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9da4f4b4-a7a7-a6db-016f-1db257523c4b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713937608410}},"actionLists":{"a-35":{"id":"a-35","title":"New Task Hover in","actionItemGroups":[{"actionItems":[{"id":"a-35-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tjc-btn-wrap","selectorGuids":["2801abf0-818c-4ab9-31f4-d819cbd04188"]},"value":"none"}},{"id":"a-35-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".tjc-btn-wrap","selectorGuids":["2801abf0-818c-4ab9-31f4-d819cbd04188"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-35-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".tjc-btn-wrap","selectorGuids":["2801abf0-818c-4ab9-31f4-d819cbd04188"]},"value":1,"unit":""}},{"id":"a-35-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tjc-btn-wrap","selectorGuids":["2801abf0-818c-4ab9-31f4-d819cbd04188"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1713937614107},"a-36":{"id":"a-36","title":"New Task Hover out","actionItemGroups":[{"actionItems":[{"id":"a-36-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".tjc-btn-wrap","selectorGuids":["2801abf0-818c-4ab9-31f4-d819cbd04188"]},"value":0,"unit":""}},{"id":"a-36-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tjc-btn-wrap","selectorGuids":["2801abf0-818c-4ab9-31f4-d819cbd04188"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1713937614107}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TaskTableJobCard({
  as: _Component = _Builtin.Block,
  textRole = "Software Engineer",
  slotAvatarWithName,
  onClickNewTask = {},
  isNewTaskInputVisible = false,
  slotNewTaskCard,
  slotTaskTableJobCard,
  slotDropIcon,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component tag="div">
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "new_task", "job-cand", "heigth-60")}
          data-w-id="9da4f4b4-a7a7-a6db-016f-1db257523c4b"
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "tjc-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "tjc-space-div", "header")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "tjc-slot-drop-icon")}
              tag="div"
            >
              {slotDropIcon}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "tjc-slot-avatar")}
              tag="div"
            >
              {slotAvatarWithName}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "tjc-btn-wrap")}
              tag="div"
              {...onClickNewTask}
            >
              <ButtonGhost
                size="1"
                textButton="New"
                iconName="add"
                iconSize="3"
                isLeftIcon={true}
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isNewTaskInputVisible ? (
          <_Builtin.Block tag="div">
            {slotNewTaskCard ?? <NewTaskCard />}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {slotTaskTableJobCard ?? <TaskTableJobSubCard />}
      </_Builtin.Block>
    </_Component>
  );
}
