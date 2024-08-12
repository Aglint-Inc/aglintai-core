import * as React from "react";
import * as Types from "./types";

declare function NavigationPill(props: {
  as?: React.ElementType;
  iconName?: React.ReactNode;
  textPill?: React.ReactNode;
  textCount?: React.ReactNode;
  onClickPill?: Types.Devlink.RuntimeProps;
  attributeValue?: Types.Builtin.Text;
  showNumberCount?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
