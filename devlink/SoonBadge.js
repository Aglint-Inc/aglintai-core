import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SoonBadge.module.css";

export function SoonBadge({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "soon-nav-badge")} tag="div">
      <_Builtin.Block tag="div">{"Soon"}</_Builtin.Block>
    </_Component>
  );
}
