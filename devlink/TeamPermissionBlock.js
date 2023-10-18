import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TeamPermissionBlock.module.css";

export function TeamPermissionBlock({
  as: _Component = _Builtin.Block,
  isEnabled = false,
  description = "Can send interview links to candidates",
  slotToggle,
}) {
  return (
    <_Component className={_utils.cx(_styles, "aur-option-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "aur-option-info-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "aur-option-indicator-wrapper")}
          tag="div"
        >
          {isEnabled ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "aur-option-indicator")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{description}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotToggle}</_Builtin.Block>
    </_Component>
  );
}
