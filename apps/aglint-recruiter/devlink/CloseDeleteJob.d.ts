import * as React from "react";
import * as Types from "./types";

declare function CloseDeleteJob(props: {
  as?: React.ElementType;
  isCloseJobVisible?: Types.Visibility.VisibilityConditions;
  isDeleteJobVisible?: Types.Visibility.VisibilityConditions;
  textDesc?: React.ReactNode;
  isDynamicDescVisible?: Types.Visibility.VisibilityConditions;
  textHeader?: React.ReactNode;
  textButtonLabel?: React.ReactNode;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
