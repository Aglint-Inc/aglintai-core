import * as React from "react";
import * as Types from "./types";

declare function PublishButton(props: {
  as?: React.ElementType;
  isError?: Types.Visibility.VisibilityConditions;
  textButton?: React.ReactNode;
}): React.JSX.Element;
