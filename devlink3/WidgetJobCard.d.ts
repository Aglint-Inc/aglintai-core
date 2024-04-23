import * as React from "react";
import * as Types from "./types";

declare function WidgetJobCard(props: {
  as?: React.ElementType;
  textJob?: React.ReactNode;
  textSecondary?: React.ReactNode;
  onClickJob?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
