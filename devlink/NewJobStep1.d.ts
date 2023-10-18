import * as React from "react";
import * as Types from "./types";

declare function NewJobStep1(props: {
  as?: React.ElementType;
  slotForm?: Types.Devlink.Slot;
  isJobHeaderVisible?: Types.Visibility.VisibilityConditions;
  onClickProceed?: Types.Devlink.RuntimeProps;
  isProceedButtonDisable?: Types.Visibility.VisibilityConditions;
  isAddJob?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
