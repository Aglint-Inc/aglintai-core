import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AddMoreResumeButton.module.css";

export function AddMoreResumeButton({
  as: _Component = _Builtin.Block,
  onClickButton = {},
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "button-outline-blue-600",
        "regular",
        "with-icon"
      )}
      tag="div"
      {...onClickButton}
    >
      <_Builtin.Block tag="div">{"Add More Resume"}</_Builtin.Block>
    </_Component>
  );
}
