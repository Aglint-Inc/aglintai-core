"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NotesRequestDetail.module.css";

export function NotesRequestDetail({
  as: _Component = _Builtin.Block,
  styleInput,
  slotInput,
  slotText,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "notes-wrappers")}
      tag="div"
      styleInput={styleInput}
    >
      <_Builtin.Block tag="div">{slotInput}</_Builtin.Block>
      <_Builtin.Block tag="div">{slotText}</_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5BstyleInput%3D%22white%22%5D%7B%0Aborder%3A1px%20solid%20var(--neutral-6)%3B%0Abackground%3A%20var(--neutral-2)%3B%0A%7D%0A%0A%5BstyleInput%3D%22warning%22%5D%7B%0Aborder%3A1px%20solid%20var(--warning-4)%3B%0Abackground%3A%20var(--warning-2)%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
