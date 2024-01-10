import * as React from "react";
import * as Types from "./types";

declare function SummaryBlock(props: {
  as?: React.ElementType;
  title?: React.ReactNode;
  description?: React.ReactNode;
  descriptionTextProps?: Types.Devlink.RuntimeProps;
  wrapperProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
