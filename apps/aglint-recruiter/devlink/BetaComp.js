import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./BetaComp.module.css";

export function BetaComp({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "beta-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "text-xsm")} tag="div">
        {"Beta"}
      </_Builtin.Block>
    </_Component>
  );
}
