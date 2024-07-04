"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import { SlotComp } from "./SlotComp";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./SideDrawerLarge.module.css";

export function SideDrawerLarge({
  as: _Component = _Builtin.Block,
  slotSideDrawerbody,
  onClickCancel = {},
  onClickPrimary = {},
  textPrimaryButton = "Send to candidate",
  textDrawertitle = "Send Self Scheduling Link",
  isBottomBar = true,
  onClickBack = {},
  isDisabled = false,
  isLoading = false,
  dynamicHeight = {},
  slotButtons,
  slotHeaderIcon,
}) {
  return (
    <_Component className={_utils.cx(_styles, "large_sidedrawer")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "sidedrawer_top_bar")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "flex_hr_10")} tag="div">
          <_Builtin.Block tag="div">{slotHeaderIcon}</_Builtin.Block>
          <Text content={textDrawertitle} weight="medium" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sdl-close-btn-wrap")}
          tag="div"
          {...onClickCancel}
        >
          <GlobalIcon iconName="close" size="3" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sidedrawer_body")}
        tag="div"
        {...dynamicHeight}
      >
        {slotSideDrawerbody ?? <SlotComp componentNeme="ScheduleOptionList" />}
      </_Builtin.Block>
      {isBottomBar ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "sidedrawer_bottom_bar")}
          tag="div"
        >
          {slotButtons ?? (
            <>
              <ButtonSoft
                onClickButton={onClickBack}
                color="neutral"
                textButton="Back"
                size="2"
              />
              <ButtonSolid
                textButton={textPrimaryButton}
                isDisabled={isDisabled}
                isLoading={isLoading}
                onClickButton={onClickPrimary}
                size="2"
              />
            </>
          )}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
