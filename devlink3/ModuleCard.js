import React from "react";
import * as _Builtin from "./_Builtin";
import { EnableDisable } from "./EnableDisable";
import * as _utils from "./utils";
import _styles from "./ModuleCard.module.css";

export function ModuleCard({
  as: _Component = _Builtin.Block,
  textName = "Screening",
  textDescription = "Phone screening has not been enabled.",
  onClickCard = {},
  slotIcon,
  slotEnableDisable,
  isDescription = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "module_card")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "tittle_icon_flex")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "icon")} tag="div">
          {slotIcon}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_enable_disable")}
          tag="div"
        >
          {slotEnableDisable ?? <EnableDisable />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {textName}
      </_Builtin.Block>
      {isDescription ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {textDescription}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
