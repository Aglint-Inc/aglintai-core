import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TableBodyCell.module.css";

export function TableBodyCell({
  as: _Component = _Builtin.Block,
  slotTimeRanges,
  textSelectedCount = "1",
  isSelectedCell = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "table_body_cell")}
      id={_utils.cx(
        _styles,
        "w-node-c52da277-c925-7ed6-541f-cd820280171c-0280171c"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "table_body_cell_inner")}
        tag="div"
      >
        {slotTimeRanges ?? (
          <_Builtin.Block tag="div">{"No Slots Available"}</_Builtin.Block>
        )}
      </_Builtin.Block>
      {isSelectedCell ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "is_selected_cell")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "selected_numbers")}
            tag="div"
          >
            <_Builtin.Block tag="div">{textSelectedCount}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
