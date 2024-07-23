"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { TextWithIcon } from "./TextWithIcon";
import * as _utils from "./utils";
import _styles from "./FeedbackCard.module.css";

export function FeedbackCard({
  as: _Component = _Builtin.Block,
  slotImage,
  textName = "This is a global text component",
  textRole = "This is a global text component",
  slotDesc,
  slotButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "feedback-card-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "fc-header")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "feedback-profile-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "feedback-pic-wrap")}
            tag="div"
          >
            {slotImage}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <Text content={textName} />
            <TextWithIcon textContent={textRole} iconName="work" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotButton}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-feedback-desc")}
        tag="div"
      >
        {slotDesc}
      </_Builtin.Block>
    </_Component>
  );
}
