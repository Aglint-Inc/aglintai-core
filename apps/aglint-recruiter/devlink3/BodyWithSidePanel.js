"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./BodyWithSidePanel.module.css";

export function BodyWithSidePanel({
  as: _Component = _Builtin.Block,
  slotLeft,
  slotRight,
  isSlotright = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "body-withsidepanel")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "content_block")}
        id={_utils.cx(
          _styles,
          "w-node-eee9392c-208c-1edd-e093-14ad72e2dfc3-72e2dfc1"
        )}
        tag="div"
      >
        {slotLeft}
      </_Builtin.Block>
      {isSlotright ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "content_block", "right")}
          id={_utils.cx(
            _styles,
            "w-node-eee9392c-208c-1edd-e093-14ad72e2dfc2-72e2dfc1"
          )}
          tag="div"
        >
          {slotRight}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
