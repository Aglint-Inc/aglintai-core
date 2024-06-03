"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { TrainingStatus } from "./TrainingStatus";
import { PanelBlock } from "./PanelBlock";
import { GreyTextLink } from "./GreyTextLink";
import * as _utils from "./utils";
import _styles from "./TrainingDetailList.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TrainingDetailList({
  as: _Component = _Builtin.Block,
  isReverse = false,
  isShadow = true,
  textTraining = "Second Shadow",
  slotTrainingStatus,
  slotPanelBlock,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "div-block-1670")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1669")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          {isShadow ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.326531%22%20y%3D%220.326531%22%20width%3D%2215.3469%22%20height%3D%2215.3469%22%20rx%3D%227.67347%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.653061%22%20stroke-miterlimit%3D%221.30541%22%20stroke-dasharray%3D%221.47%201.47%22%2F%3E%0A%3Cpath%20d%3D%22M8.02232%2012.1897C6.25893%2012.1897%205.12054%2011.2634%205.00335%209.95201L4.99777%209.89062H6.00223L6.00781%209.95201C6.08036%2010.7556%206.91741%2011.2634%208.07812%2011.2634C9.17187%2011.2634%209.96987%2010.6998%209.96987%209.87946V9.87388C9.96987%209.20424%209.5067%208.74665%208.40179%208.50112L7.50893%208.3058C5.89621%207.94866%205.19866%207.20647%205.19866%206.04018V6.0346C5.20424%204.70089%206.37054%203.75781%208.03348%203.75781C9.64062%203.75781%2010.7623%204.70647%2010.846%205.90625L10.8516%205.98437H9.8471L9.83594%205.91183C9.72433%205.20312%209.05469%204.67857%208.00558%204.68415C7.00112%204.68973%206.22545%205.16406%206.22545%206.0067V6.01228C6.22545%206.65402%206.66629%207.08929%207.76004%207.32924L8.6529%207.53013C10.3326%207.90402%2010.9967%208.57924%2010.9967%209.73996V9.74554C10.9967%2011.2522%209.8192%2012.1897%208.02232%2012.1897Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
          {isReverse ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.326531%22%20y%3D%220.326531%22%20width%3D%2215.3469%22%20height%3D%2215.3469%22%20rx%3D%227.67347%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.653061%22%20stroke-miterlimit%3D%221.30541%22%2F%3E%0A%3Cpath%20d%3D%22M5.29353%2012V3.94754H8.3683C9.91964%203.94754%2010.9353%204.89621%2010.9353%206.34152V6.35268C10.9353%207.46875%2010.327%208.33929%209.31696%208.65737L11.1808%2012H10.0033L8.27902%208.81362H6.29799V12H5.29353ZM6.29799%207.92076H8.27902C9.31138%207.92076%209.89732%207.3683%209.89732%206.38616V6.375C9.89732%205.41518%209.27232%204.8404%208.23438%204.8404H6.29799V7.92076Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-first-cap")}
          tag="div"
        >
          {textTraining}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1673")}
        tag="div"
      >
        {slotTrainingStatus ?? <TrainingStatus />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1675")}
        tag="div"
      >
        {slotPanelBlock ?? (
          <>
            <PanelBlock />
            <GreyTextLink />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
