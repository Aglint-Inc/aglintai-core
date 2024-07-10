"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import { ResumeTag } from "./ResumeTag";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./CandidateListItem.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-95":{"id":"e-95","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-43","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-96"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674268504},"e-96":{"id":"e-96","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-44","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-95"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674268505},"e-97":{"id":"e-97","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-43","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-98"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674452716},"e-98":{"id":"e-98","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-44","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-97"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674452717}},"actionLists":{"a-43":{"id":"a-43","title":"cv-list-item-[hover-in]","actionItemGroups":[{"actionItems":[{"id":"a-43-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":"none"}},{"id":"a-43-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".insight-tag-block","selectorGuids":["e2211e58-ae69-8faf-e33f-dd30da3caa54"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-43-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-43-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":"block"}}]},{"actionItems":[{"id":"a-43-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":1,"unit":""}},{"id":"a-43-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".insight-tag-block","selectorGuids":["e2211e58-ae69-8faf-e33f-dd30da3caa54"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1701674273368},"a-44":{"id":"a-44","title":"cv-list-item-[hover-out]","actionItemGroups":[{"actionItems":[{"id":"a-44-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":0,"unit":""}},{"id":"a-44-n-3","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".insight-tag-block","selectorGuids":["e2211e58-ae69-8faf-e33f-dd30da3caa54"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}}]},{"actionItems":[{"id":"a-44-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1701674379205}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateListItem({
  as: _Component = _Builtin.Block,
  onClickSelect = {},
  slotProfileImage,
  name = "Tyson",
  appliedDate = "--",
  location = "--",
  jobTitle = "--",
  slotDisqualified,
  isDisqualifiedVisible = true,
  isInterviewVisible = true,
  slotAssessmentScore,
  slotScreening,
  isScreeningVisible = true,
  slotResumeScore,
  isChecked = true,
  onClickCandidate = {},
  isHighlighted = false,
  propsDrag = {},
  isDragVisible = false,
  isNewBadgeVisible = false,
  isBookmarkedVisible = false,
  slotBookmark,
  slotInterviewPipline,
  isAssessmentVisible = true,
  highlightType,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "candidate-list-item-wrap")}
      tag="div"
    >
      {isHighlighted ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-item-highlight")}
          tag="div"
          data-highlight-state={highlightType}
        />
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-column-check-wrap")}
        tag="div"
        table-column="checkbox"
      >
        <_Builtin.Block className={_utils.cx(_styles, "drag_icon")} tag="div">
          {isDragVisible ? (
            <_Builtin.Block tag="div" {...propsDrag}>
              <GlobalIcon iconName="drag_indicator" />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        {isHighlighted ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-item-highlight")}
            tag="div"
            data-highlight-state={highlightType}
          />
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column")}
          tag="div"
          {...onClickSelect}
        >
          <_Builtin.Block className={_utils.cx(_styles, "checkbox")} tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "default_state")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%203C0%201.34315%201.34315%200%203%200H13C14.6569%200%2016%201.34315%2016%203V13C16%2014.6569%2014.6569%2016%2013%2016H3C1.34315%2016%200%2014.6569%200%2013V3Z%22%20fill%3D%22white%22%20fill-opacity%3D%220.9%22%2F%3E%0A%3Cpath%20d%3D%22M0.5%203C0.5%201.61929%201.61929%200.5%203%200.5H13C14.3807%200.5%2015.5%201.61929%2015.5%203V13C15.5%2014.3807%2014.3807%2015.5%2013%2015.5H3C1.61929%2015.5%200.5%2014.3807%200.5%2013V3Z%22%20stroke%3D%22%23191400%22%20stroke-opacity%3D%220.207843%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            {isChecked ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "active_chechbox")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_3656_41550)%22%3E%0A%3Cpath%20d%3D%22M0%203C0%201.34315%201.34315%200%203%200H13C14.6569%200%2016%201.34315%2016%203V13C16%2014.6569%2014.6569%2016%2013%2016H3C1.34315%2016%200%2014.6569%200%2013V3Z%22%20fill%3D%22%23F76B15%22%2F%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.2316%203.97594C12.5397%204.17744%2012.6262%204.5906%2012.4247%204.89876L7.89138%2011.8321C7.78455%2011.9955%207.61146%2012.1038%207.41782%2012.1285C7.22416%2012.1533%207.02941%2012.0918%206.88495%2011.9605L3.95162%209.29389C3.67918%209.04622%203.65911%208.62458%203.90678%208.35215C4.15445%208.07971%204.57608%208.05962%204.84851%208.3073L7.20331%2010.448L11.3088%204.1691C11.5103%203.86094%2011.9234%203.77446%2012.2316%203.97594Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_3656_41550%22%3E%0A%3Cpath%20d%3D%22M0%203C0%201.34315%201.34315%200%203%200H13C14.6569%200%2016%201.34315%2016%203V13C16%2014.6569%2014.6569%2016%2013%2016H3C1.34315%2016%200%2014.6569%200%2013V3Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
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
        table-column="candidate-name"
        {...onClickCandidate}
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
          >
            {slotProfileImage}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%204C0%201.79086%201.79086%200%204%200H20C22.2091%200%2024%201.79086%2024%204V20C24%2022.2091%2022.2091%2024%2020%2024H4C1.79086%2024%200%2022.2091%200%2020V4Z%22%20fill%3D%22%238D8D86%22%2F%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20transform%3D%22translate(4%204)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.0001%204.93359C9.86464%204.93359%208.13347%206.66476%208.13347%208.80026C8.13347%2010.5633%209.31346%2012.0508%2010.9268%2012.516C9.65315%2012.6712%208.56074%2013.1217%207.73781%2013.9327C6.69044%2014.965%206.16016%2016.5016%206.16016%2018.5068C6.16016%2018.7867%206.387%2019.0135%206.66682%2019.0135C6.94665%2019.0135%207.17349%2018.7867%207.17349%2018.5068C7.17349%2016.6722%207.65652%2015.4356%208.44911%2014.6544C9.24319%2013.8719%2010.4287%2013.4669%2012.0001%2013.4669C13.5715%2013.4669%2014.757%2013.8719%2015.5512%2014.6545C16.3437%2015.4356%2016.8268%2016.6722%2016.8268%2018.5068C16.8268%2018.7867%2017.0536%2019.0135%2017.3335%2019.0135C17.6133%2019.0136%2017.8401%2018.7867%2017.8401%2018.5069C17.8401%2016.5016%2017.3098%2014.965%2016.2624%2013.9327C15.4395%2013.1217%2014.3471%2012.6712%2013.0735%2012.516C14.6867%2012.0508%2015.8668%2010.5633%2015.8668%208.80026C15.8668%206.66476%2014.1356%204.93359%2012.0001%204.93359ZM9.1468%208.80026C9.1468%207.22441%2010.4243%205.94693%2012.0001%205.94693C13.576%205.94693%2014.8535%207.22441%2014.8535%208.80026C14.8535%2010.3761%2013.576%2011.6536%2012.0001%2011.6536C10.4243%2011.6536%209.1468%2010.3761%209.1468%208.80026Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-no-wrap")}
            tag="div"
          >
            <Text content={name} />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "bookmark_slot")}
            tag="div"
          >
            {slotBookmark}
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
        table-column="resume-match"
        {...onClickCandidate}
      >
        {isHighlighted ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-item-highlight")}
            tag="div"
            data-highlight-state={highlightType}
          />
        ) : null}
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
          {slotResumeScore ?? <ResumeTag />}
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
          {...onClickCandidate}
        >
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-item-highlight")}
              tag="div"
              data-highlight-state={highlightType}
            />
          ) : null}
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
            {slotInterviewPipline ?? <ResumeTag />}
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
          {...onClickCandidate}
        >
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-item-highlight")}
              tag="div"
              data-highlight-state={highlightType}
            />
          ) : null}
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
            {slotScreening ?? <SlotComp componentName="ScreeningStatus" />}
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
          {...onClickCandidate}
        >
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-item-highlight")}
              tag="div"
              data-highlight-state={highlightType}
            />
          ) : null}
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
            {slotAssessmentScore ?? (
              <SlotComp componentName="AssessmentScore" />
            )}
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
          {...onClickCandidate}
        >
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-item-highlight")}
              tag="div"
              data-highlight-state={highlightType}
            />
          ) : null}
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
            {slotDisqualified ?? <SlotComp componentName="disqualified" />}
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
        {...onClickCandidate}
      >
        {isHighlighted ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-item-highlight")}
            tag="div"
            data-highlight-state={highlightType}
          />
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-hover-bg")}
          tag="div"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "job", "width-100")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-titlecase", "text-no-wrap")}
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
        table-column="location"
        {...onClickCandidate}
      >
        {isHighlighted ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-item-highlight")}
            tag="div"
            data-highlight-state={highlightType}
          />
        ) : null}
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
            className={_utils.cx(_styles, "text-titlecase", "text-no-wrap")}
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
        table-column="applied-date"
        {...onClickCandidate}
      >
        {isHighlighted ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-item-highlight")}
            tag="div"
            data-highlight-state={highlightType}
          />
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-hover-bg")}
          tag="div"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "date", "width-100")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-no-wrap")}
            tag="div"
          >
            {appliedDate}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_css")}
        value="%3Cstyle%3E%0A%5Bdata-highlight-state%3D%22checked%22%5D%20%7B%0A%20%20%20%20background-color%3A%20var(--neutral-2)%3B%0A%7D%0A%5Bdata-highlight-state%3D%22hover%22%5D%20%7B%0A%20%20%20%20background-color%3A%20var(--neutral-3)%3B%0A%7D%0A%5Bdata-highlight-state%3D%22highlighted%22%5D%20%7B%0A%20%20%20%20background-color%3A%20var(--neutral-3)%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
