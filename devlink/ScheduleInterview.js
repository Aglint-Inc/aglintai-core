import React from "react";
import * as _Builtin from "./_Builtin";
import { InvitedCandidate } from "./InvitedCandidate";
import { ScheduleInterviewLoadedSlots } from "./ScheduleInterviewLoadedSlots";
import * as _utils from "./utils";
import _styles from "./ScheduleInterview.module.css";

export function ScheduleInterview({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  onClickContinue = {},
  isContinueDisable = true,
  slotScheduleInterviewFill,
  isContinueVisible = false,
  isInviteCandidateButtonVisible = true,
  onClickBack = {},
  isInviteCandidateDisable = true,
  onClickInviteCandidate = {},
  isCloseButtonVisible = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "side-scheduling-interview")}
      tag="div"
    >
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-841")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Schedule Interview"}
          </_Builtin.Block>
          <_Builtin.Block tag="div" {...onClickClose}>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.7812%206.28125L11.0625%2010L14.7812%2013.7188C15.0729%2014.0729%2015.0729%2014.4271%2014.7812%2014.7812C14.4271%2015.0729%2014.0729%2015.0729%2013.7188%2014.7812L10%2011.0625L6.28125%2014.7812C5.92708%2015.0729%205.57292%2015.0729%205.21875%2014.7812C4.92708%2014.4271%204.92708%2014.0729%205.21875%2013.7188L8.9375%2010L5.21875%206.28125C4.92708%205.92708%204.92708%205.57292%205.21875%205.21875C5.57292%204.92708%205.92708%204.92708%206.28125%205.21875L10%208.9375L13.7188%205.21875C14.0729%204.92708%2014.4271%204.92708%2014.7812%205.21875C15.0729%205.57292%2015.0729%205.92708%2014.7812%206.28125Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotScheduleInterviewFill ?? (
            <>
              <InvitedCandidate />
              <ScheduleInterviewLoadedSlots />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-880")} tag="div">
        {isContinueVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-881")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "relative")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-851")}
                tag="div"
                {...onClickContinue}
              >
                <_Builtin.Block tag="div">{"Continue"}</_Builtin.Block>
              </_Builtin.Block>
              {isContinueDisable ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-852")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{"Continue"}</_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isInviteCandidateButtonVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-869")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-870")}
              tag="div"
              {...onClickBack}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-blue-500")}
                tag="div"
              >
                {"Back"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-872")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-871")}
                tag="div"
                {...onClickInviteCandidate}
              >
                <_Builtin.Block tag="div">{"Invite Candidate"}</_Builtin.Block>
              </_Builtin.Block>
              {isInviteCandidateDisable ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-871", "disable")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    {"Invite Candidate"}
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isCloseButtonVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-870", "full-width")}
            tag="div"
            {...onClickClose}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-blue-500")}
              tag="div"
            >
              {"Close"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
