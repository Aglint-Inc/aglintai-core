"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { TranscriptCard } from "./TranscriptCard";
import * as _utils from "./utils";
import _styles from "./TaskProgress.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-81":{"id":"e-81","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-58","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-82"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716979210746}},"actionLists":{"a-58":{"id":"a-58","title":"Req-recent-reschedule hover in","actionItemGroups":[{"actionItems":[{"id":"a-58-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":0,"unit":""}},{"id":"a-58-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae"},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-58-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":"none"}}]},{"actionItems":[{"id":"a-58-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":1,"unit":""}},{"id":"a-58-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":true,"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae"},"globalSwatchId":"","rValue":247,"bValue":251,"gValue":249,"aValue":1}},{"id":"a-58-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1716979214379}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TaskProgress({
  as: _Component = _Builtin.Block,
  slotImage,
  textTask = "Task createdand assigned to @phoneagent by Marc(you)",
  textTime = "5 Hours ago",
  isTaskProgressVisible = true,
  isTaskCompletedVisible = false,
  onClickViewTranscript = {},
  textTimeCompleted = "5 Hours ago",
  slotMailContent,
  isLineVisible = true,
  slotSoundTask,
  isSoundTaskVisible = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "task_progress")} tag="div">
      <_Builtin.Block tag="div">
        {isTaskProgressVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1346")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1349")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1347")}
                tag="div"
              >
                {slotImage}
              </_Builtin.Block>
              {isLineVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-1348")}
                  tag="div"
                />
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1350")}
              tag="div"
            >
              <_Builtin.Block tag="div">{textTask}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1366")}
                tag="div"
              >
                {slotMailContent ?? (
                  <>
                    <TranscriptCard />
                    <TranscriptCard />
                  </>
                )}
              </_Builtin.Block>
              {isSoundTaskVisible ? (
                <_Builtin.Block tag="div">{slotSoundTask}</_Builtin.Block>
              ) : null}
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "text-grey_600")}
                tag="div"
              >
                {textTime}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isTaskCompletedVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1346", "mt-10")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1349")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1347")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2223.5%22%20height%3D%2223.5%22%20rx%3D%2211.75%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2223.5%22%20height%3D%2223.5%22%20rx%3D%2211.75%22%20stroke%3D%22%23D8DCDE%22%20stroke-width%3D%220.5%22%2F%3E%0A%3Cpath%20d%3D%22M9.375%206C9.60938%206.01562%209.73438%206.14062%209.75%206.375V7.5H14.25V6.375C14.2656%206.14062%2014.3906%206.01562%2014.625%206C14.8594%206.01562%2014.9844%206.14062%2015%206.375V7.5H15.75C16.1719%207.51562%2016.5234%207.66406%2016.8047%207.94531C17.0859%208.22656%2017.2344%208.57812%2017.25%209V9.75V10.5V16.5C17.2344%2016.9219%2017.0859%2017.2734%2016.8047%2017.5547C16.5234%2017.8359%2016.1719%2017.9844%2015.75%2018H8.25C7.82812%2017.9844%207.47656%2017.8359%207.19531%2017.5547C6.91406%2017.2734%206.76562%2016.9219%206.75%2016.5V10.5V9.75V9C6.76562%208.57812%206.91406%208.22656%207.19531%207.94531C7.47656%207.66406%207.82812%207.51562%208.25%207.5H9V6.375C9.01562%206.14062%209.14062%206.01562%209.375%206ZM16.5%2010.5H7.5V16.5C7.5%2016.7188%207.57031%2016.8984%207.71094%2017.0391C7.85156%2017.1797%208.03125%2017.25%208.25%2017.25H15.75C15.9688%2017.25%2016.1484%2017.1797%2016.2891%2017.0391C16.4297%2016.8984%2016.5%2016.7188%2016.5%2016.5V10.5ZM15.75%208.25H8.25C8.03125%208.25%207.85156%208.32031%207.71094%208.46094C7.57031%208.60156%207.5%208.78125%207.5%209V9.75H16.5V9C16.5%208.78125%2016.4297%208.60156%2016.2891%208.46094C16.1484%208.32031%2015.9688%208.25%2015.75%208.25Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1350")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {"Call complted. Scheduled meeting on 5th April After Noon."}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-sm",
                "text-blue-500",
                "text-underline",
                "cursor-pointer"
              )}
              tag="div"
              {...onClickViewTranscript}
            >
              {"View transcript"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "text-grey_600")}
              tag="div"
            >
              {textTimeCompleted}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
