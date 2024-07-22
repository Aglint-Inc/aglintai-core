"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSoft } from "./ButtonSoft";
import * as _utils from "./utils";
import _styles from "./FeedbackTableRow.module.css";

export function FeedbackTableRow({
  as: _Component = _Builtin.Block,
  textInterviewerName = "Westly Snedger",
  textjobTitle = "Prodct Designer",
  slotAvatar,
  textRecommendation = "Strongly Recommended (9/10)",
  textFeedback = "During the interview, the candidate showcased a strong understanding of both front-end and..",
  onClickFeedback = {},
  textSessionTime = "12 Feb 2024 09:00 AM to 09:30 PM",
  textSessionTitle = "Company Introduction",
  isAddFeedback = false,
  isNoFeedback = false,
  isSessionVisible = false,
  onClickRequestFeedback = {},
  onClickResendRequest = {},
  isFeedbackReqSubmitted = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "feedbackrow")}
      tag="div"
      {...onClickFeedback}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewer_details")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "inteerviewr_avatar")}
          tag="div"
        >
          {slotAvatar ?? (
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d8b0e9fcc50326d2974c84_user3.png"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "one-line-clamp")}
          tag="div"
        >
          <Text content={textInterviewerName} weight="medium" />
          <Text content={textjobTitle} weight="regular" color="neutral" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {isSessionVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "session_colum_fixed_width")}
            tag="div"
          >
            <Text content={textSessionTime} weight="regular" color="neutral" />
            <Text content={textSessionTitle} />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "recommendation_info")}
        tag="div"
      >
        <Text content={textRecommendation} weight="regular" />
        {isAddFeedback ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "feedbackemptyadmin")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "feedback-link-wrap")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.5625%201.6875V5.4375H10.3125C10.6562%205.46875%2010.8438%205.65625%2010.875%206C10.8438%206.34375%2010.6562%206.53125%2010.3125%206.5625H6.5625V10.3125C6.53125%2010.6562%206.34375%2010.8438%206%2010.875C5.65625%2010.8438%205.46875%2010.6562%205.4375%2010.3125V6.5625H1.6875C1.34375%206.53125%201.15625%206.34375%201.125%206C1.15625%205.65625%201.34375%205.46875%201.6875%205.4375H5.4375V1.6875C5.46875%201.34375%205.65625%201.15625%206%201.125C6.34375%201.15625%206.53125%201.34375%206.5625%201.6875Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <Text weight="regular" content="Add Feedback" />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isNoFeedback ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "feedbacknotsubmitted")}
            tag="div"
          >
            <Text
              content="Not Submitted feedback"
              weight="regular"
              color="neutral"
            />
            <_Builtin.Block tag="div" {...onClickRequestFeedback}>
              <ButtonSoft textButton="Request Feedback" size="1" />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isAddFeedback ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "abosulte_block_white")}
            tag="div"
          />
        ) : null}
        {isNoFeedback ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "abosulte_block_white")}
            tag="div"
          />
        ) : null}
        {isFeedbackReqSubmitted ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "feedbackemptyadmin", "column-req")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "flex-horizontal",
                "center",
                "gap-1"
              )}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2221%22%20height%3D%2220%22%20viewbox%3D%220%200%2021%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.17731%203.20312H14.1005C14.4827%203.22223%2014.8075%203.35599%2015.075%203.60439C15.3234%203.87189%2015.4571%204.19672%2015.4763%204.57888C15.4571%205.03746%2015.2756%205.40051%2014.9317%205.66801L14.5304%205.98329C13.5559%206.07883%2012.7056%206.41321%2011.9795%206.98644C11.2343%207.54057%2010.6898%208.2571%2010.3458%209.13606L8.68347%2010.3685C8.32043%2010.5978%207.95738%2010.5978%207.59434%2010.3685L1.34613%205.66801C1.00219%205.40051%200.820667%205.03746%200.801559%204.57888C0.820667%204.19672%200.954421%203.87189%201.20282%203.60439C1.47033%203.35599%201.79516%203.22223%202.17731%203.20312ZM9.22804%2011.085L10.0019%2010.5118C9.9828%2010.6838%209.97324%2010.8462%209.97324%2010.9991C9.99235%2012.2411%2010.3745%2013.3111%2011.1197%2014.2091H2.6359C2.11999%2014.19%201.69007%2014.0085%201.34613%2013.6646C1.00219%2013.3206%200.820667%2012.8907%200.801559%2012.3748V6.41321L7.04977%2011.085C7.3746%2011.3334%207.73764%2011.4576%208.13891%2011.4576C8.54017%2011.4576%208.90321%2011.3334%209.22804%2011.085ZM19.1449%2010.9991C19.1449%2011.7443%2018.9634%2012.4321%2018.6004%2013.0627C18.2373%2013.6932%2017.731%2014.1996%2017.0813%2014.5817C16.4316%2014.9448%2015.7438%2015.1263%2015.0177%2015.1263C14.2916%2015.1263%2013.6037%2014.9448%2012.954%2014.5817C12.3044%2014.1996%2011.798%2013.6932%2011.435%2013.0627C11.0719%2012.4321%2010.8904%2011.7443%2010.8904%2010.9991C10.8904%2010.2539%2011.0719%209.56598%2011.435%208.93543C11.798%208.30487%2012.3044%207.79852%2012.954%207.41637C13.6037%207.05332%2014.2916%206.8718%2015.0177%206.8718C15.7438%206.8718%2016.4316%207.05332%2017.0813%207.41637C17.731%207.79852%2018.2373%208.30487%2018.6004%208.93543C18.9634%209.56598%2019.1449%2010.2539%2019.1449%2010.9991ZM17.8666%209.43987C17.6564%209.24879%2017.1482%208.6333%2016.938%208.82438C16.938%208.82438%2015.8202%206.29857%2015.4476%208.01826C15.075%209.73795%2013.275%208.33927%2013.275%208.33927C12.8451%2011.0105%2012.5738%209.98253%2012.3636%2010.1736C12.1725%2010.3838%2012.1725%2011.4309%2012.3636%2011.6411L13.4642%2013.1085C13.6744%2013.2996%2015.2374%2013.8557%2015.4476%2013.6646L18.2335%2011.6411C18.4246%2011.4309%2018.0577%209.65005%2017.8666%209.43987Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Cpath%20d%3D%22M15.2915%2014.9724C14.4889%2014.961%2013.7552%2014.7661%2013.0903%2014.3877C12.4253%2013.9979%2011.8865%2013.4591%2011.4738%2012.7712C11.084%2012.0719%2010.8891%2011.3381%2010.8891%2010.57C10.8891%209.80189%2011.084%209.06816%2011.4738%208.36882C11.8865%207.68094%2012.4253%207.1421%2013.0903%206.75231C13.7552%206.37398%2014.4889%206.17908%2015.2915%206.16761C16.094%206.17908%2016.8277%206.37398%2017.4927%206.75231C18.1576%207.1421%2018.6965%207.68094%2019.1092%208.36882C19.499%209.06816%2019.6939%209.80189%2019.6939%2010.57C19.6939%2011.3381%2019.499%2012.0719%2019.1092%2012.7712C18.6965%2013.4591%2018.1576%2013.9979%2017.4927%2014.3877C16.8277%2014.7661%2016.094%2014.961%2015.2915%2014.9724ZM17.2347%209.76177C17.3952%209.56687%2017.3952%209.37197%2017.2347%209.17707C17.0398%209.01657%2016.8449%209.01657%2016.65%209.17707L14.7412%2011.0859L13.9329%2010.2777C13.738%2010.1172%2013.5431%2010.1172%2013.3482%2010.2777C13.1877%2010.4726%2013.1877%2010.6675%2013.3482%2010.8624L14.4488%2011.963C14.6437%2012.1235%2014.8386%2012.1235%2015.0335%2011.963L17.2347%209.76177Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <Text weight="regular" content="Feedback requested." />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "link-wrap")}
              tag="div"
              {...onClickResendRequest}
            >
              <Text content="Resend Request" weight="regular" color="" />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "two-line-clamp")}
          tag="div"
        >
          <Text content={textFeedback} weight="regular" />
        </_Builtin.Block>
        {isAddFeedback ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "abosulte_block_white")}
            tag="div"
          />
        ) : null}
        {isNoFeedback ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "abosulte_block_white")}
            tag="div"
          />
        ) : null}
        {isFeedbackReqSubmitted ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "abosulte_block_white")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
