import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./KeySkills.module.css";

export function KeySkills({
  as: _Component = _Builtin.Block,
  textKeySkills = "Javascript",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "label-global", "rounded-rect", "blue-200")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {textKeySkills}
      </_Builtin.Block>
    </_Component>
  );
}
