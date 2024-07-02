import * as React from "react";
import * as Types from "./types";

declare function GlobalBanner(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  textDescription?: React.ReactNode;
  textNotes?: React.ReactNode;
  iconName?: React.ReactNode;
  slotButtons?: Types.Devlink.Slot;
  isAdditionalNotes?: Types.Visibility.VisibilityConditions;
  color?: Types.Builtin.Text;
  isDescriptionVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
