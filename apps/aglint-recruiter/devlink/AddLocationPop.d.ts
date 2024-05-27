import * as React from "react";
import * as Types from "./types";

declare function AddLocationPop(props: {
  as?: React.ElementType;
  slotForm?: Types.Devlink.Slot;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickAdd?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
  onClickCheck?: Types.Devlink.RuntimeProps;
  headerText?: React.ReactNode;
  isAddDisable?: Types.Visibility.VisibilityConditions;
  textLocationDesc?: React.ReactNode;
  isLocationDescVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
