import React from "react";
import * as _Builtin from "./_Builtin";
import { PanelDetailTableHeaderRow } from "./PanelDetailTableHeaderRow";
import { PanelDetailMemberRow } from "./PanelDetailMemberRow";
import * as _utils from "./utils";
import _styles from "./PanelDetailTable.module.css";

export function PanelDetailTable({
  as: _Component = _Builtin.Block,
  slotPanelMemberRow,
}) {
  return (
    <_Component className={_utils.cx(_styles, "team_detail_table")} tag="div">
      {slotPanelMemberRow ?? (
        <>
          <PanelDetailTableHeaderRow />
          <PanelDetailMemberRow />
        </>
      )}
    </_Component>
  );
}
