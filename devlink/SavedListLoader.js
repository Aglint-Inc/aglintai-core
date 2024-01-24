import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SavedListLoader.module.css";

export function SavedListLoader({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "skeleton-width-40", "mtb-10")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "skeleton-item")}
        tag="div"
      />
    </_Component>
  );
}
