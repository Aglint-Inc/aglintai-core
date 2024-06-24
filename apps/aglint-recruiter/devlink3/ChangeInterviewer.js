"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./ChangeInterviewer.module.css";

export function ChangeInterviewer({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  textAvailableDesc = "Please choose a different interviewer available from 11:30 AM to 12:30 PM on February 24th, replacing Brooklyn Simmons.",
  slotProfileImage,
  textName = "Brooklyn Simmons",
  textDesignation = "Project Manager",
  slotInterviewerList,
  onClickChange = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "assessment_duplicate_popup", "width-550")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "popup_header")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "popup_title")} tag="div">
          <Text content="Change Interviewer" weight="medium" />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "popup_close")} tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex-2", "cursor")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.28125%201.21875L8%206.9375L13.7188%201.21875C14.0729%200.927083%2014.4271%200.927083%2014.7812%201.21875C15.0729%201.57292%2015.0729%201.92708%2014.7812%202.28125L9.0625%208L14.7812%2013.7188C15.0729%2014.0729%2015.0729%2014.4271%2014.7812%2014.7812C14.4271%2015.0729%2014.0729%2015.0729%2013.7188%2014.7812L8%209.0625L2.28125%2014.7812C1.92708%2015.0729%201.57292%2015.0729%201.21875%2014.7812C0.927083%2014.4271%200.927083%2014.0729%201.21875%2013.7188L6.9375%208L1.21875%202.28125C0.927083%201.92708%200.927083%201.57292%201.21875%201.21875C1.57292%200.927083%201.92708%200.927083%202.28125%201.21875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickClose}
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "popup_body")} tag="div">
        <Text content={textAvailableDesc} weight="" color="neutral" />
        <_Builtin.Block className={_utils.cx(_styles, "slot_widget")} tag="div">
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "ci-details-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "ci-profile-image")}
                tag="div"
              >
                {slotProfileImage}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ci-details")}
                tag="div"
              >
                <Text content={textName} weight="" />
                <Text
                  content={textDesignation}
                  weight=""
                  size="1"
                  color="neutral"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ci-divider-wrap")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.34375%203.15625L9.34375%206.15625C9.55208%206.38542%209.55208%206.61458%209.34375%206.84375C9.11458%207.05208%208.88542%207.05208%208.65625%206.84375L6.5%204.71875V16.5C6.47917%2016.8125%206.3125%2016.9792%206%2017C5.6875%2016.9792%205.52083%2016.8125%205.5%2016.5V4.71875L3.34375%206.84375C3.11458%207.05208%202.88542%207.05208%202.65625%206.84375C2.44792%206.61458%202.44792%206.38542%202.65625%206.15625L5.65625%203.15625C5.88542%202.94792%206.11458%202.94792%206.34375%203.15625ZM17.3438%2013.8438L14.3438%2016.8438C14.1146%2017.0521%2013.8854%2017.0521%2013.6562%2016.8438L10.6562%2013.8438C10.4479%2013.6146%2010.4479%2013.3854%2010.6562%2013.1562C10.8854%2012.9479%2011.1146%2012.9479%2011.3438%2013.1562L13.5%2015.2812V3.5C13.5208%203.1875%2013.6875%203.02083%2014%203C14.3125%203.02083%2014.4792%203.1875%2014.5%203.5V15.2812L16.6562%2013.1562C16.8854%2012.9479%2017.1146%2012.9479%2017.3438%2013.1562C17.5521%2013.3854%2017.5521%2013.6146%2017.3438%2013.8438Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1689")}
              tag="div"
            >
              {slotInterviewerList ?? (
                <>
                  <SlotComp componentNeme="InterviewerList" />
                  <SlotComp componentNeme="InterviewerList" />
                  <SlotComp componentNeme="InterviewerList" />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "button-pop-wrap", "stretch-vertical")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "wide_button", "width-100")}
          tag="div"
        >
          <ButtonSoft
            onClickButton={onClickClose}
            color="neutral"
            size="2"
            isRightIcon={false}
            isLeftIcon={false}
            textButton={
              <>
                {"Cancel"}
                <br />
              </>
            }
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "wide_button", "width-100")}
          tag="div"
          {...onClickChange}
        >
          <ButtonSolid
            onClickButton={onClickChange}
            textButton="Change"
            size="2"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
