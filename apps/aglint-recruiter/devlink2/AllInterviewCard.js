"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { EmptyInterviewProgress } from "./EmptyInterviewProgress";
import { ScheduleWithAgent } from "./ScheduleWithAgent";
import * as _utils from "./utils";
import _styles from "./AllInterviewCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-145":{"id":"e-145","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-92","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-146"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"74900e4c-b1fd-7af5-7374-5caedc41babe","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"74900e4c-b1fd-7af5-7374-5caedc41babe","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711378224015},"e-146":{"id":"e-146","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-93","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-145"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"74900e4c-b1fd-7af5-7374-5caedc41babe","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"74900e4c-b1fd-7af5-7374-5caedc41babe","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711378224015},"e-149":{"id":"e-149","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-92","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-150"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c47c251b5e557c2143b9b5|843ec712-1c31-5953-08d9-cab4d8fdc4f3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c47c251b5e557c2143b9b5|843ec712-1c31-5953-08d9-cab4d8fdc4f3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713353967753},"e-150":{"id":"e-150","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-93","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-149"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c47c251b5e557c2143b9b5|843ec712-1c31-5953-08d9-cab4d8fdc4f3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c47c251b5e557c2143b9b5|843ec712-1c31-5953-08d9-cab4d8fdc4f3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713353967753},"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-92":{"id":"a-92","title":"candidate job hover in","actionItemGroups":[{"actionItems":[{"id":"a-92-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":"none"}},{"id":"a-92-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-92-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":"flex"}},{"id":"a-92-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711378228552},"a-93":{"id":"a-93","title":"candidate job hover out","actionItemGroups":[{"actionItems":[{"id":"a-93-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":0,"unit":""}},{"id":"a-93-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1711378228552},"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AllInterviewCard({
  as: _Component = _Builtin.Block,
  textName = "Westly Snedger",
  slotCandidateImage,
  textDuration = "1 hour",
  slotPanelImage,
  textInterviewPanel = "This is some text inside of a div block.",
  textRelatedJob = "Product Designer",
  slotScheduleInfo,
  isSchedulerTable = true,
  slotCheckbox,
  isCheckBoxVisible = true,
  propsGrid = {},
  isSelected = false,
  textCurrentRole = "Prodct Designer",
  slotStatusBadge,
  slotScheduleWithAgent,
  onClickAgent = {},
  isDragVisible = false,
  onClickDrag = {},
  slotInterviewProgress,
  isResumeScoreVisible = false,
  slotResumeScore,
  onClickCard = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "allinterview_row_-candidate", "new")}
      tag="div"
      {...propsGrid}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1704")}
        id={_utils.cx(
          _styles,
          "w-node-_591be287-0ca8-0080-bb3f-55efaf5bf746-e75dcb06"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1312")}
          tag="div"
        >
          {isDragVisible ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2216%22%20viewBox%3D%220%200%2014%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14%206C13.9792%206.3125%2013.8125%206.47917%2013.5%206.5H0.5C0.1875%206.47917%200.0208333%206.3125%200%206C0.0208333%205.6875%200.1875%205.52083%200.5%205.5H13.5C13.8125%205.52083%2013.9792%205.6875%2014%206ZM14%2010C13.9792%2010.3125%2013.8125%2010.4792%2013.5%2010.5H0.5C0.1875%2010.4792%200.0208333%2010.3125%200%2010C0.0208333%209.6875%200.1875%209.52083%200.5%209.5H13.5C13.8125%209.52083%2013.9792%209.6875%2014%2010Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              {...onClickDrag}
            />
          ) : null}
        </_Builtin.Block>
        {isCheckBoxVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-958")}
            tag="div"
          >
            {slotCheckbox}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
        {...onClickCard}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-834", "hide")}
          tag="div"
        >
          {slotCandidateImage}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2223.5%22%20height%3D%2223.5%22%20rx%3D%2211.75%22%20fill%3D%22%23F8F9F9%22%2F%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2223.5%22%20height%3D%2223.5%22%20rx%3D%2211.75%22%20stroke%3D%22%23D8DCDE%22%20stroke-width%3D%220.5%22%2F%3E%0A%3Cpath%20d%3D%22M12%2012C11.4531%2012%2010.9531%2011.8672%2010.5%2011.6016C10.0469%2011.3359%209.67969%2010.9688%209.39844%2010.5C9.13281%2010.0312%209%209.53125%209%209C9%208.46875%209.13281%207.96875%209.39844%207.5C9.67969%207.03125%2010.0469%206.66406%2010.5%206.39844C10.9531%206.13281%2011.4531%206%2012%206C12.5469%206%2013.0469%206.13281%2013.5%206.39844C13.9531%206.66406%2014.3203%207.03125%2014.6016%207.5C14.8672%207.96875%2015%208.46875%2015%209C15%209.53125%2014.8672%2010.0312%2014.6016%2010.5C14.3203%2010.9688%2013.9531%2011.3359%2013.5%2011.6016C13.0469%2011.8672%2012.5469%2012%2012%2012ZM10.9219%2013.125H13.0781C14.25%2013.1562%2015.2344%2013.5625%2016.0312%2014.3438C16.8125%2015.1406%2017.2188%2016.125%2017.25%2017.2969C17.25%2017.5%2017.1797%2017.6641%2017.0391%2017.7891C16.9141%2017.9297%2016.75%2018%2016.5469%2018H7.45312C7.25%2018%207.08594%2017.9297%206.96094%2017.7891C6.82031%2017.6641%206.75%2017.5%206.75%2017.2969C6.78125%2016.125%207.1875%2015.1406%207.96875%2014.3438C8.76562%2013.5625%209.75%2013.1562%2010.9219%2013.125Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1267")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "fw-semibold",
              "text-first-cap",
              "one-line-clamp"
            )}
            tag="div"
          >
            {textName}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600", "one-line-clamp")}
            tag="div"
          >
            {textCurrentRole}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell", "hide")}
        tag="div"
        {...onClickCard}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1292")}
          tag="div"
        >
          {slotStatusBadge}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell", "hide")}
        tag="div"
        {...onClickCard}
      >
        <_Builtin.Block tag="div">{textDuration}</_Builtin.Block>
      </_Builtin.Block>
      {isResumeScoreVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "candidate_cell", "space-between")}
          tag="div"
          {...onClickCard}
        >
          {slotResumeScore}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell", "z-index-none")}
        tag="div"
        {...onClickCard}
      >
        {slotInterviewProgress ?? (
          <>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-840", "hide")}
              tag="div"
            >
              <_Builtin.Block tag="div">{slotPanelImage}</_Builtin.Block>
              <_Builtin.Block tag="div">{textInterviewPanel}</_Builtin.Block>
            </_Builtin.Block>
            <EmptyInterviewProgress />
          </>
        )}
      </_Builtin.Block>
      {isSchedulerTable ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "candidate_cell", "space-between")}
          tag="div"
          {...onClickCard}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-840")}
            tag="div"
          >
            <_Builtin.Block tag="div">{textRelatedJob}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1282", "hide")}
            data-w-id="74900e4c-b1fd-7af5-7374-5caedc41babe"
            tag="div"
            {...onClickAgent}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2217%22%20viewBox%3D%220%200%2014%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.25%208.5C0.270833%207.83333%200.5625%207.33333%201.125%207C1.70833%206.66667%202.29167%206.66667%202.875%207C3.4375%207.33333%203.72917%207.83333%203.75%208.5C3.72917%209.16667%203.4375%209.66667%202.875%2010C2.29167%2010.3333%201.70833%2010.3333%201.125%2010C0.5625%209.66667%200.270833%209.16667%200.25%208.5ZM5.25%208.5C5.27083%207.83333%205.5625%207.33333%206.125%207C6.70833%206.66667%207.29167%206.66667%207.875%207C8.4375%207.33333%208.72917%207.83333%208.75%208.5C8.72917%209.16667%208.4375%209.66667%207.875%2010C7.29167%2010.3333%206.70833%2010.3333%206.125%2010C5.5625%209.66667%205.27083%209.16667%205.25%208.5ZM12%206.75C12.6667%206.77083%2013.1667%207.0625%2013.5%207.625C13.8333%208.20833%2013.8333%208.79167%2013.5%209.375C13.1667%209.9375%2012.6667%2010.2292%2012%2010.25C11.3333%2010.2292%2010.8333%209.9375%2010.5%209.375C10.1667%208.79167%2010.1667%208.20833%2010.5%207.625C10.8333%207.0625%2011.3333%206.77083%2012%206.75Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1284")}
              tag="div"
            >
              {slotScheduleWithAgent ?? <ScheduleWithAgent />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "is_selected_bg-copy")}
          id={_utils.cx(
            _styles,
            "w-node-eb43a66d-c6c0-56a1-cd6b-c24535cb6173-e75dcb06"
          )}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
