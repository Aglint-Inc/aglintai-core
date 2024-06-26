"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { ButtonSoft } from "./ButtonSoft";
import { ViewTaskCard } from "./ViewTaskCard";
import { TaskProgress } from "./TaskProgress";
import * as _utils from "./utils";
import _styles from "./ViewTask.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-53":{"id":"e-53","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-54"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b5766867-4376-9164-037c-56410a1f2209","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b5766867-4376-9164-037c-56410a1f2209","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713879535086},"e-54":{"id":"e-54","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-32","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-53"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b5766867-4376-9164-037c-56410a1f2209","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b5766867-4376-9164-037c-56410a1f2209","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713879535087},"e-55":{"id":"e-55","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-33","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-56"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0b3b2f1f-5f46-6508-56f8-8b41579ca1ba","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0b3b2f1f-5f46-6508-56f8-8b41579ca1ba","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713879736534},"e-56":{"id":"e-56","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-34","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-55"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0b3b2f1f-5f46-6508-56f8-8b41579ca1ba","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0b3b2f1f-5f46-6508-56f8-8b41579ca1ba","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713879736535}},"actionLists":{"a-31":{"id":"a-31","title":"Task Next previous hover in","actionItemGroups":[{"actionItems":[{"id":"a-31-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","a2a837d1-3ada-a444-2fa0-fdd1c9899dbc"]},"value":0,"unit":""}},{"id":"a-31-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","a2a837d1-3ada-a444-2fa0-fdd1c9899dbc"]},"value":"none"}}]},{"actionItems":[{"id":"a-31-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","a2a837d1-3ada-a444-2fa0-fdd1c9899dbc"]},"value":1,"unit":""}},{"id":"a-31-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","a2a837d1-3ada-a444-2fa0-fdd1c9899dbc"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1713879541901},"a-32":{"id":"a-32","title":"Task Next previous hover out","actionItemGroups":[{"actionItems":[{"id":"a-32-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","a2a837d1-3ada-a444-2fa0-fdd1c9899dbc"]},"value":0,"unit":""}},{"id":"a-32-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","a2a837d1-3ada-a444-2fa0-fdd1c9899dbc"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1713879541901},"a-33":{"id":"a-33","title":"task next hover in","actionItemGroups":[{"actionItems":[{"id":"a-33-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task-next","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","2323e848-ad42-6abb-165b-58d703c9633d"]},"value":0,"unit":""}},{"id":"a-33-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task-next","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","2323e848-ad42-6abb-165b-58d703c9633d"]},"value":"none"}}]},{"actionItems":[{"id":"a-33-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task-next","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","2323e848-ad42-6abb-165b-58d703c9633d"]},"value":1,"unit":""}},{"id":"a-33-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task-next","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","2323e848-ad42-6abb-165b-58d703c9633d"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1713879745453},"a-34":{"id":"a-34","title":"task next hover out","actionItemGroups":[{"actionItems":[{"id":"a-34-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task-next","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","2323e848-ad42-6abb-165b-58d703c9633d"]},"value":0,"unit":""}},{"id":"a-34-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task-next","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","2323e848-ad42-6abb-165b-58d703c9633d"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1713879745453}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
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
          <Text
            content={
              <>
                {"Task Detail"}
                <br />
              </>
            }
            weight=""
            color="neutral"
          />
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
            className={_utils.cx(_styles, "left-right-arrows")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "arrow_task")}
              data-w-id="b5766867-4376-9164-037c-56410a1f2209"
              tag="div"
              {...onClickPrev}
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "arrow-tooltips-drawer",
                  "grey-600",
                  "task"
                )}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Shift + ←"}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "icon-small")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "embed_arrow")}
                  tag="div"
                  icon-size="lg"
                  icon-weight="regular"
                  icon-color="neutral-11"
                >
                  {"keyboard_arrow_up"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            {isDisablePrev ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "arrow_task", "disable")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_arrow")}
                  value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2224%22%20height%3D%2224%22%20transform%3D%22matrix(0%201%20-1%200%2024%200)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20d%3D%22M21%200C22.6569%200%2024%201.34315%2024%203L24%2021C24%2022.6569%2022.6569%2024%2021%2024L3%2024C1.34315%2024%200%2022.6569%200%2021L0%203C0%201.34315%201.34315%200%203%200L21%200Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20transform%3D%22matrix(0%201%20-1%200%2020%204)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.5391%2013.4061C15.3516%2013.5936%2015.0477%2013.5936%2014.8603%2013.4061L11.9997%2010.5455L9.13908%2013.4061C8.95167%2013.5936%208.64778%2013.5936%208.46026%2013.4061C8.27284%2013.2187%208.27284%2012.9148%208.46026%2012.7273L11.6603%209.52731C11.7503%209.43729%2011.8724%209.38672%2011.9997%209.38672C12.127%209.38672%2012.2491%209.43729%2012.3391%209.52731L15.5391%2012.7273C15.7266%2012.9148%2015.7266%2013.2187%2015.5391%2013.4061Z%22%20fill%3D%22var(--neutral-6)%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "left-right-arrows")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "arrow_task")}
              data-w-id="0b3b2f1f-5f46-6508-56f8-8b41579ca1ba"
              tag="div"
              {...onClickNext}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "icon-small")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "embed_arrow")}
                  tag="div"
                  icon-size="lg"
                  icon-weight="regular"
                  icon-color="neutral-11"
                >
                  {"keyboard_arrow_down"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "arrow-tooltips-drawer",
                  "grey-600",
                  "task-next"
                )}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Shift + →"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            {isDisableNext ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "arrow_task", "disable")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_arrow")}
                  value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2224%22%20height%3D%2224%22%20transform%3D%22matrix(0%201%20-1%200%2024%200)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20d%3D%22M21%200C22.6569%200%2024%201.34315%2024%203V21C24%2022.6569%2022.6569%2024%2021%2024H3C1.34315%2024%200%2022.6569%200%2021V3C0%201.34315%201.34315%200%203%200L21%200Z%22%20fill%3D%22currentColor%22%20%2F%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20transform%3D%22matrix(0%201%20-1%200%2020%204)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.5391%2010.5937C15.7266%2010.7812%2015.7266%2011.0851%2015.5391%2011.2725L12.3391%2014.4725C12.2491%2014.5625%2012.127%2014.6131%2011.9997%2014.6131C11.8724%2014.6131%2011.7503%2014.5625%2011.6603%2014.4725L8.46032%2011.2725C8.2728%2011.0851%208.2728%2010.7812%208.46032%2010.5937C8.64774%2010.4063%208.95163%2010.4063%209.13904%2010.5937L11.9997%2013.4543L14.8603%2010.5937C15.0477%2010.4063%2015.3516%2010.4063%2015.5391%2010.5937Z%22%20fill%3D%22var(--neutral-6)%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "arrow_task")}
            tag="div"
            {...onClickClose}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons", "cursor-pointer")}
              value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20d%3D%22M0.5%203C0.5%201.61929%201.61929%200.5%203%200.5H21C22.3807%200.5%2023.5%201.61929%2023.5%203V21C23.5%2022.3807%2022.3807%2023.5%2021%2023.5H3C1.61929%2023.5%200.5%2022.3807%200.5%2021V3Z%22%20stroke%3D%22%23191400%22%20stroke-opacity%3D%220.207843%22%2F%3E%0A%3Cpath%20d%3D%22M14.6172%2015.1328L11.5%2012.0391L8.40625%2015.1328C8.21875%2015.2734%208.03906%2015.2734%207.86719%2015.1328C7.72656%2014.9609%207.72656%2014.7891%207.86719%2014.6172L10.9609%2011.5L7.86719%208.40625C7.72656%208.21875%207.72656%208.03906%207.86719%207.86719C8.03906%207.72656%208.21875%207.72656%208.40625%207.86719L11.5%2010.9609L14.6172%207.86719C14.7891%207.72656%2014.9609%207.72656%2015.1328%207.86719C15.2734%208.03906%2015.2734%208.21875%2015.1328%208.40625L12.0391%2011.5L15.1328%2014.6172C15.2734%2014.7891%2015.2734%2014.9609%2015.1328%2015.1328C14.9609%2015.2734%2014.7891%2015.2734%2014.6172%2015.1328Z%22%20fill%3D%22%2321201C%22%2F%3E%0A%3C%2Fsvg%3E"
              {...onClickClose}
            />
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
