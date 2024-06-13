"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./CandidateDetail.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateDetail({
  as: _Component = _Builtin.Block,
  slotIcon,
  textTitle = "Education",
  slotBody,
  slotBadge,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "candidate_detail")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "cd_title")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "cd_title_block")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {slotIcon ?? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2214%22%20height%3D%2212%22%20viewBox%3D%220%200%2014%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.69531%201.54688L-0.375%203.75L1.35938%204.38281C1.59375%204.21094%201.85156%204.07812%202.13281%203.98438L5.85938%202.57812C6.09375%202.51562%206.25781%202.58594%206.35156%202.78906C6.41406%203.00781%206.34375%203.17187%206.14062%203.28125L2.39062%204.6875C2.35938%204.6875%202.32812%204.69531%202.29688%204.71094L5.69531%205.95312C5.78906%205.98438%205.89062%206%206%206C6.10938%206%206.21094%205.98438%206.30469%205.95312L12.375%203.75L6.30469%201.54688C6.21094%201.51563%206.10938%201.5%206%201.5C5.89062%201.5%205.78906%201.51563%205.69531%201.54688ZM5.4375%206.65625L1.47656%205.22656C0.804687%205.80469%200.4375%206.53906%200.375%207.42969C0.515625%207.74219%200.625%208.0625%200.703125%208.39062C0.890625%209.0625%200.90625%209.91406%200.75%2010.9453C0.71875%2011.0547%200.664062%2011.1328%200.585938%2011.1797C0.492188%2011.2422%200.390625%2011.2578%200.28125%2011.2266L-1.21875%2010.8516C-1.34375%2010.8203%20-1.42969%2010.7422%20-1.47656%2010.6172C-1.52344%2010.4922%20-1.50781%2010.375%20-1.42969%2010.2656C-1.22656%2010%20-1.04688%209.71094%20-0.890625%209.39844C-0.59375%208.82031%20-0.421875%208.1875%20-0.375%207.5C-0.375%207.48438%20-0.375%207.46875%20-0.375%207.45312C-0.328125%206.46875%200.0234375%205.63281%200.679688%204.94531L-1.125%204.28906C-1.35938%204.17969%20-1.48438%204%20-1.5%203.75C-1.48438%203.5%20-1.35938%203.32031%20-1.125%203.21094L5.4375%200.84375C5.625%200.78125%205.8125%200.75%206%200.75C6.1875%200.75%206.375%200.78125%206.5625%200.84375L13.125%203.21094C13.3594%203.32031%2013.4844%203.5%2013.5%203.75C13.4844%204%2013.3594%204.17969%2013.125%204.28906L6.5625%206.65625C6.375%206.71875%206.1875%206.75%206%206.75C5.8125%206.75%205.625%206.71875%205.4375%206.65625ZM2.57812%206.42188L2.25%209.51562C2.25%209.51562%202.25781%209.51562%202.27344%209.51562C2.28906%209.54688%202.3125%209.57812%202.34375%209.60938C2.48438%209.73438%202.73438%209.875%203.09375%2010.0312C3.84375%2010.3281%204.8125%2010.4844%206%2010.5C7.1875%2010.4844%208.15625%2010.3203%208.90625%2010.0078C9.26562%209.86719%209.51562%209.73438%209.65625%209.60938C9.70312%209.57812%209.73438%209.54688%209.75%209.51562L9.42188%206.42188L10.1484%206.16406L10.5%209.5625C10.4688%2010%2010.0312%2010.3828%209.1875%2010.7109C8.34375%2011.0547%207.28125%2011.2344%206%2011.25C4.71875%2011.2344%203.65625%2011.0547%202.8125%2010.7109C1.96875%2010.3828%201.53125%2010%201.5%209.5625L1.85156%206.16406L2.57812%206.42188ZM9.77344%209.49219C9.75781%209.49219%209.75%209.49219%209.75%209.49219C9.76562%209.49219%209.77344%209.49219%209.77344%209.49219ZM0.0703125%2010.4062C0.117188%209.92188%200.117188%209.48438%200.0703125%209.09375C-0.0234375%209.32812%20-0.125%209.53906%20-0.234375%209.72656C-0.3125%209.91406%20-0.40625%2010.0938%20-0.515625%2010.2656L0.0703125%2010.4062Z%22%20fill%3D%22%2321201C%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            )}
          </_Builtin.Block>
          <Text content={textTitle} weight="medium" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "candidate_badges")}
          tag="div"
        >
          {slotBadge ?? <SlotComp componentName="Badge" />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "cd_body")} tag="div">
        {slotBody ?? (
          <>
            <SlotComp componentName="ExperienceItem" />
            <SlotComp componentName="EducationItem" />
            <SlotComp componentName="JdAnalysisItem" />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
