"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Checkbox } from "./Checkbox";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ScoreCardEdit.module.css";

export function ScoreCardEdit({
  as: _Component = _Builtin.Block,
  onClickDelete = {},
  slotButtonUpdate,
  slotCheckBox,
  slotTextEdit,
  isDeleteVisible = true,
  onClickCancel = {},
  isCancelVisible = false,
  slotButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "score-edit-card")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "edit-desc-wrap")}
        tag="div"
      >
        {slotTextEdit}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "sce-btn-wrap")} tag="div">
        <_Builtin.Block tag="div">{slotButton}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sce-right-btn-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "delete-button")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {slotCheckBox ?? <Checkbox />}
            </_Builtin.Block>
            <Text content="Must have" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sce-left-btn-wrap")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotButtonUpdate}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
