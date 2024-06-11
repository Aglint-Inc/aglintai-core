"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./FilterItem.module.css";

export function FilterItem({
  as: _Component = _Builtin.Block,
  textFilterHeading = "Country",
  textCount = "2",
  onClickRefresh = {},
  onClickSearch = {},
  slotItems,
  isCountVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "mfl-items-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "mfl-item-top")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "mfl-item-top-left")}
          tag="div"
        >
          <Text content={textFilterHeading} weight="medium" />
          {isCountVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "mfl-filter-count-wrap")}
              tag="div"
            >
              <Text content={textCount} weight="" />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "mfl-item-top-right")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "refresh-item-wrap")}
            tag="div"
            {...onClickRefresh}
          >
            <GlobalIcon iconName="refresh" color="" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "refresh-item-wrap")}
            tag="div"
            {...onClickSearch}
          >
            <GlobalIcon iconName="search" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "mfl-item-body")} tag="div">
        {slotItems}
      </_Builtin.Block>
    </_Component>
  );
}
