"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { TextWithBg } from "./TextWithBg";
import { IconButtonSoft } from "./IconButtonSoft";
import * as _utils from "./utils";
import _styles from "./DayoffList.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".dol-delete-wrap","selectorGuids":["c31cac80-4b13-8bb6-136d-9f88d4dfdbd4"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dol-delete-wrap","selectorGuids":["c31cac80-4b13-8bb6-136d-9f88d4dfdbd4"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dol-delete-wrap","selectorGuids":["c31cac80-4b13-8bb6-136d-9f88d4dfdbd4"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dol-delete-wrap","selectorGuids":["c31cac80-4b13-8bb6-136d-9f88d4dfdbd4"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dol-delete-wrap","selectorGuids":["c31cac80-4b13-8bb6-136d-9f88d4dfdbd4"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dol-delete-wrap","selectorGuids":["c31cac80-4b13-8bb6-136d-9f88d4dfdbd4"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
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
      className={_utils.cx(_styles, "dol-wrapper")}
      data-w-id="c4667897-cb8f-9265-5bac-ed224495c8eb"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "dol-item-wrap")}
        id={_utils.cx(
          _styles,
          "w-node-c4667897-cb8f-9265-5bac-ed224495c8ec-4495c8eb"
        )}
        tag="div"
      >
        <Text content={textDayoff} />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "dol-item-wrap")}
        id={_utils.cx(
          _styles,
          "w-node-c4667897-cb8f-9265-5bac-ed224495c8ef-4495c8eb"
        )}
        tag="div"
      >
        <Text content={textDate} weight="" color="neutral" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "dol-item-wrap", "gap-10")}
        id={_utils.cx(
          _styles,
          "w-node-c4667897-cb8f-9265-5bac-ed224495c8f2-4495c8eb"
        )}
        tag="div"
      >
        {slotTextWithBg ?? <TextWithBg />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "dol-item-wrap", "center")}
        id={_utils.cx(
          _styles,
          "w-node-_2a712dec-2b37-0650-8a17-d67183a3446b-4495c8eb"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "dol-delete-wrap")}
          tag="div"
          {...onClickDelete}
        >
          <IconButtonSoft iconName="delete" color="error" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
