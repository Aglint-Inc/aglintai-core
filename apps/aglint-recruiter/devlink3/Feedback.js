"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSurface } from "./ButtonSurface";
import * as _utils from "./utils";
import _styles from "./Feedback.module.css";

export function Feedback({
  as: _Component = _Builtin.Block,
  textRecommendLevel = "Strongly recommended (9/10)",
  textFeedback = "During the interview, the candidate showcased a strong understanding of both front-end and back-end development concepts. They effectively demonstrated their proficiency in various programming languages and frameworks. Their problem-solving skills and ability to communicate technical ideas were impressive. Overall, the candidate appears to be a promising fit for the full stack developer role.",
  onClickEditFeedback = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "feedback-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "feedback-header-wrap")}
        tag="div"
      >
        <Text content="" />
        <Text content={textRecommendLevel} weight="" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "feedback-header-wrap")}
        tag="div"
      >
        <Text content="Feedback" weight="medium" />
        <Text content={textFeedback} weight="" color="neutral" />
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <ButtonSurface
          onClickButton={onClickEditFeedback}
          size="1"
          isLeftIcon={false}
          isRightIcon={false}
          textButton="Edit Feedback"
        />
      </_Builtin.Block>
    </_Component>
  );
}
