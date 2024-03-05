import React from "react";
import * as _Builtin from "./_Builtin";
import { InterviewScreenCard } from "./InterviewScreenCard";
import * as _utils from "./utils";
import _styles from "./InterviewerScreens.module.css";

export function InterviewerScreens({
  as: _Component = _Builtin.Block,
  onClickAll = {},
  isAllActive = false,
  onClickUpcoming = {},
  isUpcomingActive = false,
  onClickCompleted = {},
  isCompletedActive = false,
  onClickNotConfirmed = {},
  isNotConfirmedActive = false,
  slotInterviewScreenCard,
}) {
  return (
    <_Component className={_utils.cx(_styles, "interviewer-screens")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1113")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1081")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer-header-tab")}
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
            className={_utils.cx(_styles, "slot-interview-complted")}
            tag="div"
          >
            {slotInterviewScreenCard ?? <InterviewScreenCard />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
