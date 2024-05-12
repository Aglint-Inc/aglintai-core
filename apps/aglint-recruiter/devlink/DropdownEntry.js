import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DropdownEntry.module.css";

export function DropdownEntry({
  as: _Component = _Builtin.Block,
  isNeutral = false,
  isPositive = false,
  isNegative = false,
  entryText = "Entry to Senior-Level Professionals",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "ratings-details-tag-block")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "", "text-block-21")}
        tag="div"
      >
        {entryText}
      </_Builtin.Block>
      {isNeutral ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "entries-blue-bg")}
          tag="div"
        />
      ) : null}
      {isPositive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "entries-green-bg")}
          tag="div"
        />
      ) : null}
      {isNegative ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "entries-red-bg")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
