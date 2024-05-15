import * as React from "react";
import * as Types from "./types";

declare function ContactDetails(props: {
  as?: React.ElementType;
  textLabelFields?: React.ReactNode;
  slotToggle?: Types.Devlink.Slot;
  isAlwaysRequiredVisible?: Types.Visibility.VisibilityConditions;
  slotCheckbox?: Types.Devlink.Slot;
}): React.JSX.Element;
