import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./BackButton.module.css";

export function BackButton({
  as: _Component = _Builtin.Block,
  onclickProps = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "aui-button", "signup-back")}
      tag="div"
      {...onclickProps}
    >
      <_Builtin.Block className={_utils.cx(_styles, "text-grey-600")} tag="div">
        {"Back"}
      </_Builtin.Block>
    </_Component>
  );
}
