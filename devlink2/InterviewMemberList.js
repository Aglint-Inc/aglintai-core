import React from "react";
import * as _Builtin from "./_Builtin";
import { MemberListCard } from "./MemberListCard";
import { InterviewMemberSide } from "./InterviewMemberSide";
import * as _utils from "./utils";
import _styles from "./InterviewMemberList.module.css";

export function InterviewMemberList({
  as: _Component = _Builtin.Block,
  slotInterviewCard,
  onClickAddMember = {},
  slotQualifiedMemberList,
  onClickAddTrainee = {},
  slotMembersInTraining,
  isMembersTrainingVisible = true,
  textObjective = "This module aims to evaluate candidates' ability to write efficient, maintainable, and bug-free C++ code, covering a range of topics such as syntax, data structures, algorithms, object-oriented programming concepts, memory management, and best practices.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "interview-sub-table")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "interview-sub-table-left", "plr-0")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "header-interview-list-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {textObjective}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "plr-20")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1172")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Qualified Members"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1171", "cursor-pointer")}
              tag="div"
              {...onClickAddMember}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.75%201.875V5.25H10.125C10.3438%205.25%2010.5234%205.32031%2010.6641%205.46094C10.8047%205.60156%2010.875%205.78125%2010.875%206C10.875%206.21875%2010.8047%206.39844%2010.6641%206.53906C10.5234%206.67969%2010.3438%206.75%2010.125%206.75H6.75V10.125C6.75%2010.3438%206.67969%2010.5234%206.53906%2010.6641C6.39844%2010.8047%206.21875%2010.875%206%2010.875C5.78125%2010.875%205.60156%2010.8047%205.46094%2010.6641C5.32031%2010.5234%205.25%2010.3438%205.25%2010.125V6.75H1.875C1.65625%206.75%201.47656%206.67969%201.33594%206.53906C1.19531%206.39844%201.125%206.21875%201.125%206C1.125%205.78125%201.19531%205.60156%201.33594%205.46094C1.47656%205.32031%201.65625%205.25%201.875%205.25H5.25V1.875C5.25%201.65625%205.32031%201.47656%205.46094%201.33594C5.60156%201.19531%205.78125%201.125%206%201.125C6.21875%201.125%206.39844%201.19531%206.53906%201.33594C6.67969%201.47656%206.75%201.65625%206.75%201.875Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-blue-500")}
                tag="div"
              >
                {"Add"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-member-list-card")}
            tag="div"
          >
            {slotQualifiedMemberList ?? <MemberListCard />}
          </_Builtin.Block>
        </_Builtin.Block>
        {isMembersTrainingVisible ? (
          <_Builtin.Block className={_utils.cx(_styles, "plr-20")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1172")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Members in Training"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "div-block-1171",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickAddTrainee}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.75%201.875V5.25H10.125C10.3438%205.25%2010.5234%205.32031%2010.6641%205.46094C10.8047%205.60156%2010.875%205.78125%2010.875%206C10.875%206.21875%2010.8047%206.39844%2010.6641%206.53906C10.5234%206.67969%2010.3438%206.75%2010.125%206.75H6.75V10.125C6.75%2010.3438%206.67969%2010.5234%206.53906%2010.6641C6.39844%2010.8047%206.21875%2010.875%206%2010.875C5.78125%2010.875%205.60156%2010.8047%205.46094%2010.6641C5.32031%2010.5234%205.25%2010.3438%205.25%2010.125V6.75H1.875C1.65625%206.75%201.47656%206.67969%201.33594%206.53906C1.19531%206.39844%201.125%206.21875%201.125%206C1.125%205.78125%201.19531%205.60156%201.33594%205.46094C1.47656%205.32031%201.65625%205.25%201.875%205.25H5.25V1.875C5.25%201.65625%205.32031%201.47656%205.46094%201.33594C5.60156%201.19531%205.78125%201.125%206%201.125C6.21875%201.125%206.39844%201.19531%206.53906%201.33594C6.67969%201.47656%206.75%201.65625%206.75%201.875Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-blue-500")}
                  tag="div"
                >
                  {"Add"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-member-list-card")}
              tag="div"
            >
              {slotMembersInTraining ?? <MemberListCard />}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "interview-sub-table-right", "pb-0")}
        tag="div"
      >
        {slotInterviewCard ?? <InterviewMemberSide />}
      </_Builtin.Block>
    </_Component>
  );
}
