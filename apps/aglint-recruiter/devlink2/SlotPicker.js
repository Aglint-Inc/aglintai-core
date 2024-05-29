"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./SlotPicker.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SlotPicker({
  as: _Component = _Builtin.Block,
  textDateHeading = "February 20, Monday",
  onClickClose = {},
  slotTime,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "div-block-1722")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1723")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textDateHeading}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "icons", "closediv")}
        value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2219.5%22%20height%3D%2219.5%22%20rx%3D%229.75%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2219.5%22%20height%3D%2219.5%22%20rx%3D%229.75%22%20stroke%3D%22%23E9EBED%22%20stroke-width%3D%220.5%22%2F%3E%0A%3Cpath%20d%3D%22M13.1172%2013.6328L10%2010.5391L6.90625%2013.6328C6.71875%2013.7734%206.53906%2013.7734%206.36719%2013.6328C6.22656%2013.4609%206.22656%2013.2891%206.36719%2013.1172L9.46094%2010L6.36719%206.90625C6.22656%206.71875%206.22656%206.53906%206.36719%206.36719C6.53906%206.22656%206.71875%206.22656%206.90625%206.36719L10%209.46094L13.1172%206.36719C13.2891%206.22656%2013.4609%206.22656%2013.6328%206.36719C13.7734%206.53906%2013.7734%206.71875%2013.6328%206.90625L10.5391%2010L13.6328%2013.1172C13.7734%2013.2891%2013.7734%2013.4609%2013.6328%2013.6328C13.4609%2013.7734%2013.2891%2013.7734%2013.1172%2013.6328Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
        {...onClickClose}
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1724")}
        tag="div"
      >
        {slotTime}
      </_Builtin.Block>
    </_Component>
  );
}
