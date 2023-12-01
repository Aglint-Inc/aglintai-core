import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NewJobStep1.module.css";

export function NewJobStep1({
  as: _Component = _Builtin.Block,
  slotForm,
  isJobHeaderVisible = true,
  onClickProceed = {},
  isProceedButtonDisable = true,
  isAddJob = true,
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "job-sidebar-main-block",
        "cj-step-1",
        "height-auto"
      )}
      tag="div"
    >
      {isAddJob ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-507")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Job Details"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "color-grey-600")}
            tag="div"
          >
            {
              "Enter the baisc job details and write with AI or paste your job description and add required skills for this job role"
            }
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-main-wrapper", "height-auto")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-job-form-step-2")}
          tag="div"
        >
          {slotForm}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
