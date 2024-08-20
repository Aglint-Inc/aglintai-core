"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { IconButtonSoft } from "./IconButtonSoft";
import * as _utils from "./utils";
import _styles from "./AssignedNameCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-203":{"id":"e-203","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-125","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-204"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"4e4e7b9f-7e54-3ee0-01ce-0157d9979e71"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724072086809},"e-204":{"id":"e-204","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-126","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-203"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"4e4e7b9f-7e54-3ee0-01ce-0157d9979e71"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724072086809},"e-205":{"id":"e-205","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-127","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-206"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"7ea31604-439d-38ac-7075-c2697801e616"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724133718643},"e-206":{"id":"e-206","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-128","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-205"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"7ea31604-439d-38ac-7075-c2697801e616"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724133718643}},"actionLists":{"a-125":{"id":"a-125","title":"AssignedNameCard  Hover in","actionItemGroups":[{"actionItems":[{"id":"a-125-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slot-anc-right-wrap","selectorGuids":["cf1a4dd1-f5d7-10b2-194e-ce7093f0016f"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-125-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-anc-right-wrap","selectorGuids":["cf1a4dd1-f5d7-10b2-194e-ce7093f0016f"]},"value":1,"unit":""}}]}],"createdOn":1724067127508,"useFirstGroupAsInitialState":true},"a-126":{"id":"a-126","title":"AssignedNameCard  Hover out","actionItemGroups":[{"actionItems":[{"id":"a-126-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-anc-right-wrap","selectorGuids":["cf1a4dd1-f5d7-10b2-194e-ce7093f0016f"]},"value":0,"unit":""}}]}],"createdOn":1724067127508,"useFirstGroupAsInitialState":false},"a-127":{"id":"a-127","title":"AssignedNameCard  Hover in 2","actionItemGroups":[{"actionItems":[{"id":"a-127-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slot-anc-right-wrap","selectorGuids":["cf1a4dd1-f5d7-10b2-194e-ce7093f0016f"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-127-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-anc-right-wrap","selectorGuids":["cf1a4dd1-f5d7-10b2-194e-ce7093f0016f"]},"value":1,"unit":""}}]}],"createdOn":1724067127508,"useFirstGroupAsInitialState":true},"a-128":{"id":"a-128","title":"AssignedNameCard  Hover out 2","actionItemGroups":[{"actionItems":[{"id":"a-128-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-anc-right-wrap","selectorGuids":["cf1a4dd1-f5d7-10b2-194e-ce7093f0016f"]},"value":0,"unit":""}}]}],"createdOn":1724067127508,"useFirstGroupAsInitialState":false}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AssignedNameCard({
  as: _Component = _Builtin.Block,
  slotImage,
  textName = "This is a global text component",
  textRole = "This is a global text component",
  onClickCard = {},
  isEditVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "assigned-to-wrapper")}
      data-w-id="4e4e7b9f-7e54-3ee0-01ce-0157d9979e71"
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block className={_utils.cx(_styles, "anc-left-wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-image-req-detail")}
          tag="div"
        >
          {slotImage}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "assigedn-req-detail")}
          tag="div"
        >
          <Text content={textName} weight="medium" />
          <Text content={textRole} weight="regular" color="neutral" />
        </_Builtin.Block>
      </_Builtin.Block>
      {isEditVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-anc-right-wrap")}
          tag="div"
        >
          <IconButtonSoft size="1" color="neutral" iconName="edit_square" />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
