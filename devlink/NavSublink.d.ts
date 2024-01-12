import * as React from "react";
import * as Types from "./types";

declare function NavSublink(props: {
  as?: React.ElementType;
  isActive?: Types.Visibility.VisibilityConditions;
  textLink?: React.ReactNode;
  onClickNav?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
