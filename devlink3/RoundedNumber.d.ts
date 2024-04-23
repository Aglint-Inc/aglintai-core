import * as React from "react";
import * as Types from "./types";

declare function RoundedNumber(props: {
  as?: React.ElementType;
  isActive?: Types.Visibility.VisibilityConditions;
  textNumber?: React.ReactNode;
  onClickRound?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
