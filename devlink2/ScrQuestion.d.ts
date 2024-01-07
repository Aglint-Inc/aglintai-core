import * as React from "react";
import * as Types from "./types";

declare function ScrQuestion(props: {
  as?: React.ElementType;
  slotEdit?: Types.Devlink.Slot;
  isEditView?: Types.Visibility.VisibilityConditions;
  isDefaultView?: Types.Visibility.VisibilityConditions;
  slotDefault?: Types.Devlink.Slot;
}): React.JSX.Element;
