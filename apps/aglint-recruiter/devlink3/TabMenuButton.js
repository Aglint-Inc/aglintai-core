import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TabMenuButton.module.css";

export function TabMenuButton({
  as: _Component = _Builtin.Block,
  textMenu = "TAB1",
  isButtonActive = true,
  onClickProps = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "text-tab-menu-wrap")}
      tag="div"
      {...onClickProps}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "fw-semibold", "relative-1")}
        tag="div"
      >
        {textMenu}
      </_Builtin.Block>
      {isButtonActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "active-tab-menu")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
