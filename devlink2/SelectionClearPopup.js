import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SelectionClearPopup.module.css";

export function SelectionClearPopup({
  as: _Component = _Builtin.Block,
  slotButtons,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cl-select-clear-popup")}
      tag="div"
    >
      <_Builtin.Block tag="div">
        <_Builtin.Span className={_utils.cx(_styles, "fw-semibold")}>
          {"Do you want to proceed?"}
        </_Builtin.Span>
        <br />
        {"‍"}
        <br />
        <_Builtin.Span className={_utils.cx(_styles, "text-gray-600")}>
          {
            "By proceeding navigation to the other page, selected candidates will be deselected."
          }
        </_Builtin.Span>
        <br />
        {"‍"}
        <br />
        {""}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "flex-h", "align-end", "gap-16")}
        tag="div"
      >
        {slotButtons}
      </_Builtin.Block>
    </_Component>
  );
}
