import * as React from "react";
import * as Types from "./types";

declare function InterviewBreakCard(props: {
  as?: React.ElementType;
  textDuration?: React.ReactNode;
  onClickDelete?: Types.Devlink.RuntimeProps;
  onClickEdit?: Types.Devlink.RuntimeProps;
  isEditDeleteVisible?: Types.Visibility.VisibilityConditions;
  isDurationRightCornerVisible?: Types.Visibility.VisibilityConditions;
  isDurationLeftVisible?: Types.Visibility.VisibilityConditions;
  isThreeDotVisible?: Types.Visibility.VisibilityConditions;
  slotEditOptionModule?: Types.Devlink.Slot;
}): React.JSX.Element;
