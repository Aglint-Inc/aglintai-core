"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NewInterviewModuleCard.module.css";

export function NewInterviewModuleCard({
  as: _Component = _Builtin.Block,
  textModuleName = "C++ Coding",
  textObjective = "This is some text inside of a div block.",
  slotMembersCard,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1065", "grid-2fr")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1066")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text-capitalize-word")}
          id={_utils.cx(
            _styles,
            "w-node-_929ec257-fb69-5130-a07c-eafa261358c6-261358c4"
          )}
          tag="div"
        >
          {textModuleName}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600", "two-line-clamp")}
          tag="div"
        >
          {textObjective}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1066", "gap-20")}
        id={_utils.cx(
          _styles,
          "w-node-_929ec257-fb69-5130-a07c-eafa261358ca-261358c4"
        )}
        tag="div"
      >
        {slotMembersCard}
      </_Builtin.Block>
    </_Component>
  );
}
