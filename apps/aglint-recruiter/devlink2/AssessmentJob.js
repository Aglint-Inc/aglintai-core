"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { EmptyAssessmentList } from "./EmptyAssessmentList";
import { AssessmentListCard } from "./AssessmentListCard";
import { AssessmentListCardLoader } from "./AssessmentListCardLoader";
import * as _utils from "./utils";
import _styles from "./AssessmentJob.module.css";

export function AssessmentJob({
  as: _Component = _Builtin.Block,
  slotAssessmentCard,
  slotInstructions,
  slotRight,
  slotAssessmentList,
  onClickBrowseTemplates = {},
  isBrowseTemplatesVisible = true,
  slotSuccessMessage,
  isRecommendedVisible = false,
  isSidePanel = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "assessment-list-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "assessment_left")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1033")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Assesment List"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {"Choose assessment templates to setup assessment."}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1062")}
            tag="div"
          >
            {slotAssessmentList ?? (
              <>
                <EmptyAssessmentList />
                <AssessmentListCard />
                <AssessmentListCardLoader />
              </>
            )}
          </_Builtin.Block>
          {isBrowseTemplatesVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1063", "cursor-pointer")}
              tag="div"
              {...onClickBrowseTemplates}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.125%200.5625C7.15625%200.21875%207.34375%200.03125%207.6875%200H11.4375C11.7812%200.03125%2011.9688%200.21875%2012%200.5625V4.3125C11.9688%204.65625%2011.7812%204.84375%2011.4375%204.875C11.0938%204.84375%2010.9062%204.65625%2010.875%204.3125V1.92188L5.64844%207.14844C5.38281%207.36719%205.11719%207.36719%204.85156%207.14844C4.63281%206.88281%204.63281%206.61719%204.85156%206.35156L10.0781%201.125H7.6875C7.34375%201.09375%207.15625%200.90625%207.125%200.5625ZM1.6875%200.75H4.6875C5.03125%200.78125%205.21875%200.96875%205.25%201.3125C5.21875%201.65625%205.03125%201.84375%204.6875%201.875H1.6875C1.34375%201.90625%201.15625%202.09375%201.125%202.4375V10.3125C1.15625%2010.6562%201.34375%2010.8438%201.6875%2010.875H9.5625C9.90625%2010.8438%2010.0938%2010.6562%2010.125%2010.3125V7.3125C10.1562%206.96875%2010.3438%206.78125%2010.6875%206.75C11.0312%206.78125%2011.2188%206.96875%2011.25%207.3125V10.3125C11.2344%2010.7969%2011.0703%2011.1953%2010.7578%2011.5078C10.4453%2011.8203%2010.0469%2011.9844%209.5625%2012H1.6875C1.20312%2011.9844%200.804688%2011.8203%200.492188%2011.5078C0.179688%2011.1953%200.015625%2010.7969%200%2010.3125V2.4375C0.015625%201.95312%200.179688%201.55469%200.492188%201.24219C0.804688%200.929688%201.20312%200.765625%201.6875%200.75Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-blue-500")}
                tag="div"
              >
                {"Browse Your Templates"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isRecommendedVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {"Recommended Assessments"}
            </_Builtin.Block>
          ) : null}
          {isRecommendedVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1036")}
              tag="div"
            >
              {slotAssessmentCard}
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1044")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Instructions"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {
                "Instructions will be shown to the candidate in tha landing screen of assessment"
              }
            </_Builtin.Block>
            <_Builtin.Block tag="div">{slotInstructions}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1044")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Success Message"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {
                "This message will be shown to the candidate once he completes the all choosen assessments."
              }
            </_Builtin.Block>
            <_Builtin.Block tag="div">{slotSuccessMessage}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isSidePanel ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1030")}
          tag="div"
        >
          {slotRight}
        </_Builtin.Block>
      ) : null}
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_css")}
        value="%3Cstyle%3E%0A%5Bclass%20*%3D%20%22AssessmentJob_assessment_left__%22%5D%7B%0A%09height%3A%20calc(100vh%20-%2060px)%3B%0A%7D%0A%5Bclass%20*%3D%20%22AssessmentJob_assessment-list-wrap__%22%5D%7B%0A%09height%3A%20calc(100vh%20-%2060px)%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
