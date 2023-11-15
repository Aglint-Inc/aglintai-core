import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AssessmentScrollMenu.module.css";

export function AssessmentScrollMenu({
  as: _Component = _Builtin.Block,
  isInstructionActive = false,
  isAssessmentActive = false,
  isWelcomeActive = false,
  isAssessmentQuestionActive = false,
  isEpilogueActive = false,
  onClickInstructions = {},
  onClickAssessmentMode = {},
  onClickWelcome = {},
  onClickAssessmentQuestions = {},
  onClickEpilogue = {},
  onClickPreview = {},
  isValidityVisible = false,
  onClickValidity = {},

  linkMode = {
    href: "#",
  },

  linkInstruction = {
    href: "#",
  },
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-566")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-564")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "scroll-btn-menu")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-563")}
            tag="div"
            {...onClickInstructions}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Instructions"}
            </_Builtin.Block>
          </_Builtin.Block>
          {isInstructionActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "active-blue-bg")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Instructions"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scroll-btn-menu")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-563")}
            tag="div"
            {...onClickAssessmentMode}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Assessment Mode"}
            </_Builtin.Block>
          </_Builtin.Block>
          {isAssessmentActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "active-blue-bg")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Assessment Mode"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scroll-btn-menu")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-563")}
            tag="div"
            {...onClickWelcome}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Welcome "}
            </_Builtin.Block>
          </_Builtin.Block>
          {isWelcomeActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "active-blue-bg")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Welcome"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scroll-btn-menu")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-563")}
            tag="div"
            {...onClickAssessmentQuestions}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Assessment Questions"}
            </_Builtin.Block>
          </_Builtin.Block>
          {isAssessmentQuestionActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "active-blue-bg")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Assessment Questions"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scroll-btn-menu")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-563")}
            tag="div"
            {...onClickEpilogue}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Epilogue"}
            </_Builtin.Block>
          </_Builtin.Block>
          {isEpilogueActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "active-blue-bg")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Epilogue"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scroll-btn-menu")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-563")}
            tag="div"
            {...onClickValidity}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Assessment Validity"}
            </_Builtin.Block>
          </_Builtin.Block>
          {isValidityVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "active-blue-bg")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Assessment Validity"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "preview-wrap-side-edit")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          {"Preview how candidates are taking assessment"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "button-border-icon")}
          tag="div"
          {...onClickPreview}
        >
          <_Builtin.Block tag="div">{"Preview"}</_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M11.5%202C11.7455%202%2011.9496%202.17688%2011.9919%202.41012L12%202.5V5.5C12%205.77614%2011.7761%206%2011.5%206C11.2545%206%2011.0504%205.82312%2011.0081%205.58988L11%205.5V3.706L6.85355%207.85355C6.67999%208.02712%206.41056%208.0464%206.21569%207.91141L6.14645%207.85355L4.5%206.207L0.853553%209.85355C0.679987%2010.0271%200.410563%2010.0464%200.215695%209.91141L0.146447%209.85355C-0.0271197%209.67999%20-0.0464049%209.41056%200.0885912%209.21569L0.146447%209.14645L4.14645%205.14645C4.32001%204.97288%204.58944%204.9536%204.78431%205.08859L4.85355%205.14645L6.5%206.793L10.292%203H8.5C8.25454%203%208.05039%202.82312%208.00806%202.58988L8%202.5C8%202.25454%208.17688%202.05039%208.41012%202.00806L8.5%202H11.5Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
