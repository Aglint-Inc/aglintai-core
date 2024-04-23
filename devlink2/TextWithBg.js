import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TextWithBg.module.css";

export function TextWithBg({
  as: _Component = _Builtin.Block,
  text = "Product Designer",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1146")} tag="div">
      <_Builtin.Block tag="div">{text}</_Builtin.Block>
    </_Component>
  );
}
