import * as React from "react";
import * as Types from "./types";

declare function DeleteToggleDropdown(props: {
  as?: React.ElementType;
  toggleHeading?: React.ReactNode;
  slotSkillQuestion?: Types.Devlink.Slot;
  slotCustomAddButton?: Types.Devlink.RuntimeProps;
  onClickGenerate?: Types.Devlink.RuntimeProps;
  slotToggle?: Types.Devlink.Slot;
}): React.JSX.Element;
