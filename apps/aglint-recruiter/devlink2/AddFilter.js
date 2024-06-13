"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonGhost } from "./ButtonGhost";
import * as _utils from "./utils";
import _styles from "./AddFilter.module.css";

export function AddFilter({
  as: _Component = _Builtin.Block,
  onClickAddFilter = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "accent-link")}
      tag="div"
      {...onClickAddFilter}
    >
      <ButtonGhost
        textButton="Add Filter"
        isLeftIcon={true}
        iconName=""
        size="2"
      />
    </_Component>
  );
}
