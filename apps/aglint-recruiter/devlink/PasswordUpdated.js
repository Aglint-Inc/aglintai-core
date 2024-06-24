"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import { ButtonSoft } from "./ButtonSoft";
import * as _utils from "./utils";
import _styles from "./PasswordUpdated.module.css";

export function PasswordUpdated({
  as: _Component = _Builtin.Block,
  onClickClose = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "password-update-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "success-message")}
        tag="div"
      >
        <GlobalIcon iconName="" size="4" weight="bold" />
        <Text
          size="2"
          weight="medium"
          content="Password Updated Successfully."
          color="inherit"
        />
      </_Builtin.Block>
      <ButtonSoft
        onClickButton={onClickClose}
        size="2"
        color="neutral"
        isLeftIcon={false}
        isRightIcon={false}
        textButton="Close"
      />
    </_Component>
  );
}
