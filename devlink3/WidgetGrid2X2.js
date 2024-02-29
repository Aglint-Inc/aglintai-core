import React from "react";
import * as _Builtin from "./_Builtin";
import { WidgetUserCardWithCompany } from "./WidgetUserCardWithCompany";
import { WidgetJobCard } from "./WidgetJobCard";
import * as _utils from "./utils";
import _styles from "./WidgetGrid2X2.module.css";

export function WidgetGrid2X2({ as: _Component = _Builtin.Block, slotWidget }) {
  return (
    <_Component className={_utils.cx(_styles, "widget_flex2-2")} tag="div">
      {slotWidget ?? (
        <>
          <WidgetUserCardWithCompany />
          <WidgetUserCardWithCompany />
          <WidgetJobCard
            id={_utils.cx(
              _styles,
              "w-node-_4467e149-614d-28c4-e336-f248b16f562e-0f04e601"
            )}
          />
          <WidgetJobCard
            id={_utils.cx(
              _styles,
              "w-node-_5f5ead39-381b-e94c-7001-a12606c4afaf-0f04e601"
            )}
          />
        </>
      )}
    </_Component>
  );
}
