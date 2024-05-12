import * as React from "react";
import * as Types from "./types";

declare function SavedChanges(props: {
  as?: React.ElementType;
  isSaving?: Types.Visibility.VisibilityConditions;
  isSaved?: Types.Visibility.VisibilityConditions;
  slotLoaderIcon?: Types.Devlink.Slot;
}): React.JSX.Element;
