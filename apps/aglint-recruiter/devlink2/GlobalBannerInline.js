"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./GlobalBannerInline.module.css";

export function GlobalBannerInline({
  as: _Component = _Builtin.Block,
  iconName = "info",
  textContent = "some text content which wwill come in one line",
  slotButton,
  color = "neutral",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "global_banner", "info_short")}
      id={_utils.cx(
        _styles,
        "w-node-_7528323e-dd12-40f2-3430-0c8b5407f75e-5407f75e"
      )}
      tag="div"
      data-banner-color={color}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "info_main_block")}
        tag="div"
      >
        <TextWithIcon
          iconName={iconName}
          textContent={textContent}
          iconSize="3"
          fontWeight="regular"
          color="inherit"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "button_wrapper")}
        id={_utils.cx(
          _styles,
          "w-node-fdb627b6-1c1c-ac4d-8cb2-7a5a1de88be1-5407f75e"
        )}
        tag="div"
      >
        {slotButton ?? (
          <>
            <ButtonSoft size="1" color="neutral" />
            <ButtonSolid size="1" />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
