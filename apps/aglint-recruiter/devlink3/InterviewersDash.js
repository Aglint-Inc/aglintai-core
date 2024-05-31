"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { InterviewersCardList } from "./InterviewersCardList";
import * as _utils from "./utils";
import _styles from "./InterviewersDash.module.css";

export function InterviewersDash({
  as: _Component = _Builtin.Block,
  slotInterviewersCardList,
  onClickQualified = {},
  onClickTrainee = {},
  isQualifiedActive = false,
  isTraineeActive = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1487", "over-hidden")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1488", "header")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Interviewers"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1783")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1788")}
            tag="div"
            {...onClickQualified}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-hover-link")}
              tag="div"
            >
              {"Qualified"}
            </_Builtin.Block>
            {isQualifiedActive ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1789")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-active-link")}
                  tag="div"
                >
                  {"Qualified"}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1788")}
            tag="div"
            {...onClickTrainee}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-hover-link")}
              tag="div"
            >
              {"Trainees"}
            </_Builtin.Block>
            {isTraineeActive ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1789")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-active-link")}
                  tag="div"
                >
                  {"Trainees"}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1514")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "div-block-1507",
            "height-56",
            "interviewers",
            "height-auto"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1508", "padd-10")}
            id={_utils.cx(
              _styles,
              "w-node-_78c91b2f-e9a0-e12f-c3da-df89e6bcfc38-e6bcfc2d"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Name"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1508", "padd-10")}
            id={_utils.cx(
              _styles,
              "w-node-_78c91b2f-e9a0-e12f-c3da-df89e6bcfc3b-e6bcfc2d"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Upcoming"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1508", "padd-10")}
            id={_utils.cx(
              _styles,
              "w-node-_78c91b2f-e9a0-e12f-c3da-df89e6bcfc3e-e6bcfc2d"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Completed"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1508", "padd-10")}
            id={_utils.cx(
              _styles,
              "w-node-_78c91b2f-e9a0-e12f-c3da-df89e6bcfc41-e6bcfc2d"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Declined"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1566", "scroll")}
          tag="div"
        >
          {slotInterviewersCardList ?? (
            <>
              <InterviewersCardList />
              <InterviewersCardList />
              <InterviewersCardList />
              <InterviewersCardList />
              <InterviewersCardList />
              <InterviewersCardList />
              <InterviewersCardList />
              <InterviewersCardList />
              <InterviewersCardList />
              <InterviewersCardList />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
