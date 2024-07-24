"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./TrainingSettingItem.module.css";

export function TrainingSettingItem({
  as: _Component = _Builtin.Block,
  slotImage,
  text = "This is a global text component",
}) {
  return (
    <_Component className={_utils.cx(_styles, "ts-bottom-list-item")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "ts-bottom-image-wrap")}
        tag="div"
      >
        {slotImage}
      </_Builtin.Block>
      <Text content={text} weight="regular" />
    </_Component>
  );
}
