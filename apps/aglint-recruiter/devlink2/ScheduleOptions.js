"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./ScheduleOptions.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ScheduleOptions({
  as: _Component = _Builtin.Block,
  slotCandidateImage,
  textCandidateName = "Senior Software Engineer",
  slotInputName,
  slotDateRangeInput,
  slotPrimaryButton,
  slotInterviewCordinator,
  isNoOptionsFoundVisible = false,
  slotButtonLeft,
  slotButtonRight,
  textDuration = "45 Minutes",
  textPlatformName = "Google Meet",
  slotPlatformIcon,
  textSessionName = "Self Indroduction Session",
  onClickClose = {},
  textPopHeader = "Enter basic details",
  isBasicDetailsVisible = true,
  slotAvailableOptionsDate,
  isMultipleOptionVisible = false,
  slotSendtoCandidateButton,
  slotAvailableCard,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "div-block-1192")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1294")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {textPopHeader}
        </_Builtin.Block>
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "cursor-pointer")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.7812%202.28125L7.0625%206L10.7812%209.71875C11.0729%2010.0729%2011.0729%2010.4271%2010.7812%2010.7812C10.4271%2011.0729%2010.0729%2011.0729%209.71875%2010.7812L6%207.0625L2.28125%2010.7812C1.92708%2011.0729%201.57292%2011.0729%201.21875%2010.7812C0.927083%2010.4271%200.927083%2010.0729%201.21875%209.71875L4.9375%206L1.21875%202.28125C0.927083%201.92708%200.927083%201.57292%201.21875%201.21875C1.57292%200.927083%201.92708%200.927083%202.28125%201.21875L6%204.9375L9.71875%201.21875C10.0729%200.927083%2010.4271%200.927083%2010.7812%201.21875C11.0729%201.57292%2011.0729%201.92708%2010.7812%202.28125Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickClose}
        />
      </_Builtin.Block>
      {isNoOptionsFoundVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "no-option-wrap")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2217%22%20viewbox%3D%220%200%2016%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8%2016.5C6.54167%2016.4792%205.20833%2016.125%204%2015.4375C2.79167%2014.7292%201.8125%2013.75%201.0625%2012.5C0.354167%2011.2292%200%209.89583%200%208.5C0%207.10417%200.354167%205.77083%201.0625%204.5C1.8125%203.25%202.79167%202.27083%204%201.5625C5.20833%200.875%206.54167%200.520833%208%200.5C9.45833%200.520833%2010.7917%200.875%2012%201.5625C13.2083%202.27083%2014.1875%203.25%2014.9375%204.5C15.6458%205.77083%2016%207.10417%2016%208.5C16%209.89583%2015.6458%2011.2292%2014.9375%2012.5C14.1875%2013.75%2013.2083%2014.7292%2012%2015.4375C10.7917%2016.125%209.45833%2016.4792%208%2016.5ZM6.75%2011C6.29167%2011.0417%206.04167%2011.2917%206%2011.75C6.04167%2012.2083%206.29167%2012.4583%206.75%2012.5H9.25C9.70833%2012.4583%209.95833%2012.2083%2010%2011.75C9.95833%2011.2917%209.70833%2011.0417%209.25%2011H9V8.25C8.95833%207.79167%208.70833%207.54167%208.25%207.5H6.75C6.29167%207.54167%206.04167%207.79167%206%208.25C6.04167%208.70833%206.29167%208.95833%206.75%209H7.5V11H6.75H7.5H6.75ZM8%204.5C7.70833%204.5%207.46875%204.59375%207.28125%204.78125C7.09375%204.96875%207%205.20833%207%205.5C7%205.79167%207.09375%206.03125%207.28125%206.21875C7.46875%206.40625%207.70833%206.5%208%206.5C8.29167%206.5%208.53125%206.40625%208.71875%206.21875C8.90625%206.03125%209%205.79167%209%205.5C9%205.20833%208.90625%204.96875%208.71875%204.78125C8.53125%204.59375%208.29167%204.5%208%204.5Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-yellow-800")}
            tag="div"
          >
            {
              "No available options found. Try modifying the date range to get options."
            }
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isBasicDetailsVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1295", "hide")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {textSessionName}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1297")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1296")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%200C7.125%200.015625%208.13281%200.289062%209.02344%200.820312C9.92969%201.35156%2010.6484%202.07031%2011.1797%202.97656C11.7109%203.86719%2011.9844%204.875%2012%206C11.9844%207.125%2011.7109%208.13281%2011.1797%209.02344C10.6484%209.92969%209.92969%2010.6484%209.02344%2011.1797C8.13281%2011.7109%207.125%2011.9844%206%2012C4.875%2011.9844%203.86719%2011.7109%202.97656%2011.1797C2.07031%2010.6484%201.35156%209.92969%200.820312%209.02344C0.289062%208.13281%200.015625%207.125%200%206C0.015625%204.73438%200.359375%203.60938%201.03125%202.625C1.25%202.35938%201.50781%202.3125%201.80469%202.48438C2.07031%202.70312%202.125%202.96094%201.96875%203.25781C1.42188%204.05469%201.14062%204.96875%201.125%206C1.15625%207.375%201.63281%208.52344%202.55469%209.44531C3.47656%2010.3672%204.625%2010.8438%206%2010.875C7.375%2010.8438%208.52344%2010.3672%209.44531%209.44531C10.3672%208.52344%2010.8438%207.375%2010.875%206C10.8438%204.71875%2010.4297%203.63281%209.63281%202.74219C8.82031%201.85156%207.79688%201.32031%206.5625%201.14844V2.4375C6.53125%202.78125%206.34375%202.96875%206%203C5.65625%202.96875%205.46875%202.78125%205.4375%202.4375V0.5625C5.46875%200.21875%205.65625%200.03125%206%200ZM4.52344%203.72656L6.39844%205.60156C6.61719%205.86719%206.61719%206.13281%206.39844%206.39844C6.13281%206.61719%205.86719%206.61719%205.60156%206.39844L3.72656%204.52344C3.50781%204.25781%203.50781%203.99219%203.72656%203.72656C3.99219%203.50781%204.25781%203.50781%204.52344%203.72656Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{textDuration}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1296")}
              tag="div"
            >
              <_Builtin.Block tag="div">{slotPlatformIcon}</_Builtin.Block>
              <_Builtin.Block tag="div">{textPlatformName}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isBasicDetailsVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1093", "hide")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Schedule Name"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotInputName}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isBasicDetailsVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1097")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Date Range"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {"Pick a start and end date where you have to conduct interview."}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotDateRangeInput ?? <SlotComp componentName="DateRange" />}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isBasicDetailsVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1289")}
          tag="div"
        >
          {slotPrimaryButton ?? <SlotComp componentName="Slot Button" />}
        </_Builtin.Block>
      ) : null}
      {isMultipleOptionVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1299")}
          tag="div"
        >
          {slotAvailableCard}
        </_Builtin.Block>
      ) : null}
      {isMultipleOptionVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1298")}
          tag="div"
        >
          {slotSendtoCandidateButton}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
