import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ScreeningQuestionMenu.module.css";

export function ScreeningQuestionMenu({
  as: _Component = _Builtin.Block,
  onClickSkill = {},
  isSkillOn = false,
  isSkillMenuActive = false,
  textSkills = "Soft Skills",
  textNoofQuestions = "0 Questions",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "active-question-menu-wrappers")}
      tag="div"
      {...onClickSkill}
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-488")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-487")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {textSkills}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "radio-btn-wrappers-green", "hide")}
            tag="div"
          >
            {isSkillOn ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "radio-green-active")}
                tag="div"
              />
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "color-grey-600")}
          tag="div"
        >
          {textNoofQuestions}
        </_Builtin.Block>
      </_Builtin.Block>
      {isSkillMenuActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "active-question-active")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
