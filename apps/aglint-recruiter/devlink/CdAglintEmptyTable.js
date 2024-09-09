"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CdAglintEmptyTable.module.css";

export function CdAglintEmptyTable({
  as: _Component = _Builtin.Block,
  slotLottie,
}) {
  return (
    <_Component className={_utils.cx(_styles, "sac-empty-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "sac-empty")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "sac-empty-lottie")}
          tag="div"
        >
          {slotLottie}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sac-empty-desc-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {
              "Unable to fetch candidates for this query. Please edit the query."
            }
            <br />
            {""}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}