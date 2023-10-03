import * as React from "react";
import * as Types from "./types";

declare function DeleteJobPopup(props: {
  as?: React.ElementType;
  slotForm?: Types.Devlink.Slot;
  jobTitle?: React.ReactNode;
  jobInfo?: React.ReactNode;
  closeProps?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
  isDeleteDisabled?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
