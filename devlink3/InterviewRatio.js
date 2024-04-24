"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { DropdownButton } from "./DropdownButton";
import { GraphButtonOption } from "./GraphButtonOption";
import * as _utils from "./utils";
import _styles from "./InterviewRatio.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-59":{"id":"e-59","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-37","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-60"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"01d4c055-3f2a-086d-6322-5fdc2851cab4"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713971361407},"e-60":{"id":"e-60","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-59"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"01d4c055-3f2a-086d-6322-5fdc2851cab4"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713971361407}},"actionLists":{"a-37":{"id":"a-37","title":"Schedule Dashboard Graph Hover in","actionItemGroups":[{"actionItems":[{"id":"a-37-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1605","selectorGuids":["54abfc14-63e4-4500-0fc6-309639cc5354"]},"value":0,"unit":""}},{"id":"a-37-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".div-block-1605","selectorGuids":["54abfc14-63e4-4500-0fc6-309639cc5354"]}}}]},{"actionItems":[{"id":"a-37-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1605","selectorGuids":["54abfc14-63e4-4500-0fc6-309639cc5354"]},"value":1,"unit":""}},{"id":"a-37-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"block","target":{"useEventTarget":"CHILDREN","selector":".div-block-1605","selectorGuids":["54abfc14-63e4-4500-0fc6-309639cc5354"]}}}]}],"createdOn":1713971366271,"useFirstGroupAsInitialState":true},"a-38":{"id":"a-38","title":"Schedule Dashboard Graph Hover out","actionItemGroups":[{"actionItems":[{"id":"a-38-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1605","selectorGuids":["54abfc14-63e4-4500-0fc6-309639cc5354"]},"value":0,"unit":""}},{"id":"a-38-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".div-block-1605","selectorGuids":["54abfc14-63e4-4500-0fc6-309639cc5354"]}}}]}],"createdOn":1713971366271,"useFirstGroupAsInitialState":false}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InterviewRatio({
  as: _Component = _Builtin.Block,
  slotInterviewGraph,
  slotDropdownButton,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1464")}
      id={_utils.cx(
        _styles,
        "w-node-_48316e3f-68f1-8ccc-8fa3-ec4c80bf3fc0-80bf3fc0"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1465")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1473")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1593")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1603")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Interview to offer ratio"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1604")}
                data-w-id="01d4c055-3f2a-086d-6322-5fdc2851cab4"
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%200.75C5.04688%200.765625%204.17188%201%203.375%201.45312C2.57812%201.92188%201.9375%202.5625%201.45312%203.375C0.984375%204.20312%200.75%205.07812%200.75%206C0.75%206.92188%200.984375%207.79688%201.45312%208.625C1.9375%209.4375%202.57812%2010.0781%203.375%2010.5469C4.17188%2011%205.04688%2011.2344%206%2011.25C6.95312%2011.2344%207.82812%2011%208.625%2010.5469C9.42188%2010.0781%2010.0625%209.4375%2010.5469%208.625C11.0156%207.79688%2011.25%206.92188%2011.25%206C11.25%205.07812%2011.0156%204.20312%2010.5469%203.375C10.0625%202.5625%209.42188%201.92188%208.625%201.45312C7.82812%201%206.95312%200.765625%206%200.75ZM6%2012C4.90625%2011.9844%203.90625%2011.7188%203%2011.2031C2.09375%2010.6719%201.35938%209.9375%200.796875%209C0.265625%208.04688%200%207.04688%200%206C0%204.95312%200.265625%203.95313%200.796875%203C1.35938%202.0625%202.09375%201.32813%203%200.796875C3.90625%200.28125%204.90625%200.015625%206%200C7.09375%200.015625%208.09375%200.28125%209%200.796875C9.90625%201.32813%2010.6406%202.0625%2011.2031%203C11.7344%203.95313%2012%204.95312%2012%206C12%207.04688%2011.7344%208.04688%2011.2031%209C10.6406%209.9375%209.90625%2010.6719%209%2011.2031C8.09375%2011.7188%207.09375%2011.9844%206%2012ZM4.875%208.25H5.625V6H5.0625C4.82812%205.98438%204.70312%205.85938%204.6875%205.625C4.70312%205.39062%204.82812%205.26562%205.0625%205.25H6C6.23438%205.26562%206.35938%205.39062%206.375%205.625V8.25H7.125C7.35938%208.26562%207.48438%208.39062%207.5%208.625C7.48438%208.85938%207.35938%208.98438%207.125%209H4.875C4.64062%208.98438%204.51562%208.85938%204.5%208.625C4.51562%208.39062%204.64062%208.26562%204.875%208.25ZM6%204.3125C5.65625%204.28125%205.46875%204.09375%205.4375%203.75C5.46875%203.40625%205.65625%203.21875%206%203.1875C6.34375%203.21875%206.53125%203.40625%206.5625%203.75C6.53125%204.09375%206.34375%204.28125%206%204.3125Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-1605")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-grey-600", "text-sm")}
                    tag="div"
                  >
                    {
                      "Ratio of candidates advancing after interviews to the number of schedules."
                    }
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1594")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1590")}
              tag="div"
            >
              {slotDropdownButton ?? (
                <>
                  <DropdownButton />
                  <GraphButtonOption />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1595")}
        tag="div"
      >
        {slotInterviewGraph}
      </_Builtin.Block>
    </_Component>
  );
}
