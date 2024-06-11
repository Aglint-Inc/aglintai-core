"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./InterviewModuleCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InterviewModuleCard({
  as: _Component = _Builtin.Block,
  textModuleName = "C++ Coding",
  textMembersCount = "2 Members",
  slotMemberPic,
  textUpcomingSchedules = "120",
  textCompletedSchedules = "460",
  isUpcomingScheduleEmpty = true,
  isUpcomingScheduleVisible = true,
  isCompletedScheduleEmpty = false,
  isCompletedScheduleVisible = true,
  onClickCard = {},
  textObjective = "This is some text inside of a div block.",
  isObjectiveVisible = true,
  isArchivedIconVisible = false,
  textCancelledSchedules = "23",
  textDepartment = "Engineering",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "interview_type_row")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "interview_type_cell_first")}
        tag="div"
      >
        <Text content={textModuleName} />
        {isArchivedIconVisible ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M18%2015C17.9792%2015.5625%2017.7812%2016.0312%2017.4062%2016.4062C17.0312%2016.7812%2016.5625%2016.9792%2016%2017H4C3.4375%2016.9792%202.96875%2016.7812%202.59375%2016.4062C2.21875%2016.0312%202.02083%2015.5625%202%2015V5C2.02083%204.4375%202.21875%203.96875%202.59375%203.59375C2.96875%203.21875%203.4375%203.02083%204%203H8C8.66667%203.02083%209.19792%203.29167%209.59375%203.8125L10.1875%204.59375C10.3958%204.86458%2010.6667%205%2011%205H16C16.5625%205.02083%2017.0312%205.21875%2017.4062%205.59375C17.7812%205.96875%2017.9792%206.4375%2018%207V15ZM10.75%208.25C10.7083%207.79167%2010.4583%207.54167%2010%207.5C9.54167%207.54167%209.29167%207.79167%209.25%208.25V11.4375L8.28125%2010.4688C7.92708%2010.1771%207.57292%2010.1771%207.21875%2010.4688C6.92708%2010.8229%206.92708%2011.1771%207.21875%2011.5312L9.46875%2013.7812C9.82292%2014.0729%2010.1771%2014.0729%2010.5312%2013.7812L12.7812%2011.5312C13.0729%2011.1771%2013.0729%2010.8229%2012.7812%2010.4688C12.4271%2010.1771%2012.0729%2010.1771%2011.7188%2010.4688L10.75%2011.4375V8.25Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "interview_type_cell_first")}
        id={_utils.cx(
          _styles,
          "w-node-_896f4422-3f87-4848-8ecc-c323d39053a8-6e91e7a7"
        )}
        tag="div"
      >
        <Text content={textDepartment} weight="" />
        {isArchivedIconVisible ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M18%2015C17.9792%2015.5625%2017.7812%2016.0312%2017.4062%2016.4062C17.0312%2016.7812%2016.5625%2016.9792%2016%2017H4C3.4375%2016.9792%202.96875%2016.7812%202.59375%2016.4062C2.21875%2016.0312%202.02083%2015.5625%202%2015V5C2.02083%204.4375%202.21875%203.96875%202.59375%203.59375C2.96875%203.21875%203.4375%203.02083%204%203H8C8.66667%203.02083%209.19792%203.29167%209.59375%203.8125L10.1875%204.59375C10.3958%204.86458%2010.6667%205%2011%205H16C16.5625%205.02083%2017.0312%205.21875%2017.4062%205.59375C17.7812%205.96875%2017.9792%206.4375%2018%207V15ZM10.75%208.25C10.7083%207.79167%2010.4583%207.54167%2010%207.5C9.54167%207.54167%209.29167%207.79167%209.25%208.25V11.4375L8.28125%2010.4688C7.92708%2010.1771%207.57292%2010.1771%207.21875%2010.4688C6.92708%2010.8229%206.92708%2011.1771%207.21875%2011.5312L9.46875%2013.7812C9.82292%2014.0729%2010.1771%2014.0729%2010.5312%2013.7812L12.7812%2011.5312C13.0729%2011.1771%2013.0729%2010.8229%2012.7812%2010.4688C12.4271%2010.1771%2012.0729%2010.1771%2011.7188%2010.4688L10.75%2011.4375V8.25Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "interview_type_cell")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "session_count")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2221%22%20height%3D%2220%22%20viewBox%3D%220%200%2021%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7%202C7.3125%202.02083%207.47917%202.1875%207.5%202.5V4H13.5V2.5C13.5208%202.1875%2013.6875%202.02083%2014%202C14.3125%202.02083%2014.4792%202.1875%2014.5%202.5V4H15.5C16.0625%204.02083%2016.5312%204.21875%2016.9062%204.59375C17.2812%204.96875%2017.4792%205.4375%2017.5%206V7V8V16C17.4792%2016.5625%2017.2812%2017.0312%2016.9062%2017.4062C16.5312%2017.7812%2016.0625%2017.9792%2015.5%2018H5.5C4.9375%2017.9792%204.46875%2017.7812%204.09375%2017.4062C3.71875%2017.0312%203.52083%2016.5625%203.5%2016V8V7V6C3.52083%205.4375%203.71875%204.96875%204.09375%204.59375C4.46875%204.21875%204.9375%204.02083%205.5%204H6.5V2.5C6.52083%202.1875%206.6875%202.02083%207%202ZM16.5%208H4.5V16C4.5%2016.2917%204.59375%2016.5312%204.78125%2016.7188C4.96875%2016.9062%205.20833%2017%205.5%2017H15.5C15.7917%2017%2016.0312%2016.9062%2016.2188%2016.7188C16.4062%2016.5312%2016.5%2016.2917%2016.5%2016V8ZM15.5%205H5.5C5.20833%205%204.96875%205.09375%204.78125%205.28125C4.59375%205.46875%204.5%205.70833%204.5%206V7H16.5V6C16.5%205.70833%2016.4062%205.46875%2016.2188%205.28125C16.0312%205.09375%2015.7917%205%2015.5%205Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <Text content={textUpcomingSchedules} />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "session_count")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2221%22%20height%3D%2220%22%20viewBox%3D%220%200%2021%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%202.5V4H13.5V2.5C13.5208%202.1875%2013.6875%202.02083%2014%202C14.3125%202.02083%2014.4792%202.1875%2014.5%202.5V4H15.5C16.0625%204.02083%2016.5312%204.21875%2016.9062%204.59375C17.2812%204.96875%2017.4792%205.4375%2017.5%206V7V8V16C17.4792%2016.5625%2017.2812%2017.0312%2016.9062%2017.4062C16.5312%2017.7812%2016.0625%2017.9792%2015.5%2018H5.5C4.9375%2017.9792%204.46875%2017.7812%204.09375%2017.4062C3.71875%2017.0312%203.52083%2016.5625%203.5%2016V8V7V6C3.52083%205.4375%203.71875%204.96875%204.09375%204.59375C4.46875%204.21875%204.9375%204.02083%205.5%204H6.5V2.5C6.52083%202.1875%206.6875%202.02083%207%202C7.3125%202.02083%207.47917%202.1875%207.5%202.5ZM4.5%208V16C4.5%2016.2917%204.59375%2016.5312%204.78125%2016.7188C4.96875%2016.9062%205.20833%2017%205.5%2017H15.5C15.7917%2017%2016.0312%2016.9062%2016.2188%2016.7188C16.4062%2016.5312%2016.5%2016.2917%2016.5%2016V8H4.5ZM5.5%205C5.20833%205%204.96875%205.09375%204.78125%205.28125C4.59375%205.46875%204.5%205.70833%204.5%206V7H16.5V6C16.5%205.70833%2016.4062%205.46875%2016.2188%205.28125C16.0312%205.09375%2015.7917%205%2015.5%205H5.5ZM13.8438%2010.8438L10.3438%2014.3438C10.1146%2014.5521%209.88542%2014.5521%209.65625%2014.3438L7.65625%2012.3438C7.44792%2012.1146%207.44792%2011.8854%207.65625%2011.6562C7.88542%2011.4479%208.11458%2011.4479%208.34375%2011.6562L10%2013.2812L13.1562%2010.1562C13.3854%209.94792%2013.6146%209.94792%2013.8438%2010.1562C14.0521%2010.3854%2014.0521%2010.6146%2013.8438%2010.8438Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <Text content={textCompletedSchedules} />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "session_count")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2221%22%20height%3D%2220%22%20viewBox%3D%220%200%2021%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%202.5V4H13.5V2.5C13.5208%202.1875%2013.6875%202.02083%2014%202C14.3125%202.02083%2014.4792%202.1875%2014.5%202.5V4H15.5C16.0625%204.02083%2016.5312%204.21875%2016.9062%204.59375C17.2812%204.96875%2017.4792%205.4375%2017.5%206V7V8V16C17.4792%2016.5625%2017.2812%2017.0312%2016.9062%2017.4062C16.5312%2017.7812%2016.0625%2017.9792%2015.5%2018H5.5C4.9375%2017.9792%204.46875%2017.7812%204.09375%2017.4062C3.71875%2017.0312%203.52083%2016.5625%203.5%2016V8V7V6C3.52083%205.4375%203.71875%204.96875%204.09375%204.59375C4.46875%204.21875%204.9375%204.02083%205.5%204H6.5V2.5C6.52083%202.1875%206.6875%202.02083%207%202C7.3125%202.02083%207.47917%202.1875%207.5%202.5ZM4.5%208V16C4.5%2016.2917%204.59375%2016.5312%204.78125%2016.7188C4.96875%2016.9062%205.20833%2017%205.5%2017H15.5C15.7917%2017%2016.0312%2016.9062%2016.2188%2016.7188C16.4062%2016.5312%2016.5%2016.2917%2016.5%2016V8H4.5ZM5.5%205C5.20833%205%204.96875%205.09375%204.78125%205.28125C4.59375%205.46875%204.5%205.70833%204.5%206V7H16.5V6C16.5%205.70833%2016.4062%205.46875%2016.2188%205.28125C16.0312%205.09375%2015.7917%205%2015.5%205H5.5ZM12.8438%2010.8438L11.2188%2012.5L12.8438%2014.1562C13.0521%2014.3854%2013.0521%2014.6146%2012.8438%2014.8438C12.6146%2015.0521%2012.3854%2015.0521%2012.1562%2014.8438L10.5%2013.2188L8.84375%2014.8438C8.61458%2015.0521%208.38542%2015.0521%208.15625%2014.8438C7.94792%2014.6146%207.94792%2014.3854%208.15625%2014.1562L9.78125%2012.5L8.15625%2010.8438C7.94792%2010.6146%207.94792%2010.3854%208.15625%2010.1562C8.38542%209.94792%208.61458%209.94792%208.84375%2010.1562L10.5%2011.7812L12.1562%2010.1562C12.3854%209.94792%2012.6146%209.94792%2012.8438%2010.1562C13.0521%2010.3854%2013.0521%2010.6146%2012.8438%2010.8438Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <Text content={textCancelledSchedules} />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "interview_type_cell")}
        id={_utils.cx(
          _styles,
          "w-node-_1eadd607-1492-0d1b-a196-62336e91e7ab-6e91e7a7"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "avatar_group_block")}
          tag="div"
        >
          {slotMemberPic ?? (
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/666156eb941f1e26e4940fa7_Avatargroup.png"
            />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
