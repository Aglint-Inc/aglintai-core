import * as React from "react";
import * as Types from "./types";

declare function DragAndDrop(props: {
  as?: React.ElementType;
  isDropping?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
