"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./WorkflowRadioItem.module.css";

export function WorkflowRadioItem({
  as: _Component = _Builtin.Block,
  onClick = {},
  isChecked = false,
  slotScore,
  radioText = "Move all new applicants to the interview state.",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "radio-button-wrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "flex-hor-left", "center-align", "gap-6")}
        tag="div"
        {...onClick}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "radio-wrapper")}
          tag="div"
          {...onClick}
        >
          {isChecked ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%231F73B7%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{radioText}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "_wf-radio-range-wrapper")}
        tag="div"
      >
        {slotScore}
      </_Builtin.Block>
    </_Component>
  );
}
