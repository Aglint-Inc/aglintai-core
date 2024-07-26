"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalBadge } from "./GlobalBadge";
import * as _utils from "./utils";
import _styles from "./AtsCard.module.css";

export function AtsCard({
  as: _Component = _Builtin.Block,
  textStatus = "This is some text inside of a div block.",
  textRole = "Strategic Solutions Architect",
  textWorktypeLocation = "On-site, Full Time, San Jose, CA",
  propsTextColor = {},
  onClickCheck = {},
  isChecked = false,
  slotGlobalBadge,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "lever-card-map")}
      tag="div"
      {...onClickCheck}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "checkbox-right-wrappers-text")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "flex-horizontal", "center", "gap-2")}
          tag="div"
        >
          <Text content={textRole} weight="medium" />
          <_Builtin.Block tag="div">
            {slotGlobalBadge ?? <GlobalBadge textBadge={textStatus} />}
          </_Builtin.Block>
        </_Builtin.Block>
        <Text content={textWorktypeLocation} color="neutral" />
      </_Builtin.Block>
      {isChecked ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "overlay-blue-checked")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
