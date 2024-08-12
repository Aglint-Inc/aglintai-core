"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ReqCompleted.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-197":{"id":"e-197","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-198"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"022c1acf-4579-2d42-2333-54ffa4e25266","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"022c1acf-4579-2d42-2333-54ffa4e25266","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1723209027555},"e-198":{"id":"e-198","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-197"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"022c1acf-4579-2d42-2333-54ffa4e25266","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"022c1acf-4579-2d42-2333-54ffa4e25266","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1723209027555},"e-199":{"id":"e-199","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-200"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"6cad1919-fc08-1169-2939-c454fcabb9fb"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1723214554616},"e-200":{"id":"e-200","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-199"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"6cad1919-fc08-1169-2939-c454fcabb9fb"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1723214554617}},"actionLists":{"a-121":{"id":"a-121","title":"ReqCompleted Hover in 2","actionItemGroups":[{"actionItems":[{"id":"a-121-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".right-icon-wrapper-rc","selectorGuids":["9affe6c7-e315-4754-2d6d-f99ffd7b3ef5"]},"xValue":0,"xUnit":"px","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"id":"a-121-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".right-icon-wrapper-rc","selectorGuids":["9affe6c7-e315-4754-2d6d-f99ffd7b3ef5"]},"xValue":4,"xUnit":"px","yUnit":"PX","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1723128645259},"a-122":{"id":"a-122","title":"ReqCompleted Hover out 2","actionItemGroups":[{"actionItems":[{"id":"a-122-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".right-icon-wrapper-rc","selectorGuids":["9affe6c7-e315-4754-2d6d-f99ffd7b3ef5"]},"xValue":0,"xUnit":"px","yUnit":"PX","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1723128645259}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ReqCompleted({
  as: _Component = _Builtin.Block,
  textTitle = "This is a global text component",
  onClickCompleted = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "req-dash-bottom-wrap", "is_completed")}
      data-w-id="6cad1919-fc08-1169-2939-c454fcabb9fb"
      tag="div"
      {...onClickCompleted}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "req-dash-list-card-left")}
        tag="div"
      >
        <GlobalIcon size="5" iconName="task_alt" color="success-11" />
        <Text content={textTitle} weight="regular" color="success" />
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_for_badge")}
          tag="div"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "right-icon-wrapper-rc")}
        tag="div"
      >
        <GlobalIcon iconName="arrow_forward_ios" size="2" color="neutral" />
      </_Builtin.Block>
    </_Component>
  );
}
