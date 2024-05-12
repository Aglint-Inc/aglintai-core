import * as React from "react";
import * as Types from "./types";

declare function KeywordCard(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  isTextWarningVisible?: Types.Visibility.VisibilityConditions;
  slotSuggestPill?: Types.Devlink.Slot;
  slotInput?: Types.Devlink.Slot;
  textWarning?: React.ReactNode;
}): React.JSX.Element;
