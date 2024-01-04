import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RcLoading.module.css";

export function RcLoading({ as: _Component = _Builtin.Block, slotLottie }) {
  return (
    <_Component
      className={_utils.cx(_styles, "sl-company-details-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "sl-login-loading-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "sl-login-lottie-block")}
          tag="div"
        >
          {slotLottie}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"Hold on. Fetching company details from the website"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
