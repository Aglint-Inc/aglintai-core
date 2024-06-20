import * as React from "react";
import * as Types from "./types";

declare function CloseDeleteJob(props: {
  as?: React.ElementType;
  isCloseJobVisible?: Types.Visibility.VisibilityConditions;
  isDeleteJobVisible?: Types.Visibility.VisibilityConditions;
  onClickClose?: Types.Devlink.RuntimeProps;
  textDesc?: React.ReactNode;
  isDynamicDescVisible?: Types.Visibility.VisibilityConditions;
  textHeader?: React.ReactNode;
  slotIcon?: Types.Devlink.Slot;
  textButtonLabel?: React.ReactNode;
  slotCloseJobButton?: Types.Devlink.Slot;
  slotDeleteJobButton?: Types.Devlink.Slot;
}): React.JSX.Element;
