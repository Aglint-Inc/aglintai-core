import * as React from "react";
import * as Types from "./types";

declare function EmailTemplatesStart(props: {
  as?: React.ElementType;
  onClickApplicationRecieved?: Types.Devlink.RuntimeProps;
  onClickInterviewInvite?: Types.Devlink.RuntimeProps;
  onClickFollowInterview?: Types.Devlink.RuntimeProps;
  onClickDisqualified?: Types.Devlink.RuntimeProps;
  slotEmailTemplateCards?: Types.Devlink.Slot;
  isProceedDisable?: Types.Visibility.VisibilityConditions;
  onClickProceed?: Types.Devlink.RuntimeProps;
  isAddJob?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
