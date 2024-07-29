"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { TextWithIcon } from "./TextWithIcon";
import { IconButtonSoft } from "./IconButtonSoft";
import * as _utils from "./utils";
import _styles from "./WorkflowConnectedCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-87":{"id":"e-87","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-60","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-88"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ed7076b4-5af4-1564-3499-36b89ada4b19","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ed7076b4-5af4-1564-3499-36b89ada4b19","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":true},"createdOn":1721916322518},"e-88":{"id":"e-88","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-61","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-87"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ed7076b4-5af4-1564-3499-36b89ada4b19","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ed7076b4-5af4-1564-3499-36b89ada4b19","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1721916322518}},"actionLists":{"a-60":{"id":"a-60","title":"Connected Workflow Hover in","actionItemGroups":[{"actionItems":[{"id":"a-60-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".cjc-icon-btn-wrap","selectorGuids":["89d7aaa6-454d-d82a-08f6-74ec2120d6ca"]},"value":0,"unit":""}},{"id":"a-60-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cjc-icon-btn-wrap","selectorGuids":["89d7aaa6-454d-d82a-08f6-74ec2120d6ca"]},"value":"none"}}]},{"actionItems":[{"id":"a-60-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cjc-icon-btn-wrap","selectorGuids":["89d7aaa6-454d-d82a-08f6-74ec2120d6ca"]},"value":1,"unit":""}},{"id":"a-60-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cjc-icon-btn-wrap","selectorGuids":["89d7aaa6-454d-d82a-08f6-74ec2120d6ca"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1721916327456},"a-61":{"id":"a-61","title":"Connected Workflow Hover out","actionItemGroups":[{"actionItems":[{"id":"a-61-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cjc-icon-btn-wrap","selectorGuids":["89d7aaa6-454d-d82a-08f6-74ec2120d6ca"]},"value":0,"unit":""}},{"id":"a-61-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cjc-icon-btn-wrap","selectorGuids":["89d7aaa6-454d-d82a-08f6-74ec2120d6ca"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1721916327456}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function WorkflowConnectedCard({
  as: _Component = _Builtin.Block,
  role = "Managing Director",
  slotBadges,
  textRoleCategory = "This is a global text component",
  textLocation = "This is a global text component",
  onClickJob = {},
  onClickLinkOff = {},
  isLinkOffVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "connected-jobs-card-wrap")}
      data-w-id="ed7076b4-5af4-1564-3499-36b89ada4b19"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cjc-header-wrap")}
        tag="div"
      >
        <Text content={role} />
        <_Builtin.Block tag="div">{slotBadges}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cjc-detail-wrap")}
        tag="div"
      >
        <TextWithIcon
          textContent={textRoleCategory}
          iconName="corporate_fare"
          iconWeight="medium"
          color="neutral"
        />
        <TextWithIcon
          textContent={textLocation}
          iconName="location_on"
          iconWeight="medium"
          color="neutral"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "cjc-icon-btn-wrap")}
          tag="div"
        >
          <IconButtonSoft
            onClickButton={onClickJob}
            iconName="arrow_outward"
            color="neutral"
            size="1"
          />
          {isLinkOffVisible ? (
            <_Builtin.Block tag="div">
              <IconButtonSoft
                onClickButton={onClickLinkOff}
                iconName="link_off"
                color="error"
                size="1"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
