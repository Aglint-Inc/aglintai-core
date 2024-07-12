"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import { ButtonSoft } from "./ButtonSoft";
import * as _utils from "./utils";
import _styles from "./GlobalCta.module.css";

export function GlobalCta({
  as: _Component = _Builtin.Block,
  color = "success",
  textTitle = "This is a global text component",
  textDescription = "Candidate recieved a link to submit availability between 12 June 2024 to 13 June 2024.",
  slotButton,
  iconName = "mark_email_read",
  slotCustomIcon,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "global_banner_vertical")}
      tag="div"
      data-color={color}
    >
      <_Builtin.Block tag="div">
        {slotCustomIcon ?? (
          <GlobalIcon
            iconName={iconName}
            size="9"
            weight="light"
            color="inherit"
          />
        )}
      </_Builtin.Block>
      <Text content={textTitle} weight="medium" color="neutral-12" />
      <Text
        content={textDescription}
        weight="regular"
        align="center"
        color="neutral"
      />
      <_Builtin.Block className={_utils.cx(_styles, "slot_button")} tag="div">
        {slotButton ?? (
          <ButtonSoft size="2" color="neutral" textButton="Copy Link" />
        )}
      </_Builtin.Block>
    </_Component>
  );
}
