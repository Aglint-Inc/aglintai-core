import React from "react";
import * as _Builtin from "./_Builtin";
import { PanelDetailTitle } from "./PanelDetailTitle";
import { PanelDetailTable } from "./PanelDetailTable";
import * as _utils from "./utils";
import _styles from "./PanelDetail.module.css";

export function PanelDetail({
  as: _Component = _Builtin.Block,
  slotPanelDetail,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "team_detail_dashboard")}
      tag="div"
    >
      {slotPanelDetail ?? (
        <>
          <PanelDetailTitle
            textYearMonth="Januarry 2024"
            isSlotSelected={true}
          />
          <PanelDetailTable />
        </>
      )}
    </_Component>
  );
}
