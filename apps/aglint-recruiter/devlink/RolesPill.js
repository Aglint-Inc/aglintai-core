"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./RolesPill.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1570":{"id":"e-1570","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-607","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1571"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b0b624ad-6560-5d17-4315-cf5001976582","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b0b624ad-6560-5d17-4315-cf5001976582","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1717155934007},"e-1571":{"id":"e-1571","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-608","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1570"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b0b624ad-6560-5d17-4315-cf5001976582","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b0b624ad-6560-5d17-4315-cf5001976582","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1717155934009}},"actionLists":{"a-607":{"id":"a-607","title":"roles close hover in","actionItemGroups":[{"actionItems":[{"id":"a-607-n","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".role-close-wrap","selectorGuids":["96ab513d-6349-2e8a-da2e-9477ce180b5e"]},"xValue":1,"yValue":1,"locked":true}}]},{"actionItems":[{"id":"a-607-n-2","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".role-close-wrap","selectorGuids":["96ab513d-6349-2e8a-da2e-9477ce180b5e"]},"xValue":1.2,"yValue":1.2,"locked":true}}]}],"useFirstGroupAsInitialState":true,"createdOn":1717155937711},"a-608":{"id":"a-608","title":"roles close hover out","actionItemGroups":[{"actionItems":[{"id":"a-608-n-2","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".role-close-wrap","selectorGuids":["96ab513d-6349-2e8a-da2e-9477ce180b5e"]},"xValue":1,"yValue":1,"locked":true}}]}],"useFirstGroupAsInitialState":false,"createdOn":1717155937711}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function RolesPill({
  as: _Component = _Builtin.Block,
  textRoles = "CSS",
  onClickRemoveRoles = {},
  isCloseIconVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "", "cj-suggested-roles-block")}
      data-w-id="b0b624ad-6560-5d17-4315-cf5001976582"
      tag="div"
    >
      <Text content={textRoles} size="2" color="neutral-11" weight="regular" />
      {isCloseIconVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "role-close-wrap")}
          tag="div"
          {...onClickRemoveRoles}
        >
          <GlobalIcon iconName="close" weight="thin" size="4" />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
