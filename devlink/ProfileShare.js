import React from "react";
import * as _Builtin from "./_Builtin";
import { ProfileInterviewScore } from "./ProfileInterviewScore";
import { InterviewAiTranscriptCard } from "./InterviewAiTranscriptCard";
import { InterviewCandidateCard } from "./InterviewCandidateCard";
import { ResumeScore } from "./ResumeScore";
import { CandidateEducationCard } from "./CandidateEducationCard";
import { CandidateExperienceCard } from "./CandidateExperienceCard";
import { CandidateSkillPills } from "./CandidateSkillPills";
import { ActivityFlowCard } from "./ActivityFlowCard";
import * as _utils from "./utils";
import _styles from "./ProfileShare.module.css";

export function ProfileShare({
  as: _Component = _Builtin.Block,
  onClickCopyProfile = {},
  slotProfileImage,
  textName = "Dianne Russell",
  textMail = "dianerussel@example.com",
  textPhone = "(704) 555-0127",
  slotResumeScore,
  textInterviewScore = "78/100",
  propsTextColor = {},
  textOverview = "Eike led software as a Senior System Software Engineer at NVIDIA Corporation, specializing in autonomous vehicles.",
  slotInterview,
  slotResume,
  isEducationVisible = true,
  isResumeVisible = true,
  isInterviewVisible = true,
  slotInterviewTranscript,
  slotCandidateEducationCard,
  isExperienceVisible = true,
  slotCandidateExperienceCard,
  isSkillVisible = true,
  slotSkill,
  isActivityVisible = true,
  slotActivity,
  onClickInterviewScore = {},
  onClickResumeScore = {},
  onClickEducation = {},
  onClickExperience = {},
  onClickSkills = {},
  onClickActivity = {},
  slotCompanyLogo,
  isInterviewActive = false,
  isResumeActive = false,
  isEducationActive = false,
  isExperienceActive = false,
  isSkillActive = false,
  isOverviewVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "profile-share-page-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-share-header-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ps-container")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "profile-share-header-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ps-header-top")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-header-logo-block")}
                tag="div"
              >
                {slotCompanyLogo}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "cvs-header-copy-block",
                  "clickable",
                  "padding-medium"
                )}
                tag="div"
                {...onClickCopyProfile}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cvs-header-copy-icon")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icon-embed")}
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4%2010C4%209.63181%203.70152%209.33333%203.33333%209.33333H1.33333V1.33333H9.33333V3.33333C9.33333%203.70152%209.63181%204%2010%204C10.3682%204%2010.6667%203.70152%2010.6667%203.33333V1.33333C10.6667%200.596954%2010.0697%200%209.33333%200H1.33333C0.596954%200%200%200.596954%200%201.33333V9.33333C0%2010.0697%200.596954%2010.6667%201.33333%2010.6667H3.33333C3.70152%2010.6667%204%2010.3682%204%2010ZM14.6667%205.33333H6.66667C5.93029%205.33333%205.33333%205.93029%205.33333%206.66667V14.6667C5.33333%2015.403%205.93029%2016%206.66667%2016H14.6667C15.403%2016%2016%2015.403%2016%2014.6667V6.66667C16%205.93029%2015.403%205.33333%2014.6667%205.33333ZM6.66667%2014.6667V6.66667H14.6667V14.6667H6.66667Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_3655_711%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2216%22%20height%3D%2216%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4%2010C4%209.63181%203.70152%209.33333%203.33333%209.33333H1.33333V1.33333H9.33333V3.33333C9.33333%203.70152%209.63181%204%2010%204C10.3682%204%2010.6667%203.70152%2010.6667%203.33333V1.33333C10.6667%200.596954%2010.0697%200%209.33333%200H1.33333C0.596954%200%200%200.596954%200%201.33333V9.33333C0%2010.0697%200.596954%2010.6667%201.33333%2010.6667H3.33333C3.70152%2010.6667%204%2010.3682%204%2010ZM14.6667%205.33333H6.66667C5.93029%205.33333%205.33333%205.93029%205.33333%206.66667V14.6667C5.33333%2015.403%205.93029%2016%206.66667%2016H14.6667C15.403%2016%2016%2015.403%2016%2014.6667V6.66667C16%205.93029%2015.403%205.33333%2014.6667%205.33333ZM6.66667%2014.6667V6.66667H14.6667V14.6667H6.66667Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_3655_711)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-color-white")}
                  tag="div"
                >
                  {"Copy Profile"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ps-header-bottom")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-header-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "ps-header-profile-image-block"
                  )}
                  tag="div"
                >
                  {slotProfileImage}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "ps-header-profile-info")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "ps-header-profile-name-block"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-xxxl",
                        "fw-semibold",
                        "text-color-white",
                        "mobile-lg"
                      )}
                      tag="div"
                    >
                      {textName}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "clickable")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon-embed")}
                        value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2230%22%20height%3D%2236%22%20viewBox%3D%220%200%2030%2036%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_3391_30825)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M27.8574%203.00012H2.1364C0.957833%203.00012%200.000244141%203.97111%200.000244141%205.16309V30.8374C0.000244141%2032.0294%200.957833%2033.0004%202.1364%2033.0004H27.8574C29.036%2033.0004%2030.0002%2032.0294%2030.0002%2030.8374V5.16309C30.0002%203.97111%2029.036%203.00012%2027.8574%203.00012ZM9.06721%2028.7146H4.62078V14.3976H9.0739V28.7146H9.06721ZM6.84399%2012.4422C5.41765%2012.4422%204.26587%2011.2837%204.26587%209.86403C4.26587%208.44437%205.41765%207.28588%206.84399%207.28588C8.26364%207.28588%209.42212%208.44437%209.42212%209.86403C9.42212%2011.2904%208.27033%2012.4422%206.84399%2012.4422ZM25.7346%2028.7146H21.2882V21.7503C21.2882%2020.0896%2021.2547%2017.9534%2018.9779%2017.9534C16.661%2017.9534%2016.306%2019.7614%2016.306%2021.6298V28.7146H11.8596V14.3976H16.1252V16.3529H16.1855C16.7815%2015.2279%2018.2346%2014.0426%2020.3976%2014.0426C24.8976%2014.0426%2025.7346%2017.0092%2025.7346%2020.8664V28.7146Z%22%20fill%3D%22%23D8DCDE%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CclipPath%20id%3D%22clip0_3391_30825%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2230%22%20height%3D%2234.286%22%20fill%3D%22white%22%20transform%3D%22translate(0%200.856995)%22%2F%3E%0A%20%20%20%20%3C%2FclipPath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "text-xl",
                      "text-grey-200",
                      "mobile-regular"
                    )}
                    tag="div"
                  >
                    {textMail}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "text-xl",
                      "text-grey-200",
                      "mobile-regular"
                    )}
                    tag="div"
                  >
                    {textPhone}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-header-scores-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "ps-hp-resume-score-block")}
                  tag="div"
                >
                  {slotResumeScore}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "ps-hp-interview-score-block")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon-embed")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2225%22%20viewBox%3D%220%200%2024%2025%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M11.9999%2016.4024C11.2237%2016.4024%2010.4793%2016.094%209.93038%2015.5452C9.38149%2014.9963%209.07313%2014.2518%209.07313%2013.4756C9.07313%2012.3829%209.66825%2011.4268%2010.5365%2010.9293L20.0097%205.44636L14.6146%2014.7927C14.1268%2015.7488%2013.1414%2016.4024%2011.9999%2016.4024ZM11.9999%203.71954C13.7658%203.71954%2015.4146%204.20735%2016.8487%205.00734L14.7999%206.18782C13.9512%205.85612%2012.9756%205.67075%2011.9999%205.67075C9.92998%205.67075%207.94478%206.49305%206.48109%207.95674C5.0174%209.42043%204.19511%2011.4056%204.19511%2013.4756C4.19511%2015.6317%205.0634%2017.5829%206.47802%2018.9878H6.48778C6.86826%2019.3682%206.86826%2019.9829%206.48778%2020.3634C6.10729%2020.7439%205.48291%2020.7439%205.10242%2020.3731C3.33657%2018.6073%202.2439%2016.1683%202.2439%2013.4756C2.2439%2010.8881%203.27176%208.40664%205.10138%206.57702C6.93099%204.74741%209.41248%203.71954%2011.9999%203.71954ZM21.756%2013.4756C21.756%2016.1683%2020.6633%2018.6073%2018.8975%2020.3731C18.517%2020.7439%2017.9024%2020.7439%2017.5219%2020.3634C17.1414%2019.9829%2017.1414%2019.3682%2017.5219%2018.9878C18.9365%2017.5731%2019.8048%2015.6317%2019.8048%2013.4756C19.8048%2012.5%2019.6194%2011.5244%2019.278%2010.6463L20.4584%208.59757C21.2682%2010.061%2021.756%2011.7%2021.756%2013.4756Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "fw-semibold",
                      "text-lg",
                      "text-yellow-600",
                      "mobile-14"
                    )}
                    tag="div"
                    {...propsTextColor}
                  >
                    {textInterviewScore}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "text-grey-600-3",
                      "mobile-12"
                    )}
                    tag="div"
                  >
                    {"Interview Score"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-share-overview-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ps-container")}
          tag="div"
        >
          {isOverviewVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "ps-intro-overview-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-overview-top-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "icon-block-3")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icon-embed")}
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_3341_29934)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12.667%206.00008L13.5003%204.16675L15.3337%203.33341L13.5003%202.50008L12.667%200.666748L11.8337%202.50008L10.0003%203.33341L11.8337%204.16675L12.667%206.00008ZM7.66699%206.33342L6.00033%202.66675L4.33366%206.33342L0.666992%208.00008L4.33366%209.66675L6.00033%2013.3334L7.66699%209.66675L11.3337%208.00008L7.66699%206.33342ZM12.667%2010.0001L11.8337%2011.8334L10.0003%2012.6667L11.8337%2013.5001L12.667%2015.3334L13.5003%2013.5001L15.3337%2012.6667L13.5003%2011.8334L12.667%2010.0001Z%22%20fill%3D%22%2317494D%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cclippath%20id%3D%22clip0_3341_29934%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2Fclippath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-kale-800-2")}
                  tag="div"
                >
                  {"Overview"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Paragraph
                className={_utils.cx(_styles, "text-kale-600-3")}
              >
                {textOverview}
              </_Builtin.Paragraph>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.NavbarWrapper
        className={_utils.cx(_styles, "profile-share-navbar")}
        tag="div"
        config={{
          animation: "default",
          collapse: "none",
          docHeight: false,
          duration: 400,
          easing: "ease",
          easing2: "ease",
          noScroll: false,
        }}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ps-container")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ps-nav-menu-wrapper")}
            tag="div"
          >
            <_Builtin.NavbarMenu
              className={_utils.cx(_styles, "ps-nav-menu")}
              tag="nav"
              role="navigation"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "avtive-profile-wrappers")}
                tag="div"
              >
                <_Builtin.NavbarLink
                  className={_utils.cx(_styles, "ps-tab-link")}
                  options={{
                    href: "#interview",
                  }}
                  {...onClickInterviewScore}
                >
                  {"Interview Score"}
                </_Builtin.NavbarLink>
                {isInterviewActive ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "active-profiles")}
                    tag="div"
                  />
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "avtive-profile-wrappers")}
                tag="div"
              >
                <_Builtin.NavbarLink
                  className={_utils.cx(_styles, "ps-tab-link")}
                  options={{
                    href: "#resume",
                  }}
                  {...onClickResumeScore}
                >
                  {"Resume Score"}
                </_Builtin.NavbarLink>
                {isResumeActive ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "active-profiles")}
                    tag="div"
                  />
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "avtive-profile-wrappers")}
                tag="div"
              >
                <_Builtin.NavbarLink
                  className={_utils.cx(_styles, "ps-tab-link")}
                  options={{
                    href: "#education",
                  }}
                  {...onClickEducation}
                >
                  {"Education"}
                </_Builtin.NavbarLink>
                {isEducationActive ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "active-profiles")}
                    tag="div"
                  />
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "avtive-profile-wrappers")}
                tag="div"
              >
                <_Builtin.NavbarLink
                  className={_utils.cx(_styles, "ps-tab-link")}
                  options={{
                    href: "#experiences",
                  }}
                  {...onClickExperience}
                >
                  {"Experiences"}
                </_Builtin.NavbarLink>
                {isExperienceActive ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "active-profiles")}
                    tag="div"
                  />
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "avtive-profile-wrappers")}
                tag="div"
              >
                <_Builtin.NavbarLink
                  className={_utils.cx(_styles, "ps-tab-link")}
                  options={{
                    href: "#skills",
                  }}
                  {...onClickSkills}
                >
                  {"Skills"}
                </_Builtin.NavbarLink>
                {isSkillActive ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "active-profiles")}
                    tag="div"
                  />
                ) : null}
              </_Builtin.Block>
              <_Builtin.NavbarLink
                className={_utils.cx(_styles, "ps-tab-link", "hide")}
                options={{
                  href: "#activity",
                }}
                {...onClickActivity}
              >
                {"Activity"}
              </_Builtin.NavbarLink>
            </_Builtin.NavbarMenu>
            <_Builtin.NavbarButton
              className={_utils.cx(_styles, "hide")}
              tag="div"
            >
              <_Builtin.Icon
                widget={{
                  type: "icon",
                  icon: "nav-menu",
                }}
              />
            </_Builtin.NavbarButton>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.NavbarWrapper>
      {isInterviewVisible ? (
        <_Builtin.Section
          className={_utils.cx(_styles, "ps-section")}
          grid={{
            type: "section",
          }}
          tag="section"
          id="interview"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "ps-scroll-tag",
              "w-node-_9ce633d1-a452-24e9-ac76-bec9d3f0cb93-d3f0cb54"
            )}
            id={_utils.cx(_styles, "interview")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "ps-container")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ps-tab-interview-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-tab-analysis-block")}
                id={_utils.cx(
                  _styles,
                  "w-node-_9ce633d1-a452-24e9-ac76-bec9d3f0cb96-d3f0cb54"
                )}
                tag="div"
              >
                {slotInterview ?? <ProfileInterviewScore />}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-tab-transcript-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-514")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "text-lg",
                      "fw-semibold",
                      "text-grey-600"
                    )}
                    tag="div"
                  >
                    {"Transcript"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "ps-transcript-body")}
                  tag="div"
                >
                  {slotInterviewTranscript ?? (
                    <>
                      <InterviewAiTranscriptCard />
                      <InterviewCandidateCard />
                    </>
                  )}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Section>
      ) : null}
      {isResumeVisible ? (
        <_Builtin.Section
          className={_utils.cx(_styles, "ps-section")}
          grid={{
            type: "section",
          }}
          tag="section"
          id="resume"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ps-container")}
            tag="div"
          >
            {slotResume ?? <ResumeScore />}
          </_Builtin.Block>
        </_Builtin.Section>
      ) : null}
      {isEducationVisible ? (
        <_Builtin.Section
          className={_utils.cx(_styles, "ps-section")}
          grid={{
            type: "section",
          }}
          tag="section"
          id="education"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ps-container")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ps-tab-education-block")}
              tag="section"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-lg", "fw-semibold")}
                tag="div"
              >
                {"Education"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-education-wrapper")}
                tag="div"
              >
                {slotCandidateEducationCard ?? (
                  <CandidateEducationCard
                    id={_utils.cx(
                      _styles,
                      "w-node-_1f8a595e-4e9c-edda-2651-1287fa18e689-d3f0cb54"
                    )}
                  />
                )}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Section>
      ) : null}
      {isExperienceVisible ? (
        <_Builtin.Section
          className={_utils.cx(_styles, "ps-section")}
          grid={{
            type: "section",
          }}
          tag="section"
          id="experiences"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ps-container")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ps-tab-experiences")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-lg", "fw-semibold")}
                tag="div"
              >
                {"Experiences"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-experiences-wrapper")}
                tag="div"
              >
                {slotCandidateExperienceCard ?? (
                  <CandidateExperienceCard
                    id={_utils.cx(
                      _styles,
                      "w-node-_750dd902-e862-8a98-c797-66d4d947a42c-d3f0cb54"
                    )}
                  />
                )}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Section>
      ) : null}
      {isSkillVisible ? (
        <_Builtin.Section
          className={_utils.cx(_styles, "ps-section")}
          grid={{
            type: "section",
          }}
          tag="section"
          id="skills"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ps-container")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ps-tab-skills-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-lg", "fw-semibold")}
                tag="div"
              >
                {"Skills"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-skills-wrapper")}
                tag="div"
              >
                {slotSkill ?? <CandidateSkillPills />}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Section>
      ) : null}
      {isActivityVisible ? (
        <_Builtin.Section
          className={_utils.cx(_styles, "ps-section")}
          grid={{
            type: "section",
          }}
          tag="section"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ps-container")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ps-tab-activity-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-lg", "fw-semibold")}
                tag="div"
              >
                {"Activity"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-wrapper")}
                tag="div"
              >
                {slotActivity ?? <ActivityFlowCard />}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Section>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "ps-footer")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "ps-container")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ps-footer-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ps-footer-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm-2", "text-grey-600")}
                tag="div"
              >
                {"Powered By"}
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon-embed")}
                  value="%3Csvg%20width%3D%2280%22%20height%3D%2219%22%20viewBox%3D%220%200%2080%2019%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M15.7421%208.65936C13.5984%208.12219%2012.5241%207.85858%2011.783%207.11749C11.0419%206.37142%2010.7783%205.30206%2010.2411%203.15835L9.45025%200L8.65941%203.15835C8.12224%205.30206%207.85863%206.37639%207.11753%207.11749C6.37146%207.85858%205.30209%208.12219%203.15837%208.65936L0%209.4502L3.15837%2010.241C5.30209%2010.7782%206.37643%2011.0418%207.11753%2011.7829C7.85863%2012.529%208.12224%2013.5983%208.65941%2015.742L9.45025%2018.9004L10.2411%2015.742C10.7783%2013.5983%2011.0419%2012.524%2011.783%2011.7829C12.529%2011.0418%2013.5984%2010.7782%2015.7421%2010.241L18.9005%209.4502L15.7421%208.65936Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cpath%20d%3D%22M25.4378%2015.2093C24.7707%2015.2093%2024.1481%2015.0907%2023.57%2014.8535C23.0067%2014.6015%2022.5471%2014.2383%2022.1914%2013.7639C21.8504%2013.2747%2021.6799%2012.667%2021.6799%2011.9406C21.6799%2010.9029%2022.0431%2010.0728%2022.7695%209.4502C23.5107%208.82759%2024.6002%208.51629%2026.0382%208.51629H29.1512V8.22723C29.1512%207.57498%2028.9659%207.11544%2028.5953%206.84861C28.2395%206.58178%2027.5131%206.44837%2026.4162%206.44837C25.2154%206.44837%2024.0592%206.63367%2022.9474%207.00426V4.89187C23.4366%204.69916%2024.0295%204.54351%2024.7262%204.42491C25.4378%204.2915%2026.2086%204.22479%2027.0388%204.22479C28.6249%204.22479%2029.8479%204.55092%2030.7077%205.20317C31.5823%205.84059%2032.0196%206.87085%2032.0196%208.29394V14.9869H29.418L29.2624%2014.0308C28.8473%2014.4014%2028.3359%2014.6904%2027.7281%2014.898C27.1203%2015.1055%2026.3569%2015.2093%2025.4378%2015.2093ZM26.2605%2013.2303C26.9276%2013.2303%2027.5057%2013.1191%2027.9949%2012.8967C28.4841%2012.6744%2028.8695%2012.3927%2029.1512%2012.0518V10.3841H26.1049C24.9338%2010.3841%2024.3482%2010.8659%2024.3482%2011.8294C24.3482%2012.7633%2024.9857%2013.2303%2026.2605%2013.2303Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M39.1064%2018.9004C38.3208%2018.9004%2037.5129%2018.8485%2036.6827%2018.7447C35.8674%2018.641%2035.1781%2018.4927%2034.6148%2018.3V16.0542C35.2077%2016.2469%2035.9045%2016.3952%2036.705%2016.4989C37.5055%2016.6175%2038.2541%2016.6768%2038.9508%2016.6768C39.9736%2016.6768%2040.7148%2016.6175%2041.1744%2016.4989C41.6339%2016.3952%2041.8637%2016.2025%2041.8637%2015.9208C41.8637%2015.6836%2041.7599%2015.5206%2041.5524%2015.4316C41.3597%2015.3427%2040.9446%2015.2982%2040.3072%2015.2982H37.4387C35.5561%2015.2982%2034.6148%2014.6015%2034.6148%2013.208C34.6148%2012.7781%2034.7334%2012.3853%2034.9706%2012.0295C35.2077%2011.6738%2035.5858%2011.3921%2036.1046%2011.1846C34.9039%2010.5768%2034.3035%209.55396%2034.3035%208.11605C34.3035%206.75226%2034.726%205.76647%2035.5709%205.15869C36.4159%204.53609%2037.6685%204.22479%2039.3288%204.22479C39.6697%204.22479%2040.0403%204.25444%2040.4406%204.31374C40.8557%204.35821%2041.167%204.40268%2041.3745%204.44715H45.3325L45.2658%206.33719H43.5981C44.0576%206.76708%2044.2874%207.36745%2044.2874%208.13829C44.2874%209.22043%2043.9464%2010.0876%2043.2645%2010.7399C42.5826%2011.3773%2041.5746%2011.696%2040.2405%2011.696C40.0033%2011.696%2039.7735%2011.6886%2039.5512%2011.6738C39.3436%2011.6441%2039.1287%2011.6145%2038.9063%2011.5848C38.4616%2011.6441%2038.0836%2011.7479%2037.7723%2011.8961C37.4758%2012.0444%2037.3276%2012.2445%2037.3276%2012.4965C37.3276%2012.8374%2037.6315%2013.0079%2038.2392%2013.0079H41.2188C42.2862%2013.0079%2043.1089%2013.2525%2043.687%2013.7417C44.2652%2014.2161%2044.5542%2014.9128%2044.5542%2015.8319C44.5542%2016.8695%2044.0873%2017.6404%2043.1534%2018.1444C42.2195%2018.6484%2040.8705%2018.9004%2039.1064%2018.9004ZM39.351%2010.0061C40.2405%2010.0061%2040.8557%209.85785%2041.1966%209.56137C41.5524%209.25007%2041.7303%208.73124%2041.7303%208.00487C41.7303%207.2785%2041.5524%206.75226%2041.1966%206.42613C40.8557%206.10001%2040.2405%205.93695%2039.351%205.93695C38.5061%205.93695%2037.8983%206.10001%2037.5277%206.42613C37.1571%206.73743%2036.9718%207.26368%2036.9718%208.00487C36.9718%208.68677%2037.1423%209.19078%2037.4832%209.5169C37.839%209.84303%2038.4616%2010.0061%2039.351%2010.0061Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M50.3027%2015.2093C49.2799%2015.2093%2048.5313%2014.9721%2048.0569%2014.4977C47.5974%2014.0233%2047.3676%2013.2673%2047.3676%2012.2297V0H50.3694V11.9851C50.3694%2012.3557%2050.4435%2012.6151%2050.5918%2012.7633C50.74%2012.8967%2050.955%2012.9634%2051.2366%2012.9634C51.622%2012.9634%2051.9704%2012.9116%2052.2817%2012.8078V14.8757C51.7184%2015.0981%2051.0587%2015.2093%2050.3027%2015.2093Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M54.165%202.51264V0.15565H57.4337V2.51264H54.165ZM54.4096%2014.9869V6.67073H52.8308L53.0977%204.44715H57.4114V14.9869H54.4096Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M60.1897%2014.9869V4.44715H62.9692L63.0804%205.44776C63.5103%205.12163%2064.0513%204.83998%2064.7036%204.6028C65.3707%204.3508%2066.0674%204.22479%2066.7938%204.22479C68.1872%204.22479%2069.2026%204.55092%2069.8401%205.20317C70.4775%205.85541%2070.7962%206.86344%2070.7962%208.22723V14.9869H67.7944V8.38288C67.7944%207.67133%2067.6461%207.16732%2067.3496%206.87085C67.068%206.57437%2066.5343%206.42613%2065.7487%206.42613C65.2891%206.42613%2064.8222%206.5299%2064.3478%206.73743C63.8883%206.94497%2063.5028%207.20438%2063.1915%207.51569V14.9869H60.1897Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M77.643%2015.2093C76.4274%2015.2093%2075.5231%2014.8905%2074.9302%2014.2531C74.352%2013.6157%2074.063%2012.7485%2074.063%2011.6515V6.75967H72.5732V4.44715H74.063V2.1791L77.0648%201.28967V4.44715H79.7331L79.5552%206.75967H77.0648V11.4514C77.0648%2012.0295%2077.1982%2012.4298%2077.4651%2012.6521C77.7319%2012.8597%2078.147%2012.9634%2078.7103%2012.9634C79.1253%2012.9634%2079.5552%2012.8893%2080%2012.7411V14.809C79.6738%2014.9424%2079.3181%2015.0388%2078.9326%2015.0981C78.5472%2015.1722%2078.1173%2015.2093%2077.643%2015.2093Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm-2", "text-grey-600")}
                tag="div"
              >
                {"© 2023 Aglint Inc. All Rights Reserved"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
