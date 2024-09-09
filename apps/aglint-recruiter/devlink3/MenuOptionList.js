"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import * as _utils from "./utils";
import _styles from "./MenuOptionList.module.css";

export function MenuOptionList({
  as: _Component = _Builtin.Block,
  textOption = "Edit Job Details",
  iconName = "border_color",
  onClickMenu = {},
  textColor = "neutral-12",
  iconColor = "inherit",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "menu-option-lst-tab")}
      tag="div"
      {...onClickMenu}
    >
      <TextWithIcon
        textContent={textOption}
        iconName={iconName}
        color={textColor}
        iconColor={iconColor}
        iconSize="4"
        fontWeight="regular"
      />
    </_Component>
  );
}
