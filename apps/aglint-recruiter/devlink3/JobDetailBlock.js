"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSolid } from "./ButtonSolid";
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
      <_Builtin.Block className={_utils.cx(_styles, "jdb-content")} tag="div">
        {isJobDetailVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "job_detail_right")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "jdb-header-left")}
              tag="div"
            >
              <Text content="" />
              <Text content={textDescription} weight="" color="neutral" />
            </_Builtin.Block>
            {isCreate ? (
              <_Builtin.Block tag="div" {...onClickCreate}>
                <ButtonSolid
                  onClickButton={onClickCreate}
                  textButton="Create Job"
                  size="2"
                />
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
            className={_utils.cx(_styles, "jdb-job-description")}
            tag="div"
          >
            <Text content="Job Description" weight="medium" />
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
              className={_utils.cx(_styles, "jdb-header-left")}
              tag="div"
            >
              <Text content="Hiring Team" weight="medium" />
              <Text content={textDescription} weight="" color="neutral" />
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
