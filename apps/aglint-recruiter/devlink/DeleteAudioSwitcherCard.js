"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DeleteAudioSwitcherCard.module.css";

export function DeleteAudioSwitcherCard({
  as: _Component = _Builtin.Block,
  slotAvatar,
  onClickCompanySetting = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "avatar-default-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-561")} tag="div">
        {slotAvatar}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "color-grey-600")}
          tag="div"
        >
          {"This avatar will be used in assessment"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "color-grey-600")}
          tag="div"
        >
          {"To change the avatar go to "}
          <_Builtin.Span
            className={_utils.cx(_styles, "text-blue-500", "text-underline")}
            {...onClickCompanySetting}
          >
            {"company settings."}
          </_Builtin.Span>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}