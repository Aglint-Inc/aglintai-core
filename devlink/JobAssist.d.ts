import * as React from "react";
import * as Types from "./types";

declare function JobAssist(props: {
  as?: React.ElementType;
  slotAssistCards?: Types.Devlink.Slot;
  onClickViewMore?: Types.Devlink.RuntimeProps;
  slotInput?: Types.Devlink.Slot;
  isViewMoreVisible?: Types.Visibility.VisibilityConditions;
  isMinimizeIconVisible?: Types.Visibility.VisibilityConditions;
  onClickMinimize?: Types.Devlink.RuntimeProps;
  onClickMaximize?: Types.Devlink.RuntimeProps;
  slotLogo?: Types.Devlink.Slot;
  isStartingScreenVisible?: Types.Visibility.VisibilityConditions;
  isChatBody?: Types.Visibility.VisibilityConditions;
  slotChat?: Types.Devlink.Slot;
  isSuggestionVisible?: Types.Visibility.VisibilityConditions;
  slotSuggestion?: Types.Devlink.Slot;
  isMaxIconVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
