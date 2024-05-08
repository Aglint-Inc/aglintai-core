import * as React from "react";
import * as Types from "./types";

declare function InterviewerList(props: {
  as?: React.ElementType;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textDesignation?: React.ReactNode;
  isSelected?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
