"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./UserNameCard.module.css";

export function UserNameCard({
  as: _Component = _Builtin.Block,
  slotAvatar,
  textName = "This is a global text component",
  textRole = "This is a global text component",
}) {
  return (
    <_Component className={_utils.cx(_styles, "user_card")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "user_card_avatr")}
        tag="div"
      >
        {slotAvatar}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <Text content={textName} weight="medium" />
        <Text content={textRole} size="1" weight="" color="neutral" />
      </_Builtin.Block>
    </_Component>
  );
}
