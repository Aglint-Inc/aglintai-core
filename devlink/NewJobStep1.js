import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NewJobStep1.module.css";

export function NewJobStep1({
  as: _Component = _Builtin.Block,
  slotForm,
  isJobHeaderVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "job-sidebar-main-block", "cj-step-1")}
      tag="div"
    >
      {isJobHeaderVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cj-top-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-lg",
              "fw-semibold",
              "text-grey-600"
            )}
            tag="div"
          >
            {"Step 1: Basic Job Information"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {
              "Fill in the necessary fields to describe the job you're offering."
            }
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-main-wrapper")}
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
