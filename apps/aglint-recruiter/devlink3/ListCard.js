"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function ListCard({
  as: _Component = _Builtin.Block,
  slotAvatarWithName,
  isAvatarWithNameVisible = true,
  textList = "This is some text inside of a div block.",
  isListVisible = true,
}) {
  return (
    <_Component tag="div">
      {isAvatarWithNameVisible ? (
        <_Builtin.Block tag="div">{slotAvatarWithName}</_Builtin.Block>
      ) : null}
      {isListVisible ? (
        <_Builtin.Block tag="div">{textList}</_Builtin.Block>
      ) : null}
    </_Component>
  );
}
