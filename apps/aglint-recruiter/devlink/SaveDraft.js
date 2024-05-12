import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SaveDraft.module.css";

export function SaveDraft({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "save-draft")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "save-draft-wrappers")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "add-icon")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.64645%204.14645C8.84171%203.95118%209.15829%203.95118%209.35355%204.14645C9.54882%204.34171%209.54882%204.65829%209.35355%204.85355L5.85355%208.35355C5.65829%208.54882%205.34171%208.54882%205.14645%208.35355L3.14645%206.35355C2.95118%206.15829%202.95118%205.84171%203.14645%205.64645C3.34171%205.45118%203.65829%205.45118%203.85355%205.64645L5.5%207.29289L8.64645%204.14645ZM6%2012C2.68629%2012%200%209.31371%200%206C0%202.68629%202.68629%200%206%200C9.31371%200%2012%202.68629%2012%206C12%209.31371%209.31371%2012%206%2012ZM6%2011C8.76142%2011%2011%208.76142%2011%206C11%203.23858%208.76142%201%206%201C3.23858%201%201%203.23858%201%206C1%208.76142%203.23858%2011%206%2011Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "text-sm",
            "fw-semibold",
            "text-green-500"
          )}
          tag="div"
        >
          {"Saved to Draft"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "save-draft-load")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "add-icon")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2010%2010%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_2304_22293)%22%3E%0A%20%20%20%20%3Cmask%20id%3D%22mask0_2304_22293%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2210%22%20height%3D%2210%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M10%200H0V10H10V0Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2Fmask%3E%0A%20%20%20%20%3Cg%20mask%3D%22url(%23mask0_2304_22293)%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M1.45%207.35543C0.399541%205.77465%200.506073%203.62569%201.83475%202.15004C2.78847%201.09083%204.15302%200.621658%205.46933%200.766408%22%20stroke%3D%22%23C2C8CC%22%20stroke-width%3D%220.987654%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CclipPath%20id%3D%22clip0_2304_22293%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2FclipPath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "text-sm",
            "fw-semibold",
            "text-grey-400"
          )}
          tag="div"
        >
          {"Saved to Draft"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
