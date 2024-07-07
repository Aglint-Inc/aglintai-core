"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import { Text } from "./Text";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./GlobalBannerShort.module.css";

export function GlobalBannerShort({
  as: _Component = _Builtin.Block,
  iconName = "info",
  textTitle = "How it Works",
  textDescription = "The interview is complete. Click the button for requesting interviewer feedback.",
  slotButtons,
  color = "neutral",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "global_banner")}
      id={_utils.cx(
        _styles,
        "w-node-cc7d07e5-58e4-d6ec-7688-f71e21b31fe4-21b31fe4"
      )}
      tag="div"
      data-banner-color={color}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "bannerl_short", "left")}
        tag="div"
      >
        <TextWithIcon
          iconName={iconName}
          textContent={textTitle}
          iconSize="3"
          fontWeight="medium"
          color="inherit"
          fontSize="1"
        />
        <Text content={textDescription} color="neutral" weight="" size="1" />
        <_Builtin.Block tag="div" />
        <_Builtin.Block
          className={_utils.cx(_styles, "button_wrapper")}
          id={_utils.cx(
            _styles,
            "w-node-cc7d07e5-58e4-d6ec-7688-f71e21b31feb-21b31fe4"
          )}
          tag="div"
        >
          {slotButtons ?? (
            <>
              <ButtonSoft size="1" color="neutral" />
              <ButtonSolid size="1" />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
