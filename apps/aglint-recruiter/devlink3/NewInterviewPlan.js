"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { NewInterviewPlanCard } from "./NewInterviewPlanCard";
import * as _utils from "./utils";
import _styles from "./NewInterviewPlan.module.css";

export function NewInterviewPlan({
  as: _Component = _Builtin.Block,
  slotNewInterviewPlanCard,
}) {
  return (
    <_Component className={_utils.cx(_styles, "new-interview-plan")} tag="div">
      {slotNewInterviewPlanCard ?? (
        <>
          <NewInterviewPlanCard />
          <NewInterviewPlanCard />
        </>
      )}
    </_Component>
  );
}
