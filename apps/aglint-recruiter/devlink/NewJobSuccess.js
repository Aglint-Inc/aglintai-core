import React from "react";
import * as _Builtin from "./_Builtin";
import { IconCheckCircle } from "./IconCheckCircle";
import { ButtonOutlinedRegular } from "./ButtonOutlinedRegular";
import * as _utils from "./utils";
import _styles from "./NewJobSuccess.module.css";

export function NewJobSuccess({
  as: _Component = _Builtin.Block,
  onClickViewJob = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "job-sidebar-main-block", "success")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-main-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "auth-header-block", "create-job")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-267")}
            tag="div"
          >
            <IconCheckCircle />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-266", "succes")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-lg", "fw-semibold")}
              tag="div"
            >
              {"Job created successfully 🎉"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "success-para-wrappers")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "ju-header-description",
                  "text-align-center"
                )}
                tag="div"
              >
                {
                  "You're All Set! Let us handle the heavy lifting while you focus on what matters most."
                }
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ju-header-description")}
                tag="div"
              >
                {"You'll start receiving candidate matches soon."}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "button-view-job-wrappers")}
            tag="div"
            {...onClickViewJob}
          >
            <ButtonOutlinedRegular textLabel="View Job" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
