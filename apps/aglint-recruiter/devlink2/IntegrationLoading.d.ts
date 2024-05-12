import * as React from "react";
import * as Types from "./types";

declare function IntegrationLoading(props: {
  as?: React.ElementType;
  slotLoaderIcon?: Types.Devlink.Slot;
  textLoader?: React.ReactNode;
  isText?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
