"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./UserPasswordChange.module.css";

export function UserPasswordChange({
  as: _Component = _Builtin.Block,
  slotPassword,
  slotSavePassword,
}) {
  return (
    <_Component className={_utils.cx(_styles, "change-email-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-header-wrappers")}
        tag="div"
      >
        <Text content="Password Update" weight="medium" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-password-form")}
        tag="div"
      >
        {slotPassword ?? <SlotComp componentName="slotForm" />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "flex-horizontal", "mt-2")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          {slotSavePassword ?? <SlotComp componentName="slotButton" />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
