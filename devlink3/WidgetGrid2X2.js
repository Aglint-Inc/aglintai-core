import React from "react";
import * as _Builtin from "./_Builtin";
import { WidgetUserCard } from "./WidgetUserCard";
import { WidgetJobCard } from "./WidgetJobCard";
import * as _utils from "./utils";
import _styles from "./WidgetGrid2X2.module.css";

export function WidgetGrid2X2({ as: _Component = _Builtin.Block, slotWidget }) {
  return (
    <_Component className={_utils.cx(_styles, "widget_flex2-2")} tag="div">
      {slotWidget ?? (
        <>
          <WidgetUserCard />
          <WidgetJobCard />
        </>
      )}
    </_Component>
  );
}
