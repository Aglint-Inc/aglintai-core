import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateEducationCard.module.css";

export function CandidateEducationCard({
  as: _Component = _Builtin.Block,
  slotEducationLogo,
  textUniversityName = "University Of Waterloo",
  textDate = "May 2015",
  isBadgeVisible = false,
  textDegree = "Degree",
  textGpa = "May 2015",
  isDegreeVisible = true,
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
        {isDegreeVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "degree-date-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-grey-500")}
              tag="div"
            >
              {textDegree}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-grey-500")}
              tag="div"
            >
              {textGpa}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text-grey-500")}
          tag="div"
        >
          {textDate}
        </_Builtin.Block>
      </_Builtin.Block>
      {isBadgeVisible ? (
        <_Builtin.Block className={_utils.cx(_styles, "book-badge")} tag="div">
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/65688591babca220e69dae21_%F0%9F%93%9A.svg"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
