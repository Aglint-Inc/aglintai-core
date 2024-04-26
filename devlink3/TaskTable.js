"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { TaskUpdateButton } from "./TaskUpdateButton";
import { NewTaskCard } from "./NewTaskCard";
import { TaskTableCard } from "./TaskTableCard";
import * as _utils from "./utils";
import _styles from "./TaskTable.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-57":{"id":"e-57","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-35","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-58"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9da4f4b4-a7a7-a6db-016f-1db257523c4b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9da4f4b4-a7a7-a6db-016f-1db257523c4b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713937608410},"e-58":{"id":"e-58","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-36","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-57"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9da4f4b4-a7a7-a6db-016f-1db257523c4b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9da4f4b4-a7a7-a6db-016f-1db257523c4b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713937608410}},"actionLists":{"a-35":{"id":"a-35","title":"New Task Hover in","actionItemGroups":[{"actionItems":[{"id":"a-35-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1442.cursor-pointer","selectorGuids":["72d14f47-67bb-1c62-e201-448036c8d602","a75752ea-5703-ca42-9f63-098bc9a557c3"]},"value":"none"}},{"id":"a-35-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1442.cursor-pointer","selectorGuids":["72d14f47-67bb-1c62-e201-448036c8d602","a75752ea-5703-ca42-9f63-098bc9a557c3"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-35-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1442.cursor-pointer","selectorGuids":["72d14f47-67bb-1c62-e201-448036c8d602","a75752ea-5703-ca42-9f63-098bc9a557c3"]},"value":1,"unit":""}},{"id":"a-35-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1442.cursor-pointer","selectorGuids":["72d14f47-67bb-1c62-e201-448036c8d602","a75752ea-5703-ca42-9f63-098bc9a557c3"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1713937614107},"a-36":{"id":"a-36","title":"New Task Hover out","actionItemGroups":[{"actionItems":[{"id":"a-36-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1442.cursor-pointer","selectorGuids":["72d14f47-67bb-1c62-e201-448036c8d602","a75752ea-5703-ca42-9f63-098bc9a557c3"]},"value":0,"unit":""}},{"id":"a-36-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1442.cursor-pointer","selectorGuids":["72d14f47-67bb-1c62-e201-448036c8d602","a75752ea-5703-ca42-9f63-098bc9a557c3"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1713937614107}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TaskTable({
  as: _Component = _Builtin.Block,
  slotTaskTableCard,
  onClickNewTask = {},
  slotNewTaskCard,
  isNewTaskCardVisible = false,
  slotFilter,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "div-block-1433")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1436")}
        tag="div"
      >
        {slotFilter ?? <TaskUpdateButton />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1439")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1434", "height-40")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1437")}
            id={_utils.cx(
              _styles,
              "w-node-e2a009d4-d014-04d6-b837-039f401c4ec7-401c4ec4"
            )}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1435")}
            id={_utils.cx(
              _styles,
              "w-node-e2a009d4-d014-04d6-b837-039f401c4ecb-401c4ec4"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Task"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1435")}
            id={_utils.cx(
              _styles,
              "w-node-e2a009d4-d014-04d6-b837-039f401c4ec8-401c4ec4"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Status"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1435")}
            id={_utils.cx(
              _styles,
              "w-node-_98446a6e-7f10-ed73-7fea-bb5776f6dc5c-401c4ec4"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Priority"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1435")}
            id={_utils.cx(
              _styles,
              "w-node-e2a009d4-d014-04d6-b837-039f401c4ece-401c4ec4"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Assigned to"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1435", "gap-8")}
            id={_utils.cx(
              _styles,
              "w-node-e2a009d4-d014-04d6-b837-039f401c4ed1-401c4ec4"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Job"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1435")}
            id={_utils.cx(
              _styles,
              "w-node-e2a009d4-d014-04d6-b837-039f401c4ed4-401c4ec4"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Candidate"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1440")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1441")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1442", "cursor-pointer")}
              tag="div"
              {...onClickNewTask}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewBox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%201.5C5.69318%201.5%205.44444%201.74873%205.44444%202.05556V5.94444H1.55556C1.24873%205.94444%201%206.19318%201%206.5C1%206.80683%201.24873%207.05556%201.55556%207.05556H5.44444V10.9444C5.44444%2011.2513%205.69318%2011.5%206%2011.5C6.30683%2011.5%206.55556%2011.2513%206.55556%2010.9444V7.05556H10.4444C10.7513%207.05556%2011%206.80683%2011%206.5C11%206.19318%2010.7513%205.94444%2010.4444%205.94444H6.55556V2.05556C6.55556%201.74873%206.30683%201.5%206%201.5Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-blue-500")}
                tag="div"
              >
                {"New Task"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          {isNewTaskCardVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1453")}
              tag="div"
            >
              {slotNewTaskCard ?? <NewTaskCard />}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotTaskTableCard ?? <TaskTableCard />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
