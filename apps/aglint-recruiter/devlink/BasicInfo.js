"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./BasicInfo.module.css";

export function BasicInfo({
  as: _Component = _Builtin.Block,
  slotCompanyLogo,
  onClickChangeLogo = {},
  textLogoUpdate = "Change Logo",
  slotBasicForm,
  slotWarning,
  isWarningVisible = false,
  isChangeLogoVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "basic-info-wrap")} tag="div">
      <_Builtin.Block tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "spacing-2")} tag="div">
          <Text weight="medium" content="Basic Info" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "flex-horizontal", "center", "gap-3")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "company-details-profile")}
            tag="div"
          >
            {slotCompanyLogo ?? <SlotComp componentName="Slot for logo" />}
          </_Builtin.Block>
          {isChangeLogoVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "change-profile-content")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "profile-link-wrap")}
                tag="div"
                {...onClickChangeLogo}
              >
                <Text content={textLogoUpdate} color="accent" />
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <Text
                  size="1"
                  color="neutral"
                  content="Upload a square company logo (PNG or JPEG)."
                />
                <Text size="1" color="neutral" content="Maximum size: 2 MB. " />
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        {isWarningVisible ? (
          <_Builtin.Block className={_utils.cx(_styles, "mt-2")} tag="div">
            {slotWarning}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-inputs-wrapper")}
        tag="div"
      >
        {slotBasicForm ?? <SlotComp componentName="Slot for MUI Form" />}
      </_Builtin.Block>
    </_Component>
  );
}
