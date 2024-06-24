"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import { ButtonSoft } from "./ButtonSoft";
import * as _utils from "./utils";
import _styles from "./PwResetConfirm.module.css";

export function PwResetConfirm({
  as: _Component = _Builtin.Block,
  onclickBack = {},
  onclickReset = {},

  contactLink = {
    href: "#",
  },
}) {
  return (
    <_Component className={_utils.cx(_styles, "sl-main-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "sl-login-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "sl-login-main-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "sl-login-header-block")}
            tag="div"
          >
            <GlobalIcon iconName="" size="8" color="accent-8" weight="thin" />
            <_Builtin.Block
              tag="div"
              icon-size="xxl"
              icon-color="accent-11"
              icon-weight="thin"
            />
            <Text
              size="2"
              weight=""
              color="neutral-12"
              content="We have sent an password reset link to your email."
              align="left"
              highContrast=""
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sl-login-form")}
            tag="div"
          >
            <ButtonSoft
              onClickButton={onclickBack}
              isLeftIcon={false}
              isRightIcon={false}
              textButton="Login"
              size="2"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-385")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {"Need help? "}
          <_Builtin.Link
            className={_utils.cx(_styles, "sl-link")}
            button={false}
            block=""
            options={contactLink}
          >
            {"Contact Support"}
          </_Builtin.Link>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
