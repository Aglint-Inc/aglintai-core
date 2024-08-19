"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./AssignedNameCard.module.css";

export function AssignedNameCard({
  as: _Component = _Builtin.Block,
  slotImage,
  textName = "This is a global text component",
  textRole = "This is a global text component",
}) {
  return (
    <_Component className={_utils.cx(_styles, "assigned-to-wrapper")} tag="div">
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
    </_Component>
  );
}
