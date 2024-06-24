"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { IconButtonGhost } from "./IconButtonGhost";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./ImportCandidates.module.css";

export function ImportCandidates({
  as: _Component = _Builtin.Block,
  slotImportCsv,
  slotImportResume,
  slotAddManually,
  onClickImportCsv = {},
  onClickImportResume = {},
  onClickAddManually = {},
  onClickClose = {},
  isImportDescVisible = true,
  textListingCount = "Listing 320 candidates",
  onClickReupload = {},
  isListingCountVisible = false,
  textCountExistinJob = "130 candidates already exists in this job",
  onClickImportRemaining = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "import-candidates-popup-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ic-popup-close-btn")}
        tag="div"
      >
        <IconButtonGhost
          onClickButton={onClickClose}
          iconName="close"
          color="neutral"
          size="2"
          iconSize="5"
          iconWeight="thin"
        />
      </_Builtin.Block>
      <_Builtin.TabsWrapper
        className={_utils.cx(_styles, "import_candidate_tab")}
        current="Tab 1"
        easing="ease"
        fadeIn={300}
        fadeOut={100}
      >
        <_Builtin.TabsMenu
          className={_utils.cx(_styles, "ic-tabs-links-wrapper")}
          tag="div"
        >
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "ic-tab-link-block")}
            data-w-tab="Tab 1"
            block="inline"
            {...onClickImportCsv}
          >
            <Text content="Upload Resume" weight="" />
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "ic-tab-link-block")}
            data-w-tab="Tab 2"
            block="inline"
            {...onClickImportResume}
          >
            <Text content="Import CSV" weight="" />
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "ic-tab-link-block")}
            data-w-tab="Tab 3"
            block="inline"
            {...onClickAddManually}
          >
            <Text content="Add Manually" weight="" />
          </_Builtin.TabsLink>
        </_Builtin.TabsMenu>
        <_Builtin.TabsContent
          className={_utils.cx(_styles, "tab_content")}
          tag="div"
        >
          <_Builtin.TabsPane tag="div" data-w-tab="Tab 1">
            <_Builtin.Block tag="div">
              {slotImportResume ?? <SlotComp componentName="UploadedResume" />}
            </_Builtin.Block>
          </_Builtin.TabsPane>
          <_Builtin.TabsPane tag="div" data-w-tab="Tab 2">
            <_Builtin.Block tag="div">
              {slotImportCsv ?? <SlotComp componentName="ImportCsv" />}
            </_Builtin.Block>
          </_Builtin.TabsPane>
          <_Builtin.TabsPane tag="div" data-w-tab="Tab 3">
            <_Builtin.Block tag="div">{slotAddManually}</_Builtin.Block>
          </_Builtin.TabsPane>
        </_Builtin.TabsContent>
      </_Builtin.TabsWrapper>
    </_Component>
  );
}
