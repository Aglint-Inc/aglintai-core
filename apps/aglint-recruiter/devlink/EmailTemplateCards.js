"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalBadge } from "./GlobalBadge";
import * as _utils from "./utils";
import _styles from "./EmailTemplateCards.module.css";

export function EmailTemplateCards({
  as: _Component = _Builtin.Block,
  onClickApplicationRecieved = {},
  onClickEdit = {},
  textDescription = "Triggered instantly when candidate applied to this job.",
  textTitle = "Application recieved",
  isActive = false,
  slotBadge,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "etc-wrapper")}
      tag="div"
      {...onClickApplicationRecieved}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "email-temp-card-wrap")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "relative-1")} tag="div">
          <Text content={textTitle} />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "slotbadge")} tag="div">
          {slotBadge ?? (
            <>
              <GlobalBadge />
              <GlobalBadge />
              <GlobalBadge />
              <GlobalBadge />
              <GlobalBadge />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "active-state-email")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
