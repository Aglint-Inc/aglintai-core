"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { CdExperienceCard } from "./CdExperienceCard";
import * as _utils from "./utils";
import _styles from "./CdTableAglint.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1514":{"id":"e-1514","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-566","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1515"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7a3bcb75-6206-c6cc-8531-425f7bd60dbc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7a3bcb75-6206-c6cc-8531-425f7bd60dbc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705054364602},"e-1515":{"id":"e-1515","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-567","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1514"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7a3bcb75-6206-c6cc-8531-425f7bd60dbc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7a3bcb75-6206-c6cc-8531-425f7bd60dbc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705054364604},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-566":{"id":"a-566","title":"Cd Table bookmark hover(In)","actionItemGroups":[{"actionItems":[{"id":"a-566-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".cd-hover-reach","selectorGuids":["00e7c71b-9140-d336-6677-ed8cd660f87c"]},"value":0,"unit":""}},{"id":"a-566-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cd-hover-reach","selectorGuids":["00e7c71b-9140-d336-6677-ed8cd660f87c"]},"value":"none"}}]},{"actionItems":[{"id":"a-566-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".cd-hover-reach","selectorGuids":["00e7c71b-9140-d336-6677-ed8cd660f87c"]},"value":1,"unit":""}},{"id":"a-566-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cd-hover-reach","selectorGuids":["00e7c71b-9140-d336-6677-ed8cd660f87c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1705054368926},"a-567":{"id":"a-567","title":"Cd Table bookmark hover(Out)","actionItemGroups":[{"actionItems":[{"id":"a-567-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".cd-hover-reach","selectorGuids":["00e7c71b-9140-d336-6677-ed8cd660f87c"]},"value":1,"unit":""}},{"id":"a-567-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".profile-image-hover","selectorGuids":["127c161c-d7b3-28e7-f284-80e81d1be2dc"]},"value":0,"unit":""}},{"id":"a-567-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cd-hover-reach","selectorGuids":["00e7c71b-9140-d336-6677-ed8cd660f87c"]},"value":"none"}},{"id":"a-567-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".profile-image-hover","selectorGuids":["127c161c-d7b3-28e7-f284-80e81d1be2dc"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1705054368926},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CdTableAglint({
  as: _Component = _Builtin.Block,
  slotCheckbox,
  slotProfileImage,
  textName = "Westly Snedger",
  isBookMarked = false,
  textRole = "Software Developer at Pacific Dental Service",
  textLocation = "San Fransisco, California",
  onClickBookmark = {},
  notBookmark = true,
  bookMarked = false,
  onClickBookMarked = {},
  slotCdExperienceCard,
  onClickCard = {},
  onClickSaveToList = {},
  onClickEmailReachOut = {},
  slotSavetoList,
  isActiveSelectVisible = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "cd-table-aglint-wrap")}
      data-w-id="7a3bcb75-6206-c6cc-8531-425f7bd60dbc"
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-684")} tag="div">
        <_Builtin.Block tag="div">{slotCheckbox}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-687")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "profile-image-table")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotProfileImage}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "profile-image-hover")}
              tag="div"
            >
              {notBookmark ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2224%22%20height%3D%2232%22%20viewbox%3D%220%200%2024%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%203C0.0416667%202.16667%200.333333%201.45833%200.875%200.875C1.45833%200.333333%202.16667%200.0416667%203%200H21C21.8333%200.0416667%2022.5417%200.333333%2023.125%200.875C23.6667%201.45833%2023.9583%202.16667%2024%203V30.625C23.9167%2031.4583%2023.4583%2031.9167%2022.625%2032C22.3333%2032%2022.0833%2031.9167%2021.875%2031.75L12%2025.1875L2.125%2031.75C1.91667%2031.9167%201.66667%2032%201.375%2032C0.541667%2031.9167%200.0833333%2031.4583%200%2030.625V3ZM3%202C2.375%202.04167%202.04167%202.375%202%203V29.4375L11.4375%2023.1875C11.8125%2022.9375%2012.1875%2022.9375%2012.5625%2023.1875L22%2029.4375V3C21.9583%202.375%2021.625%202.04167%2021%202H3Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                  {...onClickBookmark}
                />
              ) : null}
              {isBookMarked ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2224%22%20height%3D%2232%22%20viewbox%3D%220%200%2024%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%203C0.0416667%202.16667%200.333333%201.45833%200.875%200.875C1.45833%200.333333%202.16667%200.0416667%203%200H21C21.8333%200.0416667%2022.5417%200.333333%2023.125%200.875C23.6667%201.45833%2023.9583%202.16667%2024%203V30.5C23.9167%2031.4167%2023.4167%2031.9167%2022.5%2032C22.1667%2032%2021.875%2031.9167%2021.625%2031.75L12%2025L2.375%2031.75C2.125%2031.9167%201.83333%2032%201.5%2032C0.583333%2031.9167%200.0833333%2031.4167%200%2030.5V3Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
                  {...onClickBookMarked}
                />
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-686")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-685")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold", "one-line-clamp")}
                tag="div"
              >
                {textName}
              </_Builtin.Block>
              {isBookMarked ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons", "hide")}
                  value="%3Csvg%20width%3D%229%22%20height%3D%2212%22%20viewbox%3D%220%200%209%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%201.125C0.015625%200.8125%200.125%200.546875%200.328125%200.328125C0.546875%200.125%200.8125%200.015625%201.125%200H7.875C8.1875%200.015625%208.45312%200.125%208.67188%200.328125C8.875%200.546875%208.98438%200.8125%209%201.125V11.4375C8.96875%2011.7812%208.78125%2011.9688%208.4375%2012C8.3125%2012%208.20312%2011.9688%208.10938%2011.9062L4.5%209.375L0.890625%2011.9062C0.796875%2011.9688%200.6875%2012%200.5625%2012C0.21875%2011.9688%200.03125%2011.7812%200%2011.4375V1.125Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "one-line-clamp")}
              tag="div"
            >
              {textRole}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600", "one-line-clamp")}
              tag="div"
            >
              {textLocation}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-690")} tag="div">
        {slotCdExperienceCard ?? (
          <>
            <CdExperienceCard />
            <CdExperienceCard />
          </>
        )}
      </_Builtin.Block>
      {isActiveSelectVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "active-bg-blue-cd")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
