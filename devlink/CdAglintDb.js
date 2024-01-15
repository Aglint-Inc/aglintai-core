import React from "react";
import * as _Builtin from "./_Builtin";
import { CdTableAglint } from "./CdTableAglint";
import * as _utils from "./utils";
import _styles from "./CdAglintDb.module.css";

export function CdAglintDb({
  as: _Component = _Builtin.Block,
  onClickEditQuery = {},
  slotToggle,
  onClickCandidateData = {},
  textHeader = "Software Enginner in Texas with 6 to 8 years experience",
  slotCheckbox,
  slotCdTableAglint,
  isSelectedVisible = false,
  onClickCloseSelected = {},
  textNoCandidateSelected = "3 candidates selected",
  onClickBookmark = {},
  isHeaderVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cd-table")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-680")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-679")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-600", "fw-semibold")}
            tag="div"
            {...onClickCandidateData}
          >
            {"Candidate database"}
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.64645%2010.3536C3.47288%2010.18%203.4536%209.91056%203.58859%209.71569L3.64645%209.64645L7.293%206L3.64645%202.35355C3.47288%202.17999%203.4536%201.91056%203.58859%201.71569L3.64645%201.64645C3.82001%201.47288%204.08944%201.4536%204.28431%201.58859L4.35355%201.64645L8.35355%205.64645C8.52712%205.82001%208.5464%206.08944%208.41141%206.28431L8.35355%206.35355L4.35355%2010.3536C4.15829%2010.5488%203.84171%2010.5488%203.64645%2010.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{textHeader}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "edit-query-btn", "cursor-pointer")}
            tag="div"
            {...onClickEditQuery}
          >
            {"Edit Query"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-681")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotToggle}</_Builtin.Block>
          <_Builtin.Block tag="div">{"Show only bookmarked"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cd-table-wrap-aglint")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cd-table-aglint-header")}
          tag="div"
        >
          {isHeaderVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-682")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cand-head-wrap")}
                tag="div"
              >
                <_Builtin.Block tag="div">{slotCheckbox}</_Builtin.Block>
                <_Builtin.Block tag="div">{"Candidate"}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "experince-head-wrap")}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  {"Experience History"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isSelectedVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-692")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-693")}
                tag="div"
                {...onClickCloseSelected}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.1562%2010.8438L6%206.71875L1.875%2010.8438C1.625%2011.0312%201.38542%2011.0312%201.15625%2010.8438C0.96875%2010.6146%200.96875%2010.3854%201.15625%2010.1562L5.28125%206L1.15625%201.875C0.96875%201.625%200.96875%201.38542%201.15625%201.15625C1.38542%200.96875%201.625%200.96875%201.875%201.15625L6%205.28125L10.1562%201.15625C10.3854%200.96875%2010.6146%200.96875%2010.8438%201.15625C11.0312%201.38542%2011.0312%201.625%2010.8438%201.875L6.71875%206L10.8438%2010.1562C11.0312%2010.3854%2011.0312%2010.6146%2010.8438%2010.8438C10.6146%2011.0312%2010.3854%2011.0312%2010.1562%2010.8438Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-blue-800")}
                tag="div"
              >
                {textNoCandidateSelected}
              </_Builtin.Block>
              <_Builtin.Block tag="div" />
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "div-block-694",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickBookmark}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.25098%204.0625C5.2692%203.69792%205.39681%203.38802%205.63379%203.13281C5.889%202.89583%206.19889%202.76823%206.56348%202.75H14.4385C14.8031%202.76823%2015.113%202.89583%2015.3682%203.13281C15.6051%203.38802%2015.7327%203.69792%2015.751%204.0625V16.1484C15.7145%2016.513%2015.514%2016.7135%2015.1494%2016.75C15.0218%2016.75%2014.9124%2016.7135%2014.8213%2016.6406L10.501%2013.7695L6.18066%2016.6406C6.08952%2016.7135%205.98014%2016.75%205.85254%2016.75C5.48795%2016.7135%205.28743%2016.513%205.25098%2016.1484V4.0625ZM6.56348%203.625C6.29004%203.64323%206.1442%203.78906%206.12598%204.0625V15.6289L10.2549%2012.8945C10.4189%2012.7852%2010.583%2012.7852%2010.7471%2012.8945L14.876%2015.6289V4.0625C14.8577%203.78906%2014.7119%203.64323%2014.4385%203.625H6.56348Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-blue-500")}
                  tag="div"
                >
                  {"Bookmark Selected"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-691")}
          tag="div"
        >
          {slotCdTableAglint ?? <CdTableAglint />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
