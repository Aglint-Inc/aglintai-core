import * as React from "react";
import * as Types from "./types";

declare function CandidateEducationCard(props: {
  as?: React.ElementType;
  slotEducationLogo?: Types.Devlink.Slot;
  textUniversityName?: React.ReactNode;
  textDate?: React.ReactNode;
  isBadgeVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
