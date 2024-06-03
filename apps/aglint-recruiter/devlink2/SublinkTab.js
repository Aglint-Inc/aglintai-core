"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./SublinkTab.module.css";

export function SublinkTab({
  as: _Component = _Builtin.Block,
  text = "Sublink Text",
  isActtive = false,
  onClickTab = {},
  slotSubLinkSubMenu,
  isSubMenuVisible = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "side_sublink")}
      tag="div"
      {...onClickTab}
    >
      <Text content={text} color="" weight="medium" />
      {isSubMenuVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1220", "cursor-none")}
          tag="div"
        >
          {slotSubLinkSubMenu}
        </_Builtin.Block>
      ) : null}
      {isActtive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "active_sublink")}
          tag="div"
        >
          <Text content={text} color="" weight="medium" />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
