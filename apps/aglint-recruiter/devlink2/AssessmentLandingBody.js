"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AssessmentCard } from "./AssessmentCard";
import { AssesmentCardLoader } from "./AssesmentCardLoader";
import { AssessmentEmpty } from "./AssessmentEmpty";
import { AssessmentError } from "./AssessmentError";
import * as _utils from "./utils";
import _styles from "./AssessmentLandingBody.module.css";

export function AssessmentLandingBody({
  as: _Component = _Builtin.Block,
  slotSearchAndFilter,
  slotAssessmentCards,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "assessment_landing_body")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "assesment_landing_search_filters")}
        tag="div"
      >
        {slotSearchAndFilter}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "assessment_landing_cards")}
        tag="div"
      >
        {slotAssessmentCards ?? (
          <>
            <AssessmentCard />
            <AssessmentCard />
            <AssessmentCard />
            <AssessmentCard />
            <AssesmentCardLoader />
            <AssesmentCardLoader />
            <AssesmentCardLoader />
            <AssessmentEmpty />
            <AssessmentError />
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_css")}
              id={_utils.cx(
                _styles,
                "w-node-_02762ae1-fc6a-acba-3807-0e6f09e14fe5-f5d3a218"
              )}
              value="%3Cstyle%3E%0A%40media%20(min-width%3A%201920px)%20%7B%0A%20%20%5Bclass%20*%3D%22AssessmentLandingBody_assessment_landing_cards__%22%5D%7B%0A%20%20%20%20%20grid-template-columns%3A%201fr%201fr%201fr%201fr%201fr%20!important%3B%0A%20%20%7D%0A%7D%0A%40media%20(min-width%3A%201920px)%20%7B%0A%20.assessment_landing_cards%20%7B%0A%20%20%20%20%20grid-template-columns%3A%201fr%201fr%201fr%201fr%201fr%20!important%3B%0A%20%20%7D%0A%7D%0A%3C%2Fstyle%3E"
            />
          </>
        )}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%5Bclass%20*%3D%20%22AssessmentLandingBody_assessment_landing_body%22%5D%7B%0Aheight%3A%20calc(100vh%20-%2060px)%3B%0Aoverflow%3A%20auto%0A%7D%0A.assessment_landing_body%7B%0Aheight%3A%20calc(100vh%20-%2060px)%3B%0Aoverflow%3A%20auto%3B%0A%7D%0A%3C%2Fstyle%3E" />
    </_Component>
  );
}
