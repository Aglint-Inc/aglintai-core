"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ListCard } from "./ListCard";
import * as _utils from "./utils";
import _styles from "./ListPop.module.css";

export function ListPop({ as: _Component = _Builtin.Block, slotListCard }) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1510")} tag="div">
      {slotListCard ?? <ListCard />}
    </_Component>
  );
}
