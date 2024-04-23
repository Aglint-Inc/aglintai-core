"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./LeaderBoardCard.module.css";

export function LeaderBoardCard({
  as: _Component = _Builtin.Block,
  slotImage,
  textName = "Darlene Robertson",
  textRole = "HR Specialist",
  noHours = "170.4",
  textHour = "Hours",
  noInterview = "23",
  textInterview = "Interviews",
  textCountNo = "1.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1476")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1480")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textCountNo}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1477")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1478")}
            tag="div"
          >
            {slotImage}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1479")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {textName}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey_600")}
              tag="div"
            >
              {textRole}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1482")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1481")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-lg")}
            tag="div"
          >
            {noHours}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "text-grey_600")}
            tag="div"
          >
            {textHour}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1481")}
          tag="div"
        >
          <_Builtin.Block tag="div">{noInterview}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "text-grey_600")}
            tag="div"
          >
            {textInterview}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
