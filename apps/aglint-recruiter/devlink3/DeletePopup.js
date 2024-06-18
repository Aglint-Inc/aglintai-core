"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./DeletePopup.module.css";

export function DeletePopup({
  as: _Component = _Builtin.Block,
  textDescription = "By Deleting this chat all the task will be discarded and the activities will no longer be accessible.",
  textTitle = "Delete Chat",
  onClickCancel = {},
  onClickDelete = {},
  slotIcon,
  isIcon = true,
  isWidget = false,
  buttonText = "Delete ",
  slotWidget,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "assessment_duplicate_popup")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "popup_header")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "popup_title")} tag="div">
          <Text content={textTitle} />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "popup_close")}
          tag="div"
          {...onClickCancel}
        >
          <GlobalIcon iconName="close" weight="thin" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "popup_body")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {textDescription}
        </_Builtin.Block>
        {isWidget ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_widget")}
            tag="div"
          >
            {slotWidget}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "buttn_flex")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "wide_button")} tag="div">
          <ButtonSoft
            onClickButton={onClickCancel}
            color="neutral"
            size="2"
            textButton="Cancel"
          />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "wide_button")} tag="div">
          <ButtonSolid
            onClickButton={onClickDelete}
            textButton={buttonText}
            color="error"
            size="2"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
