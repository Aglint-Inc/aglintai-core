"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ActivitiesCard.module.css";

export function ActivitiesCard({
  as: _Component = _Builtin.Block,
  slotImage,
  textTitle = "Interview completed",
  textTime = "5 Hours ago",
  isLineVisible = true,
  onClickViewTask = {},
  textDesc = "This is some text inside of a div block.",
  isViewTaskVisible = true,
  slotContent,
  onClickReschedule = {},
  isRescheduleVisible = true,
  isContentVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1404")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1531")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1530")}
          tag="div"
        >
          {slotImage}
        </_Builtin.Block>
        {isLineVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1532")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1533")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textTitle}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {textDesc}
        </_Builtin.Block>
        {isContentVisible ? (
          <_Builtin.Block tag="div">{slotContent}</_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1567")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "text-grey-600")}
            tag="div"
          >
            {textTime}
          </_Builtin.Block>
          {isRescheduleVisible ? (
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-sm",
                "text-underline",
                "text-grey-600",
                "cursor-pointer"
              )}
              tag="div"
              {...onClickReschedule}
            >
              {"Reschedule"}
            </_Builtin.Block>
          ) : null}
          {isViewTaskVisible ? (
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-sm",
                "text-underline",
                "text-grey-600",
                "cursor-pointer"
              )}
              tag="div"
              {...onClickViewTask}
            >
              {"View task"}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
