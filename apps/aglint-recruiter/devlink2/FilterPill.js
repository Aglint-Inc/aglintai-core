"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./FilterPill.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function FilterPill({
  as: _Component = _Builtin.Block,
  textFilterName = "Job",
  onClickFilter = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "jobs-wrap", "cursor-pointer")}
      tag="div"
      {...onClickFilter}
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "icons", "hide")}
        value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.25%203.125V4.25H9.75V3.125C9.73438%202.89062%209.60938%202.76563%209.375%202.75H5.625C5.39062%202.76563%205.26562%202.89062%205.25%203.125ZM4.5%204.25V3.125C4.51562%202.8125%204.625%202.54687%204.82812%202.32812C5.04688%202.125%205.3125%202.01563%205.625%202H9.375C9.6875%202.01563%209.95312%202.125%2010.1719%202.32812C10.375%202.54687%2010.4844%202.8125%2010.5%203.125V4.25H12C12.4219%204.26562%2012.7734%204.41406%2013.0547%204.69531C13.3359%204.97656%2013.4844%205.32812%2013.5%205.75V11.75C13.4844%2012.1719%2013.3359%2012.5234%2013.0547%2012.8047C12.7734%2013.0859%2012.4219%2013.2344%2012%2013.25H3C2.57812%2013.2344%202.22656%2013.0859%201.94531%2012.8047C1.66406%2012.5234%201.51562%2012.1719%201.5%2011.75V5.75C1.51562%205.32812%201.66406%204.97656%201.94531%204.69531C2.22656%204.41406%202.57812%204.26562%203%204.25H4.5ZM10.125%205H4.875H3C2.78125%205%202.60156%205.07031%202.46094%205.21094C2.32031%205.35156%202.25%205.53125%202.25%205.75V8H5.625H6.375H8.625H9.375H12.75V5.75C12.75%205.53125%2012.6797%205.35156%2012.5391%205.21094C12.3984%205.07031%2012.2188%205%2012%205H10.125ZM12.75%208.75H9.375V9.875C9.375%2010.0938%209.30469%2010.2734%209.16406%2010.4141C9.02344%2010.5547%208.84375%2010.625%208.625%2010.625H6.375C6.15625%2010.625%205.97656%2010.5547%205.83594%2010.4141C5.69531%2010.2734%205.625%2010.0938%205.625%209.875V8.75H2.25V11.75C2.25%2011.9688%202.32031%2012.1484%202.46094%2012.2891C2.60156%2012.4297%202.78125%2012.5%203%2012.5H12C12.2188%2012.5%2012.3984%2012.4297%2012.5391%2012.2891C12.6797%2012.1484%2012.75%2011.9688%2012.75%2011.75V8.75ZM6.375%208.75V9.875H8.625V8.75H6.375Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
      />
      <_Builtin.Block tag="div">{textFilterName}</_Builtin.Block>
    </_Component>
  );
}
