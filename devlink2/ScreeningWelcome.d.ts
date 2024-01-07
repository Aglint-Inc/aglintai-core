import * as React from "react";
import * as Types from "./types";

declare function ScreeningWelcome(props: {
  as?: React.ElementType;
  isDefaultView?: Types.Visibility.VisibilityConditions;
  isEditView?: Types.Visibility.VisibilityConditions;
  defaultText?: React.ReactNode;
  onclickEdit?: Types.Devlink.RuntimeProps;
  editHeading?: React.ReactNode;
  slotInput?: Types.Devlink.Slot;
  slotButtons?: Types.Devlink.Slot;
}): React.JSX.Element;
