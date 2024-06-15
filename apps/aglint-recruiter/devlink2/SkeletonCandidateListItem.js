"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Skeleton } from "./Skeleton";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./SkeletonCandidateListItem.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-95":{"id":"e-95","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-43","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-96"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674268504},"e-96":{"id":"e-96","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-44","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-95"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674268505},"e-97":{"id":"e-97","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-43","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-98"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674452716},"e-98":{"id":"e-98","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-44","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-97"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674452717}},"actionLists":{"a-43":{"id":"a-43","title":"cv-list-item-[hover-in]","actionItemGroups":[{"actionItems":[{"id":"a-43-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":"none"}},{"id":"a-43-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".insight-tag-block","selectorGuids":["e2211e58-ae69-8faf-e33f-dd30da3caa54"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-43-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-43-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":"block"}}]},{"actionItems":[{"id":"a-43-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":1,"unit":""}},{"id":"a-43-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".insight-tag-block","selectorGuids":["e2211e58-ae69-8faf-e33f-dd30da3caa54"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1701674273368},"a-44":{"id":"a-44","title":"cv-list-item-[hover-out]","actionItemGroups":[{"actionItems":[{"id":"a-44-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":0,"unit":""}},{"id":"a-44-n-3","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".insight-tag-block","selectorGuids":["e2211e58-ae69-8faf-e33f-dd30da3caa54"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}}]},{"actionItems":[{"id":"a-44-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1701674379205}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SkeletonCandidateListItem({
  as: _Component = _Builtin.Block,
  isInterviewVisible = false,
  isScreeningVisible = false,
  isAssessmentVisible = false,
  isDisqualifiedVisible = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(
        _styles,
        "candidate-list-item-wrap",
        "skeleton_height"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-column-check-wrap-copy")}
        tag="div"
        table-column="checkbox"
      >
        <_Builtin.Block className={_utils.cx(_styles, "drag_icon")} tag="div" />
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "checkbox_skeleton")}
            tag="div"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "cv-list-column-wrapper",
          "items-v-center"
        )}
        tag="div"
        table-column="candidate-name"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-hover-bg")}
          tag="div"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "name", "width-100")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-profile-image", "hide")}
            tag="div"
          />
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "candidate_avatar")}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-no-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ske_text_regular", "width_200")}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "bookmark_slot")}
            tag="div"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "cv-list-column-wrapper",
          "items-v-center"
        )}
        tag="div"
        table-column="resume-match"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-hover-bg")}
          tag="div"
        />
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "cv-list-column",
            "resume",
            "width-100"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ske_badge-copy")}
            tag="div"
          >
            <Skeleton />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isInterviewVisible ? (
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "cv-list-column-wrapper",
            "items-v-center",
            "z_index"
          )}
          tag="div"
          table-column="interview"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-hover-bg")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cv-list-column",
              "resume",
              "width-100"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ske_schedule_progress")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "schedule_progress_pills-copy")}
                tag="div"
                change-bgcolor="true"
              >
                <Skeleton />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "schedule_progress_pills-copy")}
                tag="div"
                change-bgcolor="true"
              >
                <Skeleton />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "schedule_progress_pills-copy")}
                tag="div"
                change-bgcolor="true"
              >
                <Skeleton />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "schedule_progress_pills-copy")}
                tag="div"
                change-bgcolor="true"
              >
                <Skeleton />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isScreeningVisible ? (
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "cv-list-column-wrapper",
            "items-v-center"
          )}
          tag="div"
          table-column="screening"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-hover-bg")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cv-list-column",
              "screening",
              "width-100"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ske_text_regular", "width_200")}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isAssessmentVisible ? (
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "cv-list-column-wrapper",
            "items-v-center"
          )}
          tag="div"
          table-column="assessment"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-hover-bg")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cv-list-column",
              "assessment",
              "width-100"
            )}
            tag="div"
          >
            <SlotComp componentName="AssessmentScore" />
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
          table-column="disqualified-email"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-hover-bg")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cv-list-column",
              "disqualified",
              "width-100"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ske_text_regular", "width_200")}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
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
        table-column="job-title"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-hover-bg")}
          tag="div"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "job", "width-100")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ske_text_regular", "width_200")}
            tag="div"
          >
            <Skeleton />
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
        table-column="location"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-hover-bg")}
          tag="div"
        />
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "cv-list-column",
            "location",
            "width-100"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ske_text_regular", "width_200")}
            tag="div"
          >
            <Skeleton />
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
        table-column="applied-date"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-hover-bg")}
          tag="div"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "date", "width-100")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ske_text_regular", "width_200")}
            tag="div"
          >
            <Skeleton />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
