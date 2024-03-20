import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SubLinkSubMenu.module.css";

export function SubLinkSubMenu({
  as: _Component = _Builtin.Block,
  isActive = true,
  textSubMenu = "Keywords",
  onClickSubMenu = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1222", "cursor-pointer")}
      tag="div"
      {...onClickSubMenu}
    >
      <_Builtin.Block tag="div">{textSubMenu}</_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1221")}
          tag="div"
        >
          <_Builtin.Block tag="div">{textSubMenu}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
