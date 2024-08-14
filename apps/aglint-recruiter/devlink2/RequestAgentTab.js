"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./RequestAgentTab.module.css";

export function RequestAgentTab({
  as: _Component = _Builtin.Block,
  isTabActive = false,
  onClickTab = {},
  textTab = "Requests",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "ra-tab-pill")}
      tag="div"
      {...onClickTab}
    >
      <Text content={textTab} weight="regular" size="1" />
      {isTabActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "ra-tab-active")}
          tag="div"
        >
          <Text content={textTab} weight="regular" size="1" />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
