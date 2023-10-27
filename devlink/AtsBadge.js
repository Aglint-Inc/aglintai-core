import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AtsBadge.module.css";

export function AtsBadge({ as: _Component = _Builtin.Block, slotLogo }) {
  return (
    <_Component className={_utils.cx(_styles, "ats-badge")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-ats-log-badge")}
        tag="div"
      >
        {slotLogo}
      </_Builtin.Block>
    </_Component>
  );
}
