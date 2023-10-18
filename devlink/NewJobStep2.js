import React from "react";
import * as _Builtin from "./_Builtin";
import { CreateBtn } from "./CreateBtn";
import { SkillPill } from "./SkillPill";
import { SuggestedSkillPill } from "./SuggestedSkillPill";
import * as _utils from "./utils";
import _styles from "./NewJobStep2.module.css";

export function NewJobStep2({
  as: _Component = _Builtin.Block,
  slotJobDescription,
  onClickAddSkill = {},
  slotAddedSkill,
  slotSuggestedSkill,
  isAddSkillVisible = true,
  slotRequiredSKill,
  isJobHeaderVisible = true,
  onClickGenerate = {},
  isGenerateVisible = true,
  onClickProceed = {},
  isProceedDisable = true,
  isAddJob = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "job-sidebar-main-block", "cj-step-2")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-main-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cj-input-wrapper", "pb-80")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Job Description"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-richtext-editor-wrapper")}
            tag="div"
          >
            {slotJobDescription}
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "cj-skills")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-add-skill-wrapper")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Required Skills"}</_Builtin.Block>
              <_Builtin.Block tag="div">
                {slotRequiredSKill ??
                  (isAddSkillVisible ? (
                    <_Builtin.Block tag="div" {...onClickAddSkill}>
                      <CreateBtn />
                    </_Builtin.Block>
                  ) : null)}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-skills-wrapper")}
                tag="div"
              >
                {slotAddedSkill ?? <SkillPill />}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-suggested-skills")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-424")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-suggested-skills-header")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    {"Suggested skills"}
                  </_Builtin.Block>
                  <_Builtin.Image
                    className={_utils.cx(_styles, "image-27")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890155_Vectors-Wrapper.svg"
                  />
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-grey-600")}
                    tag="div"
                  >
                    {"Click on the ‘+’ icon to add the suggested skill."}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-skills-wrapper")}
                tag="div"
              >
                {slotSuggestedSkill ?? <SuggestedSkillPill />}
              </_Builtin.Block>
              {isGenerateVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "content-11", "active")}
                  tag="div"
                  {...onClickGenerate}
                >
                  <_Builtin.Image
                    className={_utils.cx(_styles, "vectors-wrapper-55")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890239_glitter.svg"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "label-5")}
                    tag="div"
                  >
                    {"Generate"}
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
          {isAddJob ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "job-details-button-wrappers")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "proceed-to-apply")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "blue-process-button")}
                  tag="div"
                  {...onClickProceed}
                >
                  <_Builtin.Block tag="div">
                    {"Proceed to score setting"}
                  </_Builtin.Block>
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1464%202.24645C9.95118%202.44171%209.95118%202.75829%2010.1464%202.95355L14.1929%207L0.499999%207C0.223857%207%20-5.04966e-07%207.22386%20-4.80825e-07%207.5C-4.56684e-07%207.77614%200.223857%208%200.5%208L14.2929%208L10.1464%2012.1464C9.95118%2012.3417%209.95118%2012.6583%2010.1464%2012.8536C10.3417%2013.0488%2010.6583%2013.0488%2010.8536%2012.8536L15.4536%208.25355C15.8488%207.85829%2015.8488%207.24171%2015.4536%206.84645L10.8536%202.24645C10.6583%202.05119%2010.3417%202.05119%2010.1464%202.24645Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                {isProceedDisable ? (
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "grey-disable-process-button"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">
                      {"Proceed to score setting"}
                    </_Builtin.Block>
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1464%202.24645C9.95118%202.44171%209.95118%202.75829%2010.1464%202.95355L14.1929%207L0.499999%207C0.223857%207%20-5.04966e-07%207.22386%20-4.80825e-07%207.5C-4.56684e-07%207.77614%200.223857%208%200.5%208L14.2929%208L10.1464%2012.1464C9.95118%2012.3417%209.95118%2012.6583%2010.1464%2012.8536C10.3417%2013.0488%2010.6583%2013.0488%2010.8536%2012.8536L15.4536%208.25355C15.8488%207.85829%2015.8488%207.24171%2015.4536%206.84645L10.8536%202.24645C10.6583%202.05119%2010.3417%202.05119%2010.1464%202.24645Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
