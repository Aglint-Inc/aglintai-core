"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MemberListCard } from "./MemberListCard";
import * as _utils from "./utils";
import _styles from "./ModuleMembers.module.css";

export function ModuleMembers({
  as: _Component = _Builtin.Block,
  onClickAddMember = {},
  slotQualifiedMemberList,
  onClickAddTrainee = {},
  slotMembersInTraining,
  isMembersTrainingVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1678")} tag="div">
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1501")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Qualified Members"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-500", "cursor-pointer")}
            tag="div"
            {...onClickAddMember}
          >
            {"Add"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1502")}
          tag="div"
        >
          {slotQualifiedMemberList ?? <MemberListCard />}
        </_Builtin.Block>
      </_Builtin.Block>
      {isMembersTrainingVisible ? (
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1501")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Members in training"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-blue-500", "cursor-pointer")}
              tag="div"
              {...onClickAddTrainee}
            >
              {"Add"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1502")}
            tag="div"
          >
            {slotMembersInTraining ?? <MemberListCard />}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
