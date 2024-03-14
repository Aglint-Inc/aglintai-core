import * as React from "react";
import * as Types from "./types";

declare function CloseJobModal(props: {
  as?: React.ElementType;
  textJobTitle?: React.ReactNode;
  textLocation?: React.ReactNode;
  slotInput?: Types.Devlink.Slot;
  onClickCloseJob?: Types.Devlink.RuntimeProps;
  onClickCancel?: Types.Devlink.RuntimeProps;
  slotButton?: Types.Devlink.Slot;
  isDisabled?: Types.Visibility.VisibilityConditions;
  textWarning?: React.ReactNode;
  textPopupTitle?: React.ReactNode;
  textButton?: React.ReactNode;
}): React.JSX.Element;
