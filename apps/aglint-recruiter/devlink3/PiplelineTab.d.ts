import * as React from "react";
import * as Types from "./types";

declare function PiplelineTab(props: {
  as?: React.ElementType;
  color?: Types.Builtin.Text;
  iconName?: React.ReactNode;
  slotIcon?: Types.Devlink.Slot;
  textStageName?: React.ReactNode;
  textProgress?: React.ReactNode;
  isActive?: Types.Visibility.VisibilityConditions;
  onClickTab?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
