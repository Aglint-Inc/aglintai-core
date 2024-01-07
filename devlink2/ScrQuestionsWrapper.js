import React from "react";
import * as _Builtin from "./_Builtin";
import { ScrQuestionOption } from "./ScrQuestionOption";
import * as _utils from "./utils";
import _styles from "./ScrQuestionsWrapper.module.css";

export function ScrQuestionsWrapper({
  as: _Component = _Builtin.Block,
  slotQuestions,
  slotOptions,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "scr-questions-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "scr-questions-block")}
        tag="div"
      >
        {slotQuestions ?? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-416")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-400")}
              tag="div"
            >
              {"No Questions added. Add atleast one question."}
            </_Builtin.Block>
          </_Builtin.Block>
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scr-options-wrapper")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Add screening questions"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-options-block")}
          tag="div"
        >
          {slotOptions ?? <ScrQuestionOption />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
