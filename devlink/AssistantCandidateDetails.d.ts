import * as React from "react";
import * as Types from "./types";

declare function AssistantCandidateDetails(props: {
  as?: React.ElementType;
  slotProfile?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textMatchCount?: React.ReactNode;
  colorPropsMatch?: Types.Devlink.RuntimeProps;
  textLocation?: React.ReactNode;
  isLocationVisible?: Types.Visibility.VisibilityConditions;
  textRelevantSkill?: React.ReactNode;
  isOverviewVisible?: Types.Visibility.VisibilityConditions;
  textOVerview?: React.ReactNode;
  isExperienceVisible?: Types.Visibility.VisibilityConditions;
  isRelevantSkillVisible?: Types.Visibility.VisibilityConditions;
  textExperience?: React.ReactNode;
  isTopMatchVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
