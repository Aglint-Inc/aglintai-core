import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ScheduleWithAgent } from "./ScheduleWithAgent";
import * as _utils from "./utils";
import _styles from "./AllInterviewCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-145":{"id":"e-145","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-92","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-146"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"74900e4c-b1fd-7af5-7374-5caedc41babe","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"74900e4c-b1fd-7af5-7374-5caedc41babe","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711378224015},"e-146":{"id":"e-146","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-93","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-145"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"74900e4c-b1fd-7af5-7374-5caedc41babe","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"74900e4c-b1fd-7af5-7374-5caedc41babe","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711378224015}},"actionLists":{"a-92":{"id":"a-92","title":"candidate job hover in","actionItemGroups":[{"actionItems":[{"id":"a-92-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":"none"}},{"id":"a-92-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-92-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":"flex"}},{"id":"a-92-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711378228552},"a-93":{"id":"a-93","title":"candidate job hover out","actionItemGroups":[{"actionItems":[{"id":"a-93-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":0,"unit":""}},{"id":"a-93-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1711378228552}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AllInterviewCard({
  as: _Component = _Builtin.Block,
  textName = "Westly Snedger",
  slotCandidateImage,
  textDuration = "1 hour",
  slotPanelImage,
  textInterviewPanel = "This is some text inside of a div block.",
  textRelatedJob = "Product Designer",
  slotScheduleInfo,
  isSchedulerTable = true,
  slotCheckbox,
  isCheckBoxVisible = false,
  propsGrid = {},
  isSelected = false,
  textCurrentRole = "Prodct Designer",
  slotStatusBadge,
  slotScheduleWithAgent,
  onClickAgent = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "allinterview_row_-candidate")}
      tag="div"
      {...propsGrid}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
      >
        {isCheckBoxVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-958")}
            tag="div"
          >
            {slotCheckbox}
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-834")}
          tag="div"
        >
          {slotCandidateImage}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1267")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-first-cap")}
            tag="div"
          >
            {textName}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600", "one-line-clamp")}
            tag="div"
          >
            {textCurrentRole}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1292")}
          tag="div"
        >
          {slotStatusBadge}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell", "hide")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textDuration}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-840")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotPanelImage}</_Builtin.Block>
          <_Builtin.Block tag="div">{textInterviewPanel}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isSchedulerTable ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "candidate_cell", "space-between")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-840")}
            tag="div"
          >
            <_Builtin.Block tag="div">{textRelatedJob}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1282")}
            data-w-id="74900e4c-b1fd-7af5-7374-5caedc41babe"
            tag="div"
            {...onClickAgent}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2217%22%20viewBox%3D%220%200%2014%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.25%208.5C0.270833%207.83333%200.5625%207.33333%201.125%207C1.70833%206.66667%202.29167%206.66667%202.875%207C3.4375%207.33333%203.72917%207.83333%203.75%208.5C3.72917%209.16667%203.4375%209.66667%202.875%2010C2.29167%2010.3333%201.70833%2010.3333%201.125%2010C0.5625%209.66667%200.270833%209.16667%200.25%208.5ZM5.25%208.5C5.27083%207.83333%205.5625%207.33333%206.125%207C6.70833%206.66667%207.29167%206.66667%207.875%207C8.4375%207.33333%208.72917%207.83333%208.75%208.5C8.72917%209.16667%208.4375%209.66667%207.875%2010C7.29167%2010.3333%206.70833%2010.3333%206.125%2010C5.5625%209.66667%205.27083%209.16667%205.25%208.5ZM12%206.75C12.6667%206.77083%2013.1667%207.0625%2013.5%207.625C13.8333%208.20833%2013.8333%208.79167%2013.5%209.375C13.1667%209.9375%2012.6667%2010.2292%2012%2010.25C11.3333%2010.2292%2010.8333%209.9375%2010.5%209.375C10.1667%208.79167%2010.1667%208.20833%2010.5%207.625C10.8333%207.0625%2011.3333%206.77083%2012%206.75Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1284")}
              tag="div"
            >
              {slotScheduleWithAgent ?? <ScheduleWithAgent />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "is_selected_bg-copy")}
          id={_utils.cx(
            _styles,
            "w-node-eb43a66d-c6c0-56a1-cd6b-c24535cb6173-e75dcb06"
          )}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
