import React from "react";
import * as _Builtin from "./_Builtin";
import { SubMenu } from "./SubMenu";
import * as _utils from "./utils";
import _styles from "./SublinkSubMenu.module.css";

export function SublinkSubMenu({
  as: _Component = _Builtin.Block,
  textLink = "User Info",
  slotSubMenu,
  isActive = false,
  isMuted = false,
  onClickLink = {},
  isSubMenuVisible = false,
  isBetaVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "nav-sub-link-menu", "sub-menu")}
      tag="div"
    >
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "bg-active-link")}
          tag="div"
        />
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-709")}
        tag="div"
        {...onClickLink}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "nav-sublink-text")}
          tag="div"
        >
          {textLink}
        </_Builtin.Block>
        {isBetaVisible ? (
          <_Builtin.Block className={_utils.cx(_styles, "beta-wrap")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xsm")}
              tag="div"
            >
              {"Beta"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isMuted ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-710")}
          tag="div"
        />
      ) : null}
      {isSubMenuVisible ? (
        <_Builtin.Block className={_utils.cx(_styles, "nav-sub-sub")} tag="div">
          {slotSubMenu ?? <SubMenu />}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
