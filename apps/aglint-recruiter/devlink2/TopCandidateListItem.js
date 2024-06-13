"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { InsightTagEmpty } from "./InsightTagEmpty";
import { AnalysisBlock } from "./AnalysisBlock";
import * as _utils from "./utils";
import _styles from "./TopCandidateListItem.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-95":{"id":"e-95","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-43","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-96"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674268504},"e-96":{"id":"e-96","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-44","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-95"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674268505},"e-97":{"id":"e-97","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-43","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-98"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674452716},"e-98":{"id":"e-98","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-44","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-97"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674452717}},"actionLists":{"a-43":{"id":"a-43","title":"cv-list-item-[hover-in]","actionItemGroups":[{"actionItems":[{"id":"a-43-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":"none"}},{"id":"a-43-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".insight-tag-block","selectorGuids":["e2211e58-ae69-8faf-e33f-dd30da3caa54"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-43-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-43-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":"block"}}]},{"actionItems":[{"id":"a-43-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":1,"unit":""}},{"id":"a-43-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".insight-tag-block","selectorGuids":["e2211e58-ae69-8faf-e33f-dd30da3caa54"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1701674273368},"a-44":{"id":"a-44","title":"cv-list-item-[hover-out]","actionItemGroups":[{"actionItems":[{"id":"a-44-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":0,"unit":""}},{"id":"a-44-n-3","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".insight-tag-block","selectorGuids":["e2211e58-ae69-8faf-e33f-dd30da3caa54"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}}]},{"actionItems":[{"id":"a-44-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1701674379205}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TopCandidateListItem({
  as: _Component = _Builtin.Block,
  onclickSelect = {},
  isChecked = false,
  slotScores,
  name = "Dianne Russell",
  overview = "--",
  onclickCandidate = {},
  isHighlighted = false,
  slotInsights,
  slotProfileImage,
  slotAnalysis,
  isDragVisible = false,
  onClickDrag = {},
  slotBookmark,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "cv-list-row", "top-can")}
      tag="div"
    >
      {isHighlighted ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "top-can-highlight")}
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
          "gap-6"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1312")}
          tag="div"
        >
          {isDragVisible ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2216%22%20viewbox%3D%220%200%2014%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14%206C13.9792%206.3125%2013.8125%206.47917%2013.5%206.5H0.5C0.1875%206.47917%200.0208333%206.3125%200%206C0.0208333%205.6875%200.1875%205.52083%200.5%205.5H13.5C13.8125%205.52083%2013.9792%205.6875%2014%206ZM14%2010C13.9792%2010.3125%2013.8125%2010.4792%2013.5%2010.5H0.5C0.1875%2010.4792%200.0208333%2010.3125%200%2010C0.0208333%209.6875%200.1875%209.52083%200.5%209.5H13.5C13.8125%209.52083%2013.9792%209.6875%2014%2010Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              {...onClickDrag}
            />
          ) : null}
        </_Builtin.Block>
        {isHighlighted ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "top-can-highlight")}
            tag="div"
          />
        ) : null}
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column")}
            tag="div"
            {...onclickSelect}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-checkbox")}
              tag="div"
            >
              {isChecked ? (
                <_Builtin.Image
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
          className={_utils.cx(_styles, "cv-list-hover-bg")}
          tag="div"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-row-main", "pointer")}
        tag="div"
        {...onclickCandidate}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-wrapper", "name")}
          tag="div"
        >
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "top-can-highlight")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-hover-bg")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "name", "top-can")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "top-can-info")}
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
                  value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2223.5%22%20height%3D%2223.5%22%20rx%3D%2211.75%22%20fill%3D%22%23F8F9F9%22%2F%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2223.5%22%20height%3D%2223.5%22%20rx%3D%2211.75%22%20stroke%3D%22%23D8DCDE%22%20stroke-width%3D%220.5%22%2F%3E%0A%3Cpath%20d%3D%22M12%2012C11.4531%2012%2010.9531%2011.8672%2010.5%2011.6016C10.0469%2011.3359%209.67969%2010.9688%209.39844%2010.5C9.13281%2010.0312%209%209.53125%209%209C9%208.46875%209.13281%207.96875%209.39844%207.5C9.67969%207.03125%2010.0469%206.66406%2010.5%206.39844C10.9531%206.13281%2011.4531%206%2012%206C12.5469%206%2013.0469%206.13281%2013.5%206.39844C13.9531%206.66406%2014.3203%207.03125%2014.6016%207.5C14.8672%207.96875%2015%208.46875%2015%209C15%209.53125%2014.8672%2010.0312%2014.6016%2010.5C14.3203%2010.9688%2013.9531%2011.3359%2013.5%2011.6016C13.0469%2011.8672%2012.5469%2012%2012%2012ZM10.9219%2013.125H13.0781C14.25%2013.1562%2015.2344%2013.5625%2016.0312%2014.3438C16.8125%2015.1406%2017.2188%2016.125%2017.25%2017.2969C17.25%2017.5%2017.1797%2017.6641%2017.0391%2017.7891C16.9141%2017.9297%2016.75%2018%2016.5469%2018H7.45312C7.25%2018%207.08594%2017.9297%206.96094%2017.7891C6.82031%2017.6641%206.75%2017.5%206.75%2017.2969C6.78125%2016.125%207.1875%2015.1406%207.96875%2014.3438C8.76562%2013.5625%209.75%2013.1562%2010.9219%2013.125Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold", "line-clamp-1")}
                tag="div"
              >
                {name}
              </_Builtin.Block>
              <_Builtin.Block tag="div">{slotBookmark}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "top-can-info")}
              tag="div"
            >
              {slotScores}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "top-can-info", "insights")}
              tag="div"
            >
              {slotInsights ?? <InsightTagEmpty />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-wrapper")}
          tag="div"
        >
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "top-can-highlight")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-hover-bg")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "overview")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {overview}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-wrapper", "z-10")}
          tag="div"
        >
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "top-can-highlight")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-hover-bg")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "analysis")}
            tag="div"
          >
            {slotAnalysis ?? (
              <AnalysisBlock
                description="The candidate's prior work experiences align closely with the job requirements, showcasing leadership, community engagement, content creation, and strategic planning, which are essential for the Head of Developer Experience role. "
                title="Experience"
              />
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
