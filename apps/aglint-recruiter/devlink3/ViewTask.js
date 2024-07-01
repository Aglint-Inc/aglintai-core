"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import { Kbd } from "./Kbd";
import { ButtonSoft } from "./ButtonSoft";
import { ViewTaskCard } from "./ViewTaskCard";
import { TaskProgress } from "./TaskProgress";
import * as _utils from "./utils";
import _styles from "./ViewTask.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-83":{"id":"e-83","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-56","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-84"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"dafc1148-8c99-faba-54e3-1aae8d857a3c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"dafc1148-8c99-faba-54e3-1aae8d857a3c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1719465487407},"e-84":{"id":"e-84","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-57","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-83"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"dafc1148-8c99-faba-54e3-1aae8d857a3c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"dafc1148-8c99-faba-54e3-1aae8d857a3c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1719465487407},"e-85":{"id":"e-85","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-56","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-86"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"191a051c-c962-8e18-e110-c40d99c84658","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"191a051c-c962-8e18-e110-c40d99c84658","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1719468048407},"e-86":{"id":"e-86","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-57","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-85"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"191a051c-c962-8e18-e110-c40d99c84658","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"191a051c-c962-8e18-e110-c40d99c84658","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1719468048407}},"actionLists":{"a-56":{"id":"a-56","title":"task arrow tooltip hover in","actionItemGroups":[{"actionItems":[{"id":"a-56-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".tips-arrow-wrpa","selectorGuids":["36cce4e5-d476-4edf-90f0-75970c1ea306"]},"value":0,"unit":""}},{"id":"a-56-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tips-arrow-wrpa","selectorGuids":["36cce4e5-d476-4edf-90f0-75970c1ea306"]},"value":"none"}}]},{"actionItems":[{"id":"a-56-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".tips-arrow-wrpa","selectorGuids":["36cce4e5-d476-4edf-90f0-75970c1ea306"]},"value":1,"unit":""}},{"id":"a-56-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tips-arrow-wrpa","selectorGuids":["36cce4e5-d476-4edf-90f0-75970c1ea306"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1719465491463},"a-57":{"id":"a-57","title":"task arrow tooltip hover out","actionItemGroups":[{"actionItems":[{"id":"a-57-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".tips-arrow-wrpa","selectorGuids":["36cce4e5-d476-4edf-90f0-75970c1ea306"]},"value":0,"unit":""}},{"id":"a-57-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tips-arrow-wrpa","selectorGuids":["36cce4e5-d476-4edf-90f0-75970c1ea306"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1719465491463}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ViewTask({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  slotTaskCard,
  slotTaskProgress,
  textTaskDetail = "The TAR (Talent Acquisition Representative) admin currently lacks the ability to edit basic candidate details. It's necessary to grant TAR admins the permission",
  isCancelTaskVisible = true,
  onClickCancelTask = {},
  onClickPrev = {},
  onClickNext = {},
  isDisablePrev = false,
  isDisableNext = false,
  onClickCompleteTask = {},
  isCompleteTaskVisible = true,
  slotTaskHeader,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "create-task")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "task_drawer_title")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "vt-header-left-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "left-right-arrows")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "arrow_task")}
              tag="div"
              {...onClickPrev}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "icon-small")}
                data-w-id="dafc1148-8c99-faba-54e3-1aae8d857a3c"
                tag="div"
              >
                <GlobalIcon iconName="keyboard_arrow_up" />
                <_Builtin.Block
                  className={_utils.cx(_styles, "tips-arrow-wrpa")}
                  tag="div"
                >
                  <Text weight="" size="1" content="Press" />
                  <Kbd textShortcut="↑" />
                  <Text weight="" size="1" content="for prev" />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            {isDisablePrev ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "arrow_task", "disable")}
                tag="div"
              >
                <GlobalIcon iconName="keyboard_arrow_up" />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "left-right-arrows")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "arrow_task")}
              tag="div"
              {...onClickNext}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "icon-small")}
                data-w-id="191a051c-c962-8e18-e110-c40d99c84658"
                tag="div"
              >
                <GlobalIcon iconName="keyboard_arrow_down" />
                <_Builtin.Block
                  className={_utils.cx(_styles, "tips-arrow-wrpa")}
                  tag="div"
                >
                  <Text weight="" size="1" content="Press" />
                  <Kbd textShortcut="↓" />
                  <Text weight="" size="1" content="for prev" />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            {isDisableNext ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "arrow_task", "disable")}
                tag="div"
              >
                <GlobalIcon iconName="keyboard_arrow_up" />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotTaskHeader}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "taskdrawer_controls")}
          tag="div"
        >
          {isCancelTaskVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "task_action_buttons")}
              tag="div"
            >
              <ButtonSoft
                onClickButton={onClickCancelTask}
                size="1"
                textButton="Close Task"
                color="error"
                highContrast="false"
              />
              {isCompleteTaskVisible ? (
                <_Builtin.Block tag="div">
                  <ButtonSoft
                    onClickButton={onClickCompleteTask}
                    size="1"
                    textButton="Complete Task"
                    color="neutral"
                    highContrast="false"
                  />
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "task-close-wrap")}
            tag="div"
            {...onClickClose}
          >
            <GlobalIcon iconName="close" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "task_body")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "task_title")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {textTaskDetail}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "task_detail")} tag="div">
          {slotTaskCard ?? <ViewTaskCard />}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "task_activityy")}
            tag="div"
          >
            <Text content="Task Activity" size="1" color="neutral" weight="" />
            <_Builtin.Block
              className={_utils.cx(_styles, "", "slot_task_progress")}
              tag="div"
            >
              {slotTaskProgress ?? <TaskProgress />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
