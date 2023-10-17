import React from "react";
import * as _Builtin from "./_Builtin";
import { CandidateEducationCard } from "./CandidateEducationCard";
import * as _utils from "./utils";
import _styles from "./CandidateEducation.module.css";

export function CandidateEducation({
  as: _Component = _Builtin.Block,
  slotEducationCard,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cvs-info-block")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"Education"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cvs-education-wrapper")}
        tag="div"
      >
        {slotEducationCard ?? <CandidateEducationCard />}
      </_Builtin.Block>
    </_Component>
  );
}
