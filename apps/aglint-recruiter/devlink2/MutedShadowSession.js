"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { StatusBadge } from "./StatusBadge";
import * as _utils from "./utils";
import _styles from "./MutedShadowSession.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function MutedShadowSession({
  as: _Component = _Builtin.Block,
  textSessionHeader = "Third shadow session",
  isShadowIconVisible = true,
  isReverseShadowIconVisible = false,
  isLineVisible = true,
  slotStatusBadge,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1201")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          {isShadowIconVisible ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.357143%22%20y%3D%220.357143%22%20width%3D%2219.2857%22%20height%3D%2219.2857%22%20rx%3D%229.64286%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.357143%22%20y%3D%220.357143%22%20width%3D%2219.2857%22%20height%3D%2219.2857%22%20rx%3D%229.64286%22%20stroke%3D%22%23C2C8CC%22%20stroke-width%3D%220.714286%22%20stroke-miterlimit%3D%221.30541%22%20stroke-dasharray%3D%222.86%202.86%22%2F%3E%0A%3Cpath%20d%3D%22M9.96289%2015.4492C7.61914%2015.4492%206.00781%2014.3164%205.8125%2012.5781H7.55078C7.83398%2013.457%208.67383%2014.0332%2010.0215%2014.0332C11.4375%2014.0332%2012.4434%2013.3594%2012.4434%2012.4023V12.3828C12.4434%2011.6699%2011.9062%2011.1719%2010.6074%2010.8594L8.97656%2010.4688C7.00391%2010%206.11523%209.14062%206.11523%207.62695V7.61719C6.11523%205.86914%207.79492%204.55078%2010.0312%204.55078C12.2383%204.55078%2013.7715%205.6543%2014.0059%207.37305H12.3359C12.1113%206.54297%2011.291%205.9668%2010.0215%205.9668C8.77148%205.9668%207.85352%206.61133%207.85352%207.53906V7.55859C7.85352%208.27148%208.38086%208.7207%209.62109%209.02344L11.2422%209.41406C13.2246%209.89258%2014.1816%2010.752%2014.1816%2012.2559V12.2754C14.1816%2014.1504%2012.3555%2015.4492%209.96289%2015.4492Z%22%20fill%3D%22%23C2C8CC%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
          {isReverseShadowIconVisible ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2222%22%20height%3D%2222%22%20viewbox%3D%220%200%2022%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.642857%22%20y%3D%220.642857%22%20width%3D%2220.7143%22%20height%3D%2220.7143%22%20rx%3D%2210.3571%22%20fill%3D%22%23C2C8CC%22%2F%3E%0A%3Crect%20x%3D%220.642857%22%20y%3D%220.642857%22%20width%3D%2220.7143%22%20height%3D%2220.7143%22%20rx%3D%2210.3571%22%20stroke%3D%22%23C2C8CC%22%20stroke-width%3D%220.714286%22%20stroke-miterlimit%3D%221.30541%22%2F%3E%0A%3Cpath%20d%3D%22M7.29688%2016.059V5.9375H11.1617C13.1117%205.9375%2014.3882%207.12992%2014.3882%208.9466V8.96063C14.3882%2010.3635%2013.6237%2011.4577%2012.3541%2011.8575L14.6969%2016.059H13.2169L11.0495%2012.0539H8.55943V16.059H7.29688ZM8.55943%2010.9316H11.0495C12.3471%2010.9316%2013.0836%2010.2372%2013.0836%209.00271V8.98868C13.0836%207.78224%2012.298%207.05977%2010.9934%207.05977H8.55943V10.9316Z%22%20fill%3D%22%23F5FCFC%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1271")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "fw-semibold",
              "text-gray-500",
              "text-first-cap"
            )}
            tag="div"
          >
            {textSessionHeader}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotStatusBadge ?? <StatusBadge />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1204", "height-58")}
        tag="div"
      >
        {isLineVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1205")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
