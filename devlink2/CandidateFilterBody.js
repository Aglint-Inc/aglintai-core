import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateFilterBody.module.css";

export function CandidateFilterBody({
  as: _Component = _Builtin.Block,
  slotFilters,
  slotButtons,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cl-filters-content-inner")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cl-filter-wrapper")}
        tag="div"
      >
        {slotFilters ?? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cl-filters-empty-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-color-black")}
              tag="div"
            >
              {"No filters applied"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {"Click ‘add filter’ to continue"}
            </_Builtin.Block>
          </_Builtin.Block>
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cl-filters-buttons")}
        tag="div"
      >
        {slotButtons}
      </_Builtin.Block>
    </_Component>
  );
}
