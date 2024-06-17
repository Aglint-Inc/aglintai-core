"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewerList.module.css";

export function InterviewerList({
  as: _Component = _Builtin.Block,
  slotProfileImage,
  textName = "Brooklyn Simmons",
  textDesignation = "Project Manager",
  isSelected = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1690")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1691")}
        tag="div"
      >
        {slotProfileImage}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "ci-details")} tag="div">
        <_Builtin.Block tag="div">{textName}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "text-grey-600")}
          tag="div"
        >
          {textDesignation}
        </_Builtin.Block>
      </_Builtin.Block>
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1692")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
