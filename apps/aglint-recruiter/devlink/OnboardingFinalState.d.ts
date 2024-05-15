import * as React from "react";
import * as Types from "./types";

declare function OnboardingFinalState(props: {
  as?: React.ElementType;
  onClickImportJob?: Types.Devlink.RuntimeProps;
  onClickSourceCandidates?: Types.Devlink.RuntimeProps;
  onClickScheduleInterview?: Types.Devlink.RuntimeProps;
  isSourcingVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
