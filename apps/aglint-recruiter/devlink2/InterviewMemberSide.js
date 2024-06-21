"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./InterviewMemberSide.module.css";

export function InterviewMemberSide({
  as: _Component = _Builtin.Block,
  isUpcomingActive = true,
  isCompletedActive = false,
  slotInterviewCard,
  onClickUpcoming = {},
  onClickCompleted = {},
  onClickCancelled = {},
  isCancelActive = false,
  propsGrids = {},
  slotInterview,
  onClickWaiting = {},
  isWaitingActive = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1081")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "tab_switch_wrappper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "membership_pill_wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-interview-mod")}
            tag="div"
          >
            {slotInterview}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "all-wrap-navi")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "memberside-pill")}
              tag="div"
              {...onClickUpcoming}
            >
              <_Builtin.Block tag="div">{"Upcoming"}</_Builtin.Block>
            </_Builtin.Block>
            {isUpcomingActive ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "memberside-pill", "active")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Upcoming"}</_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "all-wrap-navi")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "memberside-pill")}
              tag="div"
              {...onClickCancelled}
            >
              <_Builtin.Block tag="div">{"Canceled"}</_Builtin.Block>
            </_Builtin.Block>
            {isCancelActive ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "memberside-pill", "active")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Canceled"}</_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "all-wrap-navi")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "memberside-pill")}
              tag="div"
              {...onClickCompleted}
            >
              <_Builtin.Block tag="div">{"Past"}</_Builtin.Block>
            </_Builtin.Block>
            {isCompletedActive ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "memberside-pill", "active")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Past"}</_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "all-wrap-navi")}
            tag="div"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "interview_screen_card")}
        tag="div"
        {...propsGrids}
      >
        {slotInterviewCard ?? <SlotComp componentName="InterviewScreenCard" />}
      </_Builtin.Block>
    </_Component>
  );
}
