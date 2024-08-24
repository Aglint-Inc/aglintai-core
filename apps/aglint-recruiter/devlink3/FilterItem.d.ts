import * as React from "react";
import * as Types from "./types";

declare function FilterItem(props: {
  as?: React.ElementType;
  textFilterHeading?: React.ReactNode;
  textCount?: React.ReactNode;
  onClickRefresh?: Types.Devlink.RuntimeProps;
  onClickSearch?: Types.Devlink.RuntimeProps;
  slotItems?: Types.Devlink.Slot;
  isCountVisible?: Types.Visibility.VisibilityConditions;
  borderRight?: Types.Builtin.Text;
}): React.JSX.Element;
