"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SublinkTab } from "./SublinkTab";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./BodyWithSublink.module.css";

export function BodyWithSublink({
  as: _Component = _Builtin.Block,
  slotSublinkTab,
  slotTabContent,
}) {
  return (
    <_Component className={_utils.cx(_styles, "layoutbody")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_sidemenu_tabs")}
        id={_utils.cx(
          _styles,
          "w-node-c3ee8b68-e4f4-2b0d-c4c8-e3cf4daf9a46-4daf9a45"
        )}
        tag="div"
      >
        {slotSublinkTab ?? (
          <>
            <SublinkTab />
            <SublinkTab />
            <SublinkTab />
            <SublinkTab isActtive={false} />
            <SublinkTab isActtive={true} />
          </>
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_tabcontent")}
        id={_utils.cx(
          _styles,
          "w-node-c3ee8b68-e4f4-2b0d-c4c8-e3cf4daf9a4c-4daf9a45"
        )}
        tag="div"
      >
        {slotTabContent ?? <SlotComp componentName="tab components" />}
      </_Builtin.Block>
    </_Component>
  );
}