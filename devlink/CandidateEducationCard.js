import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateEducationCard.module.css";

export function CandidateEducationCard({
  as: _Component = _Builtin.Block,
  slotEducationLogo,
  textUniversityName = "University Of Waterloo",
  textDate = "May 2015",
}) {
  return (
    <_Component className={_utils.cx(_styles, "cvs-education-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cvs-school-info-block")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textUniversityName}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text-grey-500")}
          tag="div"
        >
          {textDate}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
