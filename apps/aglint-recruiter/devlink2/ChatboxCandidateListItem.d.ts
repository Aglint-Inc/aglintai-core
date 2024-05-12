import * as React from "react";
import * as Types from "./types";

declare function ChatboxCandidateListItem(props: {
  as?: React.ElementType;
  name?: React.ReactNode;
  isApplied?: Types.Visibility.VisibilityConditions;
  email?: React.ReactNode;
  date?: React.ReactNode;
  isSelected?: Types.Visibility.VisibilityConditions;
  onclickProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
