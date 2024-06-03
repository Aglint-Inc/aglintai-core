"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonOutlinedRegular } from "./ButtonOutlinedRegular";
import * as _utils from "./utils";
import _styles from "./EnableAssessment.module.css";

export function EnableAssessment({
  as: _Component = _Builtin.Block,
  onClickEnableAssessment = {},
  isAddJob = true,
  onClickProceed = {},
  isProceedDisable = true,
  isEnableAssessmentVisible = true,
  isPhoneScreeningEnable = false,
  onClickEnablePhoneScreening = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-758")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "enable-assessment-wrap")}
        tag="div"
      >
        {isEnableAssessmentVisible ? (
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "enable-header")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Enable AI powered assesment for the candidates"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "color-grey-600", "mt-12")}
              tag="div"
            >
              {
                "By utilizing the AI-powered assessment, you can send assessment to candidates and generate a score reflecting their proficiency. This assessment score allows you to rank candidates, aiding in identifying the most suitable candidate for the specified position."
              }
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "enable-assessment-button-wrap")}
              tag="div"
              {...onClickEnableAssessment}
            >
              <ButtonOutlinedRegular
                textLabel={
                  <>
                    {"Enable Assessment"}
                    <br />
                  </>
                }
              />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isPhoneScreeningEnable ? (
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "enable-header")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Enable phone screening for the candidates"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "color-grey-600", "mt-12")}
              tag="div"
            >
              {
                "With phone screening, you can pose tailored questions to candidates, gather their responses, and collect additional information. This approach aids in evaluating and selecting candidates based on their responses and qualifications."
              }
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "enable-assessment-button-wrap")}
              tag="div"
              {...onClickEnablePhoneScreening}
            >
              <ButtonOutlinedRegular textLabel="Enable phone screening" />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
