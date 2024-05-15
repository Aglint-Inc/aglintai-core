import * as React from "react";
import * as Types from "./types";

declare function ScheduleTabCandidateDetails(props: {
  as?: React.ElementType;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  textLocation?: React.ReactNode;
  slotEmailPhoneIcon?: Types.Devlink.Slot;
  onClickResume?: Types.Devlink.RuntimeProps;
  textOverview?: React.ReactNode;
  slotExperienceScore?: Types.Devlink.Slot;
  slotSkillScore?: Types.Devlink.Slot;
  slotEducationScore?: Types.Devlink.Slot;
  slotScreeningScore?: Types.Devlink.Slot;
  textExperience?: React.ReactNode;
  textSkill?: React.ReactNode;
  textEducation?: React.ReactNode;
  slotAssesmentScore?: Types.Devlink.Slot;
  slotAssesmentFeedback?: Types.Devlink.Slot;
  onClickDetailFeedback?: Types.Devlink.RuntimeProps;
  slotProfileImage?: Types.Devlink.Slot;
}): React.JSX.Element;
