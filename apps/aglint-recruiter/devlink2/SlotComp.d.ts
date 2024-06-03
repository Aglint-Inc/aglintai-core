import * as React from "react";
import * as Types from "./types";

declare function SlotComp(props: {
  as?: React.ElementType;
  componentName?: React.ReactNode;
}): React.JSX.Element;
