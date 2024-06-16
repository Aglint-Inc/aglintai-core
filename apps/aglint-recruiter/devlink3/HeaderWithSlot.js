"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./HeaderWithSlot.module.css";

export function HeaderWithSlot({
  as: _Component = _Builtin.Block,
  isCoordinatorVisible = true,
  slotCoordinators,
  textHeading = "Co-ordinator",
}) {
  return isCoordinatorVisible ? (
    <_Component
      className={_utils.cx(_styles, "sto-column-left-subwrap")}
      tag="div"
    >
      <Text content={textHeading} />
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1426")}
        tag="div"
      >
        {slotCoordinators ?? <SlotComp componentNeme="Candiate" />}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
