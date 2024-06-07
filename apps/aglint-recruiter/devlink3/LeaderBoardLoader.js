"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./LeaderBoardLoader.module.css";

export function LeaderBoardLoader({
  as: _Component = _Builtin.Block,
  slotSkeleton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "leaderboard_row")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "leaderboard_row_left")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1600", "loder")}
          tag="div"
        >
          {slotSkeleton}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "interviewer_info_wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1478", "loder")}
            tag="div"
          >
            {slotSkeleton}
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "flex_v4")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1599", "loder")}
              tag="div"
            >
              {slotSkeleton}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1599", "desc", "loder")}
              tag="div"
            >
              {slotSkeleton}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "leaderboard_row_right", "loader")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "hours", "loader")}
          tag="div"
        >
          {slotSkeleton}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "hours", "loder")}
          tag="div"
        >
          {slotSkeleton}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
