import React from "react";
import * as _Builtin from "./_Builtin";
import { AssessmentTypeIcon } from "./AssessmentTypeIcon";
import { TemplateStatus } from "./TemplateStatus";
import { SelectButton } from "./SelectButton";
import { AssessmentLevel } from "./AssessmentLevel";
import { AssessmentDuration } from "./AssessmentDuration";
import * as _utils from "./utils";
import _styles from "./AssessmentCard.module.css";

export function AssessmentCard({
  as: _Component = _Builtin.Block,
  slotAssessmentType,
  textAssessmentName = "Advanced Networking in Google Cloud Platform (GCP)-two line clamp",
  slotDurationAndLevel,
  textDescription = "This assessment evaluates a candidate's proficiency in NodeJS, focusing on their ability to solve more complex problems(four line clamp)",
  slotAssessmentStatus,
  onClickCard = {},
  isActive = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "template_card")}
      id={_utils.cx(
        _styles,
        "w-node-d0a92917-6550-8e4b-545d-b401d8294966-d8294966"
      )}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "card_top_content")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "card_top_bar")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "assesment_type_icon")}
            tag="div"
          >
            {slotAssessmentType ?? <AssessmentTypeIcon />}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "template_status_block")}
            tag="div"
          >
            {slotAssessmentStatus ?? (
              <>
                <TemplateStatus />
                <SelectButton />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "card_text_wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "two_line_clamp")}
            tag="div"
          >
            {textAssessmentName}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600", "four_line_clamp")}
            tag="div"
          >
            {textDescription}
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_css")}
            value="%3Cstyle%3E%0A.four_line_clamp%7B%0Aoverflow%3A%20hidden%3B%0A%20%20display%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%204%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%0A%20%20line-height%3A%201.3%20!important%3B%0A%20%20max-height%3A%20calc(1%20*%204)%3B%0A%7D%0A.two_line_clamp%7B%0Aoverflow%3A%20hidden%3B%0A%20%20display%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%202%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%0A%20%20line-height%3A%201.5%20!important%3B%0A%20%20max-height%3A%20calc(1%20*%202)%3B%0A%7D%0A%3C%2Fstyle%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "card_bottom_bar")}
        tag="div"
      >
        {slotDurationAndLevel ?? (
          <>
            <AssessmentLevel />
            <AssessmentDuration />
          </>
        )}
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "is_active_bg_blue")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
