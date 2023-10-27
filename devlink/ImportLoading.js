import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ImportLoading.module.css";

export function ImportLoading({
  as: _Component = _Builtin.Block,
  slotImportLottie,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "ic-import-loader-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ic-loader-lottie-block")}
        tag="div"
      >
        {slotImportLottie}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-grey-600-3")}
        tag="div"
      >
        {"Importing files.."}
      </_Builtin.Block>
    </_Component>
  );
}
