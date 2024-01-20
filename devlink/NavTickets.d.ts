import * as React from "react";
import * as Types from "./types";

declare function NavTickets(props: {
  as?: React.ElementType;
  onClickNav?: Types.Devlink.RuntimeProps;
  isActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
