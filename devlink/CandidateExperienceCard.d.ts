import * as React from "react";
import * as Types from "./types";

declare function CandidateExperienceCard(props: {
  as?: React.ElementType;
  slotLogo?: Types.Devlink.Slot;
  textRole?: React.ReactNode;
  textCompany?: React.ReactNode;
  textDate?: React.ReactNode;
  isBadgeVisible?: Types.Visibility.VisibilityConditions;
  isCurrentVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
