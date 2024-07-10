"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TaskInfoIndividual } from "./TaskInfoIndividual";
import * as _utils from "./utils";
import _styles from "./ViewTaskCard.module.css";

export function ViewTaskCard({
  as: _Component = _Builtin.Block,
  slotAssignedTo,
  slotWhenToCall,
  slotInterviewTaskPill,
  slotCreatedBy,
  slotDueDate,
  textJobRole = "Senior Software Engineer",
  slotCandidate,
  slotStatus,
  slotType,
  slotJob,
  onClickCandidate = {},
  onClickJob = {},
  onClickInterview = {},
  slotInterviewDate,
  onClickInterviewDate = {},
  onClickWhenToCall = {},
  onClickAssignedTo = {},
  onClickDueDate = {},
  isTypeVisible = true,
  isJobVisible = true,
  isCandidateVisible = true,
  isInterviewVisible = true,
  isInterviewDateVisible = true,
  isCreatedByVisible = true,
  isDueDateVisible = true,
  isAssignedToVisible = true,
  isWhenToCallVisible = true,
  isStatusVisible = true,
  textWhenToCall = "When to call",
  slotWhentoCallIcon,
  slotPriorityPill,
  onClickPriority = {},
  isPriorityVisible = true,
  slotTaskInfoIndividual,
}) {
  return (
    <_Component className={_utils.cx(_styles, "task_informations")} tag="div">
      {slotTaskInfoIndividual ?? (
        <>
          <TaskInfoIndividual isClickable={true} />
          <TaskInfoIndividual />
        </>
      )}
    </_Component>
  );
}
