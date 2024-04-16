import * as React from "react";
import * as Types from "./types";

declare function CandidateConfirmationPage(props: {
  as?: React.ElementType;
  slotCandidateCalender?: Types.Devlink.Slot;
  onClickView?: Types.Devlink.RuntimeProps;
  textTitle?: React.ReactNode;
  slotCompanyLogo?: Types.Devlink.Slot;
  isProceedButton?: Types.Visibility.VisibilityConditions;
  onClickProceed?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
