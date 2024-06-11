"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { WidgetPanelCard } from "./WidgetPanelCard";
import * as _utils from "./utils";
import _styles from "./WidgetFlexRow.module.css";

export function WidgetFlexRow({
  as: _Component = _Builtin.Block,
  slorWidgetIndividual,
}) {
  return (
    <_Component className={_utils.cx(_styles, "widget_flex")} tag="div">
      {slorWidgetIndividual ?? (
        <>
          <WidgetPanelCard />
          <WidgetPanelCard />
        </>
      )}
    </_Component>
  );
}
