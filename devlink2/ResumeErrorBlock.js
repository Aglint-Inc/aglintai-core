import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ResumeErrorBlock.module.css";

export function ResumeErrorBlock({
  as: _Component = _Builtin.Block,
  onclickView = {},
  slotLottie,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cl-resume-error-block")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cl-res-error-lottie-block")}
        tag="div"
      >
        {slotLottie}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cl-res-error-body")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text-grey-600")}
          tag="div"
        >
          {"Fething candidate details from resume"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {"This may take a while."}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
