"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ActivitiesCard } from "./ActivitiesCard";
import * as _utils from "./utils";
import _styles from "./Activities.module.css";

export function Activities({
  as: _Component = _Builtin.Block,
  slotActivitiesCard,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1403")} tag="div">
      <Text content="Activities" weight="Medium" color="neutral" />
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1534")}
        tag="div"
      >
        {slotActivitiesCard ?? (
          <>
            <ActivitiesCard />
            <ActivitiesCard />
            <ActivitiesCard textDesc="This is some text inside of a div rg." />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
