"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { Kbd } from "./Kbd";
import * as _utils from "./utils";
import _styles from "./CandidateSidedrawerTop.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1572":{"id":"e-1572","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-609","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1573"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ae1f4272-ff7c-8ba6-ff8d-e2aab2d8c599","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ae1f4272-ff7c-8ba6-ff8d-e2aab2d8c599","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713879535086},"e-1573":{"id":"e-1573","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-610","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1572"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ae1f4272-ff7c-8ba6-ff8d-e2aab2d8c599","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ae1f4272-ff7c-8ba6-ff8d-e2aab2d8c599","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713879535087},"e-1574":{"id":"e-1574","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-609","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1575"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ae1f4272-ff7c-8ba6-ff8d-e2aab2d8c5a1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ae1f4272-ff7c-8ba6-ff8d-e2aab2d8c5a1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713879736534},"e-1575":{"id":"e-1575","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-610","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1574"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ae1f4272-ff7c-8ba6-ff8d-e2aab2d8c5a1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ae1f4272-ff7c-8ba6-ff8d-e2aab2d8c5a1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713879736535},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-609":{"id":"a-609","title":"Task Next previous hover in","actionItemGroups":[{"actionItems":[{"id":"a-609-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".cst-tip-wrap","selectorGuids":["32ab0c11-bb84-b758-d1c4-7f4bffd51b82"]},"value":0,"unit":""}},{"id":"a-609-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cst-tip-wrap","selectorGuids":["32ab0c11-bb84-b758-d1c4-7f4bffd51b82"]},"value":"none"}}]},{"actionItems":[{"id":"a-609-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cst-tip-wrap","selectorGuids":["32ab0c11-bb84-b758-d1c4-7f4bffd51b82"]},"value":1,"unit":""}},{"id":"a-609-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cst-tip-wrap","selectorGuids":["32ab0c11-bb84-b758-d1c4-7f4bffd51b82"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1713879541901},"a-610":{"id":"a-610","title":"Task Next previous hover out","actionItemGroups":[{"actionItems":[{"id":"a-610-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cst-tip-wrap","selectorGuids":["32ab0c11-bb84-b758-d1c4-7f4bffd51b82"]},"value":0,"unit":""}},{"id":"a-610-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cst-tip-wrap","selectorGuids":["32ab0c11-bb84-b758-d1c4-7f4bffd51b82"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1713879541901},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateSidedrawerTop({
  as: _Component = _Builtin.Block,
  isDownArrowEnable = false,
  isUpArrowEnable = false,
  onClickBookMark = {},
  isBookmarked = false,
  onClickUp = {},
  onClickDown = {},
  onClickClose = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "sidedrawer_controls")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "left-right-arrows")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "arrow_task")}
          data-w-id="ae1f4272-ff7c-8ba6-ff8d-e2aab2d8c599"
          tag="div"
          {...onClickUp}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cst-tip-wrap")}
            tag="div"
          >
            <Text size="1" content="Press" />
            <Kbd textKbd="↑" />
            <Text size="1" content="for prev" />
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_arrow")}
            value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2224%22%20height%3D%2224%22%20transform%3D%22matrix(0%201%20-1%200%2024%200)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20d%3D%22M21%200C22.6569%200%2024%201.34315%2024%203L24%2021C24%2022.6569%2022.6569%2024%2021%2024L3%2024C1.34315%2024%200%2022.6569%200%2021L0%203C0%201.34315%201.34315%200%203%200L21%200Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20transform%3D%22matrix(0%201%20-1%200%2020%204)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.5391%2013.4061C15.3516%2013.5936%2015.0477%2013.5936%2014.8603%2013.4061L11.9997%2010.5455L9.13908%2013.4061C8.95167%2013.5936%208.64778%2013.5936%208.46026%2013.4061C8.27284%2013.2187%208.27284%2012.9148%208.46026%2012.7273L11.6603%209.52731C11.7503%209.43729%2011.8724%209.38672%2011.9997%209.38672C12.127%209.38672%2012.2491%209.43729%2012.3391%209.52731L15.5391%2012.7273C15.7266%2012.9148%2015.7266%2013.2187%2015.5391%2013.4061Z%22%20fill%3D%22%2363635E%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        {isUpArrowEnable ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "arrow_task", "disable")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_arrow")}
              value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2224%22%20height%3D%2224%22%20transform%3D%22matrix(0%201%20-1%200%2024%200)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20d%3D%22M21%200C22.6569%200%2024%201.34315%2024%203L24%2021C24%2022.6569%2022.6569%2024%2021%2024L3%2024C1.34315%2024%200%2022.6569%200%2021L0%203C0%201.34315%201.34315%200%203%200L21%200Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20transform%3D%22matrix(0%201%20-1%200%2020%204)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.5391%2013.4061C15.3516%2013.5936%2015.0477%2013.5936%2014.8603%2013.4061L11.9997%2010.5455L9.13908%2013.4061C8.95167%2013.5936%208.64778%2013.5936%208.46026%2013.4061C8.27284%2013.2187%208.27284%2012.9148%208.46026%2012.7273L11.6603%209.52731C11.7503%209.43729%2011.8724%209.38672%2011.9997%209.38672C12.127%209.38672%2012.2491%209.43729%2012.3391%209.52731L15.5391%2012.7273C15.7266%2012.9148%2015.7266%2013.2187%2015.5391%2013.4061Z%22%20fill%3D%22var(--neutral-6)%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "left-right-arrows")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "arrow_task")}
          data-w-id="ae1f4272-ff7c-8ba6-ff8d-e2aab2d8c5a1"
          tag="div"
          {...onClickDown}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_arrow")}
            value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2224%22%20height%3D%2224%22%20transform%3D%22matrix(0%201%20-1%200%2024%200)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20d%3D%22M21%200C22.6569%200%2024%201.34315%2024%203V21C24%2022.6569%2022.6569%2024%2021%2024H3C1.34315%2024%200%2022.6569%200%2021V3C0%201.34315%201.34315%200%203%200L21%200Z%22%20fill%3D%22currentColor%22%20%2F%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20transform%3D%22matrix(0%201%20-1%200%2020%204)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.5391%2010.5937C15.7266%2010.7812%2015.7266%2011.0851%2015.5391%2011.2725L12.3391%2014.4725C12.2491%2014.5625%2012.127%2014.6131%2011.9997%2014.6131C11.8724%2014.6131%2011.7503%2014.5625%2011.6603%2014.4725L8.46032%2011.2725C8.2728%2011.0851%208.2728%2010.7812%208.46032%2010.5937C8.64774%2010.4063%208.95163%2010.4063%209.13904%2010.5937L11.9997%2013.4543L14.8603%2010.5937C15.0477%2010.4063%2015.3516%2010.4063%2015.5391%2010.5937Z%22%20fill%3D%22%2363635E%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cst-tip-wrap")}
            tag="div"
          >
            <Text size="1" content="Press" />
            <Kbd textKbd="↓" />
            <Text size="1" content="for next" />
          </_Builtin.Block>
        </_Builtin.Block>
        {isDownArrowEnable ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "arrow_task", "disable")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_arrow")}
              value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2224%22%20height%3D%2224%22%20transform%3D%22matrix(0%201%20-1%200%2024%200)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20d%3D%22M21%200C22.6569%200%2024%201.34315%2024%203V21C24%2022.6569%2022.6569%2024%2021%2024H3C1.34315%2024%200%2022.6569%200%2021V3C0%201.34315%201.34315%200%203%200L21%200Z%22%20fill%3D%22currentColor%22%20%2F%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20transform%3D%22matrix(0%201%20-1%200%2020%204)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.5391%2010.5937C15.7266%2010.7812%2015.7266%2011.0851%2015.5391%2011.2725L12.3391%2014.4725C12.2491%2014.5625%2012.127%2014.6131%2011.9997%2014.6131C11.8724%2014.6131%2011.7503%2014.5625%2011.6603%2014.4725L8.46032%2011.2725C8.2728%2011.0851%208.2728%2010.7812%208.46032%2010.5937C8.64774%2010.4063%208.95163%2010.4063%209.13904%2010.5937L11.9997%2013.4543L14.8603%2010.5937C15.0477%2010.4063%2015.3516%2010.4063%2015.5391%2010.5937Z%22%20fill%3D%22var(--neutral-6)%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
