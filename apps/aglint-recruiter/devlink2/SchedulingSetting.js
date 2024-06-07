"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { DateList } from "./DateList";
import * as _utils from "./utils";
import _styles from "./SchedulingSetting.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SchedulingSetting({
  as: _Component = _Builtin.Block,
  slotToggleTimeZone,
  slotInputTimeZone,
  slotDailyLimit,
  slotWeeklyLimit,
  onClickReset = {},
  slotWorkingHours,
  slotToggleCompanyDays,
  slotDateList,
  onClickAddDaysOff = {},
  onClickDiscard = {},
  onClickUpdateChanges = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "scheduler-setting-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1117")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1115")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Settings"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {"These settings will be applied on company level"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1116", "hide")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-red-500", "cursor-pointer")}
            tag="div"
            {...onClickDiscard}
          >
            {"Discard"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "button_primary")}
            tag="div"
            {...onClickUpdateChanges}
          >
            <_Builtin.Block tag="div">{"Update Changes"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block tag="div">{"Time Zone"}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "time-auto-input-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "time-auto-wrap")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotToggleTimeZone}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-500")}
              tag="div"
            >
              {"Get timezone automatically"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotInputTimeZone}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1083")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1082")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Interview Load"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-500")}
            tag="div"
          >
            {"Setup maximum no of interviews daily and weekly"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1086")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1084")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "width-125")}
              tag="div"
            >
              {"Daily Limit"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1085")}
              tag="div"
            >
              {slotDailyLimit}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1084")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "width-125")}
              tag="div"
            >
              {"Weekly Limit"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1085")}
              tag="div"
            >
              {slotWeeklyLimit}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1087", "cursor-pointer")}
          tag="div"
          {...onClickReset}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2214%22%20viewbox%3D%220%200%2015%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13.75%206H9.25C8.79167%205.95833%208.54167%205.70833%208.5%205.25C8.54167%204.79167%208.79167%204.54167%209.25%204.5H12.0938L11.2188%203.5V3.46875C10.7188%202.86458%2010.1042%202.38542%209.375%202.03125C8.64583%201.67708%207.85417%201.5%207%201.5C5.4375%201.54167%204.14583%202.08333%203.125%203.125C2.08333%204.14583%201.54167%205.4375%201.5%207C1.54167%208.5625%202.08333%209.85417%203.125%2010.875C4.14583%2011.9167%205.4375%2012.4583%207%2012.5C8.27083%2012.4792%209.375%2012.1146%2010.3125%2011.4062C10.6875%2011.1562%2011.0312%2011.2083%2011.3438%2011.5625C11.5938%2011.9375%2011.5417%2012.2812%2011.1875%2012.5938C10%2013.5104%208.60417%2013.9792%207%2014C5.6875%2013.9792%204.51042%2013.6562%203.46875%2013.0312C2.40625%2012.4271%201.57292%2011.5938%200.96875%2010.5312C0.34375%209.48958%200.0208333%208.3125%200%207C0.0208333%205.6875%200.34375%204.51042%200.96875%203.46875C1.57292%202.40625%202.40625%201.57292%203.46875%200.96875C4.51042%200.34375%205.6875%200.0208333%207%200C8.08333%200%209.09375%200.229167%2010.0312%200.6875C10.9479%201.125%2011.7292%201.73958%2012.375%202.53125L13%203.25V0.75C13.0417%200.291667%2013.2917%200.0416667%2013.75%200C14.2083%200.0416667%2014.4583%200.291667%2014.5%200.75V5.25C14.4583%205.70833%2014.2083%205.95833%2013.75%206Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-500")}
            tag="div"
          >
            {"Reset to default company level settings"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1088")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1082")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Working Hours"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-500")}
            tag="div"
          >
            {"Setup working houes"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotWorkingHours}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1091")}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Company Days Off"}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "time-auto-wrap")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotToggleCompanyDays}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-500")}
            tag="div"
          >
            {"Sync automatically from company calender"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1092")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {slotDateList ?? <DateList />}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1090", "cursor-pointer")}
            tag="div"
            {...onClickAddDaysOff}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.375%200C3.60938%200.015625%203.73438%200.140625%203.75%200.375V1.5H8.25V0.375C8.26562%200.140625%208.39062%200.015625%208.625%200C8.85938%200.015625%208.98438%200.140625%209%200.375V1.5H9.75C10.1719%201.51563%2010.5234%201.66406%2010.8047%201.94531C11.0859%202.22656%2011.2344%202.57812%2011.25%203V3.75V4.5V10.5C11.2344%2010.9219%2011.0859%2011.2734%2010.8047%2011.5547C10.5234%2011.8359%2010.1719%2011.9844%209.75%2012H2.25C1.82812%2011.9844%201.47656%2011.8359%201.19531%2011.5547C0.914062%2011.2734%200.765625%2010.9219%200.75%2010.5V4.5V3.75V3C0.765625%202.57812%200.914062%202.22656%201.19531%201.94531C1.47656%201.66406%201.82812%201.51563%202.25%201.5H3V0.375C3.01562%200.140625%203.14062%200.015625%203.375%200ZM10.5%204.5H1.5H10.5H1.5V10.5C1.5%2010.7188%201.57031%2010.8984%201.71094%2011.0391C1.85156%2011.1797%202.03125%2011.25%202.25%2011.25H9.75C9.96875%2011.25%2010.1484%2011.1797%2010.2891%2011.0391C10.4297%2010.8984%2010.5%2010.7188%2010.5%2010.5V4.5ZM9.75%202.25H2.25H9.75H2.25C2.03125%202.25%201.85156%202.32031%201.71094%202.46094C1.57031%202.60156%201.5%202.78125%201.5%203V3.75H10.5V3C10.5%202.78125%2010.4297%202.60156%2010.2891%202.46094C10.1484%202.32031%209.96875%202.25%209.75%202.25Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-blue-500")}
              tag="div"
            >
              {"Add"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
