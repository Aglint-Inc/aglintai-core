"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./ReqUrgent.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-197":{"id":"e-197","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-198"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"022c1acf-4579-2d42-2333-54ffa4e25266","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"022c1acf-4579-2d42-2333-54ffa4e25266","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1723209027555},"e-198":{"id":"e-198","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-197"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"022c1acf-4579-2d42-2333-54ffa4e25266","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"022c1acf-4579-2d42-2333-54ffa4e25266","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1723209027555},"e-199":{"id":"e-199","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-200"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"6cad1919-fc08-1169-2939-c454fcabb9fb"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1723214554616},"e-200":{"id":"e-200","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-199"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"6cad1919-fc08-1169-2939-c454fcabb9fb"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1723214554617}},"actionLists":{"a-121":{"id":"a-121","title":"ReqCompleted Hover in 2","actionItemGroups":[{"actionItems":[{"id":"a-121-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".right-icon-wrapper-rc","selectorGuids":["9affe6c7-e315-4754-2d6d-f99ffd7b3ef5"]},"xValue":0,"xUnit":"px","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"id":"a-121-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".right-icon-wrapper-rc","selectorGuids":["9affe6c7-e315-4754-2d6d-f99ffd7b3ef5"]},"xValue":4,"xUnit":"px","yUnit":"PX","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1723128645259},"a-122":{"id":"a-122","title":"ReqCompleted Hover out 2","actionItemGroups":[{"actionItems":[{"id":"a-122-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".right-icon-wrapper-rc","selectorGuids":["9affe6c7-e315-4754-2d6d-f99ffd7b3ef5"]},"xValue":0,"xUnit":"px","yUnit":"PX","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1723128645259}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ReqUrgent({
  as: _Component = _Builtin.Block,
  textRequests = "Urgent Requests ",
  onClickUrgentRequest = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "req-dash-bottom-wrap")}
      data-w-id="022c1acf-4579-2d42-2333-54ffa4e25266"
      tag="div"
      {...onClickUrgentRequest}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1737")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "warning_text")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text_with_icon")}
              id={_utils.cx(
                _styles,
                "w-node-_022c1acf-4579-2d42-2333-54ffa4e2526a-a4e25266"
              )}
              tag="div"
              data-color="neutral-12"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "slot_icon")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "icon_general-copy")}
                  tag="div"
                  icon-font="true"
                  icon-size="3"
                  icon-weight="medium"
                >
                  <_Builtin.Block tag="div">{"flag_2"}</_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "warning_text")}
                tag="div"
                fontSize="3"
              >
                {textRequests}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <Text
            color="neutral"
            weight="regular"
            content="These urgent requests need immediate attention."
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "right-icon-wrapper-rc")}
          tag="div"
        >
          <GlobalIcon iconName="arrow_forward_ios" size="4" color="neutral" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
