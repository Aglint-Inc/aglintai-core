"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./DashboardWarning.module.css";

export function DashboardWarning({
  as: _Component = _Builtin.Block,
  textWarningTitle = "Job description is changed",
  textDesc = "You may need to adjust the criteria for profile scoring.",
  slotButton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "bannner_wrap", "is_warning")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "warning-icon-wrap")}
        id={_utils.cx(
          _styles,
          "w-node-_2451fef1-5756-87e6-7387-669e712079d7-276e82ed"
        )}
        tag="div"
      >
        <GlobalIcon
          iconName="warning"
          color="inherit"
          size="8"
          weight="light"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "banner_flex")}
        id={_utils.cx(
          _styles,
          "w-node-a3c64be4-07cc-f461-ae20-1c08276e82ef-276e82ed"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "banner_text_wrapper")}
          id={_utils.cx(
            _styles,
            "w-node-a3c64be4-07cc-f461-ae20-1c08276e82f0-276e82ed"
          )}
          tag="div"
        >
          <Text content={textWarningTitle} weight="medium" />
          <Text content={textDesc} weight="" size="1" color="neutral" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "right_buttons")}
          tag="div"
        >
          {slotButton ?? (
            <>
              <SlotComp componentNeme="ButtonSoft" />
              <SlotComp componentNeme="ButtonSolid" />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
