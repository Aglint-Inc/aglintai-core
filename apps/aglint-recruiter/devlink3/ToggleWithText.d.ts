import * as React from "react";
import * as Types from "./types";

declare function ToggleWithText(props: {
  as?: React.ElementType;
  textToggleLight?: React.ReactNode;
  onClickToggle?: Types.Devlink.RuntimeProps;
  textToggleBold?: React.ReactNode;
  isBoldText?: Types.Visibility.VisibilityConditions;
  slotToggle?: Types.Devlink.Slot;
}): React.JSX.Element;
