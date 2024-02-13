import React from "react";

import _styles from "./PanelDetail.module.css";

import * as _Builtin from "./_Builtin";
import { PanelDetailTable } from "./PanelDetailTable";
import { PanelDetailTitle } from "./PanelDetailTitle";
import * as _utils from "./utils";

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
          <PanelDetailTitle textYearMonth="Januarry 2024" />
          <PanelDetailTable />
        </>
      )}
    </_Component>
  );
}
