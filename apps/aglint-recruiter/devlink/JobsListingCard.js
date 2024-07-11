"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./JobsListingCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1500":{"id":"e-1500","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-554","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1501"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d2a2d408-40b5-fcac-a4cc-8987465dcabd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d2a2d408-40b5-fcac-a4cc-8987465dcabd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1704344326765},"e-1501":{"id":"e-1501","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-555","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1500"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d2a2d408-40b5-fcac-a4cc-8987465dcabd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d2a2d408-40b5-fcac-a4cc-8987465dcabd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1704344326769},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482},"e-1582":{"id":"e-1582","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-617","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1583"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".pupeline_pill","originalId":"6f5f184b-6b75-7797-d05a-37bcf7d60e88","appliesTo":"CLASS"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1720694305347},"e-1583":{"id":"e-1583","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-618","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1582"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".pupeline_pill","originalId":"6f5f184b-6b75-7797-d05a-37bcf7d60e88","appliesTo":"CLASS"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1720694305349}},"actionLists":{"a-554":{"id":"a-554","title":"job-warn-hover in","actionItemGroups":[{"actionItems":[{"id":"a-554-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".job-desc-warn-wrap","selectorGuids":["2ddfb15d-af64-2f31-db95-76643c0c541e"]},"value":"none"}},{"id":"a-554-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".job-desc-warn-wrap","selectorGuids":["2ddfb15d-af64-2f31-db95-76643c0c541e"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-554-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".job-desc-warn-wrap","selectorGuids":["2ddfb15d-af64-2f31-db95-76643c0c541e"]},"value":"flex"}},{"id":"a-554-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".job-desc-warn-wrap","selectorGuids":["2ddfb15d-af64-2f31-db95-76643c0c541e"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1704344343923},"a-555":{"id":"a-555","title":"job-warn-hover out","actionItemGroups":[{"actionItems":[{"id":"a-555-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".job-desc-warn-wrap","selectorGuids":["2ddfb15d-af64-2f31-db95-76643c0c541e"]},"value":0,"unit":""}},{"id":"a-555-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".job-desc-warn-wrap","selectorGuids":["2ddfb15d-af64-2f31-db95-76643c0c541e"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1704344343923},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402},"a-617":{"id":"a-617","title":"pipeline [hover]","actionItemGroups":[{"actionItems":[{"id":"a-617-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"globalSwatchId":"--neutral-3","target":{"useEventTarget":"CHILDREN","selector":".short_pipeline","selectorGuids":["f1dc6fb7-cb59-b03d-fab2-64ccc315c950"]},"rValue":241,"gValue":240,"bValue":239,"aValue":1}},{"id":"a-617-n-3","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"globalSwatchId":"--neutral-3","target":{"useEventTarget":true,"id":"6f5f184b-6b75-7797-d05a-37bcf7d60e88"},"rValue":241,"gValue":240,"bValue":239,"aValue":1}}]},{"actionItems":[{"id":"a-617-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"easeOut","duration":300,"globalSwatchId":"--neutral-4","target":{"useEventTarget":"CHILDREN","selector":".short_pipeline","selectorGuids":["f1dc6fb7-cb59-b03d-fab2-64ccc315c950"]},"rValue":233,"gValue":232,"bValue":230,"aValue":1}},{"id":"a-617-n-4","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"easeOut","duration":300,"globalSwatchId":"--neutral-4","target":{"useEventTarget":true,"id":"6f5f184b-6b75-7797-d05a-37bcf7d60e88"},"rValue":233,"gValue":232,"bValue":230,"aValue":1}}]}],"createdOn":1720694310006,"useFirstGroupAsInitialState":true},"a-618":{"id":"a-618","title":"pipeline [hover] 2","actionItemGroups":[{"actionItems":[{"id":"a-618-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"easeOut","duration":300,"globalSwatchId":"--neutral-3","target":{"useEventTarget":"CHILDREN","selector":".short_pipeline","selectorGuids":["f1dc6fb7-cb59-b03d-fab2-64ccc315c950"]},"rValue":241,"gValue":240,"bValue":239,"aValue":1}},{"id":"a-618-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"easeOut","duration":300,"globalSwatchId":"--neutral-3","target":{"useEventTarget":true,"id":"6f5f184b-6b75-7797-d05a-37bcf7d60e88"},"rValue":241,"gValue":240,"bValue":239,"aValue":1}}]}],"createdOn":1720694310006,"useFirstGroupAsInitialState":false}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function JobsListingCard({
  as: _Component = _Builtin.Block,
  textJobRole = "Software Developer",
  textCompanyLocation = "Microsoft, California, United States",
  textPostedDate = "Posted 2 months ago",
  assessmentCount = "0",
  qualifiedCount = "0",
  bgColorProps = {},
  textJobsStatus = "Draft",
  onClickCard = {},
  newCount = "0",
  slotAtsBadge,
  isStatusVisible = true,
  textStatus = "This is some text inside of a div block.",
  isJobWarningVisible = true,
  screeningCount = "0",
  disqualifiedCount = "0",
  isScreeningPillsVisible = true,
  isAssessmentPillVisible = true,
  interviewCount = "0",
  isInterviewPillVisible = true,
  onClickNew = {},
  onClickScreening = {},
  onClickAssessment = {},
  onClickInterview = {},
  onClickQualified = {},
  onClickDisqualified = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "rd-job-list-item")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "click_spacer_16")}
        id={_utils.cx(
          _styles,
          "w-node-_461ea21c-dff4-f2e0-3807-df801cb5bccb-e4f6dd07"
        )}
        tag="div"
        {...onClickCard}
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "rd-job-info-wrapper")}
        tag="div"
        {...onClickCard}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-company-info-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "job-details")}
            tag="div"
          >
            <Text content={textJobRole} weight="medium" />
            <_Builtin.Block
              className={_utils.cx(_styles, "tittle-company-location")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "company-location")}
                tag="div"
              >
                <Text content={textCompanyLocation} color="neutral" />
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                {slotAtsBadge ?? <SlotComp componentName="Greenhouse" />}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "flex-horizontal", "center", "gap-3")}
          tag="div"
        >
          {isJobWarningVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "warning-job-wrap")}
              data-w-id="d2a2d408-40b5-fcac-a4cc-8987465dcabd"
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.64062%2019.6875C1.54688%2019.8438%201.5%2020%201.5%2020.1562C1.5625%2020.6875%201.84375%2020.9688%202.34375%2021H21.6562C22.1562%2020.9688%2022.4375%2020.6875%2022.5%2020.1562C22.5%2020%2022.4688%2019.8438%2022.4062%2019.6875L12.9844%203.5625C12.7344%203.1875%2012.4062%203%2012%203C11.5938%203%2011.2812%203.1875%2011.0625%203.5625L1.64062%2019.6875ZM0.328125%2018.9375L9.75%202.8125C10.2812%201.96875%2011.0312%201.53125%2012%201.5C12.9688%201.53125%2013.7188%201.96875%2014.25%202.8125L23.6719%2018.9375C23.8906%2019.3125%2024%2019.7188%2024%2020.1562C23.9688%2020.8125%2023.7344%2021.3594%2023.2969%2021.7969C22.8594%2022.2344%2022.3125%2022.4688%2021.6562%2022.5H2.34375C1.6875%2022.4688%201.14062%2022.2344%200.703125%2021.7969C0.265625%2021.3594%200.03125%2020.8125%200%2020.1562C0%2019.7188%200.109375%2019.3125%200.328125%2018.9375ZM12%207.5C12.4688%207.53125%2012.7188%207.78125%2012.75%208.25V14.25C12.7188%2014.7188%2012.4688%2014.9688%2012%2015C11.5312%2014.9688%2011.2812%2014.7188%2011.25%2014.25V8.25C11.2812%207.78125%2011.5312%207.53125%2012%207.5ZM10.875%2018C10.9375%2017.3125%2011.3125%2016.9375%2012%2016.875C12.6875%2016.9375%2013.0625%2017.3125%2013.125%2018C13.0625%2018.6875%2012.6875%2019.0625%2012%2019.125C11.3125%2019.0625%2010.9375%2018.6875%2010.875%2018Z%22%20fill%3D%22%23D93F4C%22%20style%3D%22fill%3A%23D93F4C%3Bfill%3Acolor(display-p3%200.8510%200.2471%200.2980)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "job-desc-warn-wrap")}
                tag="div"
              >
                <Text content="Missing Job Description" size="1" align="" />
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "rd-status-badge")}
            dyn={{
              bind: {},
            }}
            tag="div"
            {...bgColorProps}
          >
            <Text content={textJobsStatus} size="1" weight="medium" color="" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "applicants-number-wrapper")}
        id={_utils.cx(
          _styles,
          "w-node-a59fdab3-4a41-7f67-5475-8f76c5678d29-e4f6dd07"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "job_card_pipeline")}
          id={_utils.cx(
            _styles,
            "w-node-a59fdab3-4a41-7f67-5475-8f76c5678d2a-e4f6dd07"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "pupeline_pill")}
            tag="div"
            {...onClickNew}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "short_pipeline")}
              tag="div"
            >
              <Text content="New" size="1" color="neutral" />
              <Text content={newCount} size="1" color="neutral" />
            </_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "connecting_embed")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2228%22%20viewBox%3D%220%200%2014%2028%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%200L14%2013.7654L0%2028V0Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          {isScreeningPillsVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "pupeline_pill")}
              tag="div"
              {...onClickScreening}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "short_pipeline")}
                tag="div"
              >
                <Text content="Screening" size="1" color="neutral" />
                <Text content={screeningCount} size="1" color="neutral" />
              </_Builtin.Block>
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "connecting_embed")}
                value="%3Csvg%20width%3D%2214%22%20height%3D%2228%22%20viewBox%3D%220%200%2014%2028%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%200L14%2013.7654L0%2028V0Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.HtmlEmbed
                className={_utils.cx(
                  _styles,
                  "connecting_embed",
                  "is_absolute"
                )}
                value="%3Csvg%20width%3D%2213%22%20height%3D%2228%22%20viewBox%3D%220%200%2013%2028%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13%200V28H0C0%2028%2013%2014.7865%2013%2014C13%2013.2135%200%200%200%200H13Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          ) : null}
          {isAssessmentPillVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "pupeline_pill")}
              tag="div"
              {...onClickAssessment}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "short_pipeline")}
                tag="div"
              >
                <Text content="Assessment" size="1" color="neutral" />
                <Text content={assessmentCount} size="1" color="neutral" />
              </_Builtin.Block>
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "connecting_embed")}
                value="%3Csvg%20width%3D%2214%22%20height%3D%2228%22%20viewBox%3D%220%200%2014%2028%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%200L14%2013.7654L0%2028V0Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.HtmlEmbed
                className={_utils.cx(
                  _styles,
                  "connecting_embed",
                  "is_absolute"
                )}
                value="%3Csvg%20width%3D%2213%22%20height%3D%2228%22%20viewBox%3D%220%200%2013%2028%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13%200V28H0C0%2028%2013%2014.7865%2013%2014C13%2013.2135%200%200%200%200H13Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          ) : null}
          {isInterviewPillVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "pupeline_pill")}
              tag="div"
              {...onClickInterview}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "short_pipeline")}
                tag="div"
              >
                <Text content="Interview" size="1" color="neutral" />
                <Text content={interviewCount} size="1" color="neutral" />
              </_Builtin.Block>
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "connecting_embed")}
                value="%3Csvg%20width%3D%2214%22%20height%3D%2228%22%20viewBox%3D%220%200%2014%2028%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%200L14%2013.7654L0%2028V0Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.HtmlEmbed
                className={_utils.cx(
                  _styles,
                  "connecting_embed",
                  "is_absolute"
                )}
                value="%3Csvg%20width%3D%2213%22%20height%3D%2228%22%20viewBox%3D%220%200%2013%2028%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13%200V28H0C0%2028%2013%2014.7865%2013%2014C13%2013.2135%200%200%200%200H13Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "pupeline_pill")}
            tag="div"
            {...onClickQualified}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "short_pipeline")}
              tag="div"
            >
              <Text content="Qualified" size="1" color="neutral" />
              <Text content={qualifiedCount} size="1" color="neutral" />
            </_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "connecting_embed")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2228%22%20viewBox%3D%220%200%2014%2028%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%200L14%2013.7654L0%2028V0Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "connecting_embed", "is_absolute")}
              value="%3Csvg%20width%3D%2213%22%20height%3D%2228%22%20viewBox%3D%220%200%2013%2028%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13%200V28H0C0%2028%2013%2014.7865%2013%2014C13%2013.2135%200%200%200%200H13Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "pupeline_pill")}
            tag="div"
            {...onClickDisqualified}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "short_pipeline")}
              tag="div"
            >
              <Text content="Disqualified" size="1" color="neutral" />
              <Text content={disqualifiedCount} size="1" color="neutral" />
            </_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "connecting_embed", "is_absolute")}
              value="%3Csvg%20width%3D%2213%22%20height%3D%2228%22%20viewBox%3D%220%200%2013%2028%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13%200V28H0C0%2028%2013%2014.7865%2013%2014C13%2013.2135%200%200%200%200H13Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "flex_end_cursdor")}
          id={_utils.cx(
            _styles,
            "w-node-fd801a9c-fafd-cb7f-ee44-ae19a9fdb141-e4f6dd07"
          )}
          tag="div"
          {...onClickCard}
        >
          <Text content={textPostedDate} color="neutral" size="1" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "click_spacer_16")}
        id={_utils.cx(
          _styles,
          "w-node-f1d789ae-0dc9-e05d-864a-d3bce827e58c-e4f6dd07"
        )}
        tag="div"
        {...onClickCard}
      />
    </_Component>
  );
}
