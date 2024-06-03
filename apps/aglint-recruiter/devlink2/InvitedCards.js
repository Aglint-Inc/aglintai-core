"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { InviteStatus } from "./InviteStatus";
import * as _utils from "./utils";
import _styles from "./InvitedCards.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InvitedCards({
  as: _Component = _Builtin.Block,
  textTitle = "Screening for front end engineer",
  textQuestionCount = "17 Questions",
  slotInviteStatus,
  textDesc = "The candidate has received an screening invitation but has not yet taken the screening.",
  onClickResendInvite = {},
  onClickInviteLink = {},
  onClickInviteNow = {},
  isInviteNowVisible = false,
  isResendInviteVisible = true,
  isInviteLink = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "div-block-1026")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1020")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textTitle}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1021")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {textQuestionCount}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotInviteStatus ?? <InviteStatus />}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">{textDesc}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1029")}
          tag="div"
        >
          {isResendInviteVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1027", "cursor-pointer")}
              tag="div"
              {...onClickResendInvite}
            >
              <_Builtin.Block tag="div">{"Resend Invite"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isInviteNowVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1027", "cursor-pointer")}
              tag="div"
              {...onClickInviteNow}
            >
              <_Builtin.Block tag="div">{"Invite Now"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isInviteLink ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1028", "cursor-pointer")}
              tag="div"
              {...onClickInviteLink}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.25%209.875C11.4844%209.85938%2011.6094%209.73438%2011.625%209.5V4.71875L10.0312%203.125H6.75C6.51562%203.14063%206.39062%203.26562%206.375%203.5V9.5C6.39062%209.73438%206.51562%209.85938%206.75%209.875H11.25ZM6.75%2011C6.32812%2010.9844%205.97656%2010.8359%205.69531%2010.5547C5.41406%2010.2734%205.26562%209.92188%205.25%209.5V3.5C5.26562%203.07812%205.41406%202.72656%205.69531%202.44531C5.97656%202.16406%206.32812%202.01563%206.75%202H10.0312C10.3438%202%2010.6094%202.10938%2010.8281%202.32812L12.4219%203.92188C12.6406%204.14062%2012.75%204.40625%2012.75%204.71875V9.5C12.7344%209.92188%2012.5859%2010.2734%2012.3047%2010.5547C12.0234%2010.8359%2011.6719%2010.9844%2011.25%2011H6.75ZM3.75%205H4.5V6.125H3.75C3.51562%206.14062%203.39062%206.26562%203.375%206.5V12.5C3.39062%2012.7344%203.51562%2012.8594%203.75%2012.875H8.25C8.48438%2012.8594%208.60938%2012.7344%208.625%2012.5V11.75H9.75V12.5C9.73438%2012.9219%209.58594%2013.2734%209.30469%2013.5547C9.02344%2013.8359%208.67188%2013.9844%208.25%2014H3.75C3.32812%2013.9844%202.97656%2013.8359%202.69531%2013.5547C2.41406%2013.2734%202.26562%2012.9219%202.25%2012.5V6.5C2.26562%206.07812%202.41406%205.72656%202.69531%205.44531C2.97656%205.16406%203.32812%205.01562%203.75%205Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-blue-600")}
                tag="div"
              >
                {"Invite link"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
