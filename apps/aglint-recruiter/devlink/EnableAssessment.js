"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { ButtonOutlinedRegular } from "./ButtonOutlinedRegular";
import * as _utils from "./utils";
import _styles from "./EnableAssessment.module.css";

export function EnableAssessment({
  as: _Component = _Builtin.Block,
  isEnableAssessmentVisible = true,
  isPhoneScreeningEnable = false,
  onClickEnablePhoneScreening = {},
  slotAssessmentButton,
  slotPhoneScreenButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "ea-wrapper")} tag="div">
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
              <Text content="" weight="medium" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ea-desc-wrap")}
              tag="div"
            >
              <Text
                content="By utilizing the AI-powered assessment, you can send assessment to candidates and generate a score reflecting their proficiency. This assessment score allows you to rank candidates, aiding in identifying the most suitable candidate for the specified position."
                color="neutral"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "enable-assessment-button-wrap")}
              tag="div"
            >
              {slotAssessmentButton ?? (
                <SlotComp componentName="ButtonOutlined" />
              )}
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
            >
              {slotPhoneScreenButton ?? (
                <ButtonOutlinedRegular textLabel="Enable phone screening" />
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
