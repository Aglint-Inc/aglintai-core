import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonOutlinedRegular } from "./ButtonOutlinedRegular";
import { ScoreCard } from "./ScoreCard";
import * as _utils from "./utils";
import _styles from "./ScoreSetting.module.css";

export function ScoreSetting({
  as: _Component = _Builtin.Block,
  slotScoreCardDetails,
  isEmptyWarningVisible = false,
  onClickDismiss = {},
  onClickRegenerate = {},
  isRegenerateVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "score-setting-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-713")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Profile Score"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {
            "Setup scoring criteria encompassing experience, skills, and education. Specify necessary criteria in each section, and our system will generate a candidate score by comparing it with the details provided in their resume."
          }
        </_Builtin.Block>
      </_Builtin.Block>
      {isEmptyWarningVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-696")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-793")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8%2016C6.54167%2015.9792%205.20833%2015.625%204%2014.9375C2.79167%2014.2292%201.8125%2013.25%201.0625%2012C0.354167%2010.7292%200%209.39583%200%208C0%206.60417%200.354167%205.27083%201.0625%204C1.8125%202.75%202.79167%201.77083%204%201.0625C5.20833%200.375%206.54167%200.0208333%208%200C9.45833%200.0208333%2010.7917%200.375%2012%201.0625C13.2083%201.77083%2014.1875%202.75%2014.9375%204C15.6458%205.27083%2016%206.60417%2016%208C16%209.39583%2015.6458%2010.7292%2014.9375%2012C14.1875%2013.25%2013.2083%2014.2292%2012%2014.9375C10.7917%2015.625%209.45833%2015.9792%208%2016ZM6.75%2010.5C6.29167%2010.5417%206.04167%2010.7917%206%2011.25C6.04167%2011.7083%206.29167%2011.9583%206.75%2012H9.25C9.70833%2011.9583%209.95833%2011.7083%2010%2011.25C9.95833%2010.7917%209.70833%2010.5417%209.25%2010.5H9V7.75C8.95833%207.29167%208.70833%207.04167%208.25%207H6.75C6.29167%207.04167%206.04167%207.29167%206%207.75C6.04167%208.20833%206.29167%208.45833%206.75%208.5H7.5V10.5H6.75ZM8%204C7.70833%204%207.46875%204.09375%207.28125%204.28125C7.09375%204.46875%207%204.70833%207%205C7%205.29167%207.09375%205.53125%207.28125%205.71875C7.46875%205.90625%207.70833%206%208%206C8.29167%206%208.53125%205.90625%208.71875%205.71875C8.90625%205.53125%209%205.29167%209%205C9%204.70833%208.90625%204.46875%208.71875%204.28125C8.53125%204.09375%208.29167%204%208%204Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-yellow-800", "fw-semibold")}
              tag="div"
            >
              {"The job description is currently empty."}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-yellow-800")}
            tag="div"
          >
            {
              "To automatically populate score settings, please provide a job description or add the details manually."
            }
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isRegenerateVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "discard-btn-score")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-699")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8%2016C6.54167%2015.9792%205.20833%2015.625%204%2014.9375C2.79167%2014.2292%201.8125%2013.25%201.0625%2012C0.354167%2010.7292%200%209.39583%200%208C0%206.60417%200.354167%205.27083%201.0625%204C1.8125%202.75%202.79167%201.77083%204%201.0625C5.20833%200.375%206.54167%200.0208333%208%200C9.45833%200.0208333%2010.7917%200.375%2012%201.0625C13.2083%201.77083%2014.1875%202.75%2014.9375%204C15.6458%205.27083%2016%206.60417%2016%208C16%209.39583%2015.6458%2010.7292%2014.9375%2012C14.1875%2013.25%2013.2083%2014.2292%2012%2014.9375C10.7917%2015.625%209.45833%2015.9792%208%2016ZM6.75%2010.5C6.29167%2010.5417%206.04167%2010.7917%206%2011.25C6.04167%2011.7083%206.29167%2011.9583%206.75%2012H9.25C9.70833%2011.9583%209.95833%2011.7083%2010%2011.25C9.95833%2010.7917%209.70833%2010.5417%209.25%2010.5H9V7.75C8.95833%207.29167%208.70833%207.04167%208.25%207H6.75C6.29167%207.04167%206.04167%207.29167%206%207.75C6.04167%208.20833%206.29167%208.45833%206.75%208.5H7.5V10.5H6.75ZM8%204C7.70833%204%207.46875%204.09375%207.28125%204.28125C7.09375%204.46875%207%204.70833%207%205C7%205.29167%207.09375%205.53125%207.28125%205.71875C7.46875%205.90625%207.70833%206%208%206C8.29167%206%208.53125%205.90625%208.71875%205.71875C8.90625%205.53125%209%205.29167%209%205C9%204.70833%208.90625%204.46875%208.71875%204.28125C8.53125%204.09375%208.29167%204%208%204Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-yellow-800")}
              tag="div"
            >
              {"The job description is changed. Click to regenerate."}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-700")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-block-29", "cursor-pointer")}
              tag="div"
              {...onClickDismiss}
            >
              {"Dismiss"}
            </_Builtin.Block>
            <_Builtin.Block tag="div" {...onClickRegenerate}>
              <ButtonOutlinedRegular textLabel="Regenerate" />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "div-block-661")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "indicate-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "indicator-box", "blue-200")}
            tag="div"
          />
          <_Builtin.Block tag="div">{"Must have"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "indicate-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "indicator-box", "grey-200")}
            tag="div"
          />
          <_Builtin.Block tag="div">{"Nice to have"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "score-outer-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "left-score-wrap")}
            tag="div"
          >
            {slotScoreCardDetails ?? <ScoreCard />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
