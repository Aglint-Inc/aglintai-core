import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewMemberSide.module.css";

export function InterviewMemberSide({
  as: _Component = _Builtin.Block,
  isAllActive = false,
  isUpcomingActive = false,
  isCompletedActive = false,
  isNotConfirmedActive = false,
  slotInterviewCard,
  onClickAll = {},
  onClickUpcoming = {},
  onClickCompleted = {},
  onClickNotConfirmed = {},
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
            {...onClickAll}
          >
            <_Builtin.Block tag="div">{"All"}</_Builtin.Block>
          </_Builtin.Block>
          {isAllActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1076", "active")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"All"}</_Builtin.Block>
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
            {...onClickNotConfirmed}
          >
            <_Builtin.Block tag="div">{"Not Confimed"}</_Builtin.Block>
          </_Builtin.Block>
          {isNotConfirmedActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1076", "active")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Not Confimed"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1079")}
        tag="div"
      >
        {slotInterviewCard}
      </_Builtin.Block>
    </_Component>
  );
}
