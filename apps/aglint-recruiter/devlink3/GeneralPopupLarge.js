"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./GeneralPopupLarge.module.css";

export function GeneralPopupLarge({
  as: _Component = _Builtin.Block,
  slotPopup,
  textDescription = "By Clicking send reminder an email will be sent to the candidate with the interview details.",
  isDescriptionVisibe = true,
  onClickClose = {},
  textPopupTitle = "Send Reminder",
  onClickAction = {},
  isIcon = true,
  textPopupButton = "Send Reminder ",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "assessment_duplicate_popup", "width-100")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "popup_header")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "popup_title")} tag="div">
          {isIcon ? (
            <_Builtin.Block tag="div">
              <GlobalIcon iconName="notifications_active" weight="medium" />
            </_Builtin.Block>
          ) : null}
          <Text content={textPopupTitle} color="neutral-11" weight="medium" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "popup_close")}
          tag="div"
          {...onClickClose}
        >
          <GlobalIcon iconName="close" weight="thin" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "popup_body")} tag="div">
        <Text content={textDescription} color="neutral-11" weight="" />
        <_Builtin.Block className={_utils.cx(_styles, "slot_widget")} tag="div">
          {slotPopup}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "button-pop-wrap", "stretch-vertical")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "wide_button", "width-100")}
          tag="div"
        >
          <ButtonSoft
            onClickButton={onClickClose}
            textButton="Cancel"
            isLeftIcon={false}
            isRightIcon={false}
            color="neutral"
            size="2"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "wide_button", "width-100", "pos-2")}
          id={_utils.cx(
            _styles,
            "w-node-_7d09c510-6450-005f-37b2-48b80524524b-05245239"
          )}
          tag="div"
        >
          <ButtonSolid
            onClickButton={onClickAction}
            textButton={textPopupButton}
            size="2"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
