"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ActivitiesCard } from "./ActivitiesCard";
import * as _utils from "./utils";
import _styles from "./Activities.module.css";

export function Activities({
  as: _Component = _Builtin.Block,
  slotActivitiesCard,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1403")} tag="div">
      <_Builtin.Block tag="div">{"Activities"}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1534")}
        tag="div"
      >
        {slotActivitiesCard ?? (
          <>
            <ActivitiesCard />
            <ActivitiesCard />
            <ActivitiesCard />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
