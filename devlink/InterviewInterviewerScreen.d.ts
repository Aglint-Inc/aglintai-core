import * as React from "react";
import * as Types from "./types";

declare function InterviewInterviewerScreen(props: {
  as?: React.ElementType;
  onClickPlay?: Types.Devlink.RuntimeProps;
  textQuestion?: React.ReactNode;
  slotAiVideo?: Types.Devlink.Slot;
  slotText?: Types.Devlink.Slot;
  isQuestionPillVisible?: Types.Visibility.VisibilityConditions;
  textAi?: React.ReactNode;
  propsScroll?: Types.Devlink.RuntimeProps;
  onClickPause?: Types.Devlink.RuntimeProps;
  isPlayPauseVisible?: Types.Visibility.VisibilityConditions;
  isPlayButtonVisible?: Types.Visibility.VisibilityConditions;
  isPauseButtonVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
