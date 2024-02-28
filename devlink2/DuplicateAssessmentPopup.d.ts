import * as React from "react";
import * as Types from "./types";

declare function DuplicateAssessmentPopup(props: {
  as?: React.ElementType;
  slotInput?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotLoaderLottie?: Types.Devlink.Slot;
  isLoading?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
