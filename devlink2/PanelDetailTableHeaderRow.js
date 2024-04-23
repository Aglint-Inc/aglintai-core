import React from "react";
import * as _Builtin from "./_Builtin";
import { TableHeaderCell } from "./TableHeaderCell";
import * as _utils from "./utils";
import _styles from "./PanelDetailTableHeaderRow.module.css";

export function PanelDetailTableHeaderRow({
  as: _Component = _Builtin.Block,
  slotHeaderCells,
}) {
  return (
    <_Component className={_utils.cx(_styles, "table_header_row")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "table_header_firstcell")}
        id={_utils.cx(
          _styles,
          "w-node-bc584fcd-a2f9-f450-713b-11fd02b28eee-02b28eed"
        )}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Member Name"}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "table_cells")}
        id={_utils.cx(
          _styles,
          "w-node-_8d758e7c-21a2-5f42-c2a6-cb365f58cdc1-02b28eed"
        )}
        tag="div"
      >
        {slotHeaderCells ?? (
          <>
            <TableHeaderCell />
            <TableHeaderCell />
            <TableHeaderCell />
            <TableHeaderCell />
            <TableHeaderCell />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
