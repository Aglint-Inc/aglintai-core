"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./FilterItem.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function FilterItem({
  as: _Component = _Builtin.Block,
  onClickFIlter = {},
  textFilter = "Duration",
  slotIcon,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "jobs-wrap", "cursor-pointer")}
      tag="div"
      {...onClickFIlter}
    >
      <_Builtin.Block className={_utils.cx(_styles, "slot_icon")} tag="div">
        {slotIcon ?? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%202C8.625%202.01563%209.63281%202.28906%2010.5234%202.82031C11.4297%203.35156%2012.1484%204.07031%2012.6797%204.97656C13.2109%205.86719%2013.4844%206.875%2013.5%208C13.4844%209.125%2013.2109%2010.1328%2012.6797%2011.0234C12.1484%2011.9297%2011.4297%2012.6484%2010.5234%2013.1797C9.63281%2013.7109%208.625%2013.9844%207.5%2014C6.375%2013.9844%205.36719%2013.7109%204.47656%2013.1797C3.57031%2012.6484%202.85156%2011.9297%202.32031%2011.0234C1.78906%2010.1328%201.51562%209.125%201.5%208C1.51562%206.73438%201.85938%205.60938%202.53125%204.625C2.6875%204.45312%202.85938%204.42188%203.04688%204.53125C3.23438%204.67188%203.27344%204.84375%203.16406%205.04688C2.57031%205.90625%202.26562%206.89062%202.25%208C2.26562%208.98438%202.50781%209.86719%202.97656%2010.6484C3.42969%2011.4453%204.05469%2012.0703%204.85156%2012.5234C5.63281%2012.9922%206.51562%2013.2344%207.5%2013.25C8.48438%2013.2344%209.36719%2012.9922%2010.1484%2012.5234C10.9453%2012.0703%2011.5703%2011.4453%2012.0234%2010.6484C12.4922%209.86719%2012.7344%208.98438%2012.75%208C12.7188%206.57812%2012.25%205.38281%2011.3438%204.41406C10.4219%203.44531%209.26562%202.89844%207.875%202.77344V4.625C7.85938%204.85938%207.73438%204.98438%207.5%205C7.26562%204.98438%207.14062%204.85938%207.125%204.625V2.375C7.14062%202.14062%207.26562%202.01563%207.5%202ZM5.50781%205.49219L7.75781%207.74219C7.91406%207.91406%207.91406%208.08594%207.75781%208.25781C7.58594%208.41406%207.41406%208.41406%207.24219%208.25781L4.99219%206.00781C4.83594%205.83594%204.83594%205.66406%204.99219%205.49219C5.16406%205.33594%205.33594%205.33594%205.50781%205.49219Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        )}
      </_Builtin.Block>
      <_Builtin.Block tag="div">{textFilter}</_Builtin.Block>
    </_Component>
  );
}
