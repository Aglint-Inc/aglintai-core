"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./RecentDeclines.module.css";

export function RecentDeclines({
  as: _Component = _Builtin.Block,
  slotRecentDeclineList,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "recent-decline")}
      id={_utils.cx(
        _styles,
        "w-node-e807e2a0-b827-0170-96a2-8f8d0a3764a4-0a3764a4"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "reschedule-req-header")}
        tag="div"
      >
        <Text content="" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1782")}
        tag="div"
      >
        {slotRecentDeclineList ?? (
          <SlotComp componentNeme="RecentDeclineList" />
        )}
      </_Builtin.Block>
    </_Component>
  );
}
