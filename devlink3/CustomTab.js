import React from "react";
import * as _Builtin from "./_Builtin";
import { TabMenuButton } from "./TabMenuButton";
import * as _utils from "./utils";
import _styles from "./CustomTab.module.css";

export function CustomTab({
  as: _Component = _Builtin.Block,
  slotTabContent,
  slotTabMenu,
}) {
  return (
    <_Component className={_utils.cx(_styles, "custom-tab-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "tabs-div-wrappers")}
        tag="div"
      >
        {slotTabMenu ?? <TabMenuButton />}
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotTabContent}</_Builtin.Block>
    </_Component>
  );
}
