"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./AddCompanyWebsite.module.css";

export function AddCompanyWebsite({
  as: _Component = _Builtin.Block,
  slotWebsiteInput,
  slotButtons,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cs-sidebar-website-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cs-sidebar-website-info")}
        tag="div"
      >
        <Text content="Enter company website" />
        <Text
          content="Enter your company website URL, and our system will automatically fetch the necessary details to set up your company profile."
          weight=""
          color="neutral"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cs-sidebar-website-input")}
        tag="div"
      >
        {slotWebsiteInput ?? <SlotComp componentName="Website" />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cs-buttons-wrapper")}
        tag="div"
      >
        {slotButtons ?? <SlotComp componentName="Buttons" />}
      </_Builtin.Block>
    </_Component>
  );
}
