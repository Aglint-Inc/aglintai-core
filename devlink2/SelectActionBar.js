import React from "react";
import * as _Builtin from "./_Builtin";
import { SelectActionsDropdown } from "./SelectActionsDropdown";
import * as _utils from "./utils";
import _styles from "./SelectActionBar.module.css";

export function SelectActionBar({
  as: _Component = _Builtin.Block,
  onClickClear = {},
  textSelected = "2 Candidate selected",
  selectAllText = "Select all",
  isSelectAllVisible = true,
  onclickSelectAll = {},
  slotDropdown,
}) {
  return (
    <_Component className={_utils.cx(_styles, "select-action-bar")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "select-action-left-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "selection-clear-btn")}
          tag="div"
          {...onClickClear}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%207%207%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.07552%200.674479L3.5%203.08073L5.90625%200.674479C6.05208%200.565104%206.19184%200.565104%206.32552%200.674479C6.4349%200.80816%206.4349%200.94184%206.32552%201.07552L3.91927%203.5L6.32552%205.90625C6.4349%206.05208%206.4349%206.19184%206.32552%206.32552C6.19184%206.4349%206.05208%206.4349%205.90625%206.32552L3.5%203.91927L1.07552%206.32552C0.94184%206.4349%200.808159%206.4349%200.674479%206.32552C0.565104%206.19184%200.565104%206.05208%200.674479%205.90625L3.08073%203.5L0.674479%201.07552C0.565104%200.94184%200.565104%200.80816%200.674479%200.674479C0.808159%200.565104%200.94184%200.565104%201.07552%200.674479Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textSelected}
        </_Builtin.Block>
        {isSelectAllVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-500", "text-underline")}
            tag="div"
            {...onclickSelectAll}
          >
            {selectAllText}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {slotDropdown ?? <SelectActionsDropdown />}
      </_Builtin.Block>
    </_Component>
  );
}
