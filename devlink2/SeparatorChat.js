import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SeparatorChat.module.css";

export function SeparatorChat({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-944")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-943")}
        tag="div"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "text-sm", "text-grey-600", "grow")}
        tag="div"
      >
        {"Today"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-943")}
        tag="div"
      />
    </_Component>
  );
}
