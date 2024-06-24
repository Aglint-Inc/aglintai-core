"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { FeedbackScore } from "./FeedbackScore";
import { DetailedFeedbackButton } from "./DetailedFeedbackButton";
import * as _utils from "./utils";
import _styles from "./CandidateInterviewScore.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateInterviewScore({
  as: _Component = _Builtin.Block,
  slotInterviewFeedbackScore,
  slotAssessmentScore,
  propsCollapse = {},
  onClickCard = {},
  onClickIcons = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "jd-analysis-wrap")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "jd-analysis-header-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "jd-analysis-header-left")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "cd_title")} tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.125%203C2.86979%203%202.66016%203.08203%202.49609%203.24609C2.33203%203.41016%202.25%203.61979%202.25%203.875V12.625C2.25%2012.8802%202.33203%2013.0898%202.49609%2013.2539C2.66016%2013.418%202.86979%2013.5%203.125%2013.5H11.875C12.1302%2013.5%2012.3398%2013.418%2012.5039%2013.2539C12.668%2013.0898%2012.75%2012.8802%2012.75%2012.625V3.875C12.75%203.61979%2012.668%203.41016%2012.5039%203.24609C12.3398%203.08203%2012.1302%203%2011.875%203H3.125ZM1.375%203.875C1.39323%203.38281%201.56641%202.97266%201.89453%202.64453C2.22266%202.31641%202.63281%202.14323%203.125%202.125H11.875C12.3672%202.14323%2012.7773%202.31641%2013.1055%202.64453C13.4336%202.97266%2013.6068%203.38281%2013.625%203.875V12.625C13.6068%2013.1172%2013.4336%2013.5273%2013.1055%2013.8555C12.7773%2014.1836%2012.3672%2014.3568%2011.875%2014.375H3.125C2.63281%2014.3568%202.22266%2014.1836%201.89453%2013.8555C1.56641%2013.5273%201.39323%2013.1172%201.375%2012.625V3.875ZM5.75%208.46875H7.0625C7.22656%208.46875%207.35417%208.53255%207.44531%208.66016C7.51823%208.80599%207.52734%208.95182%207.47266%209.09766L6.92578%2010.2461L9.25%208.03125H7.9375C7.77344%208.03125%207.65495%207.96745%207.58203%207.83984C7.49089%207.69401%207.48177%207.54818%207.55469%207.40234L8.07422%206.25391L5.75%208.46875ZM9.08594%204.3125C9.28646%204.33073%209.44141%204.41276%209.55078%204.55859C9.64193%204.72266%209.65104%204.90495%209.57812%205.10547L8.62109%207.15625H9.96094C10.3255%207.19271%2010.526%207.39323%2010.5625%207.75781C10.5625%207.92188%2010.4987%208.05859%2010.3711%208.16797L6.29688%2012.0508C6.1875%2012.1419%206.0599%2012.1875%205.91406%2012.1875C5.71354%2012.1693%205.55859%2012.0872%205.44922%2011.9414C5.35807%2011.7773%205.34896%2011.6042%205.42188%2011.4219L6.37891%209.34375H5.03906C4.67448%209.30729%204.47396%209.10677%204.4375%208.74219C4.4375%208.57812%204.5013%208.44141%204.62891%208.33203L8.70312%204.47656C8.8125%204.36719%208.9401%204.3125%209.08594%204.3125Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <Text weight="medium" content="Assesment" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "jd-analysis-right")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotAssessmentScore}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "dropdown-icon-wrap")}
            tag="div"
            {...onClickIcons}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.60156%204.60156C7.86719%204.38281%208.13281%204.38281%208.39844%204.60156L12.8984%209.10156C13.1172%209.36719%2013.1172%209.63281%2012.8984%209.89844C12.6328%2010.1172%2012.3672%2010.1172%2012.1016%209.89844L8%205.79688L3.89844%209.89844C3.63281%2010.1172%203.36719%2010.1172%203.10156%209.89844C2.88281%209.63281%202.88281%209.36719%203.10156%209.10156L7.60156%204.60156Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div" {...propsCollapse}>
        <_Builtin.Block
          className={_utils.cx(_styles, "cvs-score-details-wrapper")}
          tag="div"
        >
          {slotInterviewFeedbackScore ?? (
            <>
              <FeedbackScore />
              <DetailedFeedbackButton />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
