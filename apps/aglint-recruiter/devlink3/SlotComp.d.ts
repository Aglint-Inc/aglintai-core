import * as React from "react";
import * as Types from "./types";

declare function SlotComp(props: {
  as?: React.ElementType;
  componentNeme?: React.ReactNode;
}): React.JSX.Element;
