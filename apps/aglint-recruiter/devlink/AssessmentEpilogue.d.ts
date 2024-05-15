import * as React from "react";
import * as Types from "./types";

declare function AssessmentEpilogue(props: {
  as?: React.ElementType;
  slotEndingMessageVideo?: Types.Devlink.Slot;
  slotWarning?: Types.Devlink.Slot;
  isWarningVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
