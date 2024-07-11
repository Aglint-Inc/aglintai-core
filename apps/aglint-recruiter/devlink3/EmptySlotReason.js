"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./EmptySlotReason.module.css";

export function EmptySlotReason({
  as: _Component = _Builtin.Block,
  iconName = "shapes",
  textMain = "This is a global text component",
  textSub = "This is a global text component",
  color = "neutral-12",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "schedule_empty_reason")}
      id={_utils.cx(
        _styles,
        "w-node-_1d3a1dd1-92de-9b26-298e-c17144a98a0a-44a98a0a"
      )}
      tag="div"
    >
      <TextWithIcon
        iconName={iconName}
        textContent={textMain}
        color={color}
        iconSize="5"
        fontWeight="medium"
        iconWeight="medium"
      />
      <Text content={textSub} weight="regular" color="neutral" />
    </_Component>
  );
}
