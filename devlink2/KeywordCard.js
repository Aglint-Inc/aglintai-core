import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./KeywordCard.module.css";

export function KeywordCard({
  as: _Component = _Builtin.Block,
  textTitle = "Free",
  isTextWarningVisible = true,
  slotSuggestPill,
  slotInput,
  textWarning = "If these keywords are detected in a calendar event title, interviews booked over or overlapping these events will not be counted as a scheduling conflict.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1166")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {textTitle}
      </_Builtin.Block>
      {isTextWarningVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1167")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-yellow-800")}
            tag="div"
          >
            {textWarning}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1168")}
        tag="div"
      >
        {slotSuggestPill}
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotInput}</_Builtin.Block>
    </_Component>
  );
}
