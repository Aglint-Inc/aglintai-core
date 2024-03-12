import React from "react";
import * as _Builtin from "./_Builtin";
import { InterviewScreenCard } from "./InterviewScreenCard";
import * as _utils from "./utils";
import _styles from "./InterviewMemberSide.module.css";

export function InterviewMemberSide({
  as: _Component = _Builtin.Block,
  isUpcomingActive = false,
  isCompletedActive = false,
  slotInterviewCard,
  onClickUpcoming = {},
  onClickCompleted = {},
  onClickScheduling = {},
  onClickCancelled = {},
  isCancelActive = false,
  isSchedulingActive = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1081")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1077")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "all-wrap-navi")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1076")}
            tag="div"
            {...onClickUpcoming}
          >
            <_Builtin.Block tag="div">{"Upcoming"}</_Builtin.Block>
          </_Builtin.Block>
          {isUpcomingActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1076", "active")}
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
            className={_utils.cx(_styles, "div-block-1076")}
            tag="div"
            {...onClickCompleted}
          >
            <_Builtin.Block tag="div">{"Completed"}</_Builtin.Block>
          </_Builtin.Block>
          {isCompletedActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1076", "active")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Completed"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "all-wrap-navi")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1076")}
            tag="div"
            {...onClickScheduling}
          >
            <_Builtin.Block tag="div">{"Scheduling"}</_Builtin.Block>
          </_Builtin.Block>
          {isSchedulingActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1076", "active")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Scheduling"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "all-wrap-navi")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1076")}
            tag="div"
            {...onClickCancelled}
          >
            <_Builtin.Block tag="div">{"Cancelled"}</_Builtin.Block>
          </_Builtin.Block>
          {isCancelActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1076", "active")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Cancelled"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1079")}
        tag="div"
      >
        {slotInterviewCard ?? <InterviewScreenCard />}
      </_Builtin.Block>
    </_Component>
  );
}
