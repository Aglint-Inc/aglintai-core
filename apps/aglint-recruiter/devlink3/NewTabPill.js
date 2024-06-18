"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./NewTabPill.module.css";

export function NewTabPill({
  as: _Component = _Builtin.Block,
  isPillActive = false,
  onClickPill = {},
  textLabel = "Job Description",
  slotStartIcon,
  slotEndIcon,
  isEndIconVisible = false,
  isStartIconVisible = false,
  tabCount = "0",
  isTabCountVisible,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "tab_pill")}
      tag="div"
      {...onClickPill}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "tab_pill_default")}
        tag="div"
      >
        {isStartIconVisible ? (
          <_Builtin.Block tag="div">{slotStartIcon}</_Builtin.Block>
        ) : null}
        <_Builtin.Block tag="div">{textLabel}</_Builtin.Block>
        {isEndIconVisible ? (
          <_Builtin.Block tag="div">{slotEndIcon}</_Builtin.Block>
        ) : null}
        {isTabCountVisible ? (
          <_Builtin.Block className={_utils.cx(_styles, "tab-count")} tag="div">
            <Text
              content={tabCount}
              weight="regular"
              color="inherit"
              size="1"
              align="center"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isPillActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "tab_pill_active")}
          tag="div"
        >
          {isStartIconVisible ? (
            <_Builtin.Block tag="div">{slotStartIcon}</_Builtin.Block>
          ) : null}
          <_Builtin.Block tag="div">{textLabel}</_Builtin.Block>
          {isEndIconVisible ? (
            <_Builtin.Block tag="div">{slotEndIcon}</_Builtin.Block>
          ) : null}
          {isTabCountVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "tab-count", "active")}
              tag="div"
            >
              <Text
                content={tabCount}
                weight="regular"
                color="inherit"
                size="1"
                align="center"
              />
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "active_pill_underline")}
            tag="div"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
