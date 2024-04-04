import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonPrimaryOutlinedRegular } from "./ButtonPrimaryOutlinedRegular";
import * as _utils from "./utils";
import _styles from "./EnableInterviewPlan.module.css";

export function EnableInterviewPlan({
  as: _Component = _Builtin.Block,
  onClickEnableInterviewPlan = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "enable-interview-wrap")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"Optimize Your Interviews with our Interview Plan"}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "text-grey_600")} tag="div">
        {
          "Enable Interview Plan simplifies and enhances your interview process. Customizable plans, streamlined scheduling, and collaborative features ensure you find the perfect candidates efficiently."
        }
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "mt-10")}
        tag="div"
        {...onClickEnableInterviewPlan}
      >
        <ButtonPrimaryOutlinedRegular buttonText="Enable Interview Plan" />
      </_Builtin.Block>
    </_Component>
  );
}
