"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import { TextWithIcon } from "./TextWithIcon";
import * as _utils from "./utils";
import _styles from "./GlobalInfo.module.css";

export function GlobalInfo({
  as: _Component = _Builtin.Block,
  textTitle = "How it works",
  textDescription = "The interview is complete. Click the button for requesting interviewer feedback.",
  color = "neutral",
  iconName = "info",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "global_banner")}
      id={_utils.cx(
        _styles,
        "w-node-_9e181cf5-d0b1-916e-4c75-8a5980c92532-80c92532"
      )}
      tag="div"
      data-banner-color={color}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "info_min_block")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "flex_v1")} tag="div">
          <_Builtin.Block className={_utils.cx(_styles, "flex-h")} tag="div">
            <GlobalIcon iconName={iconName} size="3" weight="" />
            <Text content={textTitle} />
          </_Builtin.Block>
          <Text content={textDescription} color="neutral" weight="" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
