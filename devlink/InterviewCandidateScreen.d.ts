import * as React from "react";
import * as Types from "./types";

declare function InterviewCandidateScreen(props: {
  as?: React.ElementType;
  slotCameraVideo?: Types.Devlink.Slot;
  textDisplay?: React.ReactNode;
  textColorProps?: Types.Devlink.RuntimeProps;
  slotText?: Types.Devlink.Slot;
  onClickEdit?: Types.Devlink.RuntimeProps;
  onClickMic?: Types.Devlink.RuntimeProps;
  onClickSubmit?: Types.Devlink.RuntimeProps;
  propsDotColor?: Types.Devlink.RuntimeProps;
  textTimer?: React.ReactNode;
  isTimerVisible?: Types.Visibility.VisibilityConditions;
  onClickEditDone?: Types.Devlink.RuntimeProps;
  onClickMicStop?: Types.Devlink.RuntimeProps;
  slotMicSpeakingLottie?: Types.Devlink.Slot;
}): React.JSX.Element;
