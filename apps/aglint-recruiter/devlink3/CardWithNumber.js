"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./CardWithNumber.module.css";

export function CardWithNumber({
  as: _Component = _Builtin.Block,
  textTitle = "Average Years of experience",
  textNumber = "16.5",
  textNumberType = "years",
  textDescription = "Average of total full time experience of the candidates",
  slotEmpty,
  isEmpty = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cardwithnumber")} tag="div">
      <Text content={textTitle} weight="medium" />
      <_Builtin.Block className={_utils.cx(_styles, "year_flex")} tag="div">
        <_Builtin.Block tag="div">{textNumber}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm-copy")}
          tag="div"
        >
          {textNumberType}
        </_Builtin.Block>
      </_Builtin.Block>
      <Text content={textDescription} color="neutral" weight="" />
      {isEmpty ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cardwithnumber-copy")}
          tag="div"
        >
          {slotEmpty}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
