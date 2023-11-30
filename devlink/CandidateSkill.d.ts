import * as React from "react";
import * as Types from "./types";

declare function CandidateSkill(props: {
  as?: React.ElementType;
  slotCandidateSkill?: Types.Devlink.Slot;
  isSkillBadgeVisible?: Types.Visibility.VisibilityConditions;
  textSkillCount?: React.ReactNode;
}): React.JSX.Element;
