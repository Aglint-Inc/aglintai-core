"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ScheduleNowButton.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-43":{"id":"e-43","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-44"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"aaab3739-c46d-1437-efb8-84eb64e564cb"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712829998271},"e-44":{"id":"e-44","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-24","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-43"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"aaab3739-c46d-1437-efb8-84eb64e564cb"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712829998271}},"actionLists":{"a-23":{"id":"a-23","title":"Schedule Now hover in","actionItemGroups":[{"actionItems":[{"id":"a-23-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".div-block-1381","selectorGuids":["a359a436-8763-7c22-967e-83cd73f71f6f"]}}},{"id":"a-23-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1381","selectorGuids":["a359a436-8763-7c22-967e-83cd73f71f6f"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-23-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1381","selectorGuids":["a359a436-8763-7c22-967e-83cd73f71f6f"]},"value":1,"unit":""}},{"id":"a-23-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"block","target":{"useEventTarget":"CHILDREN","selector":".div-block-1381","selectorGuids":["a359a436-8763-7c22-967e-83cd73f71f6f"]}}}]}],"createdOn":1712728138351,"useFirstGroupAsInitialState":true},"a-24":{"id":"a-24","title":"Schedule Now hover out","actionItemGroups":[{"actionItems":[{"id":"a-24-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1381","selectorGuids":["a359a436-8763-7c22-967e-83cd73f71f6f"]},"value":0,"unit":""}},{"id":"a-24-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".div-block-1381","selectorGuids":["a359a436-8763-7c22-967e-83cd73f71f6f"]}}}]}],"createdOn":1712728138351,"useFirstGroupAsInitialState":false}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ScheduleNowButton({
  as: _Component = _Builtin.Block,
  onClickScheduleManually = {},
  onClickEmailAgent = {},
  onClickPhoneAgent = {},
  isScheduleManuallyVisible = true,
  isLoaderVisible = false,
  isDropIconVisible = true,
  slotLoaderIcon,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1378")}
      data-w-id="aaab3739-c46d-1437-efb8-84eb64e564cb"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1379")}
        tag="div"
        {...onClickScheduleManually}
      >
        <_Builtin.Block tag="div">{"Schedule Now"}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1380")}
        tag="div"
      >
        {isDropIconVisible ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%226%22%20viewBox%3D%220%200%2012%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.6877%200.609584C10.9033%200.437079%2011.2179%200.47204%2011.3905%200.687671C11.5438%200.879343%2011.5332%201.14925%2011.3775%201.32802L11.3124%201.39045L6.31237%205.39045C6.15584%205.51567%205.94285%205.53356%205.77019%205.44412L5.68767%205.39045L0.687671%201.39045C0.47204%201.21795%200.437079%200.903302%200.609584%200.687671C0.762922%200.495999%201.02857%200.447079%201.23715%200.55973L1.31237%200.609584L6.00002%204.35902L10.6877%200.609584Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
        {isLoaderVisible ? (
          <_Builtin.Block tag="div">{slotLoaderIcon}</_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1381")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1382", "border-down")}
          tag="div"
          {...onClickEmailAgent}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3%204.25C2.78125%204.25%202.60156%204.32031%202.46094%204.46094C2.32031%204.60156%202.25%204.78125%202.25%205V5.9375L6.84375%209.28906C7.28125%209.58594%207.71875%209.58594%208.15625%209.28906L12.75%205.9375V5C12.75%204.78125%2012.6797%204.60156%2012.5391%204.46094C12.3984%204.32031%2012.2188%204.25%2012%204.25H3ZM2.25%206.875V11C2.25%2011.2188%202.32031%2011.3984%202.46094%2011.5391C2.60156%2011.6797%202.78125%2011.75%203%2011.75H12C12.2188%2011.75%2012.3984%2011.6797%2012.5391%2011.5391C12.6797%2011.3984%2012.75%2011.2188%2012.75%2011V6.875L8.60156%209.89844C8.27344%2010.1484%207.90625%2010.2734%207.5%2010.2734C7.09375%2010.2734%206.72656%2010.1484%206.39844%209.89844L2.25%206.875ZM1.5%205C1.51562%204.57812%201.66406%204.22656%201.94531%203.94531C2.22656%203.66406%202.57812%203.51563%203%203.5H12C12.4219%203.51563%2012.7734%203.66406%2013.0547%203.94531C13.3359%204.22656%2013.4844%204.57812%2013.5%205V11C13.4844%2011.4219%2013.3359%2011.7734%2013.0547%2012.0547C12.7734%2012.3359%2012.4219%2012.4844%2012%2012.5H3C2.57812%2012.4844%202.22656%2012.3359%201.94531%2012.0547C1.66406%2011.7734%201.51562%2011.4219%201.5%2011V5Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-500")}
            tag="div"
          >
            {"Schedule with email agent"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1382")}
          tag="div"
          {...onClickPhoneAgent}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.3125%208.44531L12.9375%209.57031C13.1406%209.66406%2013.2969%209.8125%2013.4062%2010.0156C13.5%2010.2031%2013.5234%2010.4062%2013.4766%2010.625L12.9141%2013.25C12.7891%2013.7188%2012.4844%2013.9688%2012%2014C11.8594%2014%2011.7188%2014%2011.5781%2014C11.4688%2013.9844%2011.3594%2013.9766%2011.25%2013.9766C9.42188%2013.8203%207.77344%2013.2656%206.30469%2012.3125C4.83594%2011.3594%203.67188%2010.1172%202.8125%208.58594C1.95312%207.07031%201.51562%205.375%201.5%203.5C1.53125%203.01562%201.78125%202.71094%202.25%202.58594L4.875%202.02344C5.09375%201.97656%205.29688%202.00781%205.48438%202.11719C5.6875%202.21094%205.83594%202.35937%205.92969%202.5625L7.05469%205.1875C7.21094%205.60938%207.11719%205.97656%206.77344%206.28906L5.83594%207.0625C6.47656%208.15625%207.34375%209.02344%208.4375%209.66406L9.21094%208.72656C9.52344%208.38281%209.89062%208.28906%2010.3125%208.44531ZM12%2013.25C12.0938%2013.25%2012.1562%2013.2031%2012.1875%2013.1094L12.75%2010.4844C12.7656%2010.375%2012.7266%2010.3047%2012.6328%2010.2734L10.0078%209.14844C9.92969%209.11719%209.85938%209.13281%209.79688%209.19531L9.02344%2010.1562C8.74219%2010.4375%208.42188%2010.4922%208.0625%2010.3203C6.84375%209.61719%205.88281%208.65625%205.17969%207.4375C5.00781%207.07812%205.0625%206.75781%205.34375%206.47656L6.30469%205.70312C6.36719%205.64062%206.38281%205.57031%206.35156%205.49219L5.22656%202.86719C5.17969%202.77344%205.10938%202.73437%205.01562%202.75L2.39062%203.3125C2.29688%203.34375%202.25%203.40625%202.25%203.5C2.26562%205.3125%202.71094%206.95312%203.58594%208.42188C4.44531%209.89062%205.60938%2011.0547%207.07812%2011.9141C8.54688%2012.7891%2010.1875%2013.2344%2012%2013.25Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-500")}
            tag="div"
          >
            {"Schedule with phone agent"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
