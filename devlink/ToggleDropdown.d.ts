import * as React from "react";
import * as Types from "./types";

declare function ToggleDropdown(props: {
  as?: React.ElementType;
  toggleHeading?: React.ReactNode;
  slotSkillQuestion?: Types.Devlink.Slot;
  slotCustomAddButton?: Types.Devlink.RuntimeProps;
  onClickGenerate?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
