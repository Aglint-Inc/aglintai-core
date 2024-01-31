import * as React from "react";
import * as Types from "./types";

declare function CandidateExperience(props: {
  as?: React.ElementType;
  slotCandidateExperienceCard?: Types.Devlink.Slot;
  onClickCards?: Types.Devlink.RuntimeProps;
  onClickIcons?: Types.Devlink.RuntimeProps;
  slotExperienceScore?: Types.Devlink.Slot;
  isArrowVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
