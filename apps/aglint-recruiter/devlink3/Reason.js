"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./Reason.module.css";

export function Reason({
  as: _Component = _Builtin.Block,
  slotReasonDropdown,
  slotReasonGraph,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "reason-outer-wrap")}
      id={_utils.cx(
        _styles,
        "w-node-c05658ea-f227-231f-ec49-03a32c86500a-2c86500a"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "reason-header-wrap")}
        tag="div"
      >
        <Text content="" weight="medium" />
        <_Builtin.Block tag="div">
          {slotReasonDropdown ?? <SlotComp componentNeme="dropdown" />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "lot_graph")} tag="div">
        {slotReasonGraph ?? (
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/6660397895ca29e654ada47b_Frame.png"
          />
        )}
      </_Builtin.Block>
    </_Component>
  );
}
