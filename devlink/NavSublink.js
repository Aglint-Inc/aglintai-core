import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NavSublink.module.css";

export function NavSublink({
  as: _Component = _Builtin.Block,
  isActive = false,
  textLink = "User Info",
  onClickNav = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "nav-sub-link-menu")}
      tag="div"
      {...onClickNav}
    >
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "bg-active-link")}
          tag="div"
        />
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "nav-sublink-text")}
        tag="div"
      >
        {textLink}
      </_Builtin.Block>
    </_Component>
  );
}
