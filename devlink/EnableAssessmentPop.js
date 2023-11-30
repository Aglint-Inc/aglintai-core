import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonPrimaryRegular } from "./ButtonPrimaryRegular";
import * as _utils from "./utils";
import _styles from "./EnableAssessmentPop.module.css";

export function EnableAssessmentPop({
  as: _Component = _Builtin.Block,
  onClickCancel = {},
  onClickEnable = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "pop-enable-assessment")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"Are you sure you want to enable assessment"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "button-wrappers-enable")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cursor-pointer")}
          tag="div"
          {...onClickCancel}
        >
          {"Cancel"}
        </_Builtin.Block>
        <_Builtin.Block tag="div" {...onClickEnable}>
          <ButtonPrimaryRegular textLabel="Yes, Enable" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
