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
  isSelectedNumber = true,
  textSelectedNumber = "1",
  textDrawertitle = "Send Self Scheduling Link",
  isBottomBar = true,
  slotSideDrawerIcon,
  onClickBack = {},
  isDisabled = false,
  isLoading = false,
  dynamicHeight = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "large_sidedrawer")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "sidedrawer_top_bar")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "flex_hr_10")} tag="div">
          <Text content={textDrawertitle} weight="medium" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sdl-close-btn-wrap")}
          tag="div"
          {...onClickCancel}
        >
          <GlobalIcon iconName="close" />
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
          <_Builtin.Block
            className={_utils.cx(_styles, "button-pop-wrap", "streachfull")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "wide_button", "width-100")}
              tag="div"
            >
              <ButtonSoft
                onClickButton={onClickBack}
                color="neutral"
                textButton="Back"
                size="2"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "wide_button",
                "width-100",
                "pos-2"
              )}
              id={_utils.cx(
                _styles,
                "w-node-_97c88937-31b4-9fc3-c74d-05cc519b9feb-519b9fdf"
              )}
              tag="div"
            >
              <ButtonSolid
                textButton={textPrimaryButton}
                isDisabled={isDisabled}
                isLoading={isLoading}
                onClickButton={onClickPrimary}
                size="2"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
