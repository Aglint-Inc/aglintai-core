import * as React from "react";
import * as Types from "./types";

declare function LeverApiKey(props: {
  as?: React.ElementType;
  slotSearch?: Types.Devlink.Slot;
  onClickContinue?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
