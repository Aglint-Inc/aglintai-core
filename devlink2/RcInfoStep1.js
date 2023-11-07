import React from "react";
import * as _Builtin from "./_Builtin";
import { RcLoading } from "./RcLoading";
import { RcInfoForm } from "./RcInfoForm";
import * as _utils from "./utils";
import _styles from "./RcInfoStep1.module.css";

export function RcInfoStep1({
  as: _Component = _Builtin.Block,
  slotInput,
  slotDetails,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "sl-company-details-wrapper", "gap-30")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "sl-login-header-block", "gap-12")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {"Welcome to Aglint for Employers! 🚀"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {
            "Enter your company website URL, and our system will automatically fetch the necessary details to set up your company profile. Let's dive in!"
          }
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-386")} tag="div">
        {slotInput}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-387")} tag="div">
        {slotDetails ?? (
          <>
            <RcLoading />
            <RcInfoForm />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
