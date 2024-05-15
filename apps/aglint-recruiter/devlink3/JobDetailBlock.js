"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobDetailBlock.module.css";

export function JobDetailBlock({
  as: _Component = _Builtin.Block,
  slotJobForm,
  slotRichtext,
  onClickCreate = {},
  isCreate = true,
  textDescription = "Enter the basic job details below. ",
  styleBorder = {},
  slotRichtextWarning,
  slotHiringTeamForm,
  isJobDetailVisible = true,
  isHiringTeamVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "job-sidebar-main-block")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-759")} tag="div">
        {isJobDetailVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "job_detail_right")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-507")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Job Details"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "color-grey-600")}
                tag="div"
              >
                {textDescription}
              </_Builtin.Block>
            </_Builtin.Block>
            {isCreate ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "button_primary")}
                tag="div"
                {...onClickCreate}
              >
                <_Builtin.Block tag="div">{"Create Job"}</_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        ) : null}
        {isJobDetailVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-main-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-job-form-step-2")}
              tag="div"
            >
              {slotJobForm}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isJobDetailVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aeravgaergf", "mb-20")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Job Description"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-richtext-editor-wrapper")}
              tag="div"
              {...styleBorder}
            >
              {slotRichtext}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_richtext_warining")}
              tag="div"
            >
              {slotRichtextWarning}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isHiringTeamVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "job_detail_right")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-507")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Hiring Team"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "color-grey-600")}
                tag="div"
              >
                {
                  "Set up and manage roles like hiring managers, recruiters, sourcers, and interview coordinators."
                }
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isHiringTeamVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-main-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-job-form-step-2")}
              tag="div"
            >
              {slotHiringTeamForm}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
