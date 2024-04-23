import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Keywords.module.css";

export function Keywords({
  as: _Component = _Builtin.Block,
  slotKeywordsCard,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1228")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1231")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Keywords"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {
            "Keywords allow you to identify events on interviewer’s calendars that can be scheduled over by either you or a candidate when booking interviews."
          }
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1229")}
        tag="div"
      >
        {slotKeywordsCard}
      </_Builtin.Block>
    </_Component>
  );
}
