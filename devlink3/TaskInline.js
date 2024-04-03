import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { TaskStatus } from "./TaskStatus";
import { AgentPill } from "./AgentPill";
import * as _utils from "./utils";
import _styles from "./TaskInline.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-37":{"id":"e-37","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-38"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0269b999-1146-9720-fd6b-677dbcce844f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0269b999-1146-9720-fd6b-677dbcce844f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712070411075},"e-38":{"id":"e-38","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-37"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0269b999-1146-9720-fd6b-677dbcce844f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0269b999-1146-9720-fd6b-677dbcce844f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712070411075}},"actionLists":{"a-21":{"id":"a-21","title":"Task Inline Open Hover in","actionItemGroups":[{"actionItems":[{"id":"a-21-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1358.cursor","selectorGuids":["e715c980-0b93-da6d-42dd-3c68d590965f","c123e4c2-42af-fcd2-df09-16b43cdf2d82"]},"value":0,"unit":""}},{"id":"a-21-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1358.cursor","selectorGuids":["e715c980-0b93-da6d-42dd-3c68d590965f","c123e4c2-42af-fcd2-df09-16b43cdf2d82"]},"value":"none"}}]},{"actionItems":[{"id":"a-21-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1358.cursor","selectorGuids":["e715c980-0b93-da6d-42dd-3c68d590965f","c123e4c2-42af-fcd2-df09-16b43cdf2d82"]},"value":1,"unit":""}},{"id":"a-21-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1358.cursor","selectorGuids":["e715c980-0b93-da6d-42dd-3c68d590965f","c123e4c2-42af-fcd2-df09-16b43cdf2d82"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1712070414021},"a-22":{"id":"a-22","title":"Task Inline Open Hover out","actionItemGroups":[{"actionItems":[{"id":"a-22-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1358.cursor","selectorGuids":["e715c980-0b93-da6d-42dd-3c68d590965f","c123e4c2-42af-fcd2-df09-16b43cdf2d82"]},"value":0,"unit":""}},{"id":"a-22-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1358.cursor","selectorGuids":["e715c980-0b93-da6d-42dd-3c68d590965f","c123e4c2-42af-fcd2-df09-16b43cdf2d82"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1712070414021}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TaskInline({
  as: _Component = _Builtin.Block,
  slotCheckbox,
  textTaskName = "Schedule Coding Interview",
  textDate = "Thu, Aug 15 2024",
  slotPill,
  slotTaskStatus,
  onClickStatus = {},
  onClickOpen = {},
  onClickEdit = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1333", "pl-24")}
      data-w-id="0269b999-1146-9720-fd6b-677dbcce844f"
      tag="div"
    >
      <_Builtin.Block tag="div">{slotCheckbox}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1359")}
        tag="div"
        {...onClickEdit}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "task-inline-wrapper")}
          tag="div"
        >
          <_Builtin.Block tag="div" {...onClickStatus}>
            {slotTaskStatus ?? <TaskStatus />}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{textTaskName}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1334")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.5%202.5C4.8125%202.52083%204.97917%202.6875%205%203V4.5H11V3C11.0208%202.6875%2011.1875%202.52083%2011.5%202.5C11.8125%202.52083%2011.9792%202.6875%2012%203V4.5H13C13.5625%204.52083%2014.0312%204.71875%2014.4062%205.09375C14.7812%205.46875%2014.9792%205.9375%2015%206.5V7.5V8.5V8.53125C14.8333%208.51042%2014.6667%208.5%2014.5%208.5C14.3333%208.5%2014.1667%208.51042%2014%208.53125V8.5H2V16.5C2%2016.7917%202.09375%2017.0312%202.28125%2017.2188C2.46875%2017.4062%202.70833%2017.5%203%2017.5H10.25C10.5625%2017.875%2010.9271%2018.2083%2011.3438%2018.5H3C2.4375%2018.4792%201.96875%2018.2812%201.59375%2017.9062C1.21875%2017.5312%201.02083%2017.0625%201%2016.5V8.5V7.5V6.5C1.02083%205.9375%201.21875%205.46875%201.59375%205.09375C1.96875%204.71875%202.4375%204.52083%203%204.5H4V3C4.02083%202.6875%204.1875%202.52083%204.5%202.5ZM13%205.5H3H13H3C2.70833%205.5%202.46875%205.59375%202.28125%205.78125C2.09375%205.96875%202%206.20833%202%206.5V7.5H14V6.5C14%206.20833%2013.9062%205.96875%2013.7188%205.78125C13.5312%205.59375%2013.2917%205.5%2013%205.5ZM14.5%2017.5C15.125%2017.5%2015.7083%2017.3438%2016.25%2017.0312C16.7917%2016.7188%2017.2188%2016.2917%2017.5312%2015.75C17.8438%2015.2083%2018%2014.625%2018%2014C18%2013.375%2017.8438%2012.7917%2017.5312%2012.25C17.2188%2011.7083%2016.7917%2011.2812%2016.25%2010.9688C15.7083%2010.6562%2015.125%2010.5%2014.5%2010.5C13.875%2010.5%2013.2917%2010.6562%2012.75%2010.9688C12.2083%2011.2812%2011.7812%2011.7083%2011.4688%2012.25C11.1562%2012.7917%2011%2013.375%2011%2014C11%2014.625%2011.1562%2015.2083%2011.4688%2015.75C11.7812%2016.2917%2012.2083%2016.7188%2012.75%2017.0312C13.2917%2017.3438%2013.875%2017.5%2014.5%2017.5ZM14.5%209.5C15.3125%209.5%2016.0625%209.69792%2016.75%2010.0938C17.4375%2010.4896%2017.9896%2011.0417%2018.4062%2011.75C18.8021%2012.4583%2019%2013.2083%2019%2014C19%2014.7917%2018.8021%2015.5417%2018.4062%2016.25C17.9896%2016.9583%2017.4375%2017.5104%2016.75%2017.9062C16.0625%2018.3021%2015.3125%2018.5%2014.5%2018.5C13.6875%2018.5%2012.9375%2018.3021%2012.25%2017.9062C11.5625%2017.5104%2011.0104%2016.9583%2010.5938%2016.25C10.1979%2015.5417%2010%2014.7917%2010%2014C10%2013.2083%2010.1979%2012.4583%2010.5938%2011.75C11.0104%2011.0417%2011.5625%2010.4896%2012.25%2010.0938C12.9375%209.69792%2013.6875%209.5%2014.5%209.5ZM14.5%2011.5C14.8125%2011.5208%2014.9792%2011.6875%2015%2012V13.5H16C16.3125%2013.5208%2016.4792%2013.6875%2016.5%2014C16.4792%2014.3125%2016.3125%2014.4792%2016%2014.5H14.5C14.1875%2014.4792%2014.0208%2014.3125%2014%2014V12C14.0208%2011.6875%2014.1875%2011.5208%2014.5%2011.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{textDate}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1336")}
          tag="div"
        >
          {slotPill ?? <AgentPill />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1358", "cursor")}
        tag="div"
        {...onClickOpen}
      >
        <_Builtin.Block tag="div">{"Open"}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
