import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TemplateName.module.css";

export function TemplateName({
  as: _Component = _Builtin.Block,
  textName = "Template 2",
  onClickName = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "pointer")}
      tag="div"
      {...onClickName}
    >
      {textName}
    </_Component>
  );
}
