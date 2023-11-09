import * as React from "react";
import * as Types from "./types";

declare function ScreeningQuestionAudio(props: {
  as?: React.ElementType;
  slotInput?: Types.Devlink.Slot;
  slotAvatar?: Types.Devlink.Slot;
  isPlayIconVisible?: Types.Visibility.VisibilityConditions;
  isPauseIconVisible?: Types.Visibility.VisibilityConditions;
  isMicVisible?: Types.Visibility.VisibilityConditions;
  onClickPlayPause?: Types.Devlink.RuntimeProps;
  isEditVisible?: Types.Visibility.VisibilityConditions;
  isGenerateVisible?: Types.Visibility.VisibilityConditions;
  onClickEdit?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
  isSaveButtonVisible?: Types.Visibility.VisibilityConditions;
  onClickSave?: Types.Devlink.RuntimeProps;
  onClickCancel?: Types.Devlink.RuntimeProps;
  isActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
