"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TemplateName } from "./TemplateName";
import * as _utils from "./utils";
import _styles from "./TemplateButtonList.module.css";

export function TemplateButtonList({
  as: _Component = _Builtin.Block,
  slotName,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "template-button-list")}
      tag="div"
    >
      {slotName ?? <TemplateName />}
    </_Component>
  );
}
