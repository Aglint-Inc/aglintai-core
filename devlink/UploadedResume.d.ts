import * as React from "react";
import * as Types from "./types";

declare function UploadedResume(props: {
  as?: React.ElementType;
  textCountDocument?: React.ReactNode;
  slotPrimaryButton?: Types.Devlink.Slot;
  slotUploadResumeList?: Types.Devlink.Slot;
  slotSecondaryButton?: Types.Devlink.Slot;
  onClickAddMore?: Types.Devlink.RuntimeProps;
  isAddMoreVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
