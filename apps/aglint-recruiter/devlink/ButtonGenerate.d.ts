import * as React from "react";
import * as Types from "./types";

declare function ButtonGenerate(props: {
  as?: React.ElementType;
  onClickGenerate?: Types.Devlink.RuntimeProps;
  slotIcon?: Types.Devlink.Slot;
  textDynamic?: React.ReactNode;
}): React.JSX.Element;
