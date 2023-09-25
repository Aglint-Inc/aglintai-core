import * as React from "react";
import * as Types from "./types";

declare function ButtonDarkYellow(props: {
  as?: React.ElementType;
  buttonText?: React.ReactNode;
  isLoading?: Types.Visibility.VisibilityConditions;
  onClickButton?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
