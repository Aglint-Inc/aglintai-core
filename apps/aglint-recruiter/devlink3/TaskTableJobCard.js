"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { NewTaskCard } from "./NewTaskCard";
import { TaskTableJobSubCard } from "./TaskTableJobSubCard";
import * as _utils from "./utils";
import _styles from "./TaskTableJobCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-57":{"id":"e-57","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-35","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-58"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9da4f4b4-a7a7-a6db-016f-1db257523c4b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9da4f4b4-a7a7-a6db-016f-1db257523c4b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713937608410},"e-58":{"id":"e-58","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-36","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-57"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9da4f4b4-a7a7-a6db-016f-1db257523c4b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9da4f4b4-a7a7-a6db-016f-1db257523c4b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713937608410}},"actionLists":{"a-35":{"id":"a-35","title":"New Task Hover in","actionItemGroups":[{"actionItems":[{"id":"a-35-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1442.cursor-pointer","selectorGuids":["72d14f47-67bb-1c62-e201-448036c8d602","a75752ea-5703-ca42-9f63-098bc9a557c3"]},"value":"none"}},{"id":"a-35-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1442.cursor-pointer","selectorGuids":["72d14f47-67bb-1c62-e201-448036c8d602","a75752ea-5703-ca42-9f63-098bc9a557c3"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-35-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1442.cursor-pointer","selectorGuids":["72d14f47-67bb-1c62-e201-448036c8d602","a75752ea-5703-ca42-9f63-098bc9a557c3"]},"value":1,"unit":""}},{"id":"a-35-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1442.cursor-pointer","selectorGuids":["72d14f47-67bb-1c62-e201-448036c8d602","a75752ea-5703-ca42-9f63-098bc9a557c3"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1713937614107},"a-36":{"id":"a-36","title":"New Task Hover out","actionItemGroups":[{"actionItems":[{"id":"a-36-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1442.cursor-pointer","selectorGuids":["72d14f47-67bb-1c62-e201-448036c8d602","a75752ea-5703-ca42-9f63-098bc9a557c3"]},"value":0,"unit":""}},{"id":"a-36-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1442.cursor-pointer","selectorGuids":["72d14f47-67bb-1c62-e201-448036c8d602","a75752ea-5703-ca42-9f63-098bc9a557c3"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1713937614107}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TaskTableJobCard({
  as: _Component = _Builtin.Block,
  textRole = "Software Engineer",
  slotAvatarWithName,
  onClickNewTask = {},
  isNewTaskInputVisible = false,
  slotNewTaskCard,
  slotTaskTableJobCard,
  slotDropIcon,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component tag="div">
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "div-block-1440",
            "job-cand",
            "height-40"
          )}
          data-w-id="9da4f4b4-a7a7-a6db-016f-1db257523c4b"
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1568")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1441", "header")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1727")}
              tag="div"
            >
              {slotDropIcon}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1451", "hide")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2215%22%20viewbox%3D%220%200%2016%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.75%201.5C5.60417%201.52083%205.52083%201.60417%205.5%201.75V3H10.5V1.75C10.4792%201.60417%2010.3958%201.52083%2010.25%201.5H5.75ZM4%201.75C4.02083%201.25%204.1875%200.833333%204.5%200.5C4.83333%200.1875%205.25%200.0208333%205.75%200H10.25C10.75%200.0208333%2011.1667%200.1875%2011.5%200.5C11.8125%200.833333%2011.9792%201.25%2012%201.75V3H14C14.5625%203.02083%2015.0312%203.21875%2015.4062%203.59375C15.7812%203.96875%2015.9792%204.4375%2016%205V8H10H6H0V5C0.0208333%204.4375%200.21875%203.96875%200.59375%203.59375C0.96875%203.21875%201.4375%203.02083%202%203H4V1.75ZM16%209V13C15.9792%2013.5625%2015.7812%2014.0312%2015.4062%2014.4062C15.0312%2014.7812%2014.5625%2014.9792%2014%2015H2C1.4375%2014.9792%200.96875%2014.7812%200.59375%2014.4062C0.21875%2014.0312%200.0208333%2013.5625%200%2013V9H6V10C6%2010.2917%206.09375%2010.5312%206.28125%2010.7188C6.46875%2010.9062%206.70833%2011%207%2011H9C9.29167%2011%209.53125%2010.9062%209.71875%2010.7188C9.90625%2010.5312%2010%2010.2917%2010%2010V9H16Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {textRole}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1451")}
              tag="div"
            >
              {slotAvatarWithName}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1442", "cursor-pointer")}
              tag="div"
              {...onClickNewTask}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewbox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%201.5C5.69318%201.5%205.44444%201.74873%205.44444%202.05556V5.94444H1.55556C1.24873%205.94444%201%206.19318%201%206.5C1%206.80683%201.24873%207.05556%201.55556%207.05556H5.44444V10.9444C5.44444%2011.2513%205.69318%2011.5%206%2011.5C6.30683%2011.5%206.55556%2011.2513%206.55556%2010.9444V7.05556H10.4444C10.7513%207.05556%2011%206.80683%2011%206.5C11%206.19318%2010.7513%205.94444%2010.4444%205.94444H6.55556V2.05556C6.55556%201.74873%206.30683%201.5%206%201.5Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-blue-500")}
                tag="div"
              >
                {"New"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isNewTaskInputVisible ? (
          <_Builtin.Block tag="div">
            {slotNewTaskCard ?? <NewTaskCard />}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {slotTaskTableJobCard ?? <TaskTableJobSubCard />}
      </_Builtin.Block>
    </_Component>
  );
}
