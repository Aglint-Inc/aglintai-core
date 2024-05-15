import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./PanelList.module.css";

export function PanelList({
  as: _Component = _Builtin.Block,
  slotAvatarLogo,
  textName = "Leslie Alexander",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-928")} tag="div">
      <_Builtin.Block tag="div">{slotAvatarLogo}</_Builtin.Block>
      <_Builtin.Block tag="div">{textName}</_Builtin.Block>
    </_Component>
  );
}
