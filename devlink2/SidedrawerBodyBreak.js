import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SidedrawerBodyBreak.module.css";

export function SidedrawerBodyBreak({
  as: _Component = _Builtin.Block,
  slotDurationDropdown,
}) {
  return (
    <_Component className={_utils.cx(_styles, "sidedrawer_session")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "input_and_label")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Break Duration"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_input_field")}
          tag="div"
        >
          {slotDurationDropdown ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_inputfield")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Break Duration"}</_Builtin.Block>
            </_Builtin.Block>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
