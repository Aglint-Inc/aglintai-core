"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { PiplelineTab } from "./PiplelineTab";
import * as _utils from "./utils";
import _styles from "./InterviewStage.module.css";

export function InterviewStage({
  as: _Component = _Builtin.Block,
  slotPiplineTab,
  slotInterviewStage,
}) {
  return (
    <_Component className={_utils.cx(_styles, "tab-section")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "new-pipelines")} tag="div">
        {slotPiplineTab ?? (
          <>
            <PiplelineTab color="success" />
            <PiplelineTab color="info" isActive={true} />
            <PiplelineTab />
            <PiplelineTab isActive={false} />
          </>
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "prev-accordion")}
        id={_utils.cx(
          _styles,
          "w-node-f1488a90-6321-6b7f-1608-1737d62c9a4a-d62c9a44"
        )}
        tag="div"
      >
        {slotInterviewStage}
      </_Builtin.Block>
    </_Component>
  );
}
