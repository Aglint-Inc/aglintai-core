"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { TextWithBg } from "./TextWithBg";
import * as _utils from "./utils";
import _styles from "./DayoffList.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function DayoffList({
  as: _Component = _Builtin.Block,
  textDayoff = "Christmas ",
  textDate = "December 25, 2017",
  slotTextWithBg,
  onClickDelete = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1687")}
      data-w-id="c4667897-cb8f-9265-5bac-ed224495c8eb"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1686")}
        id={_utils.cx(
          _styles,
          "w-node-c4667897-cb8f-9265-5bac-ed224495c8ec-4495c8eb"
        )}
        tag="div"
      >
        <Text content={textDayoff} />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1686")}
        id={_utils.cx(
          _styles,
          "w-node-c4667897-cb8f-9265-5bac-ed224495c8ef-4495c8eb"
        )}
        tag="div"
      >
        <Text content={textDate} weight="" color="neutral" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1686", "gap-10")}
        id={_utils.cx(
          _styles,
          "w-node-c4667897-cb8f-9265-5bac-ed224495c8f2-4495c8eb"
        )}
        tag="div"
      >
        {slotTextWithBg ?? <TextWithBg />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1686", "center")}
        id={_utils.cx(
          _styles,
          "w-node-_2a712dec-2b37-0650-8a17-d67183a3446b-4495c8eb"
        )}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "cursor-pointer", "no-trans")}
          value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.42188%202.75C6.28125%202.75%206.17188%202.8125%206.09375%202.9375L5.74219%203.5H9.25781L8.90625%202.9375C8.82812%202.8125%208.71875%202.75%208.57812%202.75H6.42188ZM10.1484%203.5H11.25H12H12.375C12.6094%203.51563%2012.7344%203.64062%2012.75%203.875C12.7344%204.10938%2012.6094%204.23438%2012.375%204.25H11.9531L11.3438%2012.6172C11.3125%2013.0078%2011.1562%2013.3359%2010.875%2013.6016C10.5938%2013.8516%2010.25%2013.9844%209.84375%2014H5.15625C4.75%2013.9844%204.40625%2013.8516%204.125%2013.6016C3.84375%2013.3359%203.6875%2013.0078%203.65625%2012.6172L3.04688%204.25H2.625C2.39062%204.23438%202.26562%204.10938%202.25%203.875C2.26562%203.64062%202.39062%203.51563%202.625%203.5H3H3.75H4.85156L5.46094%202.53906C5.69531%202.19531%206.01562%202.01563%206.42188%202H8.57812C8.98438%202.01563%209.30469%202.19531%209.53906%202.53906L10.1484%203.5ZM11.2031%204.25H3.79688L4.40625%2012.5469C4.42188%2012.75%204.5%2012.9141%204.64062%2013.0391C4.78125%2013.1797%204.95312%2013.25%205.15625%2013.25H9.84375C10.0469%2013.25%2010.2188%2013.1797%2010.3594%2013.0391C10.5%2012.9141%2010.5781%2012.75%2010.5938%2012.5469L11.2031%204.25Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickDelete}
        />
      </_Builtin.Block>
    </_Component>
  );
}
