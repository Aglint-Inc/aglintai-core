import React from "react";
import * as _Builtin from "./_Builtin";
import { MemberListCard } from "./MemberListCard";
import { InterviewMemberSide } from "./InterviewMemberSide";
import * as _utils from "./utils";
import _styles from "./InterviewMemberList.module.css";

export function InterviewMemberList({
  as: _Component = _Builtin.Block,
  slotMemberList,
  slotInterviewCard,
}) {
  return (
    <_Component className={_utils.cx(_styles, "interview-sub-table")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "interview-sub-table-left")}
        tag="div"
      >
        {slotMemberList ?? <MemberListCard />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "interview-sub-table-right")}
        tag="div"
      >
        {slotInterviewCard ?? <InterviewMemberSide />}
      </_Builtin.Block>
    </_Component>
  );
}
