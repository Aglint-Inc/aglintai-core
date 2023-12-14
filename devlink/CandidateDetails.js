import React from "react";
import * as _Builtin from "./_Builtin";
import { CandidateInterviewScore } from "./CandidateInterviewScore";
import { CandidateResumeScore } from "./CandidateResumeScore";
import { CandidateExperience } from "./CandidateExperience";
import { CandidateEducation } from "./CandidateEducation";
import { CandidateSkill } from "./CandidateSkill";
import * as _utils from "./utils";
import _styles from "./CandidateDetails.module.css";

export function CandidateDetails({
  as: _Component = _Builtin.Block,
  onClickScore = {},
  onClickEducation = {},
  onClickExperience = {},
  onClickSkills = {},
  slotInterviewScore,
  slotResumeScore,
  slotEducation,
  slotExperiences,
  slotSkills,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cv-sidebar-info-wrapper")}
      tag="div"
    >
      <_Builtin.NavbarWrapper
        className={_utils.cx(_styles, "cvs-info-navbar", "hide")}
        tag="div"
        config={{
          animation: "default",
          collapse: "medium",
          docHeight: false,
          duration: 400,
          easing: "ease",
          easing2: "ease",
          noScroll: false,
        }}
      >
        <_Builtin.NavbarMenu
          className={_utils.cx(_styles, "cvs-info-nav-menu")}
          tag="nav"
          role="navigation"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cvs-nav-link")}
            tag="div"
            {...onClickScore}
          >
            <_Builtin.Block tag="div">{"Score"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cvs-nav-link")}
            tag="div"
            {...onClickEducation}
          >
            <_Builtin.Block tag="div">{"Education"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cvs-nav-link")}
            tag="div"
            {...onClickExperience}
          >
            <_Builtin.Block tag="div">{"Experience"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cvs-nav-link")}
            tag="div"
            {...onClickSkills}
          >
            <_Builtin.Block tag="div">{"Skills"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.NavbarMenu>
        <_Builtin.NavbarButton className={_utils.cx(_styles, "hide")} tag="div">
          <_Builtin.Icon
            widget={{
              type: "icon",
              icon: "nav-menu",
            }}
          />
        </_Builtin.NavbarButton>
      </_Builtin.NavbarWrapper>
      <_Builtin.Block
        className={_utils.cx(_styles, "cvs-info-content-main")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-517")}
          tag="div"
        >
          {slotInterviewScore ?? (
            <>
              <CandidateInterviewScore />
              <CandidateResumeScore />
              <CandidateExperience />
              <CandidateEducation />
              <CandidateSkill />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed className={_utils.cx(_styles, "hide")} />
    </_Component>
  );
}
