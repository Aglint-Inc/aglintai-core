import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateSkill.module.css";

export function CandidateSkill({
  as: _Component = _Builtin.Block,
  slotCandidateSkill,
  isSkillBadgeVisible = true,
  textSkillCount = "2",
  slotOtherSkill,
  isNumberVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cvs-info-block")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"Skills"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "relevant-skills-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Relevent Skills"}</_Builtin.Block>
        {isSkillBadgeVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-623")}
            tag="div"
          >
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/656886d6d7862e31b00d4eb4_%F0%9F%9B%A0%EF%B8%8F.svg"
            />
            {isNumberVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "notifi-number")}
                tag="div"
              >
                <_Builtin.Block tag="div">{textSkillCount}</_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cvs-skills-wrapper")}
        tag="div"
      >
        {slotCandidateSkill ?? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-628")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {"No relevent skills found"}
            </_Builtin.Block>
          </_Builtin.Block>
        )}
      </_Builtin.Block>
      <_Builtin.Block tag="div">{"Other Skills"}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cvs-skills-wrapper")}
        tag="div"
      >
        {slotOtherSkill ?? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-628")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"No other skills found"}</_Builtin.Block>
          </_Builtin.Block>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
