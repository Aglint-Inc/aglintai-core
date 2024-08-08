"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./ReqCompleted.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-195":{"id":"e-195","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-119","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-196"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"6cad1919-fc08-1169-2939-c454fcabb9fb"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1723128640711},"e-196":{"id":"e-196","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-120","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-195"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"6cad1919-fc08-1169-2939-c454fcabb9fb"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1723128640712}},"actionLists":{"a-119":{"id":"a-119","title":"ReqCompleted Hover in","actionItemGroups":[{"actionItems":[{"id":"a-119-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".right-icon-wrapper-rc","selectorGuids":["9affe6c7-e315-4754-2d6d-f99ffd7b3ef5"]},"xValue":0,"xUnit":"px","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"id":"a-119-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".right-icon-wrapper-rc","selectorGuids":["9affe6c7-e315-4754-2d6d-f99ffd7b3ef5"]},"xValue":4,"xUnit":"px","yUnit":"PX","zUnit":"PX"}}]}],"createdOn":1723128645259,"useFirstGroupAsInitialState":true},"a-120":{"id":"a-120","title":"ReqCompleted Hover out","actionItemGroups":[{"actionItems":[{"id":"a-120-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".right-icon-wrapper-rc","selectorGuids":["9affe6c7-e315-4754-2d6d-f99ffd7b3ef5"]},"xValue":0,"xUnit":"px","yUnit":"PX","zUnit":"PX"}}]}],"createdOn":1723128645259,"useFirstGroupAsInitialState":false}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ReqCompleted({
  as: _Component = _Builtin.Block,
  textTitle = "This is a global text component",
  textDesc = "This is a global text component",
  onClickArrow = {},
  slotTextwithIcon,
  isDetailListVisible = false,
  isDropIconVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "req-dash-bottom-wrap")}
      data-w-id="6cad1919-fc08-1169-2939-c454fcabb9fb"
      tag="div"
      {...onClickArrow}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1737")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <Text content={textTitle} size="3" color="success" />
          <Text content={textDesc} color="neutral" weight="regular" />
        </_Builtin.Block>
        {isDropIconVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "right-icon-wrapper-rc")}
            tag="div"
            {...onClickArrow}
          >
            <GlobalIcon iconName="arrow_forward_ios" size="4" color="neutral" />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isDetailListVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1738")}
          tag="div"
        >
          {slotTextwithIcon}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
