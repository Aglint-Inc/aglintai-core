import React from "react";
import * as _Builtin from "./_Builtin";
import { PanelMember } from "./PanelMember";
import { MemberSlotInfo } from "./MemberSlotInfo";
import { TableBodyCell } from "./TableBodyCell";
import * as _utils from "./utils";
import _styles from "./PanelDetailMemberRow.module.css";

export function PanelDetailMemberRow({
  as: _Component = _Builtin.Block,
  slotMember,
  slotBodyCells,
}) {
  return (
    <_Component className={_utils.cx(_styles, "table_member_row")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "table_member_firstcell")}
        id={_utils.cx(
          _styles,
          "w-node-_4836445c-82cb-f8d5-7f89-f3e87822942e-7822942d"
        )}
        tag="div"
      >
        {slotMember ?? (
          <>
            <PanelMember />
            <MemberSlotInfo />
          </>
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "table_cells")}
        id={_utils.cx(
          _styles,
          "w-node-_702174d5-b379-2b35-e534-e5e9a258ce50-7822942d"
        )}
        tag="div"
      >
        {slotBodyCells ?? <TableBodyCell isSelectedCell={true} />}
      </_Builtin.Block>
    </_Component>
  );
}
