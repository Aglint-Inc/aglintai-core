"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./EmailTemplateHolder.module.css";

export function EmailTemplateHolder({
  as: _Component = _Builtin.Block,
  onClickReload = {},
  onClickEditTemplate = {},
  slotEmail,
  textHeader = "This is a preview only. All Actions in this email are disabled.",
}) {
  return (
    <_Component tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "req-avail-email-header")}
        tag="div"
      >
        <TextWithIcon textContent={textHeader} iconName="info" fontSize="1" />
        <_Builtin.Block
          className={_utils.cx(_styles, "button-email-req-avail")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-btn-email-req")}
            tag="div"
            {...onClickReload}
          >
            <Text content="Reload" size="1" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-btn-email-req")}
            tag="div"
            {...onClickEditTemplate}
          >
            <Text content="Edit template" size="1" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-avail-email-body")}
        tag="div"
      >
        {slotEmail}
      </_Builtin.Block>
    </_Component>
  );
}
