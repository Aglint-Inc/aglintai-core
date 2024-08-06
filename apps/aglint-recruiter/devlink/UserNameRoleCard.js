"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./UserNameRoleCard.module.css";

export function UserNameRoleCard({
  as: _Component = _Builtin.Block,
  textName = "Heading",
  textRole = "heading",
  slotImage,
  onClickCard = {},
  borderStyle,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "card-with-name-role")}
      tag="div"
      border-style={borderStyle}
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "role-user-image")}
        tag="div"
      >
        {slotImage}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cnr-details-wrap")}
        tag="div"
      >
        <Text content={textName} />
        <_Builtin.Block
          className={_utils.cx(_styles, "unrc-role-wrap")}
          tag="div"
        >
          <Text content={textRole} color="neutral" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%5Bborder-style%3D%22dash%22%5D%7B%0Aborder%3A%201px%20dashed%20var(--neutral-6)%3B%0A%0A%7D%0A%3C%2Fstyle%3E" />
    </_Component>
  );
}
