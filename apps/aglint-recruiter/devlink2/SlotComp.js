"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./SlotComp.module.css";

export function SlotComp({
  as: _Component = _Builtin.Block,
  componentName = "Its a slot for ... (ask developer or check design)",
}) {
  return (
    <_Component className={_utils.cx(_styles, "slot-comp")} tag="div">
      <GlobalIcon iconName="shapes" size="4" weight="thin" color="accent-9" />
      <Text content={componentName} color="accent" weight="" highContrast="" />
    </_Component>
  );
}
