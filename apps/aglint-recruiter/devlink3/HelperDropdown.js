"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import { InterviewLoadHelper } from "./InterviewLoadHelper";
import { KeywordsHelper } from "./KeywordsHelper";
import * as _utils from "./utils";
import _styles from "./HelperDropdown.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-101":{"id":"e-101","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-74","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-102"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"35aa770c-9a91-6a64-44e1-e2ba2e1c6ae7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"35aa770c-9a91-6a64-44e1-e2ba2e1c6ae7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724217946733},"e-102":{"id":"e-102","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-75","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-101"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"35aa770c-9a91-6a64-44e1-e2ba2e1c6ae7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"35aa770c-9a91-6a64-44e1-e2ba2e1c6ae7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724217946733}},"actionLists":{"a-74":{"id":"a-74","title":"DropdownHelper OnClick 1","actionItemGroups":[{"actionItems":[{"id":"a-74-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"35aa770c-9a91-6a64-44e1-e2ba2e1c6ae7"},"widthValue":100,"heightValue":44,"widthUnit":"%","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-74-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"outExpo","duration":900,"target":{"useEventTarget":true,"id":"35aa770c-9a91-6a64-44e1-e2ba2e1c6ae7"},"widthValue":100,"widthUnit":"%","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1724217950110},"a-75":{"id":"a-75","title":"DropdownHelper OnClick 2","actionItemGroups":[{"actionItems":[{"id":"a-75-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"outExpo","duration":600,"target":{"useEventTarget":true,"id":"35aa770c-9a91-6a64-44e1-e2ba2e1c6ae7"},"widthValue":100,"heightValue":44,"widthUnit":"%","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1724217950110}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function HelperDropdown({
  as: _Component = _Builtin.Block,
  slotBody,
  textName = "This is a global text component",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "dropdown-helper-wrap")}
      data-w-id="35aa770c-9a91-6a64-44e1-e2ba2e1c6ae7"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "dropdown-toggle-wrap")}
        tag="div"
      >
        <Text content={textName} />
        <_Builtin.Block tag="div">
          <GlobalIcon iconName="keyboard_double_arrow_down" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-dropdown-body-wrap")}
        tag="div"
      >
        {slotBody ?? (
          <>
            <InterviewLoadHelper />
            <KeywordsHelper />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
