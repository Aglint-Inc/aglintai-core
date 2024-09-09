"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MenuOptionList } from "./MenuOptionList";
import * as _utils from "./utils";
import _styles from "./MenuOption.module.css";

export function MenuOption({
  as: _Component = _Builtin.Block,
  slotMenuOptionList,
}) {
  return (
    <_Component className={_utils.cx(_styles, "menu-option-list")} tag="div">
      {slotMenuOptionList ?? (
        <>
          <MenuOptionList />
          <MenuOptionList />
          <MenuOptionList />
        </>
      )}
    </_Component>
  );
}
