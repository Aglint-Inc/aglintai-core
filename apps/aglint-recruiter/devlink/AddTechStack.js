"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./AddTechStack.module.css";

export function AddTechStack({
  as: _Component = _Builtin.Block,
  slotTechPills,
  slotInput,
  slotButton,
  slotClose,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "available-roles-pop-wrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "avilable-pop-up-header")}
        tag="div"
      >
        <Text content="Add Specialities" weight="medium" />
        <_Builtin.Block tag="div">{slotClose}</_Builtin.Block>
      </_Builtin.Block>
      <Text
        color="neutral"
        content="Choose from the list or type your own and press enter"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-roles-wrappers")}
        tag="div"
      >
        {slotTechPills ?? <SlotComp componentName="slot for Pills" />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-input-fomrs-roles")}
        tag="div"
      >
        {slotInput ?? <SlotComp componentName="slot for MUI Input" />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "roles-btn-wrap")}
        tag="div"
      >
        {slotButton}
      </_Builtin.Block>
    </_Component>
  );
}
