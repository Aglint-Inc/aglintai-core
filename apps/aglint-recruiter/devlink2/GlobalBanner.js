"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSolid } from "./ButtonSolid";
import { TextWithIcon } from "./TextWithIcon";
import * as _utils from "./utils";
import _styles from "./GlobalBanner.module.css";

export function GlobalBanner({
  as: _Component = _Builtin.Block,
  textTitle = "This is a global text component",
  textDescription = "The interview is complete. Click the button for requesting interviewer feedback.",
  textNotes = "Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  iconName = "chat",
  slotButtons,
  isAdditionalNotes = false,
  color = "neutral",
  isDescriptionVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "global_banner")}
      id={_utils.cx(
        _styles,
        "w-node-_3653934b-9d23-8d82-b3fe-433fa5fab458-a5fab458"
      )}
      tag="div"
      data-banner-color={color}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "banner_main_block")}
        tag="div"
      >
        <GlobalIcon iconName={iconName} size="8" weight="" />
        <_Builtin.Block className={_utils.cx(_styles, "flex_v1")} tag="div">
          <Text content={textTitle} />
          {isDescriptionVisible ? (
            <_Builtin.Block tag="div">
              <Text content={textDescription} color="neutral" weight="" />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "button_wrapper")}
          id={_utils.cx(
            _styles,
            "w-node-_3653934b-9d23-8d82-b3fe-433fa5fab460-a5fab458"
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
      {isAdditionalNotes ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_additional_notes")}
          tag="div"
        >
          <TextWithIcon textContent="Additional Note" iconName="news" />
          <Text content={textNotes} color="neutral" size="2" weight="" />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
