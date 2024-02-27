import React from "react";
import * as _Builtin from "./_Builtin";
import { AssessmentLevel } from "./AssessmentLevel";
import * as _utils from "./utils";
import _styles from "./SelectionPill.module.css";

export function SelectionPill({
  as: _Component = _Builtin.Block,
  isSelected = false,
  slotOption,
  onClickSelected = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "selction_pill")}
      tag="div"
      {...onClickSelected}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_selection_option")}
        tag="div"
      >
        {slotOption ?? <AssessmentLevel />}
      </_Builtin.Block>
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "selected_bg")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
