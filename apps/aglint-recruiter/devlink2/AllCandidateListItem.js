"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ResumeTag } from "./ResumeTag";
import { ScreeningStatus } from "./ScreeningStatus";
import { AssessmentScore } from "./AssessmentScore";
import * as _utils from "./utils";
import _styles from "./AllCandidateListItem.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-95":{"id":"e-95","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-43","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-96"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674268504},"e-96":{"id":"e-96","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-44","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-95"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674268505},"e-97":{"id":"e-97","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-43","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-98"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674452716},"e-98":{"id":"e-98","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-44","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-97"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674452717}},"actionLists":{"a-43":{"id":"a-43","title":"cv-list-item-[hover-in]","actionItemGroups":[{"actionItems":[{"id":"a-43-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":"none"}},{"id":"a-43-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".insight-tag-block","selectorGuids":["e2211e58-ae69-8faf-e33f-dd30da3caa54"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-43-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-43-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":"block"}}]},{"actionItems":[{"id":"a-43-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":1,"unit":""}},{"id":"a-43-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".insight-tag-block","selectorGuids":["e2211e58-ae69-8faf-e33f-dd30da3caa54"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1701674273368},"a-44":{"id":"a-44","title":"cv-list-item-[hover-out]","actionItemGroups":[{"actionItems":[{"id":"a-44-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":0,"unit":""}},{"id":"a-44-n-3","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".insight-tag-block","selectorGuids":["e2211e58-ae69-8faf-e33f-dd30da3caa54"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}}]},{"actionItems":[{"id":"a-44-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1701674379205}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AllCandidateListItem({
  as: _Component = _Builtin.Block,
  onclickSelect = {},
  isChecked = false,
  slotProfileImage,
  name = "Dianne Russell",
  jobTitle = "--",
  isInterviewVisible = true,
  slotResumeScore,
  slotAssessmentScore,
  isHighlighted = false,
  appliedDate = "--",
  onclickCandidate = {},
  experience = "--",
  location = "--",
  isScreeningVisible = true,
  slotScreening,
  isDisqualifiedVisible = true,
  slotDisqualified,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "cv-list-row", "item")} tag="div">
      {isHighlighted ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-item-highlight")}
          tag="div"
        />
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-hover-bg")}
        tag="div"
      />
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "cv-list-column-wrapper",
          "width-auto",
          "items-v-center"
        )}
        tag="div"
        {...onclickSelect}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-checkbox")}
            tag="div"
          >
            {isChecked ? (
              <_Builtin.Image
                className={_utils.cx(_styles, "cli-check-image")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/6530fd234c567296fc1dc71f_Frame%201%20(2).png"
              />
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-row-main")}
        tag="div"
        {...onclickCandidate}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "cv-list-column-wrapper",
            "items-v-center"
          )}
          tag="div"
        >
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-item-highlight")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-hover-bg")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "name")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-profile-image")}
              tag="div"
            >
              {slotProfileImage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "line-clamp-1")}
              tag="div"
            >
              {name}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "cv-list-column-wrapper",
            "items-v-center"
          )}
          tag="div"
        >
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-item-highlight")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-hover-bg")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "resume")}
            tag="div"
          >
            {slotResumeScore ?? <ResumeTag />}
          </_Builtin.Block>
        </_Builtin.Block>
        {isScreeningVisible ? (
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cv-list-column-wrapper",
              "items-v-center"
            )}
            tag="div"
          >
            {isHighlighted ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-list-item-highlight")}
                tag="div"
              />
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-hover-bg")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-column", "screening")}
              tag="div"
            >
              {slotScreening ?? (
                <ScreeningStatus
                  textStatus="Invited"
                  textDuration="3 hour ago"
                />
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isInterviewVisible ? (
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cv-list-column-wrapper",
              "items-v-center"
            )}
            tag="div"
          >
            {isHighlighted ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-list-item-highlight")}
                tag="div"
              />
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-hover-bg")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-column", "assessment")}
              tag="div"
            >
              {slotAssessmentScore ?? <AssessmentScore />}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isDisqualifiedVisible ? (
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cv-list-column-wrapper",
              "items-v-center"
            )}
            tag="div"
          >
            {isHighlighted ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-list-item-highlight")}
                tag="div"
              />
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-hover-bg")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-column", "disqualified")}
              tag="div"
            >
              {slotDisqualified ?? <AssessmentScore />}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "cv-list-column-wrapper",
            "items-v-center"
          )}
          tag="div"
        >
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-item-highlight")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-hover-bg")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "job")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-titlecase")}
              tag="div"
            >
              {jobTitle}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "cv-list-column-wrapper",
            "items-v-center"
          )}
          tag="div"
        >
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-item-highlight")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-hover-bg")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "location")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-titlecase")}
              tag="div"
            >
              {location}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "cv-list-column-wrapper",
            "items-v-center"
          )}
          tag="div"
        >
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-item-highlight")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-hover-bg")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "date")}
            tag="div"
          >
            <_Builtin.Block tag="div">{appliedDate}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A.line-clamp-1%20%7B%0Adisplay%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%201%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%20%20%0A%20%20overflow%3A%20hidden%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
