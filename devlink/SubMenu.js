import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SubMenu.module.css";

export function SubMenu({
  as: _Component = _Builtin.Block,
  textSubMenu = "Settings",
  isActive = false,
  onClickMenu = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "relative", "mt-12")}
      tag="div"
      {...onClickMenu}
    >
      <_Builtin.Block className={_utils.cx(_styles, "text-block-31")} tag="div">
        {textSubMenu}
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "active-text-sub")}
          tag="div"
        >
          {textSubMenu}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
