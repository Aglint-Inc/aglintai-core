"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./RecentRescheduleList.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-95":{"id":"e-95","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-70","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-96"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d0086500-dc7e-dd71-8fe3-288597e9f57e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d0086500-dc7e-dd71-8fe3-288597e9f57e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724081306285},"e-96":{"id":"e-96","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-71","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-95"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d0086500-dc7e-dd71-8fe3-288597e9f57e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d0086500-dc7e-dd71-8fe3-288597e9f57e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724081306285},"e-97":{"id":"e-97","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-70","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-98"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f51aea9e-3a98-2b3d-2e1f-0f944d5a8544","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f51aea9e-3a98-2b3d-2e1f-0f944d5a8544","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724081457351},"e-98":{"id":"e-98","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-71","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-97"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f51aea9e-3a98-2b3d-2e1f-0f944d5a8544","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f51aea9e-3a98-2b3d-2e1f-0f944d5a8544","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724081457352}},"actionLists":{"a-70":{"id":"a-70","title":"InterviewModuleStats Hover in","actionItemGroups":[{"actionItems":[{"id":"a-70-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-link-accent","selectorGuids":["a85fc437-c602-315b-c2b1-78c6c5d35b85"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-70-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-link-accent","selectorGuids":["a85fc437-c602-315b-c2b1-78c6c5d35b85"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1724081311765},"a-71":{"id":"a-71","title":"InterviewModuleStats Hover out","actionItemGroups":[{"actionItems":[{"id":"a-71-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-link-accent","selectorGuids":["a85fc437-c602-315b-c2b1-78c6c5d35b85"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1724081311765}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function RecentRescheduleList({
  as: _Component = _Builtin.Block,
  slotImage,
  textName = "Kristin Watson",
  textTime = "10 Min ago",
  textDesc = "Medical Emergency ",
  slotIcon,
  onClickView = {},
  onClickCandidate = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "recentrechedule_list")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "reson_rwap")}
        tag="div"
        {...onClickCandidate}
      >
        <_Builtin.Block className={_utils.cx(_styles, "avatar_40")} tag="div">
          {slotImage ?? (
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d6e2cb5b27ca42119ddbb3_you.jpg"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "flex-v4")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "decline_user_details")}
            tag="div"
          >
            <Text content={textName} />
            <Text content={textTime} weight="" color="neutral" size="1" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "decline_reason")}
            tag="div"
          >
            <Text content={textDesc} weight="" color="neutral" />
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_for_icon")}
              tag="div"
            >
              {slotIcon}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-link-accent")}
        tag="div"
        {...onClickView}
      >
        {"View"}
      </_Builtin.Block>
    </_Component>
  );
}
