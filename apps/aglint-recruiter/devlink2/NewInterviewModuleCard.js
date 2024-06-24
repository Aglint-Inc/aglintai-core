"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
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
      className={_utils.cx(_styles, "interview_type_row", "grid-2fr")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "interview_type_cell")}
        tag="div"
      >
        <Text content={textModuleName} color="neutral-12" weight="bold" />
        <Text content={textObjective} color="neutral" weight="" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "interview_type_cell", "gap-20")}
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
