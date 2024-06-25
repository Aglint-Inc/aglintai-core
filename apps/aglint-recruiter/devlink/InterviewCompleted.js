"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./InterviewCompleted.module.css";

export function InterviewCompleted({
  as: _Component = _Builtin.Block,
  slotLottie,
  slotCompanyLogo,
  onClickSupport = {},
  textTitle = "Completed Interview Successfully.",
  textDescription = "Thank you for taking your time to take this interview. We will be in touch with you soon. If you have any questions please ",
  propsTextColor = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "ic-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "int-completed-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "int-completed-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "int-completed-logo-block")}
            tag="div"
          >
            {slotCompanyLogo}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "int-completed-main-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "int-completed-main-content")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "ic-title-icon-wrap")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "int-completed-lottie-block")}
                  tag="div"
                >
                  {slotLottie}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "ic-title-wrap")}
                  tag="div"
                  {...propsTextColor}
                >
                  <Text
                    content={textTitle}
                    weight="medium"
                    size="4"
                    align="center"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-grey-600-3",
                    "inline-block"
                  )}
                  tag="div"
                >
                  {textDescription}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-accent-link")}
                  tag="div"
                  {...onClickSupport}
                >
                  {"contact support"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
