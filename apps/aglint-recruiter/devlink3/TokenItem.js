"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalBadge } from "./GlobalBadge";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./TokenItem.module.css";

export function TokenItem({
  as: _Component = _Builtin.Block,
  slotBadge,
  textTokenDetail = "Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "token-table-body-item")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "token-sttus-badge-wrap")}
        id={_utils.cx(
          _styles,
          "w-node-_09a3954e-9934-f0de-f9b4-8b522528b8d1-2528b8d0"
        )}
        tag="div"
      >
        {slotBadge ?? <GlobalBadge />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "token-sttus-badge-wrap")}
        id={_utils.cx(
          _styles,
          "w-node-_09a3954e-9934-f0de-f9b4-8b522528b8d3-2528b8d0"
        )}
        tag="div"
      >
        <Text content={textTokenDetail} weight="regular" />
      </_Builtin.Block>
    </_Component>
  );
}
