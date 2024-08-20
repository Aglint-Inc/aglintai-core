"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./CompanySetting.module.css";

export function CompanySetting({
  as: _Component = _Builtin.Block,
  onClickCompanyInfo = {},
  onClickCompanyJd = {},
  onClickEmailTemplate = {},
  slotCompanyJdSetting,
  slotEmailTemplate,
  isSaved = false,
  isSaving = false,
  slotSavingLottie,
  slotTeam,
  onClickTeam = {},
  isTeamVisible = true,
  slotAssesmentSetting,
  onclickAssessment = {},
  onclickAssisstant = {},
  slotAssisstantSettings,
  isAssessmentBetaVisible = true,
  isAssistantBetaVisible = true,
  slotNavSublink,
  slotCompany,
  slotSavedChanges,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "company-setting-layout")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cs-layout-header")}
        tag="div"
      >
        <Text content="Settings " weight="medium" />
        {isSaved ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-saved", "compna")}
            tag="div"
          >
            {slotSavedChanges ?? (
              <SlotComp
                componentName={
                  <>
                    {"SavedChages"}
                    <br />
                  </>
                }
              />
            )}
          </_Builtin.Block>
        ) : null}
        {isSaving ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "loading-saved")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-saving-lottie")}
              tag="div"
            >
              {slotSavingLottie}
            </_Builtin.Block>
            <Text content="Saving" size="1" color="neutral" />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cs-layout-body")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "new-layout-sublink")}
          tag="div"
        >
          {slotNavSublink}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-layout-right")}
          tag="div"
        >
          {slotCompany}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
