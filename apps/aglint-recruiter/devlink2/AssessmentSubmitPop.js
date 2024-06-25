"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AssessmentSubmitPop.module.css";

export function AssessmentSubmitPop({
  as: _Component = _Builtin.Block,
  onClickCancel = {},
  onClickSubmit = {},
  isLoading = false,
  slotLoader,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "submit-assessment-pop")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-990")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {"Submit Assessment"}
        </_Builtin.Block>
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "cursor-pointer")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2216%22%20viewbox%3D%220%200%2012%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.7812%204.28125L7.0625%208L10.7812%2011.7188C11.0729%2012.0729%2011.0729%2012.4271%2010.7812%2012.7812C10.4271%2013.0729%2010.0729%2013.0729%209.71875%2012.7812L6%209.0625L2.28125%2012.7812C1.92708%2013.0729%201.57292%2013.0729%201.21875%2012.7812C0.927083%2012.4271%200.927083%2012.0729%201.21875%2011.7188L4.9375%208L1.21875%204.28125C0.927083%203.92708%200.927083%203.57292%201.21875%203.21875C1.57292%202.92708%201.92708%202.92708%202.28125%203.21875L6%206.9375L9.71875%203.21875C10.0729%202.92708%2010.4271%202.92708%2010.7812%203.21875C11.0729%203.57292%2011.0729%203.92708%2010.7812%204.28125Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickCancel}
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "text-grey-600")} tag="div">
        {
          "By clicking submit, you will be submitting your answers for this assessment. Please ensure that you have answered all questions correctly before proceeding"
        }
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-991")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "wide_button")}
          tag="div"
          {...onClickCancel}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "button_primary", "greay_btn")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Cancel"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "wide_button")} tag="div">
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "button_primary",
              "is_enabled",
              "main-green"
            )}
            tag="div"
            {...onClickSubmit}
          >
            <_Builtin.Block tag="div">{"Submit Assessment"}</_Builtin.Block>
          </_Builtin.Block>
          {isLoading ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "button_primary", "is_loading")}
              tag="div"
            >
              <_Builtin.Block tag="div">{slotLoader}</_Builtin.Block>
              <_Builtin.Block tag="div">{"Loading.."}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
