"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TaskDetailBlock.module.css";

export function TaskDetailBlock({
  as: _Component = _Builtin.Block,
  slotIcon,
  textName = "This is some text inside of a div block.",
  slotStatus,
  textDesc = "Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-976")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-977")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-978")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-979")}
            tag="div"
          >
            {slotIcon}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{textName}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotStatus}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {textDesc}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
