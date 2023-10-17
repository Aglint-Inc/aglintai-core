import React from "react";
import * as _Builtin from "./_Builtin";
import { CandidateExperienceCard } from "./CandidateExperienceCard";
import * as _utils from "./utils";
import _styles from "./CandidateExperience.module.css";

export function CandidateExperience({
  as: _Component = _Builtin.Block,
  slotCandidateExperienceCard,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cvs-info-block")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"Experiences"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cvs-experiences-wrapper")}
        tag="div"
      >
        {slotCandidateExperienceCard ?? <CandidateExperienceCard />}
      </_Builtin.Block>
    </_Component>
  );
}
