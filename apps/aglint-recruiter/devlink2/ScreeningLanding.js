"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ScreeningLandingCard } from "./ScreeningLandingCard";
import * as _utils from "./utils";
import _styles from "./ScreeningLanding.module.css";

export function ScreeningLanding({
  as: _Component = _Builtin.Block,
  slotScreeningLandingCard,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "screening-landing-wrap")}
      tag="div"
    >
      {slotScreeningLandingCard ?? <ScreeningLandingCard />}
    </_Component>
  );
}
