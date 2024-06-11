"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./FilterDropdown.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function FilterDropdown({
  as: _Component = _Builtin.Block,
  slotOption,
  onClickReset = {},
  onClickDelete = {},
  isRemoveVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "assessment-type-wrap", "no-border")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "assessment-type-sub-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-924")}
          tag="div"
        >
          {slotOption}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "filter_dropdiown")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "link_with_text")}
          tag="div"
          {...onClickReset}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.875%204.5H7.875C7.64062%204.48438%207.51562%204.35938%207.5%204.125C7.51562%203.89062%207.64062%203.76563%207.875%203.75H9.89062C9.5%203.0625%208.96094%202.51562%208.27344%202.10938C7.60156%201.71875%206.84375%201.51563%206%201.5C4.71875%201.53125%203.65625%201.96875%202.8125%202.8125C1.96875%203.65625%201.53125%204.71875%201.5%206C1.53125%207.28125%201.96875%208.34375%202.8125%209.1875C3.65625%2010.0312%204.71875%2010.4688%206%2010.5C6.79688%2010.4844%207.52344%2010.2969%208.17969%209.9375C8.83594%209.5625%209.36719%209.0625%209.77344%208.4375C9.86719%208.3125%209.98438%208.25%2010.125%208.25C10.2812%208.25%2010.3906%208.3125%2010.4531%208.4375C10.5156%208.54688%2010.5156%208.66406%2010.4531%208.78906C9.96875%209.53906%209.34375%2010.1328%208.57812%2010.5703C7.8125%2011.0078%206.95312%2011.2344%206%2011.25C5.01562%2011.2344%204.13281%2010.9922%203.35156%2010.5234C2.55469%2010.0703%201.92969%209.44531%201.47656%208.64844C1.00781%207.86719%200.765625%206.98438%200.75%206C0.765625%205.01562%201.00781%204.13281%201.47656%203.35156C1.92969%202.55469%202.55469%201.92969%203.35156%201.47656C4.13281%201.00781%205.01562%200.765625%206%200.75C6.96875%200.765625%207.84375%201%208.625%201.45312C9.40625%201.90625%2010.0312%202.52344%2010.5%203.30469V1.125C10.5156%200.890625%2010.6406%200.765625%2010.875%200.75C11.1094%200.765625%2011.2344%200.890625%2011.25%201.125V4.125C11.2344%204.35938%2011.1094%204.48438%2010.875%204.5Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Reset"}</_Builtin.Block>
        </_Builtin.Block>
        {isRemoveVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1276", "cursor-pointer")}
            tag="div"
            {...onClickDelete}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons", "cursor-pointer")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.92188%200.75C4.78125%200.75%204.67188%200.8125%204.59375%200.9375L4.24219%201.5H7.75781L7.40625%200.9375C7.32812%200.8125%207.21875%200.75%207.07812%200.75H4.92188ZM8.64844%201.5H9.75H10.5H10.875C11.1094%201.51563%2011.2344%201.64062%2011.25%201.875C11.2344%202.10938%2011.1094%202.23437%2010.875%202.25H10.4531L9.84375%2010.6172C9.8125%2011.0078%209.65625%2011.3359%209.375%2011.6016C9.09375%2011.8516%208.75%2011.9844%208.34375%2012H3.65625C3.25%2011.9844%202.90625%2011.8516%202.625%2011.6016C2.34375%2011.3359%202.1875%2011.0078%202.15625%2010.6172L1.54688%202.25H1.125C0.890625%202.23437%200.765625%202.10938%200.75%201.875C0.765625%201.64062%200.890625%201.51563%201.125%201.5H1.5H2.25H3.35156L3.96094%200.539062C4.19531%200.195312%204.51562%200.015625%204.92188%200H7.07812C7.48438%200.015625%207.80469%200.195312%208.03906%200.539062L8.64844%201.5ZM9.70312%202.25H2.29688L2.90625%2010.5469C2.92188%2010.75%203%2010.9141%203.14062%2011.0391C3.28125%2011.1797%203.45312%2011.25%203.65625%2011.25H8.34375C8.54688%2011.25%208.71875%2011.1797%208.85938%2011.0391C9%2010.9141%209.07812%2010.75%209.09375%2010.5469L9.70312%202.25Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-red-500")}
              tag="div"
            >
              {"Remove filter"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
