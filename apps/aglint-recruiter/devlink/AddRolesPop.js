"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./AddRolesPop.module.css";

export function AddRolesPop({
  as: _Component = _Builtin.Block,
  slotInput,
  slotRolesPills,
  onClickCancel = {},
  slotButton,
  slotClose,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "available-roles-pop-wrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "add-roles-popup-header")}
        tag="div"
      >
        <Text weight="medium" content="Add Roles" />
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
        {slotRolesPills ?? <SlotComp componentName="Slot for Pills" />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-input-fomrs-roles")}
        tag="div"
      >
        {slotInput ?? <SlotComp componentName="Slot for MUI Input" />}
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
