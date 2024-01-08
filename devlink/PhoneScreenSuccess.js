import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./PhoneScreenSuccess.module.css";

export function PhoneScreenSuccess({
  as: _Component = _Builtin.Block,
  slotLogo,
  slotLottie,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-672")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-lgo-phone")}
        tag="div"
      >
        {slotLogo}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "submitted-success")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotLottie}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "text-green-600",
            "text-lg-default",
            "fw-semibold"
          )}
          tag="div"
        >
          {"Form submitted successfully."}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600", "mt-15")}
          tag="div"
        >
          {"Thank you for taking your time. We will get back to you shortly"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
