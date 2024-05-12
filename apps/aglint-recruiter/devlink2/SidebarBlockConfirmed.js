import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ScheduleInfoBlock } from "./ScheduleInfoBlock";
import { InterviewPanelCard } from "./InterviewPanelCard";
import * as _utils from "./utils";
import _styles from "./SidebarBlockConfirmed.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-129":{"id":"e-129","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-75","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-130"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"cdad33c0-a922-a9f4-5fbf-aa9c80a3884d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"cdad33c0-a922-a9f4-5fbf-aa9c80a3884d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1709208356933},"e-130":{"id":"e-130","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-76","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-129"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"cdad33c0-a922-a9f4-5fbf-aa9c80a3884d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"cdad33c0-a922-a9f4-5fbf-aa9c80a3884d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1709208356933}},"actionLists":{"a-75":{"id":"a-75","title":"Tooltip [show]","actionItemGroups":[{"actionItems":[{"id":"a-75-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".tooltip","selectorGuids":["d6207c5d-3e22-9997-72a9-7fb43ea97274"]},"value":0,"unit":""}},{"id":"a-75-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tooltip","selectorGuids":["d6207c5d-3e22-9997-72a9-7fb43ea97274"]},"value":"none"}},{"id":"a-75-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".tooltip","selectorGuids":["d6207c5d-3e22-9997-72a9-7fb43ea97274"]},"yValue":5,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-75-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tooltip","selectorGuids":["d6207c5d-3e22-9997-72a9-7fb43ea97274"]},"value":"flex"}}]},{"actionItems":[{"id":"a-75-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".tooltip","selectorGuids":["d6207c5d-3e22-9997-72a9-7fb43ea97274"]},"value":1,"unit":""}},{"id":"a-75-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".tooltip","selectorGuids":["d6207c5d-3e22-9997-72a9-7fb43ea97274"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1709208359985},"a-76":{"id":"a-76","title":"Tooltip [hide]","actionItemGroups":[{"actionItems":[{"id":"a-76-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".tooltip","selectorGuids":["d6207c5d-3e22-9997-72a9-7fb43ea97274"]},"value":0,"unit":""}},{"id":"a-76-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".tooltip","selectorGuids":["d6207c5d-3e22-9997-72a9-7fb43ea97274"]},"yValue":5,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-76-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tooltip","selectorGuids":["d6207c5d-3e22-9997-72a9-7fb43ea97274"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1709208359985}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SidebarBlockConfirmed({
  as: _Component = _Builtin.Block,
  textScheduleName = "Phase 1: Interview for software engineer",
  slotScheduleInfo,
  onClickReminder = {},
  slotInterviewPanel,
  onClickReschedule = {},
  onClickCancelSchedule = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "interview_info")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {textScheduleName}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {slotScheduleInfo ?? (
          <ScheduleInfoBlock textDateTimeOrSlots="Waiting for the candidate to choose" />
        )}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "pending_tag")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "confirmed_info")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Confirmed"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "send_reminder")}
          data-w-id="cdad33c0-a922-a9f4-5fbf-aa9c80a3884d"
          tag="div"
          {...onClickReminder}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8%202C8.21875%202%208.39844%202.07031%208.53906%202.21094C8.67969%202.35156%208.75%202.53125%208.75%202.75V3.17188C9.625%203.32813%2010.3359%203.72656%2010.8828%204.36719C11.4453%205.00781%2011.7344%205.78125%2011.75%206.6875V7.46094C11.7656%208.55469%2012.1094%209.53125%2012.7812%2010.3906L13.1328%2010.8359C13.2578%2011.0234%2013.2812%2011.2188%2013.2031%2011.4219C13.0938%2011.625%2012.9219%2011.7344%2012.6875%2011.75H3.3125C3.07812%2011.7344%202.90625%2011.625%202.79688%2011.4219C2.70312%2011.2188%202.72656%2011.0234%202.86719%2010.8359L3.21875%2010.3906C3.89062%209.53125%204.23438%208.55469%204.25%207.46094V6.6875C4.26562%205.78125%204.55469%205.00781%205.11719%204.36719C5.66406%203.72656%206.375%203.32813%207.25%203.17188V2.75C7.25%202.53125%207.32031%202.35156%207.46094%202.21094C7.60156%202.07031%207.78125%202%208%202ZM8%204.25H7.8125C7.125%204.26562%206.54688%204.5%206.07812%204.95312C5.625%205.42188%205.39062%206%205.375%206.6875V7.46094C5.35938%208.61719%205.04688%209.67188%204.4375%2010.625H11.5625C10.9375%209.67188%2010.625%208.61719%2010.625%207.46094V6.6875C10.6094%206%2010.375%205.42188%209.92188%204.95312C9.45312%204.5%208.875%204.26562%208.1875%204.25H8ZM9.5%2012.5C9.5%2012.9062%209.35156%2013.2578%209.05469%2013.5547C8.75781%2013.8516%208.40625%2014%208%2014C7.59375%2014%207.24219%2013.8516%206.94531%2013.5547C6.64844%2013.2578%206.5%2012.9062%206.5%2012.5H8H9.5Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block className={_utils.cx(_styles, "tooltip")} tag="div">
            <_Builtin.Block tag="div">{"Send Reminder"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "tooltip_rectangle")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2213%22%20height%3D%2211%22%20viewBox%3D%220%200%2013%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.63398%200.499999C6.01888%20-0.166667%206.98113%20-0.166667%207.36603%200.5L12.1292%208.75C12.5141%209.41667%2012.0329%2010.25%2011.2631%2010.25H1.73686C0.967059%2010.25%200.485935%209.41667%200.870835%208.75L5.63398%200.499999Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "link_button_flex")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "link_button", "is_blue")}
          tag="div"
          {...onClickReschedule}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2214%22%20height%3D%2212%22%20viewBox%3D%220%200%2014%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.25%200C3.59375%200.03125%203.78125%200.21875%203.8125%200.5625V1.5H7.1875V0.5625C7.21875%200.21875%207.40625%200.03125%207.75%200C8.09375%200.03125%208.28125%200.21875%208.3125%200.5625V1.5H9.25C9.67188%201.51563%2010.0234%201.66406%2010.3047%201.94531C10.5859%202.22656%2010.7344%202.57812%2010.75%203V3.375V4.5H10.375H9.625H7H1.375V10.5C1.39062%2010.7344%201.51562%2010.8594%201.75%2010.875H6.92969C7.21094%2011.3125%207.57031%2011.6875%208.00781%2012H1.75C1.32812%2011.9844%200.976562%2011.8359%200.695312%2011.5547C0.414062%2011.2734%200.265625%2010.9219%200.25%2010.5V4.5V3.375V3C0.265625%202.57812%200.414062%202.22656%200.695312%201.94531C0.976562%201.66406%201.32812%201.51563%201.75%201.5H2.6875V0.5625C2.71875%200.21875%202.90625%200.03125%203.25%200ZM7%208.625C7%208.01562%207.14844%207.45312%207.44531%206.9375C7.74219%206.42188%208.15625%206.00781%208.6875%205.69531C9.21875%205.39844%209.78125%205.25%2010.375%205.25C10.9688%205.25%2011.5312%205.39844%2012.0625%205.69531C12.5938%206.00781%2013.0078%206.42188%2013.3047%206.9375C13.6016%207.45312%2013.75%208.01562%2013.75%208.625C13.75%209.23438%2013.6016%209.79688%2013.3047%2010.3125C13.0078%2010.8281%2012.5938%2011.2422%2012.0625%2011.5547C11.5312%2011.8516%2010.9688%2012%2010.375%2012C9.78125%2012%209.21875%2011.8516%208.6875%2011.5547C8.15625%2011.2422%207.74219%2010.8281%207.44531%2010.3125C7.14844%209.79688%207%209.23438%207%208.625ZM10.375%206.75C10.1406%206.76562%2010.0156%206.89062%2010%207.125V8.625C10.0156%208.85938%2010.1406%208.98438%2010.375%209H11.5C11.7344%208.98438%2011.8594%208.85938%2011.875%208.625C11.8594%208.39062%2011.7344%208.26562%2011.5%208.25H10.75V7.125C10.7344%206.89062%2010.6094%206.76562%2010.375%206.75Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Reschedule"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "link_button", "is_red")}
          tag="div"
          {...onClickCancelSchedule}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2214%22%20height%3D%2212%22%20viewBox%3D%220%200%2014%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.25%200C3.59375%200.03125%203.78125%200.21875%203.8125%200.5625V1.5H7.1875V0.5625C7.21875%200.21875%207.40625%200.03125%207.75%200C8.09375%200.03125%208.28125%200.21875%208.3125%200.5625V1.5H9.25C9.67188%201.51563%2010.0234%201.66406%2010.3047%201.94531C10.5859%202.22656%2010.7344%202.57812%2010.75%203V3.375V4.5H10.375H9.625H8.5H1.375V10.5C1.39062%2010.7344%201.51562%2010.8594%201.75%2010.875H6.92969C7.21094%2011.3125%207.57031%2011.6875%208.00781%2012H1.75C1.32812%2011.9844%200.976562%2011.8359%200.695312%2011.5547C0.414062%2011.2734%200.265625%2010.9219%200.25%2010.5V4.5V3.375V3C0.265625%202.57812%200.414062%202.22656%200.695312%201.94531C0.976562%201.66406%201.32812%201.51563%201.75%201.5H2.6875V0.5625C2.71875%200.21875%202.90625%200.03125%203.25%200ZM7%208.625C7%208.01562%207.14844%207.45312%207.44531%206.9375C7.74219%206.42188%208.15625%206.00781%208.6875%205.69531C9.21875%205.39844%209.78125%205.25%2010.375%205.25C10.9688%205.25%2011.5312%205.39844%2012.0625%205.69531C12.5938%206.00781%2013.0078%206.42188%2013.3047%206.9375C13.6016%207.45312%2013.75%208.01562%2013.75%208.625C13.75%209.23438%2013.6016%209.79688%2013.3047%2010.3125C13.0078%2010.8281%2012.5938%2011.2422%2012.0625%2011.5547C11.5312%2011.8516%2010.9688%2012%2010.375%2012C9.78125%2012%209.21875%2011.8516%208.6875%2011.5547C8.15625%2011.2422%207.74219%2010.8281%207.44531%2010.3125C7.14844%209.79688%207%209.23438%207%208.625ZM12.25%208.625C12.2344%208.39062%2012.1094%208.26562%2011.875%208.25H8.875C8.64062%208.26562%208.51562%208.39062%208.5%208.625C8.51562%208.85938%208.64062%208.98438%208.875%209H11.875C12.1094%208.98438%2012.2344%208.85938%2012.25%208.625Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Cancel Schedule"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_team_block")}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Interview Panel"}</_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotInterviewPanel ?? <InterviewPanelCard />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
