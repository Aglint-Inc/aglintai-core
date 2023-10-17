import React from "react";
import * as _Builtin from "./_Builtin";
import { CandidateSkillPills } from "./CandidateSkillPills";
import * as _utils from "./utils";
import _styles from "./CandidateSkill.module.css";

export function CandidateSkill({
  as: _Component = _Builtin.Block,
  slotCandidateSkill,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cvs-info-block")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"Skills"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cvs-skills-wrapper")}
        tag="div"
      >
        {slotCandidateSkill ?? <CandidateSkillPills />}
      </_Builtin.Block>
    </_Component>
  );
}
