import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { AllCandidateListItem } from "./AllCandidateListItem";
import * as _utils from "./utils";
import _styles from "./AllApplicantsTable.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-95":{"id":"e-95","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-43","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-96"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674268504},"e-96":{"id":"e-96","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-44","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-95"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.top-can","originalId":"e2ae3f20-b813-1c10-8749-8648735c3a4c","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674268505},"e-97":{"id":"e-97","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-43","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-98"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674452716},"e-98":{"id":"e-98","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-44","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-97"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-row.item","originalId":"6419febc-c02e-9e10-d61a-4c2f0f690af2","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701674452717},"e-99":{"id":"e-99","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-100"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"df8c3229-e2a4-f876-5f0b-3b425c09dfec","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"df8c3229-e2a4-f876-5f0b-3b425c09dfec","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1702474506136},"e-100":{"id":"e-100","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-99"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"df8c3229-e2a4-f876-5f0b-3b425c09dfec","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"df8c3229-e2a4-f876-5f0b-3b425c09dfec","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1702474506137},"e-111":{"id":"e-111","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-112"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"655f2f4631d8eb1b56b11d1b|96a4ada4-a0e7-9701-071e-e7e706b8bb67","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"655f2f4631d8eb1b56b11d1b|96a4ada4-a0e7-9701-071e-e7e706b8bb67","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1704878932837},"e-112":{"id":"e-112","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-111"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"655f2f4631d8eb1b56b11d1b|96a4ada4-a0e7-9701-071e-e7e706b8bb67","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"655f2f4631d8eb1b56b11d1b|96a4ada4-a0e7-9701-071e-e7e706b8bb67","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1704878932837}},"actionLists":{"a-43":{"id":"a-43","title":"cv-list-item-[hover-in]","actionItemGroups":[{"actionItems":[{"id":"a-43-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":"none"}},{"id":"a-43-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".insight-tag-block","selectorGuids":["e2211e58-ae69-8faf-e33f-dd30da3caa54"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-43-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-43-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":"block"}}]},{"actionItems":[{"id":"a-43-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":1,"unit":""}},{"id":"a-43-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".insight-tag-block","selectorGuids":["e2211e58-ae69-8faf-e33f-dd30da3caa54"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1701674273368},"a-44":{"id":"a-44","title":"cv-list-item-[hover-out]","actionItemGroups":[{"actionItems":[{"id":"a-44-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":0,"unit":""}},{"id":"a-44-n-3","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".insight-tag-block","selectorGuids":["e2211e58-ae69-8faf-e33f-dd30da3caa54"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}}]},{"actionItems":[{"id":"a-44-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-list-hover-bg","selectorGuids":["bb10184d-40d3-dbd9-05b6-7f39bd6d77b5"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1701674379205},"a-45":{"id":"a-45","title":"rsm-icon-[hover-in]","actionItemGroups":[{"actionItems":[{"id":"a-45-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".resume-match-stat-details","selectorGuids":["edea53fc-1049-2f26-b523-df1138eb3288"]},"value":"none"}}]},{"actionItems":[{"id":"a-45-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".resume-match-stat-details","selectorGuids":["edea53fc-1049-2f26-b523-df1138eb3288"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1702474513950},"a-46":{"id":"a-46","title":"rms-icon-[hover-out]","actionItemGroups":[{"actionItems":[{"id":"a-46-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".resume-match-stat-details","selectorGuids":["edea53fc-1049-2f26-b523-df1138eb3288"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1702474552041}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AllApplicantsTable({
  as: _Component = _Builtin.Block,
  onclickSelectAll = {},
  isAllChecked = false,
  isInterviewVisible = true,
  slotCandidatesList,
  topMatchCount = "--",
  goodMatchCount = "--",
  averageMatchCount = "--",
  belowMatchCount = "--",
  noMatchCount = "--",
  notFoundCount = "--",
  isScreeningVisible = true,
  isDisqualifiedVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "cv-list")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1278")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-row", "top")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cv-list-column-wrapper",
              "header",
              "width-auto",
              "no_border-copy"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-column")}
              tag="div"
              {...onclickSelectAll}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-list-checkbox")}
                tag="div"
              >
                {isAllChecked ? (
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
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-list-checkbox-ghost", "hide")}
                tag="div"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-row-main")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-column-wrapper", "header")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "cv-list-column",
                  "name",
                  "overflow-visible"
                )}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Candidate"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-column-wrapper", "header")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "cv-list-column",
                  "resume",
                  "overflow-visible"
                )}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Resume Match"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            {isScreeningVisible ? (
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "cv-list-column-wrapper",
                  "header"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "cv-list-column",
                    "screening",
                    "overflow-visible"
                  )}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    {"Screening Status"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            {isInterviewVisible ? (
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "cv-list-column-wrapper",
                  "header"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "cv-list-column",
                    "assessment",
                    "overflow-visible"
                  )}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    {"Assessment Score"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            {isDisqualifiedVisible ? (
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "cv-list-column-wrapper",
                  "header"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "cv-list-column",
                    "disqualified",
                    "overflow-visible"
                  )}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    {"Disqualified Email"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-column-wrapper", "header")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "cv-list-column",
                  "job",
                  "overflow-visible"
                )}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Current Job Title"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-column-wrapper", "header")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "cv-list-column",
                  "location",
                  "overflow-visible"
                )}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Location"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-column-wrapper", "header")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "cv-list-column",
                  "date",
                  "overflow-visible"
                )}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Applied Date"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1277")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-body")}
          tag="div"
        >
          {slotCandidatesList ?? <AllCandidateListItem />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
